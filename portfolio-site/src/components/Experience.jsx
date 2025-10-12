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

  const certifications = [
    {
      name: 'CISSP (Certified Information Systems Security Professional)',
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
      name: 'SSAP (SANS Security Awareness Professional)',
      credlyUrl: 'https://www.credly.com/badges/03638838-693a-4862-a933-60dc0c1f430c'
    },
    {
      name: 'GSLC (GIAC Security Leadership Certificate)',
      credlyUrl: 'https://www.credly.com/badges/fc7597e4-e4c9-4478-a2e6-99c44369f9b1'
    },
    {
      name: 'OneTrust Fellow of Privacy Technology',
      credlyUrl: 'https://www.credly.com/badges/de15b56a-e8ba-4e88-9de3-25cde63f3122'
    },
    {
      name: 'GIAC Advisory Board',
      credlyUrl: 'https://www.credly.com/badges/9edca151-4ece-4edf-aca0-dac53b796df1'
    }
  ];

  const articles = [
    {
      title: 'Is Security Awareness a Dirty Word?',
      link: 'https://humanriskintel.beehiiv.com/p/human-risk-management-security-awareness-is-a-dirty-word'
    }
  ];

  return (
    <section className={`experience ${isVisible ? 'visible' : ''}`} id="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Experience & Achievements</h2>
        
        <div className="experience-content">
          <div className="certifications">
            <h3>Certifications</h3>
            <ul className="cert-list">
              {certifications.map((cert, index) => (
                <li 
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={cert.credlyUrl ? 'clickable' : ''}
                >
                  {cert.credlyUrl ? (
                    <a 
                      href={cert.credlyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cert-link"
                    >
                      <span className="cert-icon">✓</span>
                      <span className="cert-name">{cert.name}</span>
                      <span className="cert-badge">🏆</span>
                    </a>
                  ) : (
                    <>
                      <span className="cert-icon">✓</span>
                      <span className="cert-name">{cert.name}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="articles">
            <h3>Featured Articles</h3>
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
