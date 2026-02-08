import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const client = createClient({ url: "file:./prisma/dev.db" });

const sql = readFileSync("./prisma/migrations/20260208192021_init/migration.sql", "utf-8");

// Remove comment lines, then split by semicolons
const cleaned = sql
  .split("\n")
  .filter((line) => !line.trimStart().startsWith("--"))
  .join("\n");

const statements = cleaned
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

async function main() {
  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log("OK:", stmt.substring(0, 60) + "...");
    } catch (e) {
      console.error("Error:", e.message, "\nSQL:", stmt.substring(0, 80));
    }
  }
  console.log("Done creating tables!");

  const tables = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );
  console.log(
    "Tables:",
    tables.rows.map((r) => r.name)
  );
}

main();
