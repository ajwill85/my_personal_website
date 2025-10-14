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
      name: 'AWS AI Governance Framework with Policy-as-Code',
      description: 'Comprehensive security and compliance framework for AWS AI/ML systems implementing automated controls across ISO 27001, ISO 27701, and ISO 42001 standards. Features policy-as-code enforcement using Open Policy Agent (OPA/Rego), Python security scanners for SageMaker, IAM, and S3 resources, automated compliance monitoring, and risk scoring with JSON/HTML reporting. Demonstrates practical AI governance with 55+ controls mapped across multiple frameworks.',
      technologies: ['Python', 'AWS SageMaker', 'Open Policy Agent', 'Rego', 'boto3', 'IAM', 'KMS', 'S3', 'ISO 27001', 'ISO 27701', 'ISO 42001'],
      liveLink: null,
      githubLink: 'https://github.com/ajwill85/aws-ai-governance-framework'
    },
    {
      name: 'Portfolio Website with Serverless Visitor Counter',
      description: 'Built a modern, responsive portfolio website with full AWS serverless architecture. Features a real-time visitor counter using Lambda functions, API Gateway, and DynamoDB for data persistence. Deployed with CloudFront CDN, S3 hosting, ACM SSL certificates, and custom domain via Cloudflare DNS. Includes dark mode theme, smooth scroll animations, and mobile-first design.',
      technologies: ['React', 'Vite', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'CloudFormation', 'Cloudflare DNS'],
      liveLink: 'https://ajwill.ai',
      githubLink: null
    },
    {
      name: 'Human Risk Intelligence v3.0 - Cybersecurity News Aggregator',
      description: 'Built a modern React-based cybersecurity news aggregator with real-time intelligence from trusted sources including RSS feeds, Reddit r/netsec, and Hacker News. Features smart categorization across 15+ topics, offline caching, responsive design with dark theme, and smooth animations. Complete rewrite from static HTML to modern component architecture.',
      technologies: ['React', 'Vite', 'Lucide React', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'ACM', 'Cloudflare DNS'],
      liveLink: 'https://www.humanriskintel.com',
      githubLink: 'https://github.com/ajwill85/human-risk-intelligence'
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
              className="project-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="project-content">
                <h3>{project.name}</h3>
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
