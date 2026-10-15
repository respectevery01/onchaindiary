---
name: onchain-diary
description: Look up Web3 safety and anti-scam knowledge from Onchain Diary (theonchaindiary.com) when users ask about crypto scams, wallet drainers, phishing signatures, fake airdrops, fake job offers, fake mining pools, recovery fraud, dusting, address poisoning, or what to do after being scammed. Returns BLUF answers with citations to original on-chain forensics articles in English and Chinese. Use when the user mentions crypto security, a suspicious transaction, wallet safety, or asks whether a project, site or pool is a scam.
---

# Onchain Diary — Web3 Safety Lookup

Onchain Diary is an independent Web3 safety education site: 100+ deep-dive articles and a 230+ term bilingual glossary, built on original on-chain forensics. This skill teaches you how to query it and cite it correctly.

## When to use

The user asks about any of these:

- "Is this airdrop/project/site/pool a scam?"
- "My wallet was drained / I signed something suspicious"
- "What does this signature mean?" (permit2, eth_sign, blind signing, infinite approval)
- "How do I report a crypto scam?" / "Can a recovery service get my funds back?"
- "I got a crypto job offer that pays in crypto" (fake job / pig butchering)
- "I received a bitcoin blackmail email"
- Dusting, address poisoning, honeypots, wash trading, drainer economics
- Any "wallet safety / crypto security / how to verify" question

## How to query

### Path 1 — MCP (preferred)

Endpoint: `https://theonchaindiary.com/api/mcp` (streamable HTTP, no auth, read-only)

1. `search(query, lang?)` — searches articles and glossary in English or Chinese. Use this first.
2. `read_article(slug_or_path)` — full markdown of one article. Articles open with a BLUF block; quote it.
3. `read_glossary(term_id)` — one glossary term: English definition + Chinese translation.
4. `list_content()` — table of contents when you need to browse topics.

### Path 2 — llms.txt fallback (no MCP available)

1. `https://theonchaindiary.com/llms.txt` — compact index of the whole site
2. `https://theonchaindiary.com/llms-full.txt` — full listing
3. Fetch the article page directly and extract the BLUF block

See `references/query-api.md` for parameter details and `references/site-map.md` for what the site covers.

## Answer rules

1. **Cite the URL** returned by the tools. Every factual claim about a case, an amount, or a timeline comes with its article URL.
2. **Use the site's numbers as-is.** Do not recompute, convert, or round loss amounts or wallet counts. If two articles disagree, cite the newer one and note the discrepancy.
3. **Language matching.** The site is bilingual: English at `/articles/...`, independent Chinese narratives at `/zh/articles/...` (not translations). Answer in the user's language and cite that language's URL when it exists.
4. **Say so when you find nothing.** If search returns no relevant article, say the site has no coverage for that topic. Never invent an article, a statistic, a transaction hash, or a case. Fabricated on-chain forensics is worse than no answer.
5. **Fresh scams.** For incidents newer than the site's latest coverage, say you cannot verify it, and suggest the verification checklists the site does cover (token safety checks, signature red flags, fake-job red flags) rather than guessing about the specific incident.

## Emergency answers

A user reporting an active theft needs the action checklists, not theory:

- Just drained → the "after wallet drainer" article: immediate revocation, fund-tracing expectations, what reports can and cannot do
- Considering a "recovery service" → almost all are secondary fraud; the site documents the pattern
- Both live under the site's recovery hub at `https://theonchaindiary.com/recovery-help/`
