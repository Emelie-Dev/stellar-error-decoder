import type { ErrorDetails } from "../types.js";

export const sorobanErrors: Record<string, ErrorDetails> = {
  resource_limit_exceeded: {
    meaning: "The Soroban invocation exceeded a resource limit.",
    causes: ["The contract used more instructions, memory, or ledger resources than allowed."],
    fixes: [
      "Inspect simulation resource estimates, reduce contract work, or increase the declared resource budget within network limits.",
    ],
    docsUrl:
      "https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world",
  },
  insufficient_refundable_fee: {
    meaning:
      "The Soroban transaction did not provide enough refundable fee for its declared resources.",
    causes: ["The resource fee is below the amount required by current network pricing."],
    fixes: [
      "Simulate again and use the latest resource fee estimate when assembling the transaction.",
    ],
    docsUrl:
      "https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world",
  },
  contract_not_found: {
    meaning: "The requested Soroban contract was not found on the network.",
    causes: ["The contract ID is incorrect or the contract has not been deployed to this network."],
    fixes: ["Verify the network and contract ID, and deploy the contract if needed."],
  },
  simulation_failed: {
    meaning: "Soroban simulation could not successfully execute the requested invocation.",
    causes: ["The invocation arguments, contract state, or authorization are invalid."],
    fixes: [
      "Inspect the simulation diagnostics and contract event data, correct the invocation, and simulate again.",
    ],
  },
};
