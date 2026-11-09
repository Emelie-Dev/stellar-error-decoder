import { describe, expect, it } from "vitest";
import { decode, decodeCode } from "../src/decode.js";
import * as publicApi from "../src/index.js";
import { listCodes } from "../src/list-codes.js";

describe("decodeCode", () => {
  it("decodes transaction and operation codes", () => {
    expect(decodeCode("tx_bad_seq").category).toBe("transaction");
    expect(decodeCode("payment_underfunded").category).toBe("operation");
  });

  it("returns an actionable unknown result for unrecognized codes", () => {
    const result = decodeCode("tx_future_code");
    expect(result.category).toBe("unknown");
    expect(result.fixes.length).toBeGreaterThan(0);
  });

  it("trims recognized input and handles empty input", () => {
    expect(decodeCode(" tx_bad_seq ").code).toBe("tx_bad_seq");
    expect(decodeCode("").category).toBe("unknown");
  });
});

describe("decode routing", () => {
  it("routes code strings and Soroban messages", () => {
    expect(decode("payment_no_trust").code).toBe("payment_no_trust");
    expect(decode("HostError: resource limit exceeded").category).toBe("soroban");
    expect(decode("tx_future_code").category).toBe("unknown");
  });

  it("routes Error instances and Horizon bodies", () => {
    expect(decode(new Error("tx_bad_seq")).code).toBe("tx_bad_seq");
    expect(decode(new Error("unknown failure")).category).toBe("unknown");
    expect(decode({ extras: { result_codes: { transaction: "tx_bad_seq" } } }).code).toBe(
      "tx_bad_seq",
    );
  });

  it("handles unknown input without throwing", () => {
    expect(decode(null).category).toBe("unknown");
    expect(decode(42).category).toBe("unknown");
    expect(decode({ message: "not an Error instance" }).category).toBe("unknown");
  });
});

describe("listCodes", () => {
  it("lists sorted category codes and all codes", () => {
    expect(listCodes("transaction")[0]).toBe("tx_bad_auth");
    expect(listCodes("operation")).toContain("payment_underfunded");
    expect(listCodes("soroban")).toContain("simulation_failed");
    expect(listCodes("unknown")).toEqual([]);
    expect(listCodes().length).toBeGreaterThan(listCodes("transaction").length);
  });

  it("exports the documented API from the package entry point", () => {
    expect(publicApi.decodeCode("tx_bad_seq").code).toBe("tx_bad_seq");
    expect(publicApi.decodeHorizonError({})).toEqual([]);
    expect(publicApi.decodeSorobanError("unrecognized").category).toBe("unknown");
    expect(publicApi.listCodes("soroban")).toContain("simulation_failed");
  });
});
