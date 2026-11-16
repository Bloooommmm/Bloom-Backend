# Bloom Backend

An Express API for Bloom, a supportive period-tracking and menstrual-health learning app.

[Android app](https://github.com/Bloooommmm/Bloom-Frontend) | [Live Swagger](https://bloom-be.yanzz.dev/api/docs) | [Organization](https://github.com/Bloooommmm)

## Stack

- Node.js 22+
- TypeScript, Express 5, and strict ESM
- PostgreSQL with Prisma 7 and `@prisma/adapter-pg`
- Firebase Admin bearer-token authentication
- Groq for optional cycle insights
- Swagger UI and OpenAPI

## Architecture

```text
src/
├── config/       environment, CORS, Prisma client
├── middleware/   Firebase auth, request logger, error handler
├── modules/      users, lessons, tracking, AI insights
├── utils/        response helpers and async route wrapper
├── app.ts        Express composition
└── index.ts      HTTP entry point
prisma/           schema, migrations, seed data
```

Domain modules follow `route -> controller -> service -> repository`. Database tables use the project naming convention: `MsUser`, `MsLesson`, `TrPeriod`, and `TrMood`.

## API

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | No | Health check |
| GET | `/api/docs` | No | Swagger UI |
| GET | `/api/docs/openapi.json` | No | OpenAPI document |
| GET | `/api/users/me` | Firebase | Sync and return the current user |
| GET | `/api/lessons` | No | List published lessons |
| GET | `/api/lessons/:slug` | No | Read one lesson |
| POST | `/api/lessons` | No | Create a lesson |
| PATCH | `/api/lessons/:id` | No | Update a lesson |
| DELETE | `/api/lessons/:id` | No | Delete a lesson |
| GET | `/api/tracking/periods` | Firebase | List the current user's periods |
| POST | `/api/tracking/periods` | Firebase | Log a period start |
| PATCH | `/api/tracking/periods/:id` | Firebase | Set a period end date |
| DELETE | `/api/tracking/periods/:id` | Firebase | Delete a period record |
| GET | `/api/tracking/moods` | Firebase | List daily moods |
| PUT | `/api/tracking/moods` | Firebase | Create or update a daily mood |
| POST | `/api/ai/insight` | Firebase | Generate a supportive cycle insight |

Send the Firebase ID token as `Authorization: Bearer <token>` on protected routes. The API does not diagnose medical conditions.

Lesson writes currently have no authentication middleware. The Android app only reads lessons. List all lessons, including drafts, with `GET /api/lessons?all=true`.

## Local setup

```powershell
Copy-Item .env.example .env
npm ci
npm run db:up
npm run prisma:generate
npm run prisma:migrate:deploy
npm run prisma:seed
npm run dev
```

The API runs at `http://localhost:3000`. Docker PostgreSQL runs on port `5433` by default.

For production, set `DATABASE_URL`, `FIREBASE_PROJECT_ID`, and either `FIREBASE_SERVICE_ACCOUNT_JSON` or `FIREBASE_SERVICE_ACCOUNT_PATH`. Keep credentials in a secret manager; never commit `.env` or service-account files.

`PORT` defaults to 3000. `CORS_ORIGIN` controls allowed origins. Set `GROQ_API_KEY` only when using AI insights. Use `npm run prisma:migrate -- --name your_change` to create a migration after changing the schema; deployments apply committed migrations with `prisma:migrate:deploy`.

## Verification

```powershell
npm run db:validate
npm run typecheck
npm run lint
npm test
npm run build
npm run docs:validate
```

## Deployment

The `main` branch runs CI, then triggers the configured Coolify deployment through GitHub Actions. Configure `COOLIFY_WEBHOOK_URL` and `COOLIFY_API_TOKEN` as repository secrets.
