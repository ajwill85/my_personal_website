import { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
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

  return (
    <section className={`about ${isVisible ? 'visible' : ''}`} id="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="intro">
              I'm a <strong>GRC Engineer and ISO Lead Auditor</strong> specializing in AI governance, 
              privacy controls, and cloud security automation. I bridge the gap between compliance 
              requirements and technical implementation—turning regulatory frameworks into{' '}
              <strong>automated, enforceable controls</strong>.
            </p>
            
            <p>
              My approach combines deep technical expertise with governance frameworks. I've built 
              an <strong>AWS AI Governance Framework</strong> implementing 55+ automated controls 
              using policy-as-code (OPA/Rego), developed serverless applications on AWS, and 
              conducted ISO 27001/42001 audits for organizations navigating complex compliance landscapes.
            </p>
            
            <p>
              I'm a <strong>founding contributor to CSA's TAISE (Trusted AI Security and Ethics) 
              certification</strong>, supporting the development of industry standards for AI security 
              governance. As an <strong>OneTrust Fellow of Privacy Technology</strong> and <strong>CISSP</strong>, 
              I bring a unique blend of privacy engineering, cloud security, and risk management. 
              I'm passionate about making security and compliance practical, measurable, and 
              integrated into the development lifecycle—not just checkboxes.
            </p>
            
            <p className="cta">
              Currently available for GRC engineering roles and consulting engagements focused on 
              AI governance, privacy automation, and cloud security compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
