# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single-product **IDE-style portfolio website**: a React 19 + Vite 7
client-side SPA. The AWS Lambda functions under `lambda/` (visitor counter, contact form)
are deployed serverless backends, not run locally — local development is frontend-only.

### Services / commands

There is one dev service (the Vite dev server). Standard commands are defined in
`package.json`:

- Dev server: `npm run dev` (Vite, serves on `http://localhost:5173`).
- Lint: `npm run lint` (ESLint; config in `eslint.config.js`).
- Build: `npm run build` (production build into `dist/`).
- Preview built output: `npm run preview`.

### Non-obvious gotchas

- `predev` and `prebuild` automatically run `node scripts/generate-agent-assets.mjs`, which
  **regenerates tracked files in `public/`** — notably `public/.well-known/api-catalog`,
  `public/api/*.openapi.json`, `public/.well-known/agent-skills/index.json`, and
  `public/sitemap.xml`. In this environment there is no `.env`, so the AWS
  `VITE_VISITOR_COUNTER_API` / `VITE_CONTACT_FORM_API` values are unset and the script
  overwrites `public/.well-known/api-catalog` (and the OpenAPI files) with empty/stub
  content, plus rewrites `sitemap.xml` with the current date. Do **not** commit these
  incidental regenerations; restore them with
  `git checkout -- public/.well-known/api-catalog public/api public/sitemap.xml` before
  committing unrelated work.
- The visitor counter and contact form call deployed API Gateway endpoints and therefore do
  not function locally without those AWS backends; the rest of the SPA (navigation, blog,
  projects, etc.) works fully in local dev.
- `npm install` may produce an incidental `package-lock.json` diff (removal of `libc`
  fields) due to the installed npm version; do not commit that churn.
- `scripts/bootstrap.sh` and `deploy.sh` are for AWS deployment setup, not local dev.
