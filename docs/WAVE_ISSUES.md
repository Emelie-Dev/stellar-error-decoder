# Drips Wave issue backlog

Each issue below is scoped to be independent and testable without maintainer input. File names refer to repository-relative paths.

## Trivial (6)

### 1. Add the remaining create-account operation result codes

**Description:** Extend `operationErrors` with verified create-account results currently missing from the catalog. Keep explanations conservative and use official Stellar documentation.

**Acceptance criteria**

- [ ] Add verified official code names and meaning/cause/fix details.
- [ ] Data-integrity test passes and each new code has a lookup test.
- [ ] Update README coverage notes if needed.

**Suggested complexity:** trivial  
**Files likely touched:** `src/data/operation.ts`, `tests/data-integrity.test.ts`, `tests/decode.test.ts`, `README.md`

### 2. Add remaining change-trust operation result codes

**Description:** Fill gaps in the change-trust result-code family using the official Stellar result definitions.

**Acceptance criteria**

- [ ] Add only verified result code names.
- [ ] Include at least one cause and fix per code.
- [ ] Add code lookup assertions.

**Suggested complexity:** trivial  
**Files likely touched:** `src/data/operation.ts`, `tests/data-integrity.test.ts`, `tests/decode.test.ts`

### 3. Clarify README coverage boundaries

**Description:** Explain which operation families are covered and note that Soroban host error recognition is best-effort pattern matching.

**Acceptance criteria**

- [ ] README clearly distinguishes exact code lookup from pattern matching.
- [ ] Documentation does not promise complete coverage.
- [ ] No source changes are necessary.

**Suggested complexity:** trivial  
**Files likely touched:** `README.md`

### 4. Fix and standardize code-entry documentation

**Description:** Review the add-an-error-code guide for consistency with the typed data files and test conventions.

**Acceptance criteria**

- [ ] The guide names all relevant data files and test commands.
- [ ] Example entry is valid TypeScript and follows repository formatting.
- [ ] No behavior changes are made.

**Suggested complexity:** trivial  
**Files likely touched:** `CONTRIBUTING.md`

### 5. Add a Horizon transaction-failure example

**Description:** Add a realistic Horizon response example to the README and show how to render its decoded transaction and operation results.

**Acceptance criteria**

- [ ] Example contains transaction and operation result codes.
- [ ] Example can be copied into a TypeScript consumer project.
- [ ] README makes clear that a failed transaction can still have multiple operation results.

**Suggested complexity:** trivial  
**Files likely touched:** `README.md`

### 6. Add a library usage example for `listCodes`

**Description:** Document filtering and sorting behavior of `listCodes` with a minimal code snippet.

**Acceptance criteria**

- [ ] Example covers a category and the no-argument call.
- [ ] The documented category names match the public type.
- [ ] Existing README API reference remains accurate.

**Suggested complexity:** trivial  
**Files likely touched:** `README.md`

## Medium (8)

### 7. Handle Horizon bodies with non-string result-code values

**Description:** Expand Horizon parser tests for null, numeric, and malformed operation-code entries and document the chosen skip behavior.

**Acceptance criteria**

- [ ] Invalid individual values do not throw.
- [ ] Valid sibling codes remain decoded in input order.
- [ ] Tests cover absent, null, and mixed-value operation arrays.

**Suggested complexity:** medium  
**Files likely touched:** `src/horizon.ts`, `tests/horizon.test.ts`

### 8. Support Horizon error bodies with nested response wrappers

**Description:** Add an explicit opt-in or documented path for callers whose Horizon payload is nested under a `response` or `data` property.

**Acceptance criteria**

- [ ] Define deterministic handling for top-level versus nested result bodies.
- [ ] Do not change current behavior for standard Horizon bodies.
- [ ] Add tests for wrapper and malformed-wrapper cases.

**Suggested complexity:** medium  
**Files likely touched:** `src/horizon.ts`, `tests/horizon.test.ts`, `README.md`

### 9. Recognize additional Soroban resource-exhaustion phrases

**Description:** Add conservative patterns for common RPC wording related to ledger footprint, instruction budget, and memory exhaustion.

**Acceptance criteria**

- [ ] Each new regex is covered by positive and negative tests.
- [ ] Unmatched messages still return category `unknown`.
- [ ] Pattern ordering does not shadow existing matches.

**Suggested complexity:** medium  
**Files likely touched:** `src/soroban.ts`, `tests/soroban.test.ts`

### 10. Add CLI `--short` output

**Description:** Implement a concise CLI format that prints only the code, category, and meaning.

**Acceptance criteria**

- [ ] `--short` outputs one readable line.
- [ ] Default and `--json` outputs remain unchanged.
- [ ] Add tests for recognized, unknown, and combined flag behavior.

**Suggested complexity:** medium  
**Files likely touched:** `bin/cli.ts`, `tests/cli.test.ts`, `README.md`

### 11. Add a CLI `--help` and `--version` option

**Description:** Implement predictable help and version output with appropriate behavior for invalid options.

**Acceptance criteria**

- [ ] `--help` documents usage and supported flags.
- [ ] `--version` reports the package version without hard-coded duplication.
- [ ] Tests cover both flags and normal code decoding.

**Suggested complexity:** medium  
**Files likely touched:** `bin/cli.ts`, `package.json`, `tests/cli.test.ts`

### 12. Add conservative fuzzy suggestions for unknown codes

**Description:** Offer likely code-name suggestions for misspelled inputs without silently replacing or misclassifying the supplied code.

**Acceptance criteria**

- [ ] Exact code results are unchanged.
- [ ] Suggestions are bounded and deterministic.
- [ ] Unknown result includes suggestions only when similarity exceeds a documented threshold.
- [ ] Tests cover close misspellings and unrelated strings.

**Suggested complexity:** medium  
**Files likely touched:** `src/decode.ts`, `src/types.ts`, `tests/decode.test.ts`, `README.md`

### 13. Build reusable Horizon response fixtures

**Description:** Create typed test fixtures for common Horizon transaction-failure payloads, including absent and partial result-code fields.

**Acceptance criteria**

- [ ] Fixtures are shared by at least two focused parser tests.
- [ ] Include success-shaped, malformed, and operation-failure examples.
- [ ] Fixture types do not weaken library types.

**Suggested complexity:** medium  
**Files likely touched:** `tests/fixtures/horizon.ts`, `tests/horizon.test.ts`

### 14. Add additional operation result-code test matrix

**Description:** Generate parameterized lookup tests across every currently supported operation family, including representative unknown codes.

**Acceptance criteria**

- [ ] Each supported family has at least one success-shaped lookup assertion.
- [ ] Test confirms category and non-empty user-facing details.
- [ ] Unknown operation codes still return category `unknown`.

**Suggested complexity:** medium  
**Files likely touched:** `tests/decode.test.ts`, `tests/data-integrity.test.ts`

## High (4)

### 15. Create a GitHub Action wrapper

**Description:** Add a composite GitHub Action that accepts an error code or JSON Horizon body and publishes a decoded summary to the workflow log and step output.

**Acceptance criteria**

- [ ] Action input validation and output names are documented.
- [ ] Action uses a pinned or released package version and does not require repository secrets.
- [ ] Add a workflow fixture or automated test for code and JSON inputs.

**Suggested complexity:** high  
**Files likely touched:** `action.yml`, `bin/cli.ts`, `README.md`, `.github/workflows/action-test.yml`

### 16. Generate reference documentation from error data

**Description:** Add a deterministic script that renders category tables and individual code descriptions from the typed data records.

**Acceptance criteria**

- [ ] Generated output includes meaning, causes, fixes, and docs URL when present.
- [ ] A check mode detects stale generated documentation.
- [ ] CI verifies generated docs are current.

**Suggested complexity:** high  
**Files likely touched:** `scripts/generate-docs.ts`, `src/data/`, `docs/`, `package.json`, `.github/workflows/ci.yml`

### 17. Make user-facing messages i18n-ready

**Description:** Separate stable identifiers and message content so translations can be added without changing code lookup semantics.

**Acceptance criteria**

- [ ] Define a typed message structure with stable message keys.
- [ ] Preserve the current English API output by default.
- [ ] Add tests proving code/category identity does not depend on locale.
- [ ] Document how future locale packs can be added.

**Suggested complexity:** high  
**Files likely touched:** `src/types.ts`, `src/data/`, `src/decode.ts`, `src/index.ts`, `tests/`, `README.md`

### 18. Generate VS Code hover snippets from the error catalog

**Description:** Build a generator that emits VS Code-compatible snippets for supported codes, with short meanings and optional remediation text.

**Acceptance criteria**

- [ ] Generated snippets have stable prefixes and valid JSON.
- [ ] Generator output is deterministic and has a check mode.
- [ ] Tests cover escaping and representative transaction, operation, and Soroban entries.
- [ ] Document installation and regeneration steps.

**Suggested complexity:** high  
**Files likely touched:** `scripts/generate-snippets.ts`, `src/data/`, `snippets/stellar-errors.code-snippets`, `tests/`, `README.md`
