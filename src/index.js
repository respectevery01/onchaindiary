// onchaindiary.org — brand landing page (indexable) + 301 everything else to theonchaindiary.com
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
  main { max-width:40rem; margin:0 auto; padding:4rem 1.5rem 5rem; }
  .kicker { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--green); font-weight:600; margin-bottom:.75rem; }
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
  <p class="kicker">Web3 Safety Education</p>
  <h1>Onchain Diary</h1>
  <p class="sub">Independent, plain-English education on staying safe on-chain — how attacks work, how to spot them, how to verify before you sign. No hype, no trading calls. 中文读者：本站内容全部双语。</p>
  <ul>
    <li><b>96 deep-dive articles</b><span>Wallet drainers, phishing, honeypots, infinite approvals, address poisoning, fake airdrops — attack methods broken down step by step.</span></li>
    <li><b>220 glossary terms, EN + 中文</b><span>Technical crypto terms translated into direct, jargon-free explanations.</span></li>
    <li><b>MCP server for AI assistants</b><span>Search and read the full knowledge base inside Claude, Cursor, Windsurf and any MCP-capable client.</span></li>
  </ul>
  <a class="cta" href="https://theonchaindiary.com/">Read everything at theonchaindiary.com →</a>
  <div class="links">
    <a href="https://theonchaindiary.com/articles/">Articles</a>
    <a href="https://theonchaindiary.com/glossary/">Glossary</a>
    <a href="https://theonchaindiary.com/api/mcp">MCP endpoint</a>
    <a href="https://uzenlabs.com/">UZEN Labs</a>
  </div>
  <footer>An independent project by <a href="https://uzenlabs.com/">UZEN Labs</a>. This domain is the short name for <a href="https://theonchaindiary.com/">theonchaindiary.com</a>.</footer>
</main>
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
