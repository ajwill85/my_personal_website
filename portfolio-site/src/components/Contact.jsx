import { useEffect, useRef, useState } from 'react';
import './Contact.css';

const CONTACT_API_ENDPOINT = 'https://lphfkvam87.execute-api.us-east-1.amazonaws.com/prod/contact';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
        });
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setFormStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again or email me directly.'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please email me directly at ajwilliams85@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`contact ${isVisible ? 'visible' : ''}`} id="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p className="contact-intro">
            I'm always open to discussing new opportunities, collaborations, or cybersecurity projects.
            Feel free to reach out!
          </p>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="form-input"
              />
            </div>
            
            {formStatus.message && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          
          {/* Contact Methods */}
          <div className="contact-divider">
            <span>Or connect with me directly</span>
          </div>

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
