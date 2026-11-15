# Contributing

Thanks for helping make Stellar errors easier to understand. This project participates in Drips Wave; PRs are reviewed against the acceptance criteria of the issue they address.

## Local setup

1. Install Node.js 18+ and npm.
2. Clone the repository and run `npm install`.
3. Run `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build`.

## Scripts

- `npm run build` builds ESM, CommonJS, and declarations into `dist/`.
- `npm run dev` watches and rebuilds.
- `npm test` runs Vitest.
- `npm run test:coverage` runs tests with enforced coverage thresholds.
- `npm run lint` runs ESLint.
- `npm run format` formats the repository with Prettier.
- `npm run typecheck` checks the TypeScript project.

## Add an error code

1. Claim an open issue and confirm its acceptance criteria are met by your change.
2. Verify every result-code identifier and meaning against official Stellar documentation before adding it:
   - [Transactions and Operations Reference](https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions)
   - [List of Operations and Result Codes](https://developers.stellar.org/docs/learn/fundamentals/transactions/list-of-operations)
   - [Horizon Status Codes & Error Responses](https://developers.stellar.org/docs/data/apis/horizon/api-reference/errors)
3. Add the official code string and typed details in the appropriate catalog file:
   - **Transaction result codes (`tx_*`):** `src/data/transaction.ts` (tested in `tests/decode.test.ts` and `tests/data-integrity.test.ts`).
   - **Canonical operation result codes (`payment_*`, `create_account_*`, `change_trust_*`, etc.):** `src/data/operation.ts` in `operationErrors` (tested in `tests/decode.test.ts` and `tests/data-integrity.test.ts`).
   - **Horizon operation aliases (`op_underfunded`, `op_no_trust`, `op_low_reserve`, etc.):** `src/data/operation.ts` in `horizonOperationAliases` (mapping a shared Horizon `op_*` code and normalized operation type to a canonical key in `operationErrors`) and `horizonOperationGenericErrors` for fallback explanations when no operation type is provided. Always add parser/disambiguation tests in `tests/horizon.test.ts` separately from canonical `decodeCode()` lookup tests.
   - **Soroban RPC / simulation message patterns:** `src/data/soroban.ts` and `src/soroban.ts` (tested in `tests/soroban.test.ts`).
4. Keep the meaning conservative and factual. Include at least one likely cause and actionable fix; use `// TODO: verify` when a meaning needs confirmation.
5. Add a test for lookup/routing and, for new data, ensure it satisfies the data-integrity test in `tests/data-integrity.test.ts`.
6. Update the supported-error description in `README.md` if coverage materially changes.
7. Run typecheck, tests, lint, and build before opening a PR.

Example canonical operation entry in `src/data/operation.ts`:

```ts
payment_underfunded: {
  meaning: "The sending account does not have enough of the asset to make the payment.",
  causes: ["The source balance is lower than the requested payment amount."],
  fixes: ["Fund the source account with the asset or reduce the payment amount."],
  docsUrl: "https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions",
},
```

Example Horizon alias mapping in `src/data/operation.ts`:

```ts
export const horizonOperationAliases: Record<string, Record<string, string>> = {
  op_underfunded: {
    payment: "payment_underfunded",
    create_account: "create_account_underfunded",
  },
};
```

## Branches and commits

Use short descriptive branches such as `feat/path-payment-codes` or `fix/horizon-empty-results`. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), for example `feat: add path payment result codes` or `docs: clarify CLI usage`.

## Claiming issues and response time

Comment on an issue to claim it and include a brief proposed approach. Maintainers aim to acknowledge issue claims and PRs within five business days; this is a target, not a guarantee. Work on an issue with clear acceptance criteria so it can proceed independently.

## Pull request checklist

- [ ] Tests added or updated for the behavior.
- [ ] `npm run lint`, `npm run typecheck`, and `npm test` pass.
- [ ] `npm run build` succeeds.
- [ ] Documentation is updated where needed.
- [ ] The PR addresses the issue acceptance criteria and introduces no unrelated changes.
