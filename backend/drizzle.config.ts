import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema/*",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL_LOCAL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
