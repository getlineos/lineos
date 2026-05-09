import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { loadEnv } from "./env.mjs";

loadEnv();

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is required in lineos/.env");
}

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
	ssl:
		process.env.DATABASE_SSL === "false"
			? false
			: {
					rejectUnauthorized:
						process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
			  },
});

export const prisma = new PrismaClient({ adapter });
