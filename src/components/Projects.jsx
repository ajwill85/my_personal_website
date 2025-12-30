import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      name: 'GRC AI Governance Serverless Platform',
      description: 'Enterprise-grade serverless GRC platform for AI governance and compliance automation. Built with AWS serverless architecture featuring Lambda functions, API Gateway, DynamoDB, and S3 for scalable, cost-effective operations. Implements automated compliance monitoring, risk assessment workflows, policy management, and audit trail capabilities. Designed for organizations managing AI/ML systems with regulatory requirements across ISO 27001, ISO 42001, and GDPR frameworks.',
      technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation', 'Python', 'Node.js', 'IAM', 'CloudWatch', 'EventBridge'],
      liveLink: null,
      githubLink: 'https://github.com/ajwill85/grc-ai-governance-serverless'
    },
    {
      name: 'AWS AI Governance Framework with Policy-as-Code',
      description: 'Multi-tenant SaaS platform for AWS AI/ML compliance monitoring with 67 automated controls across ISO 27001:2022 (30 controls), ISO 27701:2025 (22 controls), and ISO 42001:2023 (15 controls). Features policy-as-code enforcement using Open Policy Agent (OPA/Rego), Python security scanners for SageMaker, IAM, and S3 resources, threat intelligence integration, authentication enforcement, data masking for PII, secure coding validation, and AI impact assessments with JSON/HTML reporting.',
      technologies: ['Python', 'AWS SageMaker', 'Open Policy Agent', 'Rego', 'boto3', 'IAM', 'KMS', 'S3', 'ISO 27001', 'ISO 27701', 'ISO 42001'],
      liveLink: null,
      githubLink: 'https://github.com/ajwill85/aws-ai-governance-framework'
    },
    {
      name: 'Human Risk Intelligence v3.0 - Cybersecurity News Aggregator',
      description: 'Built a modern React-based cybersecurity news aggregator with real-time intelligence from trusted sources including RSS feeds, Reddit r/netsec, and Hacker News. Features smart categorization across 15+ topics, offline caching, responsive design with dark theme, and smooth animations. Complete rewrite from static HTML to modern component architecture.',
      technologies: ['React', 'Vite', 'Lucide React', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'Cloudflare DNS'],
      liveLink: 'https://www.humanriskintel.com',
      githubLink: 'https://github.com/ajwill85/human-risk-intelligence'
    },
    {
      name: 'Portfolio Website with Serverless Backend',
      description: 'Modern, responsive portfolio website with full AWS serverless architecture and Infrastructure as Code. Features real-time visitor counter with IP-based deduplication, contact form with SES email integration, and comprehensive CloudFormation templates for automated deployment. Includes CloudFront CDN, S3 hosting, ACM SSL certificates, Lambda functions, API Gateway, DynamoDB, and Cloudflare DNS integration. Built with security best practices, environment-based configuration, and complete CI/CD deployment scripts.',
      technologies: ['React', 'Vite', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'SES', 'CloudFormation', 'IaC', 'Cloudflare DNS'],
      liveLink: 'https://ajwill.ai',
      githubLink: 'https://github.com/ajwill85/my_personal_website'
    },
    {
      name: 'Trading Sentiment Analysis Platform',
      description: 'Private project in active development. An AI-powered platform for market sentiment analysis and trading insights.',
      technologies: ['Python', 'React', 'TypeScript', 'FastAPI', 'NLP/Vader', 'PostgreSQL', 'AWS Fargate', 'AWS ECS', 'Docker', 'GitHub Actions', 'Terraform'],
      liveLink: null,
      githubLink: null,
      stealth: true
    }
  ];

  return (
    <section className={`projects ${isVisible ? 'visible' : ''}`} id="projects" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`project-card ${project.stealth ? 'stealth' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="project-content">
                <h3>
                  {project.name}
                  {project.stealth && <span className="stealth-badge">🔒 Private</span>}
                </h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
