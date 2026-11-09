import { operationErrors } from "./data/operation.js";
import { sorobanErrors } from "./data/soroban.js";
import { transactionErrors } from "./data/transaction.js";
import type { DecodedError } from "./types.js";

export function listCodes(category?: DecodedError["category"]): string[] {
  if (category === "transaction") return Object.keys(transactionErrors).sort();
  if (category === "operation") return Object.keys(operationErrors).sort();
  if (category === "soroban") return Object.keys(sorobanErrors).sort();
  if (category === "unknown") return [];
  return [
    ...Object.keys(transactionErrors),
    ...Object.keys(operationErrors),
    ...Object.keys(sorobanErrors),
  ].sort();
}
