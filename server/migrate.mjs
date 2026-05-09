import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { loadEnv } from "./env.mjs";

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, "schema.sql");
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is required in lineos/.env");
}

const pool = new pg.Pool({
	connectionString,
	ssl:
		process.env.DATABASE_SSL === "false"
			? false
			: {
					rejectUnauthorized:
						process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
			  },
});

const schema = await fs.readFile(schemaPath, "utf8");
await pool.query(schema);
await pool.end();

console.log("PostgreSQL schema is up to date.");
