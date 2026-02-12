# Bitcoin Services Inventory

Generated on: 2026-02-12 UTC
Branch: work

## Summary
No standalone Bitcoin banking service/module exists in this repository at the current HEAD.

## Bitcoin-related application data found
1. `src/app/news/page.tsx`
   - Contains a static crypto news card titled: **"Bitcoin Holds at $88k: Market muted after CPI Data"**.
   - This appears in general news content, not as a standalone backend service.

## Related API surface reviewed
1. `src/app/api/newsletter/route.ts`
   - Newsletter signup endpoint only.
   - No Bitcoin wallet, transaction, custody, exchange, Lightning, or ledger APIs.

## Evidence
- Raw keyword scan output: `reports/bitcoin-services-scan.txt`
