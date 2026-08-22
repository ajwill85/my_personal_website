#!/usr/bin/env node
/**
 * Generates sitemap.xml and agent-skills/index.json (with sha256 digests).
 * Run automatically before vite build.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const site = 'https://ajwill.ai';
const publicDir = join(root, 'public');

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
