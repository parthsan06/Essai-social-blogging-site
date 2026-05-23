```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

// PRISMA ACCELERATE CONNECTION POOL URL
// DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19mekRFdEtpQmNXQzUwdXdCdDhWd3YiLCJhcGlfa2V5IjoiMDFLUkVQTVdEMjAwWldIVEpWTTYxV1owUEQiLCJ0ZW5hbnRfaWQiOiJlYmNmNDIwODY5NzM2YmMyOWFlMjkzMmYwNWNhYzM1YzhkYjExMTJiNWY4Zjg3NTRjMzk1ZWY3OTZkZWE4NDc3IiwiaW50ZXJuYWxfc2VjcmV0IjoiNjg1NDk3ZDEtMjk0ZC00YjdlLWE0M2UtMzI0OGYwYTI1YjNjIn0.YNRkLc6WRgCHjM79XlojRMenhmHFn3-ZsngAdQ7y6WQ"