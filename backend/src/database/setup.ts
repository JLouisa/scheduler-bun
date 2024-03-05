import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";

let client;

if (process.env.NODE_ENV == "development") {
  // This is the development database
  client = createClient({
    url: process.env.DATABASE_URL_LOCAL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
} else {
  // This is the production database
  client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
}
export const db = drizzle(client);
