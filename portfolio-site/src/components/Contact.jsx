import { useEffect, useRef, useState } from 'react';
import './Contact.css';

const Contact = () => {
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
    <section className={`contact ${isVisible ? 'visible' : ''}`} id="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p className="contact-intro">
            I'm always open to discussing new opportunities, collaborations, or cybersecurity projects.
            Feel free to reach out!
          </p>
          
          <div className="contact-methods">
            <a href="mailto:ajwilliams85@gmail.com" className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>ajwilliams85@gmail.com</p>
            </a>
            
            <a href="https://linkedin.com/in/williamsakeem" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon">💼</div>
              <h3>LinkedIn</h3>
              <p>williamsakeem</p>
            </a>
            
            <a href="https://github.com/ajwill85" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon">💻</div>
              <h3>GitHub</h3>
              <p>ajwill85</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
