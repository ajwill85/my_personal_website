# auth.md

Agent authentication for **ajwill.ai**.

## Audience

AI agents and automated clients discovering how to interact with this portfolio site.

## Policy

This site does **not** require OAuth or agent registration for its published HTTP APIs.

| Resource | Auth |
|----------|------|
| Static site (S3 + CloudFront) | None (public) |
| Visitor counter API | None (public, CORS-restricted to ajwill.ai) |
| Contact form API | None (public, CORS-restricted to ajwill.ai; rate/abuse controls are operational) |

## How to call APIs

1. Discover endpoints via [API catalog](/.well-known/api-catalog) (`rel="api-catalog"`). Catalog **anchors** are the live API Gateway resource URLs (`*.execute-api.*.amazonaws.com/...`), not paths on this CloudFront origin.
2. Use the linked OpenAPI (`service-desc`) documents under `/api/` on this site. Those docs are static; their `servers` entries point at API Gateway.
3. Do **not** `GET`/`POST` `https://ajwill.ai/api/...` or `https://ajwill.ai/contact` — those return the SPA HTML from S3.
4. CORS allows browser calls only from `https://ajwill.ai` / `https://www.ajwill.ai`; other browser origins are rejected.

## Registration

There is no agent registration endpoint and no credential issuance. Do not `POST` credentials or attempt account provisioning against this origin.

## Contact

For human outreach: [aj@ajwill.ai](mailto:aj@ajwill.ai)
