import { describe, expect, it } from "vitest";
import { horizonOperationAliases, operationErrors } from "../src/data/operation.js";
import { sorobanErrors } from "../src/data/soroban.js";
import { transactionErrors } from "../src/data/transaction.js";

describe("error data integrity", () => {
  it("provides a meaning, causes, and fixes for every data entry", () => {
    for (const [code, details] of Object.entries({
      ...transactionErrors,
      ...operationErrors,
      ...sorobanErrors,
    })) {
      expect(details.meaning.trim(), code).not.toBe("");
      expect(details.causes.length, code).toBeGreaterThan(0);
      expect(
        details.causes.every((cause) => cause.trim().length > 0),
        code,
      ).toBe(true);
      expect(details.fixes.length, code).toBeGreaterThan(0);
      expect(
        details.fixes.every((fix) => fix.trim().length > 0),
        code,
      ).toBe(true);
    }
  });

  it("contains the required transaction and operation families", () => {
    expect(Object.keys(transactionErrors)).toContain("tx_soroban_invalid");
    for (const code of [
      "payment_underfunded",
      "create_account_underfunded",
      "create_account_already_exist",
      "change_trust_no_issuer",
      "payment_src_no_trust",
      "change_trust_invalid_limit",
      "manage_sell_offer_underfunded",
      "manage_buy_offer_underfunded",
      "path_payment_strict_receive_offer_cross_self",
      "set_options_low_reserve",
      "account_merge_has_sub_entries",
      "allow_trust_no_trust_line",
      "set_trust_line_flags_no_trust_line",
      "op_bad_auth",
    ]) {
      expect(operationErrors).toHaveProperty(code);
    }
  });

  it("maps Horizon aliases only to existing operation entries", () => {
    for (const aliases of Object.values(horizonOperationAliases)) {
      for (const code of Object.values(aliases)) {
        expect(operationErrors).toHaveProperty(code);
      }
    }
  });
});
