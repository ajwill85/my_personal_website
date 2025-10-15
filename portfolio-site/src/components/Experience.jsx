import { useEffect, useRef, useState } from 'react';
import './Experience.css';

const Experience = () => {
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

  const articles = [
    {
      title: 'Is Security Awareness a Dirty Word?',
      link: 'https://humanriskintel.beehiiv.com/p/human-risk-management-security-awareness-is-a-dirty-word'
    }
  ];

  return (
    <section className={`experience ${isVisible ? 'visible' : ''}`} id="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Featured Articles</h2>
        
        <div className="experience-content">
          <div className="articles">
            <ul className="article-list">
              {articles.map((article, index) => (
                <li key={index}>
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {article.title} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
