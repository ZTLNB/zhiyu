package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func testApp(t *testing.T) *App {
	t.Helper()
	a, err := openApp(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	return a
}
func request(t *testing.T, a *App, method, path string, body any) *httptest.ResponseRecorder {
	t.Helper()
	var b bytes.Buffer
	if body != nil {
		if err := json.NewEncoder(&b).Encode(body); err != nil {
			t.Fatal(err)
		}
	}
	r := httptest.NewRequest(method, "http://127.0.0.1:8787"+path, &b)
	r.Host = "127.0.0.1:8787"
	w := httptest.NewRecorder()
	a.routes().ServeHTTP(w, r)
	return w
}
func jsonBody(t *testing.T, w *httptest.ResponseRecorder) map[string]any {
	t.Helper()
	var out map[string]any
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatal(err, w.Body.String())
	}
	return out
}

func TestImportAskCitationPersistenceAndDeletion(t *testing.T) {
	a := testApp(t)
	data := map[string]any{"baseId": "work", "name": "里程碑.md", "format": "MD", "size": 100, "pages": []Page{{Number: 7, Text: "本项目的鲸鱼里程碑为十一月完成私有索引，验收时必须核对星河计划的导出备份。"}}}
	w := request(t, a, "POST", "/api/documents", data)
	if w.Code != 201 {
		t.Fatal(w.Code, w.Body.String())
	}
	id := jsonBody(t, w)["id"].(string)
	w = request(t, a, "POST", "/api/documents", data)
	if w.Code != 409 {
		t.Fatalf("duplicate got %d", w.Code)
	}
	w = request(t, a, "POST", "/api/ask", map[string]any{"question": "鲸鱼里程碑", "baseId": "work"})
	if w.Code != 200 {
		t.Fatal(w.Code, w.Body.String())
	}
	out := jsonBody(t, w)
	cid := out["conversationId"].(string)
	message := out["message"].(map[string]any)
	sources := message["sources"].([]any)
	s := sources[0].(map[string]any)
	if s["docId"] != id || s["page"] != float64(7) {
		t.Fatal("wrong citation", s)
	}
	if message["mode"] != "extract" {
		t.Fatal("extract mode missing")
	}
	reloaded, err := openApp(a.dataDir)
	if err != nil {
		t.Fatal(err)
	}
	if len(reloaded.library.Conversations) != 1 || reloaded.library.Conversations[0].ID != cid {
		t.Fatal("conversation persistence failed")
	}
	w = request(t, reloaded, "DELETE", "/api/documents/"+id, nil)
	if w.Code != 200 {
		t.Fatal(w.Code, w.Body.String())
	}
	w = request(t, reloaded, "GET", "/api/conversations/"+cid, nil)
	if !strings.Contains(w.Body.String(), "鲸鱼里程碑") {
		t.Fatal("citation snapshot lost")
	}
	w = request(t, reloaded, "GET", "/api/documents/"+id, nil)
	if w.Code != 404 {
		t.Fatal("deleted document remains")
	}
}
func TestNoEvidenceDoesNotGenerateAnswer(t *testing.T) {
	a := testApp(t)
	w := request(t, a, "POST", "/api/ask", map[string]any{"question": "超导量子芯片的原子冷却参数", "baseId": "life", "useModel": true})
	if w.Code != 200 {
		t.Fatal(w.Code, w.Body.String())
	}
	if !strings.Contains(w.Body.String(), "没有在所选资料中找到足够的依据") {
		t.Fatal("no-evidence refusal missing")
	}
}
func TestModelAndKeyHandling(t *testing.T) {
	a := testApp(t)
	calls := 0
	model := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		calls++
		if r.URL.Path != "/v1/chat/completions" {
			t.Error(r.URL.Path)
		}
		if r.Header.Get("Authorization") != "Bearer test-secret-key" {
			t.Error("missing authorization")
		}
		b, _ := io.ReadAll(r.Body)
		var payload struct {
			Messages []struct {
				Content string `json:"content"`
			} `json:"messages"`
		}
		_ = json.Unmarshal(b, &payload)
		if len(payload.Messages) == 0 || !strings.Contains(payload.Messages[0].Content, "<evidence>") {
			t.Error("evidence missing")
		}
		writeJSON(w, 200, map[string]any{"choices": []any{map[string]any{"message": map[string]string{"content": "系统支持 PDF 与 DOCX。[1]"}}}})
	}))
	defer model.Close()
	cfg := map[string]any{"baseUrl": model.URL + "/v1", "model": "unit-model", "apiKey": "test-secret-key", "topK": 3, "chunkSize": 400, "overlap": 60}
	w := request(t, a, "POST", "/api/config", cfg)
	if w.Code != 200 {
		t.Fatal(w.Code, w.Body.String())
	}
	if strings.Contains(w.Body.String(), "test-secret-key") {
		t.Fatal("key leaked")
	}
	w = request(t, a, "GET", "/api/state", nil)
	if strings.Contains(w.Body.String(), "test-secret-key") {
		t.Fatal("state leaks key")
	}
	w = request(t, a, "GET", "/api/export", nil)
	if strings.Contains(w.Body.String(), "test-secret-key") {
		t.Fatal("backup leaks key")
	}
	cfg["apiKey"] = ""
	w = request(t, a, "POST", "/api/config", cfg)
	if w.Code != 200 || a.config.APIKey != "test-secret-key" {
		t.Fatal("blank key must retain existing key")
	}
	w = request(t, a, "POST", "/api/ask", map[string]any{"question": "支持哪些文件格式", "baseId": "reading", "useModel": true})
	if w.Code != 200 {
		t.Fatal(w.Code, w.Body.String())
	}
	if !strings.Contains(w.Body.String(), `"mode":"model"`) || calls != 1 {
		t.Fatal("model integration failed", calls, w.Body.String())
	}
	cfg["clearKey"] = true
	w = request(t, a, "POST", "/api/config", cfg)
	if w.Code != 200 || a.config.APIKey != "" {
		t.Fatal("key not cleared")
	}
}
func TestModelFailureIsVisibleAndDoesNotSaveFakeAnswer(t *testing.T) {
	a := testApp(t)
	model := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(401) }))
	defer model.Close()
	a.config.BaseURL = model.URL + "/v1"
	a.config.Model = "missing"
	w := request(t, a, "POST", "/api/ask", map[string]any{"question": "支持哪些文件格式", "useModel": true})
	if w.Code != 502 || !strings.Contains(w.Body.String(), "401") {
		t.Fatal(w.Code, w.Body.String())
	}
	if len(a.library.Conversations) != 0 {
		t.Fatal("failed model response was saved")
	}
}
func TestBackupRestoreValidationAndPreservation(t *testing.T) {
	a := testApp(t)
	w := request(t, a, "GET", "/api/export", nil)
	var backup Library
	if err := json.Unmarshal(w.Body.Bytes(), &backup); err != nil {
		t.Fatal(err)
	}
	request(t, a, "POST", "/api/bases", map[string]string{"name": "临时知识库"})
	w = request(t, a, "POST", "/api/import", backup)
	if w.Code != 200 || len(a.library.Bases) != 3 {
		t.Fatal(w.Code, w.Body.String())
	}
	files, err := filepath.Glob(filepath.Join(a.dataDir, "before-restore-*.json"))
	if err != nil || len(files) != 1 {
		t.Fatal("pre-restore backup missing")
	}
	b, _ := os.ReadFile(files[0])
	if !bytes.Contains(b, []byte("临时知识库")) {
		t.Fatal("old data not backed up")
	}
	backup.Documents[0].BaseID = "nonexistent"
	w = request(t, a, "POST", "/api/import", backup)
	if w.Code != 400 {
		t.Fatal("invalid backup accepted")
	}
}
func TestCrossOriginAndDNSRebindingDenied(t *testing.T) {
	a := testApp(t)
	for _, origin := range []string{"https://attacker.invalid", "null"} {
		r := httptest.NewRequest("POST", "http://127.0.0.1:8787/api/bases", strings.NewReader(`{"name":"hacked"}`))
		r.Header.Set("Origin", origin)
		w := httptest.NewRecorder()
		a.routes().ServeHTTP(w, r)
		if w.Code != 403 {
			t.Fatal("cross origin accepted")
		}
	}
	r := httptest.NewRequest("GET", "http://attacker.invalid:8787/api/state", nil)
	w := httptest.NewRecorder()
	a.routes().ServeHTTP(w, r)
	if w.Code != 403 {
		t.Fatal("host accepted")
	}
}
func TestBaseIsolationAndInvalidConversation(t *testing.T) {
	a := testApp(t)
	w := request(t, a, "GET", "/api/search?q=模型密钥&baseId=life", nil)
	if strings.Contains(w.Body.String(), "模型连接与资料隐私说明") {
		t.Fatal("cross-base retrieval")
	}
	w = request(t, a, "POST", "/api/ask", map[string]string{"question": "项目验收", "conversationId": "does-not-exist"})
	if w.Code != 404 {
		t.Fatal(w.Code)
	}
	w = request(t, a, "DELETE", "/api/bases/work", nil)
	if w.Code != 409 {
		t.Fatal("non-empty base deleted")
	}
}
func TestRuneAwareChunkingAndPagePreservation(t *testing.T) {
	a := testApp(t)
	a.config.ChunkSize = 100
	a.config.Overlap = 20
	text := strings.Repeat("中文资料", 100)
	d, err := a.makeDocument("reading", "unicode.txt", "TXT", int64(len(text)), []Page{{2, text}, {3, "下一页的内容。"}}, false)
	if err != nil {
		t.Fatal(err)
	}
	for _, c := range d.Chunks {
		if len([]rune(c.Content)) > 100 {
			t.Fatal("chunk is not rune sized")
		}
	}
	if d.Chunks[len(d.Chunks)-1].Page != 3 {
		t.Fatal("page lost")
	}
	if string([]rune(d.Chunks[0].Content)[80:]) != string([]rune(d.Chunks[1].Content)[:20]) {
		t.Fatal("overlap lost")
	}
}
func TestHTTPAssetAndConfigValidation(t *testing.T) {
	a := testApp(t)
	w := request(t, a, "GET", "/", nil)
	if w.Code != 200 || !strings.Contains(w.Body.String(), "私人知识库") {
		t.Fatal("index missing")
	}
	w = request(t, a, "GET", "/data/config.json", nil)
	if w.Code != 404 {
		t.Fatal("private data exposed")
	}
	w = request(t, a, "POST", "/api/config", map[string]any{"baseUrl": "javascript:alert(1)", "model": "x", "topK": 5, "chunkSize": 500, "overlap": 80})
	if w.Code != 400 {
		t.Fatal("invalid model URL accepted")
	}
}
