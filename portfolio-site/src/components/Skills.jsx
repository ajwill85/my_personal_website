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

  const certifications = [
    {
      name: 'CISSP',
      credlyUrl: 'https://www.credly.com/badges/bbae2686-b50a-43c2-883c-bc052d541281'
    },
    {
      name: 'ISO 27001 Lead Auditor',
      credlyUrl: 'https://www.credly.com/badges/d5f65c4b-4a1a-4c4c-96cf-5971756af729'
    },
    {
      name: 'ISO 42001 Lead Auditor',
      credlyUrl: 'https://www.credly.com/badges/e7430cff-b1a1-4980-af63-3ce72bde04c4'
    },
    {
      name: 'GSLC',
      credlyUrl: 'https://www.credly.com/badges/fc7597e4-e4c9-4478-a2e6-99c44369f9b1'
    },
    {
      name: 'SSAP',
      credlyUrl: 'https://www.credly.com/badges/03638838-693a-4862-a933-60dc0c1f430c'
    },
    {
      name: 'OneTrust Fellow of Privacy Technology',
      credlyUrl: 'https://www.credly.com/badges/de15b56a-e8ba-4e88-9de3-25cde63f3122'
    }
  ];

  const skillCategories = [
    {
      title: 'Certifications',
      skills: certifications,
      isCertification: true
    },
    {
      title: 'Cloud Security & Architecture',
      skills: ['AWS Security', 'IAM & Access Management', 'CloudFormation IaC', 'AWS Lambda', 'API Gateway', 'S3 Security', 'CloudFront CDN']
    },
    {
      title: 'Compliance & Governance',
      skills: ['ISO 27001 (ISMS)', 'ISO 42001 (AI Management)', 'ISO 27701 (Privacy)', 'NIST CSF', 'NIST RMF', 'AI/ML Governance', 'SOC 2']
    },
    {
      title: 'GRC Capabilities',
      skills: ['Risk Assessment & Management', 'Security Auditing', 'Policy Development', 'Compliance Management', 'Control Implementation', 'Security Architecture']
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
                {category.isCertification ? (
                  // Render certifications with Credly links
                  category.skills.map((cert, skillIndex) => (
                    <li key={skillIndex} className="cert-item">
                      <a 
                        href={cert.credlyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        <span className="cert-icon">🏆</span>
                        {cert.name}
                      </a>
                    </li>
                  ))
                ) : (
                  // Render regular skills
                  category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>{skill}</li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
