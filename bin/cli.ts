#!/usr/bin/env node
import { decode } from "../src/decode.js";

export function formatOutput(args: string[]): string {
  const json = args.includes("--json");
  const code = args.find((arg) => !arg.startsWith("--")) ?? "";
  const decoded = decode(code);

  if (json) return JSON.stringify(decoded, null, 2);
  return [
    `${decoded.code} (${decoded.category})`,
    decoded.meaning,
    `Common causes: ${decoded.causes.join("; ")}`,
    `Fixes: ${decoded.fixes.join("; ")}`,
    ...(decoded.docsUrl ? [`Docs: ${decoded.docsUrl}`] : []),
  ].join("\n");
}

if (process.argv[1]?.replaceAll("\\", "/").endsWith("/cli.js")) {
  console.log(formatOutput(process.argv.slice(2)));
}
