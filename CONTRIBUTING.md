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
2. Add the official code string and typed details in `src/data/transaction.ts` or `src/data/operation.ts`. Soroban message patterns belong in `src/data/soroban.ts` and `src/soroban.ts`.
3. Keep the meaning conservative and factual. Include at least one likely cause and actionable fix; use `// TODO: verify` when a meaning needs confirmation.
4. Add a test for lookup/routing and, for new data, ensure it satisfies the data-integrity test.
5. Update the supported-error description in `README.md` if coverage materially changes.
6. Run typecheck, tests, lint, and build before opening a PR.

Example entry:

```ts
payment_underfunded: {
  meaning: "The sending account does not have enough of the asset to make the payment.",
  causes: ["The source balance is lower than the requested payment amount."],
  fixes: ["Fund the source account with the asset or reduce the payment amount."],
  docsUrl: "https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions",
},
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
