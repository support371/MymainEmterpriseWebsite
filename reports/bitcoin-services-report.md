# Bitcoin Services Inventory

Generated on: 2026-02-12 01:39:47 UTC
Branch: bitcoin-banking-prod

## Summary
No standalone Bitcoin banking service/module exists in this repository at the current HEAD.

## Bitcoin-related application data found
1. `src/app/news/page.tsx`
   - Contains a static crypto news card titled: **"Bitcoin Holds at $88k: Market muted after CPI Data"**.
   - This appears in the general news feed content and is not a backend service.

## Related API surface reviewed
1. `src/app/api/newsletter/route.ts`
   - Only newsletter email subscription endpoint.
   - No Bitcoin wallet, transaction, custody, exchange, Lightning, or ledger functionality.

## Search evidence used
- Keywords: `bitcoin`, `btc`, `satoshi`, `wallet`, `lightning`, `onchain`, `supabase`, `signin`, `signup`
- Raw scan output: `reports/bitcoin-services-scan.txt`

