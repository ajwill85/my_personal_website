import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <div className="hero-text">
          <h1 className="hero-name">Akeem Williams</h1>
          <h2 className="hero-title">
            Cybersecurity Consultant | ISO 27001 Lead Auditor | ISO 42001 Lead Auditor
          </h2>
          <p className="hero-location">Fresno, CA | Remote</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="/resume/Akeem_Williams_GRC_Engineer_Resume.pdf" className="btn btn-secondary" download>Download Resume</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
