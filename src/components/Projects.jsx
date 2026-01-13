import './Projects.css';

const Projects = ({ filter, onFilterClick }) => {

  const projects = [
    {
      name: 'GRC AI Governance Serverless Platform',
      description: 'Enterprise-grade serverless GRC platform for AI governance and compliance automation. Built with AWS serverless architecture featuring Lambda functions, API Gateway, DynamoDB, and S3 for scalable, cost-effective operations. Implements automated compliance monitoring, risk assessment workflows, policy management, and audit trail capabilities. Designed for organizations managing AI/ML systems with regulatory requirements across ISO 27001, ISO 42001, and GDPR frameworks.',
      technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation', 'Python', 'Node.js', 'AWS IAM', 'CloudWatch', 'EventBridge'],
      category: 'GRC',
      tags: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation', 'Python', 'Node.js', 'AWS IAM', 'CloudWatch', 'EventBridge'],
      liveLink: null,
      githubLink: 'https://github.com/ajwill85/grc-ai-governance-serverless'
    },
    {
      name: 'AWS AI Governance Framework with Policy-as-Code',
      description: 'Multi-tenant SaaS platform for AWS AI/ML compliance monitoring with 67 automated controls across ISO 27001:2022 (30 controls), ISO 27701:2025 (22 controls), and ISO 42001:2023 (15 controls). Features policy-as-code enforcement using Open Policy Agent (OPA/Rego), Python security scanners for SageMaker, IAM, and S3 resources, threat intelligence integration, authentication enforcement, data masking for PII, secure coding validation, and AI impact assessments with JSON/HTML reporting.',
      technologies: ['Python', 'AWS SageMaker', 'Open Policy Agent', 'Rego', 'boto3', 'IAM', 'KMS', 'S3', 'ISO 27001', 'ISO 27701', 'ISO 42001'],
      category: 'GRC',
      tags: ['Python', 'AWS SageMaker', 'Open Policy Agent', 'Rego', 'boto3', 'IAM', 'KMS', 'S3', 'ISO 27001', 'ISO 27701', 'ISO 42001'],
      liveLink: null,
      githubLink: 'https://github.com/ajwill85/aws-ai-governance-framework'
    },
    {
      name: 'Human Risk Intelligence v3.0 - Cybersecurity News Aggregator',
      description: 'Built a modern React-based cybersecurity news aggregator with real-time intelligence from trusted sources including RSS feeds, Reddit r/netsec, and Hacker News. Features smart categorization across 15+ topics, offline caching, responsive design with dark theme, and smooth animations. Complete rewrite from static HTML to modern component architecture.',
      technologies: ['React', 'Vite', 'Lucide React', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'Cloudflare DNS'],
      category: 'Content Delivery',
      tags: ['React', 'Vite', 'Lucide React', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'Cloudflare DNS'],
      liveLink: 'https://www.humanriskintel.com',
      githubLink: 'https://github.com/ajwill85/human-risk-intelligence'
    },
    {
      name: 'Portfolio Website with Serverless Backend',
      description: 'Modern, responsive portfolio website with full AWS serverless architecture and Infrastructure as Code. Features real-time visitor counter with IP-based deduplication, contact form with SES email integration, and comprehensive CloudFormation templates for automated deployment. Includes CloudFront CDN, S3 hosting, ACM SSL certificates, Lambda functions, API Gateway, DynamoDB, and Cloudflare DNS integration. Built with security best practices, environment-based configuration, and complete CI/CD deployment scripts.',
      technologies: ['React', 'Vite', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'SES', 'CloudFormation', 'IaC', 'Cloudflare DNS'],
      category: 'Web Development',
      tags: ['React', 'Vite', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'SES', 'CloudFormation', 'IaC', 'Cloudflare DNS'],
      liveLink: 'https://ajwill.ai',
      githubLink: 'https://github.com/ajwill85/my_personal_website'
    },
    {
      name: 'FIRE Calculator',
      description: 'Financial Independence, Retire Early (F.I.R.E.) calculator with FI number calculation, net worth projections, Coast FI calculator, and savings rate tracking. Interactive Recharts visualizations for financial projections, localStorage persistence, and full TypeScript support. Financial planning tool for early retirement goals, Monte Carlo simulation with 1,000 market scenarios and scenario analysis. Sign-up for early access to beta features.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'AWS Amplify'],
      category: 'Personal Finance',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'AWS Amplify'],
      liveLink: 'https://welitfire.com',
      githubLink: 'https://github.com/ajwill85/fire-calculator',
      stealth: true
    },
    {
      name: 'Trading Sentiment Analysis Platform',
      description: 'Private project in active development. An AI-powered platform for market sentiment analysis and trading insights.',
      technologies: ['Python', 'React', 'TypeScript', 'FastAPI', 'NLP/Vader', 'PostgreSQL', 'AWS Fargate', 'AWS ECS', 'Docker', 'GitHub Actions', 'Terraform'],
      category: 'AI/ML',
      tags: ['Python', 'React', 'TypeScript', 'FastAPI', 'NLP/Vader', 'PostgreSQL', 'AWS Fargate', 'AWS ECS', 'Docker', 'GitHub Actions', 'Terraform'],
      liveLink: null,
      githubLink: null,
      stealth: true
    },
    {
      name: 'AWS: Banking ID Verification App',
      description: 'AWS Cloud Institute Capstone Project. Building a serverless KYC Bank onboarding application, using AI/ML to verify driver\'s license (DL) with selfie photos. The app will confirm the customers information with a third-party DL validation service.',
      technologies: ['AWS IAM', 'S3', 'AWS Lambda', 'AWS Rekognition', 'AWS Textract', 'SQS Queue', 'SNS Topic', 'API Gateway', 'DynamoDB'],
      category: 'AI/ML',
      tags: ['AWS IAM', 'S3', 'AWS Lambda', 'AWS Rekognition', 'AWS Textract', 'SQS Queue', 'SNS Topic', 'API Gateway', 'DynamoDB'],
      liveLink: null,
      githubLink: null,
      stealth: true
    }
  ];

  const getFilteredProjects = () => {
    if (!filter.type || !filter.value) {
      return projects;
    }

    return projects.filter(project => {
      if (filter.type === 'category') {
        return project.category === filter.value;
      } else if (filter.type === 'tag') {
        return project.tags.includes(filter.value);
      }
      return true;
    });
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section className="projects visible" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        {/* Filter Indicator */}
        {filter.type && filter.value && (
          <div className="blog-filter-indicator">
            <span className="filter-text">
              Filtering by {filter.type}: <strong>{filter.value}</strong>
            </span>
            <button
              className="btn btn-secondary clear-filter-btn"
              onClick={() => onFilterClick(null, null)}
            >
              Clear Filter
            </button>
          </div>
        )}

        <div className="blog-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className="blog-card"
            >
              <div className="blog-content">
                <div className="blog-meta">
                  {project.category && (
                    <span
                      className="blog-category clickable"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFilterClick('category', project.category);
                      }}
                    >
                      {project.category}
                    </span>
                  )}
                  {project.stealth && (
                    <span className="stealth-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      Private
                    </span>
                  )}
                </div>
                <h3 className="blog-title">
                  {project.name}
                </h3>
                <p className="blog-excerpt">{project.description}</p>
                <div className="blog-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="blog-tag clickable"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFilterClick('tag', tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {(project.liveLink || project.githubLink) && (
                  <div className="project-links">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View Live Site →
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="blog-no-results">
            <p>No projects found for {filter.type}: <strong>{filter.value}</strong></p>
            <button
              className="btn btn-secondary"
              onClick={() => onFilterClick(null, null)}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
