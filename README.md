# Bloom Backend

## Local PostgreSQL and Prisma

Requirements: Node.js 20.19.x, 22.12+, or 24+, and Docker with the Compose
plugin.

In PowerShell, from this folder:

```powershell
Copy-Item .env.example .env
npm install
npm run db:up
npm run prisma:generate
```

Docker Compose starts PostgreSQL and keeps its data in the `postgres_data`
volume. Wait for the container health check to pass before running database
commands. `npm run db:down` stops and removes the container but preserves that
volume; it does not delete the database data.

Add application models to `prisma/schema.prisma`, then create and apply a
migration with:

```powershell
npm run prisma:migrate -- --name init
```

Use the shared Prisma client from `src/db/prisma.js`:

```js
const { prisma } = require("./db/prisma");
```

`npm run prisma:studio` opens Prisma Studio. The credentials in `.env.example`
are for local development only; use a secret-managed `DATABASE_URL` outside
local development.
