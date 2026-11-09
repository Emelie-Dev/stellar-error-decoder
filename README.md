# stellar-error-decoder

[![CI](https://github.com/determined-001/stellar-error-decoder/actions/workflows/ci.yml/badge.svg)](https://github.com/determined-001/stellar-error-decoder/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/stellar-error-decoder.svg)](https://www.npmjs.com/package/stellar-error-decoder)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

`stellar-error-decoder` turns Stellar transaction and operation result codes, Horizon error responses, and common Soroban RPC messages into plain-English explanations with likely causes and practical fixes. It ships as a dependency-free TypeScript library with ESM, CommonJS, and declaration builds.

## Install

```sh
npm install stellar-error-decoder
```

Requires Node.js 18 or newer.

## Quick start

```ts
import { decode, decodeCode, decodeHorizonError } from "stellar-error-decoder";

const result = decodeCode("tx_bad_seq");
console.log(result.meaning);
console.log(result.fixes);

// decode() also accepts Error instances, Soroban messages, and Horizon bodies.
const decoded = decode(new Error("tx_insufficient_fee"));

const responseErrors = decodeHorizonError({
  extras: {
    result_codes: {
      transaction: "tx_failed",
      operations: ["payment_underfunded"],
    },
  },
});
```

## API

- `decode(input: unknown): DecodedError` routes a code string, Horizon response, `Error`, or Soroban message. Unknown values never throw.
- `decodeCode(code: string): DecodedError` looks up a transaction or operation code.
- `decodeHorizonError(body: unknown, operationTypes?: string[]): DecodedError[]` decodes `extras.result_codes.transaction` and each string in `extras.result_codes.operations`. Pass the failed transaction's operation types in the same order to disambiguate Horizon's shared `op_*` results; without them, recognized results get a generic operation explanation.
- `decodeSorobanError(message: string): DecodedError` matches common Soroban simulation and RPC error patterns.
- `listCodes(category?): string[]` returns sorted known codes; omit the category to list transaction, operation, and Soroban codes.

`DecodedError` contains `code`, `category` (`transaction`, `operation`, `soroban`, or `unknown`), one-sentence `meaning`, `causes`, `fixes`, and an optional `docsUrl`.

## CLI

```sh
npx stellar-error-decoder tx_bad_seq
npx stellar-error-decoder --json payment_underfunded
```

Example:

```text
tx_bad_seq (transaction)
The transaction sequence number does not match the account's expected sequence.
Common causes: Another transaction advanced the sequence number, or a stale sequence was used.
Fixes: Fetch the latest account sequence number, rebuild, and re-sign the transaction.
Docs: https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions
```

## Supported errors

| Category    | Included coverage                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| Transaction | Success/failure, time bounds, sequence, auth, balance, fees, sponsorship, malformed, and Soroban-invalid results         |
| Operation   | Payments, account creation, trustlines, sell/buy offers, path payments, account options, merges, and trust authorization |
| Soroban     | Basic resource-limit, refundable-fee, missing-contract, and simulation/host-error pattern matching                       |
| Horizon     | Transaction and operation codes in `extras.result_codes`                                                                 |

Use [`listCodes()`](./src/list-codes.ts) for the current machine-readable inventory.

## Roadmap

- Expand operation results and Soroban host-function error coverage.
- Add more Horizon response fixtures and parser edge cases.
- Explore localization-ready messages and generated reference documentation.

See the [contribution guide](./CONTRIBUTING.md) and [Drips Wave issue backlog](./docs/WAVE_ISSUES.md).

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, code conventions, tests, and the process for adding codes.

## License

MIT. See [LICENSE](./LICENSE).
