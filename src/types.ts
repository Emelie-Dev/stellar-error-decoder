export interface DecodedError {
  code: string;
  category: "transaction" | "operation" | "soroban" | "unknown";
  meaning: string;
  causes: string[];
  fixes: string[];
  docsUrl?: string;
}

export type ErrorDetails = Omit<DecodedError, "code" | "category">;
