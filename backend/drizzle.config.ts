import { env } from "bun";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema/*",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url:
      process.env.NODE_ENV! === "development"
        ? process.env.DATABASE_URL_LOCAL!
        : process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
