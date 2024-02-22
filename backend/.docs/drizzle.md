## Turso Local Database

drizzle.config.ts

```javascript
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
```

turso dev --db-file dev.db

### Database migration

npm exec drizzle-kit generate:sqlite --out migrations --schema database/schema.ts
bunx drizzle-kit push:sqlite
bunx drizzle-kit studio
