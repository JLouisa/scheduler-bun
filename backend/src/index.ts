// Server and middleware setup
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { env } from "bun";
import { logger } from "@grotto/logysia";
import { cors } from "@elysiajs/cors";

// Routes
import { userRoutes } from "./web/routes/user";
import { availableRoutes } from "./web/routes/availability";
import { weekPlanRoutes } from "./web/routes/weekPlan";
import { loginRoutes } from "./web/routes/login";
import { adminRoutes } from "./web/routes/admin";

// Init server
const app = new Elysia()
  .use(logger({ logIP: true }))
  .use(cors({ methods: ["GET", "PUT", "POST", "DELETE"] }))
  .use(
    swagger({
      documentation: {
        info: {
          title: "Scheduler Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .group("/api/v1", (app) =>
    app
      .use(userRoutes)
      .use(availableRoutes)
      .use(weekPlanRoutes)
      .use(loginRoutes)
      .use(adminRoutes)
  )

  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })
  .listen(env.PORT || 8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// for (let i = 1; i < 40; i++) {
//   const path = `./.mock/plan/plan${i}.json`;
//   const file = Bun.file(path);
//   const contents = await file.json();

//   app
//     .handle(
//       new Request("http://localhost/availability", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(contents),
//       })
//     )
//     .then(console.log);
// }
