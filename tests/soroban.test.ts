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

  it("returns unknown for unrecognized and empty messages", () => {
    expect(decodeSorobanError("unrecognized RPC response").category).toBe("unknown");
    expect(decodeSorobanError("").code).toBe("");
  });
});
