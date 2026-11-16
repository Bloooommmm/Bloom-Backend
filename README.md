# Bloom Backend

Bloom Backend is the REST API for the Bloom menstrual-cycle companion. It serves user profiles, educational lessons, and optional AI-generated cycle insights for the Android client.

## Stack

- Node.js 22+
- TypeScript with strict ESM and NodeNext resolution
- Express 5
- PostgreSQL and Prisma 7 with `@prisma/adapter-pg`
- Groq SDK for optional AI insights
- Docker Compose for local PostgreSQL

## Architecture

```text
Bloom-Backend/
├── prisma/              schema, migrations, and seed data
├── src/
│   ├── config/          environment, CORS, and Prisma client
│   ├── middleware/      request logger and error handler
│   ├── modules/         user, lesson, and ai domains
│   ├── utils/           response helpers and async route wrapper
│   ├── app.ts            Express composition without opening a port
│   └── index.ts          HTTP process entry point
├── compose.yaml
└── package.json
```

Each domain follows `route -> controller -> service -> repository` where a repository adds a useful database boundary. Responses use a consistent `{ success, data }` envelope; list endpoints also include `meta.total`.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Liveness check |
| POST | `/api/users` | Create a user |
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get one user |
| PATCH | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |
| POST | `/api/lessons` | Create a lesson |
| GET | `/api/lessons` | List published lessons |
| GET | `/api/lessons?all=true` | List all lessons |
| GET | `/api/lessons/:slug` | Get a lesson by slug |
| PATCH | `/api/lessons/:id` | Update a lesson |
| DELETE | `/api/lessons/:id` | Delete a lesson |
| POST | `/api/ai/insight` | Generate a cycle insight with Groq |

The AI route requires `GROQ_API_KEY`. Authentication and password hashing are not implemented yet; the current user model is for the initial API contract.

## Local setup

```powershell
Copy-Item .env.example .env
npm install
npm run db:up
npm run db:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

The API starts at `http://localhost:3000`. PostgreSQL is exposed at port `5433` by Compose. `npm run db:down` stops the container while keeping the `postgres_data` volume.

For a deployment database, run `npm run prisma:migrate:deploy` instead of the development migration command.

## Environment

Copy `.env.example` to `.env` and set the database URL for your environment. Use a secret manager for production credentials. Never commit `.env` or API keys.

## Verification

```powershell
npm run db:validate
npm run typecheck
npm run build
npm run lint
npm test
```

The request logger is mounted globally and redacts sensitive request and response fields before printing them.
