# OnchainDiary

**Onchain Diary** — independent Web3 safety education: 97 deep-dive articles on wallet drainers, phishing, honeypots and smart-contract risks, plus a 220-term glossary in English and Chinese.

Website: **[theonchaindiary.com](https://theonchaindiary.com)**

## MCP Server

The full knowledge base is exposed through the Model Context Protocol — search and read it inside Claude, Cursor, Windsurf or any MCP-capable client.

- **Endpoint:** `https://theonchaindiary.com/api/mcp`
- **Transport:** Streamable HTTP
- **Auth:** none (read-only, public knowledge base)

### Tools

| Tool | What it does |
|---|---|
| `search` | Search articles and glossary terms (EN/ZH). Returns title, URL and description. Use this first. |
| `read_article` | Full markdown text of one article, by slug or site path. |
| `read_glossary` | One glossary term: English definition + Chinese translation. |
| `list_content` | Table of contents: all articles or all terms, grouped by language. |

### Claude Desktop

```json
{
  "mcpServers": {
    "onchain-diary": {
      "url": "https://theonchaindiary.com/api/mcp"
    }
  }
}
```

### Cursor / Windsurf

```json
{
  "mcpServers": {
    "onchain-diary": {
      "url": "https://theonchaindiary.com/api/mcp"
    }
  }
}
```

### Example questions

- "How does a wallet drainer actually steal funds?" — `search("wallet drainer")`, then `read_article("wallet-drainer-anatomy")`
- "什么是地址投毒？" — `search("地址投毒", lang="zh")`, then `read_glossary("address-poisoning")`

Always cite the URL fields returned by the tools.

## About

Independent project by [Jask](https://jask.dev), supported by [UZEN Labs](https://uzenlabs.com).
Chinese blockchain education publication: [Jask's OnchainDiary on Substack](https://onchaindiary.substack.com). Listed on [mcpservers.org](https://mcpservers.org/servers/theonchaindiary-com-mcp) and [glama.ai](https://glama.ai/mcp/connectors/com.theonchaindiary/onchain-diary-mcp-server).
