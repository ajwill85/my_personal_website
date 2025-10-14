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
      title: 'Cloud Security & Architecture',
      skills: ['AWS Security', 'IAM & Access Management', 'CloudFormation IaC', 'AWS Lambda', 'API Gateway', 'S3 Security', 'CloudFront CDN']
    },
    {
      title: 'Privacy & Data Protection',
      skills: ['GDPR', 'CCPA', 'Privacy Impact Assessments (PIAs)', 'Data Subject Rights Management', 'Privacy by Design', 'Consent Management', 'Data Mapping & Classification']
    },
    {
      title: 'Compliance & Governance',
      skills: ['ISO 27001 (ISMS)', 'ISO 42001 (AI Management)', 'ISO 27701 (Privacy)', 'NIST CSF', 'NIST RMF', 'AI/ML Governance', 'SOC 2', 'GDPR Compliance', 'CCPA Compliance']
    },
    {
      title: 'GRC Capabilities',
      skills: ['Risk Assessment & Management', 'Security Auditing', 'Policy Development', 'Compliance Management', 'Control Implementation', 'Security Architecture', 'Data Privacy Management', 'Vendor Risk Management', 'Privacy Program Management']
    },
    {
      title: 'Programming & Automation',
      skills: ['Python', 'Bash', 'JavaScript', 'React', 'Policy-as-Code (OPA/Rego)']
    },
    {
      title: 'Professional Skills',
      skills: ['Technical Writing', 'Project Management', 'Stakeholder Communication', 'Security Training']
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
