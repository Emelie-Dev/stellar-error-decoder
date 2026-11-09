import { horizonOperationAliases, horizonOperationGenericErrors } from "./data/operation.js";
import { decodeCode } from "./decode.js";
import type { DecodedError } from "./types.js";

interface HorizonResultCodes {
  transaction?: unknown;
  operations?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function decodeHorizonError(body: unknown, operationTypes?: string[]): DecodedError[] {
  if (!isRecord(body) || !isRecord(body.extras) || !isRecord(body.extras.result_codes)) return [];
  const resultCodes = body.extras.result_codes as HorizonResultCodes;
  const decoded: DecodedError[] = [];

  if (typeof resultCodes.transaction === "string")
    decoded.push(decodeCode(resultCodes.transaction));
  if (Array.isArray(resultCodes.operations)) {
    for (const [index, code] of resultCodes.operations.entries()) {
      if (typeof code === "string") {
        decoded.push(decodeHorizonOperationCode(code, operationTypes?.[index]));
      }
    }
  }
  return decoded;
}

function decodeHorizonOperationCode(code: string, operationType?: string): DecodedError {
  const aliases = horizonOperationAliases[code];
  if (!aliases) return decodeCode(code);

  const normalizedType =
    operationType === undefined ? undefined : normalizeOperationType(operationType);
  const alias = normalizedType === undefined ? undefined : aliases[normalizedType];
  if (alias) return decodeCode(alias);

  const details = horizonOperationGenericErrors[code];
  if (details) return { code, category: "operation", ...details };
  return decodeCode(code);
}

function normalizeOperationType(operationType: string): string {
  return operationType
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
