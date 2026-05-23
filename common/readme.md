Things to put in the shared folder:
Zod input validation schemas
TypeScript types

# Essai — A Medium-type Social Blogging Platform

A full-stack blogging platform inspired by Medium, built end-to-end with a focus on edge deployment and modern serverless architecture.

**Live site:** https://my-app.essai.workers.dev  
**Backend API:** https://backend.essai.workers.dev

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18, TypeScript | Component-based UI with strong typing |
| Frontend Framework | Hono + Vite SSR | Lightweight server for routing and HTML shell delivery on the edge |
| Styling | Tailwind CSS v4 | Utility-first, fast to iterate |
| Backend | Hono on Cloudflare Workers | Minimal, fast, edge-native framework — no cold starts |
| Database | Prisma Postgres (via Prisma Accelerate) | Managed Postgres with HTTP-based connection pooling for edge runtimes |
| ORM | Prisma v7 | Type-safe DB queries with schema-driven migrations |
| Validation | Zod | Runtime input validation on both frontend and backend |
| Auth | JWT (via hono/jwt) | Stateless authentication — fits serverless perfectly |
| Deployment | Cloudflare Workers + Wrangler | Global edge network, zero server management |

---

## Architecture

```
Browser
  │
  ▼
Hono SSR Worker (my-app.essai.workers.dev)
  │  Serves HTML shell + React client bundle
  │  Each route returns <div id="root"> + client.js
  │
  ▼
React (client-side)
  │  Hydrates in the browser, handles all UI logic
  │  Reads JWT from localStorage for auth
  │
  ▼
Hono REST API Worker (backend.essai.workers.dev)
  │  /api/v1/user/signup
  │  /api/v1/user/signin
  │  /api/v1/blog (CRUD)
  │
  ▼
Prisma Accelerate (HTTP proxy)
  │
  ▼
Prisma Postgres (managed database)
```

---

## Features

- **Signup / Signin** with JWT authentication and Zod input validation
- **Feed** — view all published blog posts
- **Single post view** — read a full post by ID
- **Create post** — write and publish a new blog post
- **Update post** — edit an existing post (pre-populated form)
- **Auth guards** — protected routes redirect to signin if no token
- **Sign out** — clears token from localStorage
- **Search** — filter feed by title or content via URL query params

---

## What I Learned

**Cloudflare Workers is not Node.js**  
Workers run in the `workerd` runtime — no filesystem, no `__dirname`, no `node:path`. Any library that touches the filesystem breaks. This killed Prisma's default Node.js query engine and forced me to use the WASM-based workerd runtime with Prisma Accelerate.

**Prisma v7 is a complete architecture shift**  
Prisma v7 removed the `url` field from `schema.prisma`, removed `datasourceUrl` and `datasources` from the constructor, and requires either `accelerateUrl` or a driver adapter. Most tutorials online are pre-v7 and don't apply. The entire constructor API changed between v5, v6, and v7.

**Edge runtimes need HTTP-based database connections**  
Cloudflare Workers can't hold persistent TCP connections to Postgres. You need a proxy like Prisma Accelerate that speaks HTTP instead of raw TCP.

**Version mismatches cause subtle, hard-to-debug errors**  
`@prisma/adapter-pg-worker` was abandoned at v6.9.0 with no v7 release. The global Prisma CLI was v7 but the local install was v6, causing generated files to mismatch the runtime. Always use `npm run` instead of `npx` to guarantee local binary resolution.

**Vite SSR + Cloudflare Workers deployment is non-trivial**  
The dev server injects scripts that don't exist in production. React was initially bundled twice causing `useState` to fail. Resolved with Vite's `dedupe` config. The correct pattern is `createRoot` not `hydrateRoot` since the server only sends an empty shell.

**JWT auth on the frontend**  
`localStorage` is the simplest approach for JWTs in a CSR app. `Authorization: Bearer <token>` must be manually attached to every protected request.

---

## Known Issues & Future Improvements

- Passwords stored in plaintext — should be hashed with bcrypt
- No pagination on the feed
- Author names not shown on posts (only authorId)
- No image support
- JWT secret should be replaced with a strong random secret in production
- No refresh token — JWT expires and user is silently logged out

---

## Local Development

```bash
# Backend
cd backend-19
npm install
npm run dev   # runs on localhost:8787

# Frontend
cd frontend
npm install
npm run dev   # runs on localhost:5173
```

Requires a `.env` file in `backend-19/` with:
```
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."
```

---

## Deployment

```bash
# Backend
cd backend-19
npm run deploy

# Frontend
cd frontend
npm run deploy
```