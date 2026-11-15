import { describe, expect, it } from "vitest";
import { decodeSorobanError } from "../src/soroban.js";

describe("decodeSorobanError", () => {
  it.each([
    ["CPU resource limit exceeded", "resource_limit_exceeded"],
    ["insufficient refundable fee", "insufficient_refundable_fee"],
    ["Contract not found", "contract_not_found"],
    ["Simulation failed with HostError", "simulation_failed"],
  ])("recognizes %s", (message, code) => {
    expect(decodeSorobanError(message).code).toBe(code);
  });

  it("decodes structured JSON-RPC error objects", () => {
    expect(
      decodeSorobanError({
        jsonrpc: "2.0",
        id: 1,
        error: { code: -32603, message: "HostError: CPU resource limit exceeded" },
      }).code,
    ).toBe("resource_limit_exceeded");

    expect(
      decodeSorobanError({
        error: "Simulation failed: HostError",
      }).code,
    ).toBe("simulation_failed");

    expect(
      decodeSorobanError({
        message: "Contract not found on network",
      }).code,
    ).toBe("contract_not_found");
  });

  it("returns unknown for unrecognized, empty, or malformed inputs without throwing", () => {
    expect(decodeSorobanError("unrecognized RPC response").category).toBe("unknown");
    expect(decodeSorobanError("").code).toBe("");
    expect(
      decodeSorobanError({
        error: { code: -32000, message: "Custom unrecognized RPC failure" },
      }).category,
    ).toBe("unknown");
    expect(decodeSorobanError({ error: { message: 123 } }).code).toBe("unknown_soroban_error");
    expect(decodeSorobanError(null).code).toBe("unknown_soroban_error");
  });
});
