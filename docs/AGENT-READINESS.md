# Agent readiness (isitagentready.com)

How this repo maps to [Agent Ready](https://isitagentready.com) discoverability checks for a static site on S3 + CloudFront.

| Check | Status | Where |
|-------|--------|--------|
| robots.txt | Implemented | `public/robots.txt` |
| sitemap.xml | Generated on build | `scripts/generate-agent-assets.mjs` → `public/sitemap.xml` |
| AI crawler rules | Implemented | Explicit UA blocks in robots.txt |
| Content-Signal | Implemented | `Content-Signal:` lines in robots.txt |
| Link headers | Implemented | CloudFront `AgentDiscoveryHeadersPolicy` in `website-infrastructure-cloudflare.yaml` |
| Markdown negotiation | Implemented | CloudFront Function rewrites `/` → `/index.md` when `Accept: text/markdown` |
| API catalog | Implemented | Generated from `VITE_*_API` execute-api URLs → `public/.well-known/api-catalog` + `public/api/*.openapi.json` |
| Agent skills index | Generated on build | `public/.well-known/agent-skills/` |
| ARD ai-catalog | Generated on build | `public/.well-known/ai-catalog.json` |
| auth.md | Implemented | `public/auth.md` (no OAuth when APIs are public) |
| WebMCP | Implemented | `src/lib/webmcp.js` |
| DNS-AID | Manual DNS | See `docs/DNS-AID.md` (DNS provider + DNSSEC) |
| OAuth / OIDC / PRM | N/A by default | Only needed for protected APIs; see auth.md |
| MCP Server Card | N/A by default | Only if you host an MCP server on this origin |

## Deploy

```bash
npm run build
./scripts/deploy-to-aws.sh <bucket-name> <cloudfront-distribution-id>
```

Update the CloudFormation stack so Link headers and the markdown negotiation function go live (use the Cloudflare DNS template if that is your stack):

```bash
aws cloudformation update-stack \
  --stack-name <website-stack> \
  --template-body file://infrastructure/website-infrastructure-cloudflare.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=<your-domain> ...
```

Then add DNS-AID records from `docs/DNS-AID.md`.

## Validate

Replace `<your-domain>` with the live site origin:

```bash
curl -sI https://<your-domain>/robots.txt
curl -sI https://<your-domain>/sitemap.xml
curl -sI https://<your-domain>/.well-known/api-catalog
curl -sI -H 'Accept: text/markdown' https://<your-domain>/
curl -s -X POST https://isitagentready.com/api/scan \
  -H 'content-type: application/json' \
  -d '{"url":"https://<your-domain>"}'
```
