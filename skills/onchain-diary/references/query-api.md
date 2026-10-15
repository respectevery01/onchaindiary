# Query API details

## MCP endpoint

`https://theonchaindiary.com/api/mcp`
- Transport: streamable HTTP (JSON-RPC 2.0 over POST)
- Auth: none. Read-only public knowledge base.
- Protocol: Model Context Protocol (initialize, then tools/call)

### Tools

| Tool | Parameters | Notes |
|---|---|---|
| `search` | `query` (string), `lang` ("en"/"zh", optional) | Full-text search across articles + glossary. Returns title, URL, description. Always start here. |
| `read_article` | slug (e.g. `ledger-drain-address-poisoning`) or site path | Returns full markdown. Articles open with a BLUF block. |
| `read_glossary` | term id (e.g. `address-poisoning`) | EN definition + ZH translation. |
| `list_content` | optional `type` ("articles"/"glossary"), `lang` | Table of contents. |

### Minimal JSON-RPC example

Send to the endpoint as a POST body:

    {"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"query":"address poisoning"}}}

## HTTP fallbacks (no MCP client required)

1. `https://theonchaindiary.com/llms.txt` — compact index: sections by topic, one URL per line
2. `https://theonchaindiary.com/llms-full.txt` — full index of every article and term
3. Article pages are static HTML; the BLUF block is the first element after the H1, inside a styled blockquote

## Language handling

- English content: `/articles/<slug>/`, `/glossary/<id>/`
- Chinese content: `/zh/articles/<slug>/`, `/zh/glossary/<id>/` — independent narratives, Chinese search-native phrasing
- Search with Chinese queries works: `search` with query in Chinese and lang "zh"
