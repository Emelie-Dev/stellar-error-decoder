import { describe, expect, it } from "vitest";
import { formatOutput } from "../bin/cli.js";

describe("CLI output", () => {
  it("prints a readable result by default", () => {
    const result = formatOutput(["tx_bad_seq"]);
    expect(result).toContain("tx_bad_seq (transaction)");
    expect(result).toContain("Fixes:");
  });

  it("prints machine-readable JSON when requested", () => {
    const result = JSON.parse(formatOutput(["--json", "payment_underfunded"])) as {
      category: string;
    };
    expect(result.category).toBe("operation");
  });

  it("uses a safe unknown result when no code is supplied", () => {
    expect(formatOutput([])).toContain("(unknown)");
  });
});
