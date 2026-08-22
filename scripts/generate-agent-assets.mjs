#!/usr/bin/env node
/**
 * Generates sitemap.xml, agent-skills/index.json (with sha256 digests),
 * api-catalog + OpenAPI servers from VITE_* API Gateway URLs.
 * Run automatically before vite build.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const site = 'https://ajwill.ai';
const publicDir = join(root, 'public');

/** Load KEY=value pairs from .env without overriding existing process.env. */
function loadDotEnv(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv(join(root, '.env'));

/**
 * Split a full API Gateway resource URL into OpenAPI server base + path.
 * Rejects SPA/CloudFront hosts so agents never POST to HTML.
 */
function parseApiGatewayEndpoint(fullUrl, envName) {
  if (!fullUrl || typeof fullUrl !== 'string') return null;
  let parsed;
  try {
    parsed = new URL(fullUrl.trim());
  } catch {
    console.warn(`Ignoring invalid ${envName}: ${fullUrl}`);
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (host === 'ajwill.ai' || host === 'www.ajwill.ai' || host.endsWith('.cloudfront.net')) {
    console.warn(
      `Ignoring ${envName}: points at the static site (${host}), not API Gateway. Use the execute-api URL from CloudFormation outputs.`
    );
    return null;
  }
  if (!host.includes('execute-api') && !host.includes('amazonaws.com')) {
    console.warn(`Ignoring ${envName}: expected an API Gateway URL, got ${host}`);
    return null;
  }
  const path = parsed.pathname.replace(/\/$/, '') || '/';
  // Prefer stage base (…/prod) + resource path (/count|/contact)
  const segments = path.split('/').filter(Boolean);
  let base;
  let resourcePath;
  if (segments.length >= 2) {
    resourcePath = `/${segments[segments.length - 1]}`;
    base = `${parsed.origin}/${segments.slice(0, -1).join('/')}`;
  } else {
    resourcePath = path.startsWith('/') ? path : `/${path}`;
    base = parsed.origin;
  }
  return {
    anchor: `${parsed.origin}${path === '/' ? '' : path}`,
    serverUrl: base,
    path: resourcePath,
  };
}

const visitorApi = parseApiGatewayEndpoint(
  process.env.VITE_VISITOR_COUNTER_API,
  'VITE_VISITOR_COUNTER_API'
);
const contactApi = parseApiGatewayEndpoint(
  process.env.VITE_CONTACT_FORM_API,
  'VITE_CONTACT_FORM_API'
);

const publishedPosts = [
  'three-legged-trust-stool',
  'cybersecurity-news-aggregator-aws-lambda-dynamodb',
  'serverless-portfolio-aws-cloudfront-lambda',
];

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/#skills', priority: '0.8', changefreq: 'monthly' },
  { path: '/#projects', priority: '0.9', changefreq: 'monthly' },
  { path: '/#blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/#certifications', priority: '0.8', changefreq: 'monthly' },
  { path: '/#experience', priority: '0.7', changefreq: 'monthly' },
  { path: '/index.md', priority: '0.6', changefreq: 'monthly' },
  { path: '/llms.txt', priority: '0.5', changefreq: 'monthly' },
  { path: '/auth.md', priority: '0.4', changefreq: 'yearly' },
  ...publishedPosts.map((slug) => ({
    path: `/#blog/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${site}${p.path === '/' ? '' : p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Wrote public/sitemap.xml');

const skillsRoot = join(publicDir, '.well-known', 'agent-skills');
const skillDirs = readdirSync(skillsRoot, { withFileTypes: true }).filter((d) => d.isDirectory());

const skills = skillDirs.map((dir) => {
  const skillPath = join(skillsRoot, dir.name, 'SKILL.md');
  const body = readFileSync(skillPath);
  const digest = `sha256:${createHash('sha256').update(body).digest('hex')}`;
  const text = body.toString('utf8');
  const nameMatch = text.match(/^name:\s*(.+)$/m);
  const descMatch = text.match(/^description:\s*(.+)$/m);
  return {
    name: (nameMatch?.[1] || dir.name).trim(),
    type: 'skill-md',
    description: (descMatch?.[1] || `Skill: ${dir.name}`).trim(),
    url: `${site}/.well-known/agent-skills/${dir.name}/SKILL.md`,
    digest,
  };
});

const index = {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills,
};

writeFileSync(join(skillsRoot, 'index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(`Wrote public/.well-known/agent-skills/index.json (${skills.length} skills)`);

const ard = {
  specVersion: '1.0',
  host: {
    displayName: 'Akeem Williams — ajwill.ai',
    identifier: 'did:web:ajwill.ai',
  },
  entries: [
    {
      identifier: 'urn:air:ajwill.ai:catalog:api',
      displayName: 'ajwill.ai API Catalog',
      type: 'application/linkset+json',
      url: `${site}/.well-known/api-catalog`,
      representativeQueries: [
        'what APIs does ajwill.ai expose',
        'openapi for the portfolio contact form',
        'visitor counter API documentation',
      ],
    },
    {
      identifier: 'urn:air:ajwill.ai:skills:portfolio-overview',
      displayName: 'Portfolio Overview Agent Skill',
      type: 'text/markdown',
      url: `${site}/.well-known/agent-skills/portfolio-overview/SKILL.md`,
      representativeQueries: [
        'who is Akeem Williams',
        'summarize the GRC portfolio on ajwill.ai',
        'how do I contact Akeem about GRC or AI governance',
      ],
    },
    {
      identifier: 'urn:air:ajwill.ai:docs:site-markdown',
      displayName: 'Site markdown for agents',
      type: 'text/markdown',
      url: `${site}/index.md`,
      representativeQueries: [
        'markdown version of ajwill.ai homepage',
        'llms.txt for ajwill.ai',
      ],
    },
  ],
};

mkdirSync(join(publicDir, '.well-known'), { recursive: true });
writeFileSync(
  join(publicDir, '.well-known', 'ai-catalog.json'),
  `${JSON.stringify(ard, null, 2)}\n`,
  'utf8'
);
console.log('Wrote public/.well-known/ai-catalog.json');

mkdirSync(join(publicDir, 'api'), { recursive: true });

function catalogEntry(anchor, openapiPath) {
  return {
    anchor,
    'service-desc': [
      {
        href: `${site}${openapiPath}`,
        type: 'application/openapi+json',
      },
    ],
    'service-doc': [
      {
        href: `${site}/auth.md`,
        type: 'text/markdown',
      },
    ],
    describedby: [
      {
        href: `${site}/.well-known/ai-catalog.json`,
        type: 'application/json',
      },
    ],
  };
}

const linkset = [];

if (visitorApi) {
  const visitorOpenapi = {
    openapi: '3.1.0',
    info: {
      title: 'ajwill.ai Visitor Counter API',
      version: '1.0.0',
      description:
        'Public visitor counter with IP-hash deduplication. Invoked by the portfolio SPA via VITE_VISITOR_COUNTER_API (API Gateway), not via CloudFront paths on ajwill.ai.',
    },
    servers: [
      {
        url: visitorApi.serverUrl,
        description: 'API Gateway stage (from VITE_VISITOR_COUNTER_API)',
      },
    ],
    paths: {
      [visitorApi.path]: {
        get: {
          operationId: 'getVisitorCount',
          summary: 'Increment and return visitor count',
          responses: {
            200: {
              description: 'Current count',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      count: { type: 'integer' },
                      message: { type: 'string' },
                      visit_type: { type: 'string' },
                      is_bot: { type: 'boolean' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  writeFileSync(
    join(publicDir, 'api', 'visitor-counter.openapi.json'),
    `${JSON.stringify(visitorOpenapi, null, 2)}\n`,
    'utf8'
  );
  linkset.push(catalogEntry(visitorApi.anchor, '/api/visitor-counter.openapi.json'));
  console.log(`Wrote visitor OpenAPI (server ${visitorApi.serverUrl}${visitorApi.path})`);
} else {
  console.warn(
    'VITE_VISITOR_COUNTER_API unset or invalid — skipped visitor catalog/OpenAPI update'
  );
}

if (contactApi) {
  const contactOpenapi = {
    openapi: '3.1.0',
    info: {
      title: 'ajwill.ai Contact Form API',
      version: '1.0.0',
      description:
        'Public contact form handler that emails submissions via Amazon SES. Invoked via VITE_CONTACT_FORM_API (API Gateway), not via CloudFront paths on ajwill.ai.',
    },
    servers: [
      {
        url: contactApi.serverUrl,
        description: 'API Gateway stage (from VITE_CONTACT_FORM_API)',
      },
    ],
    paths: {
      [contactApi.path]: {
        post: {
          operationId: 'submitContactForm',
          summary: 'Submit a contact form message',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['fullName', 'email', 'message'],
                  properties: {
                    fullName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    company: { type: 'string' },
                    budget: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Email queued/sent',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            400: { description: 'Missing required fields' },
            500: { description: 'Send failure' },
          },
        },
        options: {
          operationId: 'contactCorsPreflight',
          summary: 'CORS preflight',
          responses: {
            200: { description: 'OK' },
          },
        },
      },
    },
  };
  writeFileSync(
    join(publicDir, 'api', 'contact-form.openapi.json'),
    `${JSON.stringify(contactOpenapi, null, 2)}\n`,
    'utf8'
  );
  linkset.push(catalogEntry(contactApi.anchor, '/api/contact-form.openapi.json'));
  console.log(`Wrote contact OpenAPI (server ${contactApi.serverUrl}${contactApi.path})`);
} else {
  // Keep a contract doc, but never point servers at the SPA.
  const contactStub = {
    openapi: '3.1.0',
    info: {
      title: 'ajwill.ai Contact Form API',
      version: '1.0.0',
      description:
        'Contact form Lambda behind API Gateway (POST /contact). Set VITE_CONTACT_FORM_API to the CloudFormation ApiEndpoint (https://{api-id}.execute-api.{region}.amazonaws.com/prod/contact) and re-run npm run generate:agent-assets before deploy. Do not call https://ajwill.ai/contact — that is the static site.',
    },
    servers: [],
    paths: {
      '/contact': {
        post: {
          operationId: 'submitContactForm',
          summary: 'Submit a contact form message',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['fullName', 'email', 'message'],
                  properties: {
                    fullName: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    company: { type: 'string' },
                    budget: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Email queued/sent',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
            400: { description: 'Missing required fields' },
            500: { description: 'Send failure' },
          },
        },
        options: {
          operationId: 'contactCorsPreflight',
          summary: 'CORS preflight',
          responses: {
            200: { description: 'OK' },
          },
        },
      },
    },
  };
  writeFileSync(
    join(publicDir, 'api', 'contact-form.openapi.json'),
    `${JSON.stringify(contactStub, null, 2)}\n`,
    'utf8'
  );
  console.warn(
    'VITE_CONTACT_FORM_API unset or invalid — wrote contact OpenAPI without servers; omitted from api-catalog'
  );
}

writeFileSync(
  join(publicDir, '.well-known', 'api-catalog'),
  `${JSON.stringify({ linkset }, null, 2)}\n`,
  'utf8'
);
console.log(`Wrote public/.well-known/api-catalog (${linkset.length} anchors)`);
