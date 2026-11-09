import { describe, expect, it } from "vitest";
import { decodeHorizonError } from "../src/horizon.js";

describe("decodeHorizonError", () => {
  it("decodes transaction and operation codes from a realistic Horizon response", () => {
    const body = {
      type: "https://stellar.org/horizon-errors/transaction_failed",
      title: "Transaction Failed",
      status: 400,
      detail: "The transaction failed when submitted to the stellar network.",
      extras: {
        envelope_xdr: "AAAA...",
        result_codes: {
          transaction: "tx_failed",
          operations: ["payment_underfunded", "payment_no_trust"],
        },
        result_xdr: "AAAA...",
      },
    };
    const results = decodeHorizonError(body);
    expect(results.map(({ code }) => code)).toEqual([
      "tx_failed",
      "payment_underfunded",
      "payment_no_trust",
    ]);
  });

  it("returns an unknown result for unknown result codes", () => {
    const result = decodeHorizonError({ extras: { result_codes: { transaction: "tx_future" } } });
    expect(result).toHaveLength(1);
    expect(result[0]?.category).toBe("unknown");
  });

  it.each([
    ["payment", "op_underfunded", "payment_underfunded"],
    ["change_trust", "op_low_reserve", "change_trust_low_reserve"],
    ["manage_sell_offer", "op_underfunded", "manage_sell_offer_underfunded"],
    ["create_account", "op_already_exists", "create_account_already_exist"],
  ])(
    "resolves %s failures from Horizon result codes",
    (operationType, horizonCode, expectedCode) => {
      const body = {
        type: "https://stellar.org/horizon-errors/transaction_failed",
        title: "Transaction Failed",
        status: 400,
        detail: "The transaction failed when submitted to the stellar network.",
        extras: {
          envelope_xdr: "AAAA...",
          result_codes: { transaction: "tx_failed", operations: [horizonCode] },
          result_xdr: "AAAA...",
        },
      };

      const [transactionResult, operationResult] = decodeHorizonError(body, [operationType]);
      expect(transactionResult?.code).toBe("tx_failed");
      expect(operationResult).toMatchObject({ code: expectedCode, category: "operation" });
    },
  );

  it("uses a generic actionable operation result when the operation type is unavailable", () => {
    const body = { extras: { result_codes: { operations: ["op_underfunded"] } } };
    expect(decodeHorizonError(body)[0]).toMatchObject({
      code: "op_underfunded",
      category: "operation",
      meaning: expect.stringContaining("operation"),
    });
  });

  it("uses generic details when the supplied operation type cannot disambiguate a shared code", () => {
    const body = { extras: { result_codes: { operations: ["op_low_reserve"] } } };
    const [result] = decodeHorizonError(body, ["payment"]);
    expect(result).toMatchObject({
      code: "op_low_reserve",
      category: "operation",
      fixes: [expect.stringContaining("operation type")],
    });
  });

  it("returns an empty list for invalid or partial bodies", () => {
    expect(decodeHorizonError(null)).toEqual([]);
    expect(decodeHorizonError("not a body")).toEqual([]);
    expect(decodeHorizonError({ extras: [] })).toEqual([]);
    expect(
      decodeHorizonError({
        extras: { result_codes: { operations: ["payment_underfunded", 4, null] } },
      }),
    ).toEqual([expect.objectContaining({ code: "payment_underfunded" })]);
  });
});
