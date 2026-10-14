const $ = (s, root = document) => root.querySelector(s);
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const IconPaths = {
 'home':'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
 'layout':'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 'library':'<path d="M4 4v16M8 4v16M12 4v16m4-15 4 14"/>',
 'files':'<path d="M14 2H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6Zm0 0v5h5M8 11h6M8 15h6"/><path d="M8 23h13V10"/>',
 'file':'<path d="M14 2H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8ZM14 2v6h6M8 13h8M8 17h6"/>',
 'sparkles':'<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z"/><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6Z"/>',
 'search':'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 'settings':'<path d="m10 3-.5 3-2 .9L5 5.5 2.5 9 5 11v2l-2.5 2 2.5 3.5L7.5 17l2 .9.5 3.1h4l.5-3.1 2-.9 2.5 1.5L21.5 15 19 13v-2l2.5-2L19 5.5 16.5 7l-2-.9L14 3Z"/><circle cx="12" cy="12" r="3"/>',
 'plus':'<path d="M12 5v14M5 12h14"/>',
 'chevron-down':'<path d="m6 9 6 6 6-6"/>',
 'chevron-left':'<path d="m15 5-7 7 7 7"/>',
 'chevron-right':'<path d="m9 5 7 7-7 7"/>',
 'arrow':'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 'upload':'<path d="M12 16V3m-5 5 5-5 5 5M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
 'download':'<path d="M12 3v13m-5-5 5 5 5-5M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
 'shield':'<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
 'moon':'<path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z"/>',
 'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
 'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',
 'chat':'<path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 0 1-1-5 9 9 0 0 1 18 0Z"/><path d="M7 10h10M7 14h6"/>',
 'folder':'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
 'book':'<path d="M12 5C9 3 6 3 3 4v16c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v16"/>',
 'check':'<path d="m5 12 4 4L19 6"/>',
 'x':'<path d="m6 6 12 12M6 18 18 6"/>',
 'trash':'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
 'send':'<path d="m3 11 18-8-8 18-2-8Zm8 2 10-10"/>',
 'link':'<path d="m10 13 4-4m-5 6-2 2a4 4 0 1 1-6-6l3-3a4 4 0 0 1 6 0m4 1 2-2a4 4 0 1 1 6 6l-3 3a4 4 0 0 1-6 0"/>',
 'copy':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
 'refresh':'<path d="M20 7a9 9 0 0 0-15-2L2 8m0-5v5h5M4 17a9 9 0 0 0 15 2l3-3m0 5v-5h-5"/>',
 'database':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
 'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'bolt':'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>'
};
function icon(name) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IconPaths[name] || IconPaths.file}</svg>`; }
function decorate(root = document) { root.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon)); }
const S = { data:null, view:'home', baseId:'', docFilter:'', format:'', query:'', results:[], conversation:null, chatBase:'', busy:false, uploading:false, sources:[], viewerDoc:null, viewerPage:1, viewerChunks:false, useModel:localStorage.getItem('zhiyu-model')!=='false' };
const Content = $('#content');
const Modal = $('#modal');
const Viewer = $('#viewer');
let ToastTimer;
function toast(message,error=false) { clearTimeout(ToastTimer);const el=$('#toast');el.textContent=message;el.className='toast show'+(error?' error':'');ToastTimer=setTimeout(()=>el.classList.remove('show'),5000); }
async function api(path, options={}) { const res=await fetch(path,{...options,headers:{...(options.body?{'Content-Type':'application/json'}:{}),...options.headers}});const data=await res.json().catch(()=>({error:'服务返回格式错误'}));if(!res.ok)throw new Error(data.error||'请求失败');return data; }
function post(path,body) { return api(path,{method:'POST',body:JSON.stringify(body)}); }
const formatBytes = n => n<1024?n+' B':n<1048576?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(1)+' MB';
const date = value => new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(value));
const baseName = id => S.data.bases.find(b=>b.id===id)?.name||'已删除的知识库';
const docsIn = id => S.data.documents.filter(d=>!id||d.baseId===id);
function button(text,action,cls='',data='') { return `<button class="button ${cls}" data-action="${action}" ${data}>${text}</button>`; }
function empty(title,description,action='upload',label='导入资料',symbol='files') { return `<div class="empty">${icon(symbol)}<h3>${esc(title)}</h3><p>${esc(description)}</p>${button(icon('plus')+label,action,'primary')}</div>`; }
function options(selected='',all=true) { return `${all?'<option value="">全部知识库</option>':''}${S.data.bases.map(b=>`<option value="${esc(b.id)}" ${b.id===selected?'selected':''}>${esc(b.name)}</option>`).join('')}`; }
function pageHead(title,sub,right='') { return `<div class="page-head"><div><h1>${esc(title)}</h1><p>${esc(sub)}</p></div><div class="page-head-right">${right}</div></div>`; }
function footer() {return '<div class="page-footer">让每一份资料，都成为可用的知识。</div>';}
function syncSidebar() { $('#base-count').textContent=S.data.bases.length;$('#base-shortcuts').innerHTML=S.data.bases.map(b=>`<button class="shortcut" data-base="${esc(b.id)}"><i class="dot ${esc(b.color)}"></i><span>${esc(b.name)}</span></button>`).join('');document.querySelectorAll('[data-nav]').forEach(n=>{const active=n.dataset.nav===S.view||(S.view==='base'&&n.dataset.nav==='bases');n.classList.toggle('active',active);if(active)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current');}); }
async function refresh(renderPage=true) { S.data=await api('/api/state');if(S.chatBase&&!S.data.bases.some(b=>b.id===S.chatBase))S.chatBase='';syncSidebar();if(renderPage)render(); }
function navigate(view,baseId='') { const hash=view==='base'?'base/'+encodeURIComponent(baseId):view;if(location.hash.slice(1)===hash){S.view=view;S.baseId=baseId;render();}else location.hash=hash; }
function handleHash() { const hash=location.hash.slice(1)||'home';const [view,...parts]=hash.split('/');S.view=['home','bases','documents','chat','settings','base','search'].includes(view)?view:'home';S.baseId=S.view==='base'?decodeURIComponent(parts.join('/')):'';render(); }
const HeroArt = `<svg class="hero-art" viewBox="0 0 260 240" aria-hidden="true"><defs><linearGradient id="bookg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a4d5b2"/><stop offset="1" stop-color="#5a9e77"/></linearGradient></defs><circle cx="151" cy="121" r="79" fill="none" stroke="#c8dfce" stroke-dasharray="3 6"/><circle cx="151" cy="121" r="58" fill="#e0efdf"/><ellipse cx="153" cy="188" rx="70" ry="9" fill="#d4e8d6"/><g transform="translate(89 82) rotate(-8 64 48)"><path d="M0 0c22-4 43 1 64 12C85 1 107-4 128 0v82c-23-5-44-1-64 10C44 81 22 77 0 82Z" fill="url(#bookg)"/><path d="M5 0c20-3 38 1 59 12C84 1 106-3 123 0v73c-20-3-41 1-59 13C44 76 25 71 5 75Z" fill="#fffef4"/><path d="M64 12v74" stroke="#dae3cf" stroke-width="2"/><path d="m19 21 27 5m-27 7 28 5m-27 7 23 4m35-23 29-6m-29 17 27-5m-27 17 22-4" stroke="#b5c7b3" stroke-width="3" stroke-linecap="round"/><path d="m90 1 9-2v35l-5-4-4 5Z" fill="#8cbc9b"/></g><g transform="translate(178 35) rotate(12)"><rect width="57" height="43" rx="9" fill="#fff" stroke="#e0e9df"/><path d="m15 18 7 7 16-16" stroke="#82b78d" stroke-width="3" fill="none"/><path d="M15 33h26" stroke="#d8e5d6" stroke-width="2"/></g><g transform="translate(53 130) rotate(-10)"><rect width="57" height="41" rx="8" fill="#fff" stroke="#e0e9df"/><path d="M13 15h30M13 23h19M13 30h26" stroke="#b7d1be" stroke-width="2"/></g><path d="m90 53 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#88b998"/><circle cx="226" cy="143" r="4" fill="#9dc9a7"/><circle cx="94" cy="207" r="3" fill="#b7d7bc"/></svg>`;
function baseCard(b) { const docs=docsIn(b.id);return `<button class="base-card" data-base="${esc(b.id)}"><div class="base-card-head"><span class="base-icon ${esc(b.color)}">${icon('book')}</span><span class="more">${icon('arrow')}</span></div><h3>${esc(b.name)}</h3><p>${esc(b.description||'在这里收集你的资料，让知识随时可以被找到。')}</p><div class="base-card-footer"><span>${icon('file')}${docs.length} 份资料<span>·</span>${docs.reduce((sum,d)=>sum+d.chunkCount,0)} 个片段</span><span class="status"><i></i>${docs.length?'可检索':'待导入'}</span></div></button>`; }
function documentTable(docs) { if(!docs.length)return empty('这里还没有资料','导入第一份文档，开始建立你自己的知识库。');return `<div class="table-panel"><table><thead><tr><th>文件名称</th><th>所属知识库</th><th>检索片段</th><th>添加时间</th><th>状态</th><th>操作</th></tr></thead><tbody>${docs.map(d=>`<tr><td><div class="doc-cell"><span class="file-icon ${esc(d.format.toLowerCase())}">${icon('file')}</span><div><button class="doc-name" data-doc="${esc(d.id)}" title="${esc(d.name)}">${esc(d.name)}</button><small>${esc(d.format)} · ${formatBytes(d.size)}${d.sample?' · 示例资料':''}</small></div></div></td><td class="muted">${esc(baseName(d.baseId))}</td><td class="muted">${d.chunkCount} 个</td><td class="muted">${date(d.created)}</td><td><span class="status"><i></i>已就绪</span></td><td><div class="table-action"><button class="icon-button" data-doc="${esc(d.id)}" title="查看资料" aria-label="查看 ${esc(d.name)}">${icon('search')}</button><button class="icon-button" data-action="delete-doc" data-id="${esc(d.id)}" aria-label="删除 ${esc(d.name)}" title="删除资料">${icon('trash')}</button></div></td></tr>`).join('')}</tbody></table></div>`; }
function home() {
 const n=S.data.documents.length;const latest=[...S.data.documents].sort((a,b)=>b.created.localeCompare(a.created)).slice(0,5);
 const today=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date());
 return pageHead('你的知识，从这里生长','欢迎回来。把零散的资料，连接成清晰的答案。',`<span class="date-tag">${icon('calendar')}${today}</span>`)+
 `<div class="stats">${[[S.data.bases.length,'知识库','library','按主题组织你的知识'],[n,'资料文档','files','真实导入 · 随时可查'],[S.data.stats.chunks,'检索片段','database','自动分块 · 保留上下文'],[S.data.conversations.length,'问答记录','chat','每个答案都有迹可循']].map(([v,label,i,caption])=>`<div class="stat"><div class="stat-label"><span>${label}</span><span class="stat-icon">${icon(i)}</span></div><div class="stat-number">${v.toLocaleString()}</div><div class="stat-caption">${caption}</div></div>`).join('')}</div>`+
 `<div class="welcome-grid"><section class="hero"><div class="hero-text"><div class="eyebrow">${icon('sparkles')} YOUR PERSONAL KNOWLEDGE SPACE</div><h2>让知识，<br />随时为你所用。</h2><p>收集文档、连接想法、找到答案。<br />从一份资料开始，建起属于你的知识岛屿。</p><div class="hero-buttons">${button(icon('upload')+'导入你的资料','upload','primary')}${button(icon('sparkles')+'开始知识问答','chat')}</div></div>${HeroArt}</section><section class="quick-card"><h3>${icon('bolt')} 从一个好问题开始</h3><p>试着问问示例资料，体验带出处的答案。</p><div class="quick-questions">${['如何建立一个私人知识库？','项目验收需要检查什么？','怎样做高效阅读笔记？'].map(q=>`<button class="question-chip" data-question="${esc(q)}">${esc(q)}${icon('arrow')}</button>`).join('')}</div></section></div>`+
 `<div class="section-head"><h2>我的知识库 <span class="subcount">${S.data.bases.length}</span></h2><button class="text-button" data-action="create-base">${icon('plus')} 新建知识库</button></div><div class="base-grid">${S.data.bases.slice(0,3).map(baseCard).join('')}</div>`+
 `<div class="section-head"><h2>最近添加的资料</h2><button class="text-button" data-nav="documents">查看全部 ${icon('arrow')}</button></div>${documentTable(latest)}${footer()}`;
}
function bases() {return pageHead('我的知识库','让相同主题的资料彼此连接，形成自己的知识地图。',button(icon('plus')+'新建知识库','create-base','primary'))+(S.data.bases.length?`<div class="base-grid">${S.data.bases.map(baseCard).join('')}</div>`:empty('建立你的第一座知识岛屿','按主题创建知识库，再把相关资料放进来。','create-base','新建知识库','library'))+footer();}
function documents() {
 const b=S.data.bases.find(b=>b.id===S.baseId);if(S.view==='base'&&!b)return empty('知识库已不存在','可以回到知识库列表，或建立新的知识库。','create-base','新建知识库','library');
 const docs=docsIn(S.view==='base'?S.baseId:S.docFilter).filter(d=>!S.format||d.format===S.format);
 return pageHead(b?.name||'资料库',b?.description||'每一份资料，都是下一次好回答的起点。',`${b?button(icon('trash'),'delete-base','',`data-id="${esc(b.id)}" aria-label="删除知识库"`):''}${button(icon('upload')+'导入资料','upload','primary')}`)+
 `<div class="drop-banner" id="page-drop"><span>${icon('upload')}</span><div><strong>把资料放进来，剩下的交给知屿。</strong><p>支持 PDF、DOCX、MD、TXT、CSV · 单文件最大 20 MB</p></div>${button('选择文件','upload','small')}</div>`+
 `<div class="toolbar">${S.view!=='base'?`<select class="filter" id="doc-base-filter" aria-label="按知识库筛选">${options(S.docFilter)}</select>`:''}<select class="filter" id="format-filter" aria-label="按文件格式筛选"><option value="">所有文件类型</option>${['PDF','DOCX','MD','TXT','CSV'].map(f=>`<option ${S.format===f?'selected':''}>${f}</option>`).join('')}</select><span class="muted" style="font-size:11px;margin-left:auto">共 ${docs.length} 份资料</span></div>${documentTable(docs)}${footer()}`;
}
function messageHTML(m,index) {
 if(m.role==='user')return `<article class="message user"><span class="message-avatar">我</span><div class="message-body"><div class="message-head">你</div><div class="message-content">${esc(m.content)}</div></div></article>`;
 const ids=(m.sources||[]).map(s=>{const id=S.sources.length;S.sources.push(s);return id;});
 let text=esc(m.content).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[(\d+)\]/g,(whole,n)=>ids[Number(n)-1]===undefined?whole:`<button class="citation-button" data-source="${ids[Number(n)-1]}" aria-label="查看引用 ${n}">${n}</button>`);
 return `<article class="message"><span class="message-avatar">${icon('sparkles')}</span><div class="message-body"><div class="message-head">知屿<small>${m.mode==='model'?'模型生成 · 请核对出处':'原文摘录'}</small></div><div class="message-content">${text}</div>${ids.length?`<div class="sources">${ids.map((id,i)=>`<button class="source-chip" data-source="${id}" title="${esc(S.sources[id].docName)}"><b class="source-number">${i+1}</b><span>${esc(S.sources[id].docName)}</span><small>第 ${S.sources[id].page} 页</small></button>`).join('')}</div>`:''}<button class="text-button" data-action="copy-answer" data-message="${index}">${icon('copy')} 复制回答</button></div></article>`;
}
function renderChat() {
 S.sources=[];const msgs=S.conversation?.messages||[];const configured=S.data.config.configured;
 return `<div class="chat-shell"><aside class="conversation-panel">${button(icon('plus')+'新建对话','new-chat','soft')}<div class="conversation-label">最近的对话</div><div class="conversation-list">${[...S.data.conversations].reverse().map(c=>`<div class="conversation-item ${c.id===S.conversation?.id?'active':''}"><button data-conversation="${esc(c.id)}" title="${esc(c.title)}">${esc(c.title)}</button><button class="icon-button" data-action="delete-chat" data-id="${esc(c.id)}" aria-label="删除对话">${icon('trash')}</button></div>`).join('')||'<p class="muted" style="font-size:11px;padding:10px">第一段对话，从这里开始。</p>'}</div><div class="conversation-hint">你的对话会自动保存，<br />下次回来可以继续提问。</div></aside><section class="chat-main"><header class="chat-top"><div class="chat-top-left">${icon('sparkles')}<span>知识问答</span><button class="icon-button mobile-history" data-action="chat-history" title="最近的对话" aria-label="最近的对话">${icon('clock')}</button><button class="icon-button" data-action="new-chat" title="新建对话" aria-label="新建对话">${icon('plus')}</button></div><select id="chat-base" class="filter" aria-label="选择问答知识库" ${S.busy?'disabled':''}>${options(S.chatBase)}</select><span class="model-tag"><i></i>${configured?esc(S.data.config.model):'原文摘录模式'}</span></header><div class="chat-messages" id="chat-messages">${msgs.length?msgs.map(messageHTML).join(''):`<div class="chat-welcome"><span class="welcome-symbol">${icon('sparkles')}</span><h2>你的资料，知道答案。</h2><p>向自己的知识库提问。每一个引用都能回到原文，<br />让思考有依据，让知识被真正用起来。</p><div class="chat-suggestions">${['知识库支持哪些文件格式？','项目验收需要检查什么？','如何保护模型密钥？','怎样做高效阅读笔记？'].map(q=>`<button class="question-chip" data-question="${esc(q)}">${esc(q)}${icon('arrow')}</button>`).join('')}</div></div>`}${S.busy?'<div class="thinking">正在检索相关资料'+(configured&&S.useModel?'并生成回答':'')+'…</div>':''}</div><div class="composer-area"><form id="ask-form"><div class="composer"><textarea id="question" placeholder="问一个与你的资料有关的问题…" aria-label="问题" maxlength="2000" rows="2" ${S.busy?'disabled':''}></textarea><div class="composer-footer"><div class="composer-options"><label><input id="use-model" type="checkbox" ${configured&&S.useModel?'checked':''} ${!configured||S.busy?'disabled':''}/>模型生成回答</label><span>${configured?'基于检索资料作答':'配置模型后启用生成'}</span></div><button type="submit" class="button primary small" ${S.busy?'disabled':''}>发送 ${icon('send')}</button></div></div><div class="composer-help">Ctrl + Enter 发送 · 回答请结合原文核对${!configured?' · 当前使用本地原文摘录':''}</div></form></div></section></div>`;
}
function settings() {
 const c=S.data.config;
 return pageHead('设置与模型','选择适合你的模型，让资料成为更有用的答案。')+`<div class="settings-grid"><div><form id="settings-form" class="settings-card"><h2>模型连接</h2><p>支持兼容 chat/completions 的云端 API 与本地模型服务。</p><div class="form-field"><label for="model-url">API 基础地址</label><input id="model-url" name="baseUrl" type="url" placeholder="https://your-model-service/v1" value="${esc(c.baseUrl)}" /><small>填写服务提供的基础地址，也可填写完整的 chat/completions 地址。</small></div><div class="form-field"><label for="model-name">模型名称</label><input id="model-name" name="model" placeholder="填写服务提供的模型名称" value="${esc(c.model)}" /></div><div class="form-field"><label for="model-key">API Key</label><input id="model-key" name="apiKey" type="password" autocomplete="new-password" placeholder="${c.hasKey?'已保存密钥，留空则保留':'本地服务无需密钥时可留空'}" /><small>密钥由本地服务保存，不会返回到网页，也不会包含在导出备份中。</small></div><label class="check-field"><input type="checkbox" name="clearKey" />清除已保存的密钥</label><h2 style="margin:25px 0 18px">检索与分块</h2><div class="form-row"><div class="form-field"><label for="top-k">引用片段数</label><input id="top-k" name="topK" type="number" min="1" max="10" required value="${c.topK}" /><small>每次取 1–10 个相关片段</small></div><div class="form-field"><label for="chunk-size">分块长度</label><input id="chunk-size" name="chunkSize" type="number" min="100" max="1500" required value="${c.chunkSize}" /><small>中文按字符计数</small></div><div class="form-field"><label for="overlap">重叠长度</label><input id="overlap" name="overlap" type="number" min="0" max="1499" required value="${c.overlap}" /><small>需小于分块长度</small></div></div><p style="font-size:10px;color:var(--muted);margin:0 0 22px">分块参数仅对之后导入的资料生效。检索采用中文关键词排序。</p><div style="display:flex;gap:10px"><button class="button primary" type="submit">${icon('check')}保存设置</button>${button(icon('bolt')+'测试连接','test-model')}</div><div class="form-message" id="settings-message" role="status"></div></form></div><aside class="settings-aside"><section class="settings-card"><h2>你的资料，由你掌握。</h2><ul class="info-list"><li>${icon('database')}<div><strong>本机持久保存</strong>资料、检索片段与对话都保存在本地数据目录。</div></li><li>${icon('shield')}<div><strong>选择自己的模型</strong>使用外部模型时，问题、引用片段与最近对话会发往该服务；本地模型可让处理留在设备上。</div></li><li>${icon('link')}<div><strong>回答可以追溯</strong>打开引用即可查看原文，排序分数不代表答案正确率。</div></li></ul><div class="callout">未配置模型时仍可使用导入、检索、原文摘录和引用查看。</div></section><section class="settings-card"><h2>备份与恢复</h2><p>备份你的知识库、资料与对话。</p><div style="display:flex;flex-wrap:wrap;gap:8px">${button(icon('download')+'导出备份','export','small')}${button(icon('refresh')+'恢复备份','restore','small')}</div><p style="font-size:10px;margin:17px 0 0">恢复将替换现有资料，服务会先自动保存一份恢复前的备份。</p></section></aside></div>`;
}
function searchPage() { S.sources=[];return pageHead('搜索资料',`“${S.query}” · 找到 ${S.results.length} 个相关片段`)+(S.results.length?`<div class="search-results">${S.results.map(s=>{const id=S.sources.length;S.sources.push(s);return `<article class="result-card"><div class="result-top"><strong>${icon('file')} ${esc(s.docName)}</strong>${button('查看原文 '+icon('arrow'),'source','small',`data-index="${id}"`)}</div><p>${esc(s.content)}</p><div class="result-meta"><span>${esc(baseName(s.baseId))} · 第 ${s.page} 页</span><span>排序分数 ${s.score.toFixed(2)}</span></div></article>`;}).join('')}</div>`:empty('没有找到相关片段','试试文档中出现的关键词，或导入相关资料后再检索。'))+footer(); }
function render() {
 if(!S.data)return;syncSidebar();const names={home:'概览',bases:'我的知识库',documents:'资料库',chat:'知识问答',settings:'设置与模型',base:baseName(S.baseId),search:'搜索资料'};$('#page-label').textContent=names[S.view]||'概览';
 Content.innerHTML=({home,bases,documents,base:documents,chat:renderChat,settings,search:searchPage}[S.view]||home)();decorate(Content);
 if(S.view==='chat')requestAnimationFrame(()=>{const box=$('#chat-messages');if(box)box.scrollTop=box.scrollHeight;});
 if(S.view!=='chat')window.scrollTo({top:0});
}
function closeModal() { if(!S.uploading)Modal.close(); }
function showModal(title,html) { $('#modal-content').innerHTML=`<div class="modal-head"><h2>${esc(title)}</h2><button class="icon-button" data-action="close-modal" aria-label="关闭">${icon('x')}</button></div><div class="modal-body">${html}</div>`;Modal.showModal(); }
function createBase() {showModal('新建知识库',`<p>用一个主题，把相关的资料连接起来。</p><form id="base-form"><div class="form-field"><label for="base-name">知识库名称</label><input id="base-name" name="name" placeholder="例如：产品研究、读书笔记" maxlength="60" required /></div><div class="form-field"><label for="base-description">描述</label><textarea id="base-description" name="description" placeholder="这里会收集哪些知识？" rows="3" maxlength="300"></textarea></div><div class="form-field"><label>标记颜色</label><div class="color-options">${[['mint','薄荷绿'],['blue','雾蓝'],['amber','麦穗金']].map(([c,t],i)=>`<label class="color-option"><input type="radio" name="color" value="${c}" ${i===0?'checked':''}/><i class="dot ${c}"></i>${t}</label>`).join('')}</div></div><div class="modal-actions">${button('取消','close-modal')}<button class="button primary" type="submit">创建知识库 ${icon('arrow')}</button></div><div class="form-message" id="base-error" role="alert"></div></form>`);}
function showUpload() { if(!S.data.bases.length){createBase();return;}const selected=S.view==='base'?S.baseId:S.chatBase||S.docFilter||S.data.bases[0].id;showModal('导入你的资料',`<p>导入之后自动解析、分块，即可检索与提问。</p><div class="form-field"><label for="upload-base">放入知识库</label><select id="upload-base">${options(selected,false)}</select></div><button id="upload-zone" class="upload-zone" data-action="choose-files" style="width:100%">${icon('upload')}<p>点击选择文件，或拖拽到这里</p><small>PDF、DOCX、MD、TXT、CSV · 最大 20 MB</small></button><p style="font-size:10px;color:var(--muted);margin:12px 0 0">PDF 需要包含可复制的文字。扫描版请先进行 OCR。</p><div id="upload-progress" class="upload-progress" role="status"></div><div class="modal-actions">${button('完成','close-modal')}</div>`);}
let PDF;
async function parseFile(file) {
 const format=file.name.split('.').pop().toUpperCase();if(!['PDF','DOCX','MD','TXT','CSV'].includes(format))throw new Error('不支持此格式');if(file.size>20*1024*1024)throw new Error('文件超过 20 MB');if(file.size===0)throw new Error('文件是空的');const buffer=await file.arrayBuffer();let pages=[];
 if(format==='PDF'){
  if(!PDF){PDF=await import('/vendor/pdf.mjs');PDF.GlobalWorkerOptions.workerSrc='/vendor/pdf.worker.mjs';}
  const pdf=await PDF.getDocument({data:buffer,cMapUrl:'/vendor/cmaps/',cMapPacked:true,standardFontDataUrl:'/vendor/standard_fonts/'}).promise;
  try {if(pdf.numPages>2000)throw new Error('PDF 超过 2000 页');for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const text=await page.getTextContent();let result='',lastY=null;for(const item of text.items){if(!('str' in item))continue;const y=item.transform?.[5];if(lastY!==null&&y!==undefined&&Math.abs(y-lastY)>3)result+='\n';result+=item.str+(item.hasEOL?'\n':' ');lastY=y;}pages.push({number:i,text:result});}}finally{await pdf.destroy();}
 }else if(format==='DOCX'){
  const zip=await window.JSZip.loadAsync(buffer);const entry=zip.file('word/document.xml');if(!entry)throw new Error('不是有效的 Word DOCX 文件');const xml=await entry.async('string');if(xml.length>26*1024*1024)throw new Error('文档解压后过大');const dom=new DOMParser().parseFromString(xml,'application/xml');if(dom.querySelector('parsererror'))throw new Error('Word 文档结构损坏');const paragraphs=[...dom.getElementsByTagName('w:p')].map(p=>[...p.getElementsByTagName('w:t')].map(t=>t.textContent).join(''));pages=[{number:1,text:paragraphs.join('\n')}];
 }else {let text=new TextDecoder('utf-8').decode(buffer);if(text.includes('\uFFFD')){try{text=new TextDecoder('gb18030',{fatal:true}).decode(buffer);}catch{throw new Error('文字编码无法识别，请另存为 UTF-8');}}pages=[{number:1,text}];}
 if(!pages.some(p=>p.text.trim()))throw new Error('未找到文字，扫描版 PDF 请先进行 OCR');return {format,pages};
}
async function importFiles(files) {
 if(S.uploading||!files.length)return;if(!Modal.open||!$('#upload-base'))showUpload();const baseId=$('#upload-base').value;const progress=$('#upload-progress');S.uploading=true;$('#upload-base').disabled=true;$('#upload-zone').disabled=true;let success=0;
 for(const file of files){const line=document.createElement('div');line.textContent=file.name+' · 正在解析…';progress.append(line);try{const {format,pages}=await parseFile(file);line.textContent=file.name+' · 正在入库…';const result=await post('/api/documents',{baseId,name:file.name,size:file.size,format,pages});line.textContent=file.name+' · 已完成，'+result.chunks+' 个检索片段';line.style.color='var(--accent)';success++;}catch(e){line.textContent=file.name+' · '+e.message;line.className='error';}}
 S.uploading=false;$('#upload-base').disabled=false;$('#upload-zone').disabled=false;$('#file-input').value='';await refresh();if(success)toast(`已导入 ${success} 份资料，随时可以检索。`);
}
async function openDocument(id,page=1,source=null) {
 try{S.viewerDoc=await api('/api/documents/'+encodeURIComponent(id));S.viewerPage=Math.max(1,Math.min(page,S.viewerDoc.pages.length));S.viewerChunks=false;renderViewer(source);if(!Viewer.open)Viewer.showModal();}catch(e){if(source){$('#viewer-content').innerHTML=`<div class="drawer-header"><div><h2>${esc(source.docName)}</h2><p>第 ${source.page} 页 · 当时的引用快照</p></div><button class="icon-button" data-action="close-viewer" aria-label="关闭">${icon('x')}</button></div><div class="doc-pages"><div class="callout" style="margin:0 0 20px">原资料已删除，以下内容是保存在对话中的引用片段。</div><div class="page-text">${esc(source.content)}</div></div>`;if(!Viewer.open)Viewer.showModal();}else toast(e.message,true);}
}
function renderViewer(source=null) {
 const d=S.viewerDoc;const page=d.pages[S.viewerPage-1];$('#viewer-content').innerHTML=`<div class="drawer-header"><span class="file-icon ${esc(d.format.toLowerCase())}">${icon('file')}</span><div><h2>${esc(d.name)}</h2><p>${esc(baseName(d.baseId))} · ${d.chunks.length} 个片段 · ${formatBytes(d.size)}</p></div><button class="icon-button" data-action="close-viewer" aria-label="关闭">${icon('x')}</button></div><div class="drawer-toolbar"><div style="display:flex;gap:9px;align-items:center"><button class="icon-button" data-action="prev-page" ${S.viewerPage<=1?'disabled':''} aria-label="上一页">${icon('chevron-left')}</button><span>第 ${S.viewerPage} / ${d.pages.length} 页${d.format==='DOCX'?'（文本视图）':''}</span><button class="icon-button" data-action="next-page" ${S.viewerPage>=d.pages.length?'disabled':''} aria-label="下一页">${icon('chevron-right')}</button></div>${button(S.viewerChunks?'查看原文':'查看分块','toggle-chunks','small')}</div><div class="doc-pages">${source?`<div class="chunk-preview"><h4>${icon('link')} 本次引用片段</h4><p>${esc(source.content)}</p></div>`:''}${S.viewerChunks?d.chunks.filter(c=>c.page===page.number).map(c=>`<div class="chunk-preview"><h4>片段 ${c.index+1} · ${[...c.content].length} 字</h4><p>${esc(c.content)}</p></div>`).join(''):`<div class="page-text">${esc(page.text)}</div>`}</div>`;
}
async function sendQuestion(q) {
 if(S.busy)return;const question=(q??$('#question')?.value??'').trim();if(!question){toast('先写一个与你的资料有关的问题。');return;}if(S.view!=='chat')navigate('chat');
 const previous=S.conversation;const history=previous?.messages||[];S.conversation={id:previous?.id||'',messages:[...history,{role:'user',content:question}],baseId:S.chatBase};S.busy=true;if(S.view==='chat')render();
 try{const result=await post('/api/ask',{question,baseId:S.chatBase,conversationId:previous?.id||'',useModel:S.useModel&&S.data.config.configured});S.conversation=await api('/api/conversations/'+result.conversationId);await refresh(false);}catch(e){S.conversation=previous;toast(e.message,true);}finally{S.busy=false;if(S.view==='chat'){render();if(S.conversation===previous){$('#question').value=question;$('#question').focus();}}}
}
function newChat() {if(S.busy){toast('当前回答完成后再新建对话。');return;}S.conversation=null;navigate('chat');}
function showChatHistory() {showModal('最近的对话',`<p>选择一段对话继续提问。</p><div class="conversation-list">${[...S.data.conversations].reverse().map(c=>`<div class="conversation-item"><button data-conversation="${esc(c.id)}" title="${esc(c.title)}">${esc(c.title)}</button></div>`).join('')||'<p class="muted">还没有保存的对话。</p>'}</div>`);}
function confirmDelete(kind,id) {
 const isDoc=kind==='doc';const isChat=kind==='chat';const name=isDoc?S.data.documents.find(d=>d.id===id)?.name:isChat?S.data.conversations.find(c=>c.id===id)?.title:baseName(id);
 showModal(isDoc?'删除资料':isChat?'删除对话':'删除知识库',`<p>确定删除“${esc(name)}”吗？${isDoc?'对话中的引用快照仍会保留。':isChat?'此对话记录会被移除。':'知识库需先清空资料。'}</p><div class="modal-actions">${button('取消','close-modal')}${button('确认删除','confirm-delete','danger',`data-kind="${kind}" data-id="${esc(id)}"`)}</div>`);
}
async function removeItem(kind,id) {const path=kind==='doc'?'documents':kind==='chat'?'conversations':'bases';await api('/api/'+path+'/'+id,{method:'DELETE'});Modal.close();if(kind==='chat'&&S.conversation?.id===id)S.conversation=null;if(kind==='base'&&S.baseId===id)navigate('bases');await refresh();toast('已删除。');}
async function search(q) {q=q.trim();if(!q)return;S.query=q;try{const result=await api('/api/search?q='+encodeURIComponent(q));S.results=result.sources;navigate('search');}catch(e){toast(e.message,true);}}
function downloadBackup() {const a=document.createElement('a');a.href='/api/export';a.download='zhiyu-backup.json';a.click();toast('正在导出知识库备份。');}
async function handleAction(action,el) {
 switch(action){
  case 'home':navigate('home');break;
  case 'chat':navigate('chat');break;
  case 'upload':showUpload();break;
  case 'choose-files':$('#file-input').click();break;
  case 'create-base':createBase();break;
  case 'close-modal':closeModal();break;
  case 'close-viewer':Viewer.close();break;
  case 'theme':{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('zhiyu-theme',dark?'dark':'light');break;}
  case 'export':downloadBackup();break;
  case 'restore':showModal('恢复备份','<p>恢复会替换当前知识库、资料和对话。现有数据会先自动备份；模型配置不受影响。</p><div class="modal-actions">'+button('取消','close-modal')+button('选择备份文件','choose-backup','primary')+'</div>');break;
  case 'choose-backup':$('#restore-input').click();break;
  case 'delete-doc':confirmDelete('doc',el.dataset.id);break;
  case 'delete-chat':confirmDelete('chat',el.dataset.id);break;
  case 'delete-base':confirmDelete('base',el.dataset.id);break;
  case 'confirm-delete':el.disabled=true;try{await removeItem(el.dataset.kind,el.dataset.id);}finally{el.disabled=false;}break;
  case 'new-chat':newChat();break;
  case 'chat-history':showChatHistory();break;
  case 'prev-page':S.viewerPage=Math.max(1,S.viewerPage-1);renderViewer();break;
  case 'next-page':S.viewerPage=Math.min(S.viewerDoc.pages.length,S.viewerPage+1);renderViewer();break;
  case 'toggle-chunks':S.viewerChunks=!S.viewerChunks;renderViewer();break;
  case 'source':{const s=S.sources[Number(el.dataset.index)];if(s)await openDocument(s.docId,s.page,s);break;}
  case 'copy-answer':await navigator.clipboard.writeText(S.conversation.messages[Number(el.dataset.message)].content);toast('回答已复制。');break;
  case 'test-model':{el.disabled=true;const box=$('#settings-message');box.className='form-message';box.textContent='正在测试已保存的模型配置…';try{const result=await post('/api/config/test',{});box.textContent=result.message;toast(result.message);}catch(e){box.className='form-message error';box.textContent=e.message;}finally{el.disabled=false;}break;}
 }
}
document.addEventListener('click',async event=>{
 const el=event.target.closest('[data-action],[data-nav],[data-base],[data-doc],[data-question],[data-source],[data-conversation]');if(!el||el.disabled)return;
 try{if(el.dataset.action)await handleAction(el.dataset.action,el);else if(el.dataset.nav)navigate(el.dataset.nav);else if(el.dataset.base)navigate('base',el.dataset.base);else if(el.dataset.doc)await openDocument(el.dataset.doc);else if(el.dataset.question){if(S.busy){toast('请等待当前回答完成。');return;}if(S.conversation)newChat();S.chatBase='';navigate('chat');await sendQuestion(el.dataset.question);}else if(el.dataset.source){const s=S.sources[Number(el.dataset.source)];if(s)await openDocument(s.docId,s.page,s);}else if(el.dataset.conversation){if(S.busy){toast('请等待当前回答完成。');return;}S.conversation=await api('/api/conversations/'+el.dataset.conversation);S.chatBase=S.conversation.baseId;Modal.close();navigate('chat');render();}}catch(e){toast(e.message,true);}
});
document.addEventListener('submit',async event=>{
 const form=event.target;event.preventDefault();
 if(form.id==='global-search'){await search($('#search-input').value);return;}
 if(form.id==='ask-form'){S.useModel=$('#use-model').checked;await sendQuestion();return;}
 const submit=form.querySelector('[type=submit]');if(submit)submit.disabled=true;
 try{
  if(form.id==='base-form'){const f=new FormData(form);const b=await post('/api/bases',Object.fromEntries(f));Modal.close();await refresh(false);navigate('base',b.id);toast('知识库已创建，可以导入资料了。');}
  else if(form.id==='settings-form'){const f=new FormData(form);await post('/api/config',{baseUrl:f.get('baseUrl'),model:f.get('model'),apiKey:f.get('apiKey'),clearKey:f.has('clearKey'),topK:Number(f.get('topK')),chunkSize:Number(f.get('chunkSize')),overlap:Number(f.get('overlap'))});await refresh();toast('设置已保存。');}
 }catch(e){const box=$('#base-error')||$('#settings-message');if(box){box.className='form-message error';box.textContent=e.message;}else toast(e.message,true);}finally{if(submit)submit.disabled=false;}
});
document.addEventListener('change',async event=>{
 const el=event.target;
 try{switch(el.id){
  case 'doc-base-filter':S.docFilter=el.value;render();break;
  case 'format-filter':S.format=el.value;render();break;
  case 'chat-base':if(S.busy)return;S.chatBase=el.value;S.conversation=null;render();break;
  case 'use-model':S.useModel=el.checked;localStorage.setItem('zhiyu-model',String(el.checked));break;
  case 'file-input':await importFiles([...el.files]);break;
  case 'restore-input':{const file=el.files[0];if(!file)return;if(file.size>26*1024*1024)throw new Error('备份超过 26 MB');const backup=JSON.parse(await file.text());await post('/api/import',backup);S.conversation=null;S.chatBase='';S.baseId='';S.docFilter='';Modal.close();await refresh(false);navigate('home');toast('备份已恢复，原数据已自动备份。');el.value='';break;}
 }}catch(e){toast(e.message,true);el.value='';}
});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#search-input').focus();}if((event.ctrlKey||event.metaKey)&&event.key==='Enter'&&event.target.id==='question'){event.preventDefault();sendQuestion();}});
document.addEventListener('dragover',event=>{const drop=event.target.closest('#upload-zone,#page-drop');if(drop){event.preventDefault();drop.classList.add('dragover');}});
document.addEventListener('dragleave',event=>{const drop=event.target.closest('#upload-zone,#page-drop');if(drop)drop.classList.remove('dragover');});
document.addEventListener('drop',event=>{const drop=event.target.closest('#upload-zone,#page-drop');if(drop){event.preventDefault();drop.classList.remove('dragover');importFiles([...event.dataTransfer.files]).catch(e=>toast(e.message,true));}});
Modal.addEventListener('cancel',event=>{if(S.uploading){event.preventDefault();toast('文件正在入库，请稍等。');}});
Modal.addEventListener('click',event=>{if(event.target===Modal){const r=Modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeModal();}});
Viewer.addEventListener('click',event=>{if(event.target===Viewer){const r=Viewer.getBoundingClientRect();if(event.clientX<r.left)Viewer.close();}});
window.addEventListener('hashchange',handleHash);
document.documentElement.dataset.theme=localStorage.getItem('zhiyu-theme')||'light';decorate();
refresh(false).then(handleHash).catch(e=>{Content.innerHTML=`<div class="error-box">无法打开知识空间：${esc(e.message)}。请确认本地服务已经启动。</div>`;});
