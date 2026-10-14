package main

import (
	"math"
	"sort"
	"strings"
	"unicode"
)

// Chinese bigrams and Latin words let the local index work without an
// external tokenizer or model. Scores are ranking signals, not confidence.
func terms(text string) []string {
	text = strings.ToLower(text)
	out := []string{}
	han := []rune{}
	var word strings.Builder
	flushHan := func() {
		for i := 0; i+1 < len(han); i++ {
			out = append(out, string(han[i:i+2]))
		}
		if len(han) == 1 {
			out = append(out, string(han))
		}
		han = han[:0]
	}
	flushWord := func() {
		if word.Len() > 1 {
			out = append(out, word.String())
		}
		word.Reset()
	}
	for _, r := range text {
		if unicode.Is(unicode.Han, r) {
			flushWord()
			han = append(han, r)
		} else if unicode.IsLetter(r) || unicode.IsDigit(r) {
			flushHan()
			word.WriteRune(r)
		} else {
			flushHan()
			flushWord()
		}
	}
	flushHan()
	flushWord()
	return out
}
func retrieve(docs []Document, q, baseID string, k int) []Source {
	type item struct {
		source Source
		freq   map[string]int
		length int
		title  string
	}
	entries := []item{}
	df := map[string]int{}
	total := 0
	for _, d := range docs {
		if baseID != "" && d.BaseID != baseID {
			continue
		}
		for _, c := range d.Chunks {
			freq := map[string]int{}
			tokens := terms(c.Content)
			for _, t := range tokens {
				freq[t]++
			}
			for t := range freq {
				df[t]++
			}
			total += len(tokens)
			entries = append(entries, item{Source{ID: c.ID, DocID: d.ID, DocName: d.Name, BaseID: d.BaseID, Page: c.Page, Content: c.Content}, freq, len(tokens), strings.ToLower(d.Name)})
		}
	}
	if len(entries) == 0 {
		return []Source{}
	}
	query := map[string]bool{}
	stop := map[string]bool{"什么": true, "怎么": true, "如何": true, "哪些": true, "可以": true, "是否": true, "一个": true, "这个": true, "一下": true, "告诉": true, "我们": true, "问题": true, "请问": true, "中的": true, "the": true, "what": true, "how": true, "is": true, "of": true, "to": true, "and": true}
	for _, t := range terms(q) {
		if !stop[t] {
			query[t] = true
		}
	}
	avg := float64(total) / float64(len(entries))
	if avg == 0 {
		avg = 1
	}
	scored := []Source{}
	for _, e := range entries {
		score := 0.0
		for t := range query {
			f := float64(e.freq[t])
			if f > 0 {
				idf := math.Log(1 + (float64(len(entries)-df[t])+0.5)/(float64(df[t])+0.5))
				score += idf * f * 2.2 / (f + 1.2*(0.25+0.75*float64(e.length)/avg))
			}
			if strings.Contains(e.title, t) {
				score += 0.4
			}
		}
		if score > 0 {
			e.source.Score = math.Round(score*100) / 100
			scored = append(scored, e.source)
		}
	}
	sort.SliceStable(scored, func(i, j int) bool { return scored[i].Score > scored[j].Score })
	if k < 1 {
		k = 5
	}
	if len(scored) > k {
		scored = scored[:k]
	}
	return scored
}
