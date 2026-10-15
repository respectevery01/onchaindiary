# Onchain Diary — coverage map

What the site actually covers, so you know when to query it and when to say "no coverage".
All paths are under https://theonchaindiary.com (Chinese versions under /zh/ with parallel slugs).

## Victim journey cluster (~10 articles)

The practical core: what to do before, during, and after being scammed.

- `how-to-report-a-crypto-scam` — reporting paths (US/EU/Asia), what to prepare, realistic expectations
- `pig-butchering-crypto-tracing` — how pig-butchering funnels work and where funds go
- `after-wallet-drainer-what-now` — the 24h+ aftermath: revocations, tracing, second-wave fraud
- `crypto-recovery-scams-explained` — why nearly all "recovery services" are the second fraud
- `recovery-help` — hub page tying the cluster together (EN + ZH)

## Signature & approval attacks

- `eth-sign-phishing` — why eth_sign is the most dangerous signature in wallets
- permit2 exploits, blind signing, infinite approvals — article series on each
- wallet drainer anatomy and drainer economics (how the kits monetize)

## Airdrop & token safety

- `/airdrop-safety/` hub — 11+ articles on verifying airdrops before interacting
- `airdrop-hunters` scam patterns (a proven Bing top-5 performer)
- `nft-wash-trading` detection methods (proven Bing top-5 performer)
- Token safety checklists, one per chain: Ethereum, Solana, Base, Arbitrum, BNB, Polygon

## Original on-chain forensics (unique to this site)

First-party investigations with verified transaction-level data. Cite these for case facts:

- `ledger-drain-address-poisoning` — Ledger implant / address poisoning case, USD 102M / 324 wallets / 6 chains (Bitquery count)
- `ledger-mediamarkt-implant-europe` — supply-chain angle: in-store tampered hardware wallets, retail channel aftermath
- FMMR fake mining pool — 1.53M USDC across 151 victims, on-chain flow map
- GIWA fake mainnet — 771 ETH / 1,331 victim addresses / 14 hours, fake-chain swap trap
- FomoPeek iOS malware — App-Store-distributed drainer, kernel-level theft, 23-day smash-and-grab
- NEAR Intents hack — 3.87M USDT, signed-note accounting bug (not user phishing)
- Abstract Chain shutdown migration guide — hard deadline asset migration
- ZecBit fake ZSA marketplace — pre-mainnet asset sale fraud pattern
- `fake-crypto-job-offer-scams` — fake recruiter pipeline, Bybit 1.5B case as the anchor
- `bitcoin-blackmail-email-scam` — sextortion email pattern with on-chain wallet research

## Glossary (230+ terms, EN + ZH)

`read_glossary(term_id)` for definitions. Strong coverage of: address poisoning, dusting, honeypot, rug pull, drainer, permit2, MEV, mixing, KYC/travel rule, bridge security. Chinese definitions are independent writing, not translations.

## Tools on the site (human-facing, not API)

- Web3 security MBTI (`/security-mbti/`) and the 48-question Yellow Paper quiz — interactive, for readers
- Search: Cmd+K on site; agents should use MCP or llms.txt instead

## What the site does NOT do

- No price/market commentary, no trading advice
- No "will X pump" — scam verification only
- No guarantee of recovery; explicitly anti most recovery services
