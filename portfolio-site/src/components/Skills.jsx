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
      title: 'Cloud Platforms',
      skills: ['Amazon Web Services (AWS)']
    },
    {
      title: 'Security & Compliance',
      skills: ['ISO 27001', 'ISO 42001', 'NIST CSF', 'NIST RMF']
    },
    {
      title: 'Tools & Technologies',
      skills: ['CloudFormation', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'VS Code']
    },
    {
      title: 'Programming/Scripting',
      skills: ['Python', 'Bash', 'JavaScript', 'React']
    },
    {
      title: 'GRC Frameworks',
      skills: ['Risk Assessment', 'Security Auditing', 'Policy Development', 'Compliance Management']
    },
    {
      title: 'Other Skills',
      skills: ['Technical Writing', 'Project Management', 'Stakeholder Communication', 'Security Architecture']
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
