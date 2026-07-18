# SkillHub AI

SkillHub AI is a React/Vite learning platform with an Express, PostgreSQL, Prisma and JWT backend.

## Prerequisites

Install Node.js 20+ and PostgreSQL 15+. Create a database:

```sql
CREATE DATABASE skillhub_ai;
```

## Configure environment

Copy `server/.env.example` to `server/.env`. Set `DATABASE_URL` to your PostgreSQL credentials and replace `JWT_SECRET` with a long random value. Copy `.env.example` to `.env` if the API runs anywhere except `http://localhost:4000`.

## Database setup

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

The seed adds a demo user: `demo@skillhub.ai` / `Password123!`.

## Run locally

In terminal one:

```bash
cd server
npm run dev
```

In terminal two:

```bash
npm install
npm run dev
```

The Vite app is available at `http://localhost:5173`; the API health check is at `http://localhost:4000/api/health`.

## Useful commands

`npm run build` builds the frontend. In `server`, use `npm run build` to compile the API, `npm run prisma:migrate` for a development migration, and `npm run prisma:seed` to reset sample content.

## API areas

`/api/auth`, `/api/profile`, `/api/dashboard`, `/api/roadmap`, `/api/communities`, and `/api/catalog` cover authentication, personal profiles, activity/streaks, roadmap completion, interest-ranked communities/posts, projects, and resources.
