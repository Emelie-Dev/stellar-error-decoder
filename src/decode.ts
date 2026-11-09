import { operationErrors } from "./data/operation.js";
import { transactionErrors } from "./data/transaction.js";
import { decodeHorizonError } from "./horizon.js";
import { decodeSorobanError } from "./soroban.js";
import type { DecodedError, ErrorDetails } from "./types.js";

const docsUrl = "https://developers.stellar.org/docs";

function unknown(code: string): DecodedError {
  return {
    code,
    category: "unknown",
    meaning: "This Stellar error code is not recognized by the decoder.",
    causes: ["The code may be new, misspelled, or specific to an extension or contract."],
    fixes: [
      "Verify the exact code and consult the Stellar documentation; consider adding this code to the decoder.",
    ],
    docsUrl,
  };
}

function makeError(
  code: string,
  category: "transaction" | "operation",
  details: ErrorDetails,
): DecodedError {
  return { code, category, ...details };
}

export function decodeCode(code: string): DecodedError {
  if (typeof code !== "string" || code.trim() === "") return unknown(String(code ?? "unknown"));
  const normalized = code.trim();
  const transaction = transactionErrors[normalized];
  if (transaction) return makeError(normalized, "transaction", transaction);
  const operation = operationErrors[normalized];
  if (operation) return makeError(normalized, "operation", operation);
  return unknown(normalized);
}

export function decode(input: unknown): DecodedError {
  if (typeof input === "string") {
    const direct = decodeCode(input);
    if (direct.category !== "unknown") return direct;
    if (
      /^(tx|op|payment|create_account|change_trust|manage_.*|path_payment|set_options|account_merge|allow_trust|set_trust_line_flags)_/i.test(
        input.trim(),
      )
    ) {
      return direct;
    }
    return decodeSorobanError(input);
  }

  if (input instanceof Error) {
    const direct = decodeCode(input.message);
    return direct.category === "unknown" ? decodeSorobanError(input.message) : direct;
  }

  const horizon = decodeHorizonError(input);
  if (horizon.length > 0) return horizon[0]!;
  return unknown("unknown");
}
