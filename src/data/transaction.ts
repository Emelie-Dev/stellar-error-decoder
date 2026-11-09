import type { ErrorDetails } from "../types.js";

const docsUrl =
  "https://developers.stellar.org/docs/learn/fundamentals/transactions/operations-and-transactions";

export const transactionErrors: Record<string, ErrorDetails> = {
  tx_success: {
    meaning: "The transaction was applied successfully.",
    causes: ["The transaction passed validation and all operations succeeded."],
    fixes: ["No action is needed; verify the resulting ledger state."],
    docsUrl,
  },
  tx_failed: {
    meaning: "The transaction was accepted, but at least one operation failed.",
    causes: ["One or more operations returned a failure result."],
    fixes: ["Inspect each operation result and correct the failing operation before resubmitting."],
    docsUrl,
  },
  tx_too_early: {
    meaning: "The transaction was submitted before its minimum time bound.",
    causes: ["The transaction's minimum time is later than the current ledger close time."],
    fixes: ["Wait until the minimum time has passed or lower the minimum time bound."],
    docsUrl,
  },
  tx_too_late: {
    meaning: "The transaction's maximum time bound has expired.",
    causes: ["The transaction was not included before its timeout."],
    fixes: ["Build and sign a fresh transaction with a later maximum time."],
    docsUrl,
  },
  tx_missing_operation: {
    meaning: "The transaction contains no operations.",
    causes: ["An empty operation list was submitted."],
    fixes: ["Add at least one operation before building the transaction."],
    docsUrl,
  },
  tx_bad_seq: {
    meaning: "The transaction sequence number does not match the account's expected sequence.",
    causes: ["Another transaction advanced the sequence number, or a stale sequence was used."],
    fixes: ["Fetch the latest account sequence number, rebuild, and re-sign the transaction."],
    docsUrl,
  },
  tx_bad_auth: {
    meaning: "The transaction does not satisfy the account's authorization requirements.",
    causes: ["A required signer is missing or a signature is invalid."],
    fixes: [
      "Check signer weights and thresholds, and include valid signatures from the required signers.",
    ],
    docsUrl,
  },
  tx_insufficient_balance: {
    meaning: "The source account cannot cover the transaction's reserve requirements.",
    causes: ["The transaction would reduce the account below its minimum reserve."],
    fixes: ["Fund the account or remove reserve-consuming entries before submitting."],
    docsUrl,
  },
  tx_no_account: {
    meaning: "The transaction source account does not exist.",
    causes: ["The account has not been created or was merged away."],
    fixes: ["Create or select an existing account and use its current sequence number."],
    docsUrl,
  },
  tx_insufficient_fee: {
    meaning: "The offered transaction fee is below the network's current minimum.",
    causes: ["Network load raised the minimum inclusion fee above the offered fee."],
    fixes: ["Rebuild with an adequate fee based on current network fee statistics."],
    docsUrl,
  },
  tx_bad_auth_extra: {
    meaning: "The transaction includes an unnecessary or invalid extra signature.",
    causes: ["A signature is not required by the source account's current thresholds."],
    fixes: ["Rebuild the transaction with only the signatures required by the account thresholds."],
    docsUrl,
  },
  tx_internal_error: {
    meaning: "The Stellar network encountered an internal error while processing the transaction.",
    causes: ["A node or network processing failure occurred."],
    fixes: ["Retry the transaction later after checking its sequence number and time bounds."],
    docsUrl,
  },
  tx_not_supported: {
    meaning: "The transaction uses a feature that this network does not support.",
    causes: ["The transaction format or protocol feature is unavailable on the target network."],
    fixes: ["Check the target network's protocol version and use supported transaction features."],
    docsUrl,
  },
  tx_fee_bump_inner_success: {
    meaning: "The inner transaction of the fee-bump transaction succeeded.",
    causes: ["The fee-bump wrapper and inner transaction were accepted."],
    fixes: ["No action is needed; verify the operations' effects."],
    docsUrl,
  },
  tx_fee_bump_inner_failed: {
    meaning: "The inner transaction of the fee-bump transaction failed.",
    causes: ["An operation in the inner transaction failed."],
    fixes: [
      "Inspect the inner operation results, correct the failure, and submit a new fee-bump transaction.",
    ],
    docsUrl,
  },
  tx_bad_sponsorship: {
    meaning: "The transaction contains an invalid reserve-sponsorship sequence.",
    causes: ["A sponsorship begin/end pair is missing, mismatched, or otherwise invalid."],
    fixes: ["Review sponsorship operations and ensure each sponsored entry has a valid sponsor."],
    docsUrl,
  },
  tx_bad_min_seq_age_or_gap: {
    meaning: "The transaction violates the account's minimum sequence age or sequence gap.",
    causes: ["The sequence number is too recent or too far ahead for account constraints."],
    fixes: ["Wait for the minimum sequence age or satisfy the configured sequence-number gap."],
    docsUrl,
  },
  tx_malformed: {
    meaning: "The transaction envelope is malformed.",
    causes: ["A required transaction field is missing or invalid."],
    fixes: ["Rebuild the transaction using a Stellar SDK and validate its fields before signing."],
    docsUrl,
  },
  tx_soroban_invalid: {
    meaning: "The Soroban transaction is invalid for simulation or network execution.",
    causes: ["The transaction's Soroban resources, footprint, or invocation data are invalid."],
    fixes: [
      "Simulate again, use the returned footprint and resource estimates, then assemble and sign a fresh transaction.",
    ],
    docsUrl:
      "https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world",
  },
  tx_frozen_key_accessed: {
    meaning: "The transaction accesses a ledger entry that is frozen by network configuration.",
    causes: ["One of the operations reads or writes a ledger key frozen by the network."],
    fixes: [
      "Remove the operation that accesses the frozen entry or contact the network operator for guidance.",
    ],
    docsUrl,
  },
};
