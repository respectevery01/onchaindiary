// onchaindiary.org — brand landing page (indexable, EN default + client-side ZH toggle) + 301 everything else to theonchaindiary.com
const SITE = "https://theonchaindiary.com";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Onchain Diary — Web3 Safety Education</title>
<meta name="description" content="Onchain Diary is an independent Web3 safety education site: 96 deep-dive articles on wallet drainers, phishing and smart-contract risks, plus a 220-term glossary in English and Chinese. Full site: theonchaindiary.com">
<link rel="canonical" href="https://onchaindiary.org/">
<meta property="og:title" content="Onchain Diary — Web3 Safety Education">
<meta property="og:description" content="Independent Web3 safety education. 96 articles, 220 glossary terms, EN & ZH. Full site at theonchaindiary.com">
<meta property="og:url" content="https://onchaindiary.org/">
<meta property="og:type" content="website">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"Onchain Diary","alternateName":"链上日记","url":"https://onchaindiary.org/","description":"Independent Web3 safety education — attack-method deep dives and a bilingual glossary.","publisher":{"@type":"Organization","name":"UZEN Labs","url":"https://uzenlabs.com"},"sameAs":["https://theonchaindiary.com/","https://uzenlabs.com/","https://github.com/respectevery01"]}
</script>
<style>
  :root { --ink:#1c1917; --paper:#faf7f0; --green:#0B7B5E; --line:#e7e0d5; --muted:#6b6257; }
  * { box-sizing:border-box; margin:0; }
  body { font-family:-apple-system,"Segoe UI",Roboto,"Helvetica Neue","PingFang SC","Noto Sans CJK SC",sans-serif; background:var(--paper); color:var(--ink); line-height:1.6; }
  main { max-width:40rem; margin:0 auto; padding:3.5rem 1.5rem 5rem; }
  .top { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:.9rem; }
  .kicker { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--green); font-weight:600; }
  html[lang="zh-CN"] .kicker { letter-spacing:.3em; }
  .lang-btn { font:inherit; font-size:.8rem; font-weight:600; color:var(--green); background:#fff; border:1px solid var(--line); border-radius:2rem; padding:.3rem 1rem; cursor:pointer; }
  .lang-btn:hover { border-color:var(--green); }
  h1 { font-size:2.4rem; letter-spacing:-.02em; line-height:1.15; }
  .sub { color:var(--muted); margin:1rem 0 2.25rem; font-size:1.05rem; max-width:32rem; }
  ul { list-style:none; padding:0; display:grid; gap:.9rem; margin:0 0 2.5rem; }
  li { padding:1rem 1.25rem; border:1px solid var(--line); border-radius:.8rem; background:#fff; }
  li b { display:block; margin-bottom:.15rem; }
  li span { color:var(--muted); font-size:.92rem; }
  .cta { display:inline-block; background:var(--green); color:#fff; padding:.8rem 1.6rem; border-radius:.7rem; text-decoration:none; font-weight:600; }
  .links { margin-top:2.25rem; display:flex; flex-wrap:wrap; gap:1.25rem; font-size:.92rem; }
  .links a { color:var(--green); text-decoration:underline; text-underline-offset:3px; }
  footer { margin-top:3.5rem; padding-top:1.25rem; border-top:1px solid var(--line); color:var(--muted); font-size:.85rem; }
  footer a { color:var(--muted); }
</style>
</head>
<body>
<main>
  <div class="top">
    <p class="kicker" data-en="Web3 Safety Education" data-zh="链上安全教育">Web3 Safety Education</p>
    <button class="lang-btn" id="lang" type="button" aria-label="切换语言">中文</button>
  </div>
  <h1>Onchain Diary</h1>
  <p class="sub" data-en="Independent, plain-English education on staying safe on-chain — how attacks work, how to spot them, how to verify before you sign. No hype, no trading calls." data-zh="独立的链上安全教育——攻击怎么运作、怎么识别、签名之前怎么核实。不喊单，不带交易节奏。">Independent, plain-English education on staying safe on-chain — how attacks work, how to spot them, how to verify before you sign. No hype, no trading calls.</p>
  <ul>
    <li>
      <b data-en="96 deep-dive articles" data-zh="96 篇深度文章">96 deep-dive articles</b>
      <span data-en="Wallet drainers, phishing, honeypots, infinite approvals, address poisoning, fake airdrops — attack methods broken down step by step." data-zh="钱包吸血鬼、钓鱼、蜜罐、无限授权、地址投毒、假空投——常见攻击手法逐步拆解。">Wallet drainers, phishing, honeypots, infinite approvals, address poisoning, fake airdrops — attack methods broken down step by step.</span>
    </li>
    <li>
      <b data-en="220 glossary terms, EN + 中文" data-zh="220 个词条，中英双语">220 glossary terms, EN + 中文</b>
      <span data-en="Technical crypto terms translated into direct, jargon-free explanations." data-zh="把加密术语翻译成人话，不绕弯。">Technical crypto terms translated into direct, jargon-free explanations.</span>
    </li>
    <li>
      <b data-en="MCP server for AI assistants" data-zh="AI 助手可用的 MCP 服务器">MCP server for AI assistants</b>
      <span data-en="Search and read the full knowledge base inside Claude, Cursor, Windsurf and any MCP-capable client." data-zh="在 Claude、Cursor、Windsurf 等支持 MCP 的客户端里直接检索和阅读整个知识库。">Search and read the full knowledge base inside Claude, Cursor, Windsurf and any MCP-capable client.</span>
    </li>
  </ul>
  <a class="cta" href="https://theonchaindiary.com/"><span data-en="Read everything at theonchaindiary.com →" data-zh="阅读全部内容，访问 theonchaindiary.com →">Read everything at theonchaindiary.com →</span></a>
  <div class="links">
    <a href="https://theonchaindiary.com/articles/" data-en="Articles" data-zh="文章">Articles</a>
    <a href="https://theonchaindiary.com/glossary/" data-en="Glossary" data-zh="词条">Glossary</a>
    <a href="https://theonchaindiary.com/api/mcp" data-en="MCP endpoint" data-zh="MCP 端点">MCP endpoint</a>
    <a href="https://uzenlabs.com/">UZEN Labs</a>
  </div>
  <footer data-en='An independent project by <a href="https://uzenlabs.com/">UZEN Labs</a>. This domain is the short name for <a href="https://theonchaindiary.com/">theonchaindiary.com</a>.' data-zh='<a href="https://uzenlabs.com/">UZEN Labs</a> 出品的独立项目。本域名是 <a href="https://theonchaindiary.com/">theonchaindiary.com</a> 的短域名入口。'>An independent project by <a href="https://uzenlabs.com/">UZEN Labs</a>. This domain is the short name for <a href="https://theonchaindiary.com/">theonchaindiary.com</a>.</footer>
</main>
<script>
(function(){
  var KEY = "od_lang";
  var btn = document.getElementById("lang");
  function apply(lang){
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.querySelectorAll("[data-en]").forEach(function(el){
      var v = el.getAttribute("data-" + lang);
      if (v === null) return;
      if (el.tagName === "A" || el.innerHTML.indexOf("<") !== -1) { el.innerHTML = v; }
      else { el.textContent = v; }
    });
    btn.textContent = lang === "zh" ? "EN" : "中文";
  }
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "zh" || saved === "en") apply(saved);
  } catch(e){}
  btn.addEventListener("click", function(){
    var next = document.documentElement.getAttribute("lang") === "zh-CN" ? "en" : "zh";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch(e){}
  });
})();
</script>
</body>
</html>`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: https://onchaindiary.org/sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://onchaindiary.org/</loc><changefreq>monthly</changefreq></url></urlset>\n`;
// IndexNow key (shared with theonchaindiary.com)
const INDEXNOW_KEY = "411f3942-0835-4381-af82-f695d2c8d12a";

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === "/" || pathname === "/index.html") {
      return new Response(html, { headers: { "content-type": "text/html;charset=utf-8", "cache-control": "public, max-age=3600" } });
    }
    if (pathname === "/robots.txt") return new Response(robots, { headers: { "content-type": "text/plain" } });
    if (pathname === "/sitemap.xml") return new Response(sitemap, { headers: { "content-type": "application/xml" } });
    if (pathname === "/" + INDEXNOW_KEY + ".txt") return new Response(INDEXNOW_KEY, { headers: { "content-type": "text/plain" } });
    // everything else: 301 to the main site, path preserved
    return Response.redirect(SITE + pathname + (new URL(request.url).search || ""), 301);
  },
};
