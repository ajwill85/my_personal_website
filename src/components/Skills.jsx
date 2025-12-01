import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
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

  const skillCategories = [
    {
      title: 'Cloud Security & Infrastructure',
      skills: [
        'AWS Serverless (Lambda, API Gateway, DynamoDB, S3, SES)',
        'AWS Security (IAM, KMS, CloudTrail, CloudWatch)',
        'AWS AI/ML (SageMaker)',
        'Infrastructure as Code (CloudFormation)',
        'CI/CD Pipelines',
        'CloudFront CDN & ACM',
        'EventBridge & Event-Driven Architecture',
        'DNS Management (Cloudflare) & SSL/TLS'
      ]
    },
    {
      title: 'Programming & Automation',
      skills: [
        'Python (boto3)',
        'JavaScript (Node.js, React, Vite)',
        'Bash Scripting',
        'Policy-as-Code (OPA/Rego)'
      ]
    },
    {
      title: 'Compliance & Governance',
      skills: [
        'ISO Standards (27001, 42001, 27701)',
        'NIST Frameworks (CSF, RMF)',
        'Privacy Regulations (GDPR, CCPA)',
        'AI/ML Governance',
        'SOC 2'
      ]
    },
    {
      title: 'Privacy & Data Protection',
      skills: [
        'Privacy Impact Assessments (PIAs)',
        'Data Subject Rights & Consent Management',
        'Privacy by Design & Data Mapping',
        'PII Protection & Data Masking',
        'Privacy Program Management'
      ]
    },
    {
      title: 'Risk & Security Management',
      skills: [
        'Risk Assessment & Management',
        'Security Auditing & Control Implementation',
        'Policy Development & Compliance Management',
        'Security Architecture',
        'Third-Party Risk Management (TPRM)'
      ]
    },
    {
      title: 'Leadership & Communication',
      skills: [
        'Technical Writing & Documentation',
        'Project Management',
        'Stakeholder Communication',
        'Security Training & Awareness'
      ]
    }
  ];

  return (
    <section className={`skills ${isVisible ? 'visible' : ''}`} id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-category"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
