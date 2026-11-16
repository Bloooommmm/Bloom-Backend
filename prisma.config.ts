import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // prisma generate only needs a syntactically valid URL; migrations use the runtime value.
    url: process.env.DATABASE_URL ?? "postgresql://build:build@localhost:5432/build",
  },
});
