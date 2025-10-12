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
            <p>
              Hello, I'm Akeem Williams, a Governance, Risk, and Compliance (GRC) professional 
              with a focus on AWS cloud security. I'm passionate about building secure cloud 
              environments and ensuring compliance with industry standards and regulations.
            </p>
            <p>
              I am a Certified Information Systems Security Professional (CISSP), ISO 27001 Lead 
              Auditor, and ISO 42001 Lead Auditor with extensive experience in cybersecurity 
              consulting and risk management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
