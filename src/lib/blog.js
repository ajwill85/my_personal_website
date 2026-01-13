// Blog utilities for markdown processing
import { marked } from 'marked';

// Single data source for all blog posts
const ALL_POSTS = [
  {
    slug: 'ai-governance-framework',
    title: 'Building an AWS AI Governance Framework with 67 Automated Controls',
    date: '2026-01-02',
    category: 'GRC',
    excerpt: 'How I implemented a comprehensive AI governance framework with 67 automated controls across ISO 27001, 27701, and 42001 standards using policy-as-code.',
    tags: ['AI Governance', 'AWS', 'ISO 27001', 'ISO 42001', 'Policy-as-Code', 'OPA'],
    status: 'draft'
  },
  {
    slug: 'policy-as-code-guide',
    title: 'Policy-as-Code: From Theory to Production with OPA and AWS',
    date: '2026-01-02',
    category: 'DevOps',
    excerpt: 'Practical guide to implementing policy-as-code solutions using Open Policy Agent (OPA) and AWS services for automated compliance enforcement.',
    tags: ['Policy-as-Code', 'OPA', 'AWS', 'DevOps', 'Compliance', 'Automation'],
    status: 'draft'
  },
  {
    slug: 'grc-ai-governance-serverless-platform',
    title: 'Building a GRC AI Governance Serverless Platform with 67 Automated Controls',
    date: '2026-01-02',
    category: 'GRC',
    excerpt: 'Enterprise-grade serverless GRC platform for AI governance and compliance automation. Built with AWS serverless architecture featuring Lambda functions, API Gateway, DynamoDB, and S3 for scalable, cost-effective operations.',
    tags: ['AWS', 'Serverless', 'AI Governance', 'GRC', 'Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation', 'Policy-as-Code'],
    status: 'draft'
  },
  {
    slug: 'fire-calculator-retirement-app',
    title: 'Building a FIRE Calculator with Monte Carlo Simulation and Coast FI Analysis',
    date: '2026-01-02',
    category: 'Personal Finance',
    excerpt: 'Comprehensive financial independence calculator with Monte Carlo simulation, Coast FI analysis, and net worth projection. Built with Next.js 16, React 19, TypeScript, and Recharts for interactive visualizations.',
    tags: ['Next.js', 'React', 'TypeScript', 'FIRE', 'Financial Independence', 'Monte Carlo', 'Recharts', 'JavaScript', 'Personal Finance'],
    status: 'draft'
  },
  {
    slug: 'trading-sentiment-analysis-platform',
    title: 'Building a Trading Sentiment Analysis Platform with NLP and Real-time Data',
    date: '2026-01-02',
    category: 'AI/ML',
    excerpt: 'AI-powered platform for market sentiment analysis and trading insights. Built with Python, FastAPI, React, TypeScript, and NLP/VADER for sentiment analysis, with PostgreSQL, Redis, and AWS deployment.',
    tags: ['Python', 'React', 'TypeScript', 'FastAPI', 'NLP', 'VADER', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GitHub Actions', 'Terraform'],
    status: 'draft'
  }
];

// Filtered for public viewing (respects status and environment)
export const getBlogPosts = async () => {
  const showDrafts = import.meta.env.VITE_SHOW_DRAFTS === 'true';
  return ALL_POSTS.filter(post =>
    showDrafts || post.status === 'published'
  );
};

// All posts regardless of status (for admin/preview functions)
export const getAllBlogPosts = async () => {
  return ALL_POSTS;
};

export const getBlogPost = async (slug) => {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
};

export const getBlogPostContent = async (slug) => {
  try {
    // Import all markdown files using Vite's import.meta.glob
    const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default' });

    // Construct the file path
    const filePath = `/src/content/blog/${slug}.md`;

    // Check if the file exists
    if (!(filePath in modules)) {
      return '<p>Post not found</p>';
    }

    // Read and parse the markdown file
    const markdownContent = await modules[filePath]();
    const htmlContent = marked(markdownContent);

    return htmlContent;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return '<p>Error loading post content</p>';
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
