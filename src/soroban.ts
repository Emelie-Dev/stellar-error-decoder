import { sorobanErrors } from "./data/soroban.js";
import type { DecodedError } from "./types.js";

const patterns: Array<{ test: RegExp; key: keyof typeof sorobanErrors }> = [
  {
    test: /resource.?limit|cpu.?limit|memory.?limit|instructions?.*exceed/i,
    key: "resource_limit_exceeded",
  },
  {
    test: /insufficient.*refundable.*fee|resource fee.*insufficient/i,
    key: "insufficient_refundable_fee",
  },
  { test: /contract.*not found|unknown contract/i, key: "contract_not_found" },
  { test: /simulation.*(fail|error)|hosterror|host error/i, key: "simulation_failed" },
];

export function decodeSorobanError(message: string): DecodedError {
  if (typeof message !== "string" || message.trim() === "") {
    return unknownSoroban(message);
  }
  const match = patterns.find(({ test }) => test.test(message));
  if (!match) return unknownSoroban(message);

  const details = sorobanErrors[match.key];
  if (!details) return unknownSoroban(message);
  return { code: match.key, category: "soroban", ...details };
}

function unknownSoroban(message: unknown): DecodedError {
  return {
    code: typeof message === "string" ? message : "unknown_soroban_error",
    category: "unknown",
    meaning: "This error message is not recognized by the decoder.",
    causes: ["The message may come from a newer protocol version or a contract-specific error."],
    fixes: [
      "Check the full RPC response and contract documentation, then share the message to improve decoder coverage.",
    ],
  };
}
