import { useEffect, useRef, useState } from 'react';
import './Certifications.css';

const Certifications = () => {
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

  const certifications = {
    completed: [
      {
        name: 'ISO 27001 Lead Auditor',
        issuer: 'Mastermind Assurance',
        year: '2025',
        highlight: true,
        credlyUrl: 'https://www.credly.com/badges/d5f65c4b-4a1a-4c4c-96cf-5971756af729'
      },
      {
        name: 'ISO 42001 Lead Auditor',
        issuer: 'Mastermind Assurance',
        year: '2025',
        highlight: true,
        credlyUrl: 'https://www.credly.com/badges/e7430cff-b1a1-4980-af63-3ce72bde04c4'
      },
      {
        name: 'Certified Information Systems Security Professional (CISSP)',
        issuer: 'ISC2',
        year: '2024',
        highlight: true,
        credlyUrl: 'https://www.credly.com/badges/bbae2686-b50a-43c2-883c-bc052d541281'
      },
      {
        name: 'OneTrust Fellow of Privacy Technology',
        issuer: 'OneTrust',
        year: '2024',
        highlight: true,
        details: '10 specializations including Privacy, GRC, TPRM, PIAs, Data Mapping',
        credlyUrl: 'https://www.credly.com/badges/de15b56a-e8ba-4e88-9de3-25cde63f3122'
      },
      {
        name: 'GIAC Security Leadership (GSLC)',
        issuer: 'GIAC',
        year: '2023',
        credlyUrl: 'https://www.credly.com/badges/fc7597e4-e4c9-4478-a2e6-99c44369f9b1'
      },
      {
        name: 'Security Awareness Professional (SSAP)',
        issuer: 'SANS',
        year: '2023',
        credlyUrl: 'https://www.credly.com/badges/03638838-693a-4862-a933-60dc0c1f430c'
      },
      {
        name: 'GIAC Advisory Board Member',
        issuer: 'GIAC',
        year: '2023'
      }
    ],
    inProgress: [
      {
        name: 'TAISE (Trusted AI Safety Expert)',
        issuer: 'Cloud Security Alliance',
        expected: '2025*',
        awsUrl: 'https://cloudsecurityalliance.org/artifacts/taise-course-outline'
      },
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'AWS',
        expected: 'Winter 2025',
        awsUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
      },
      {
        name: 'AWS Certified AI Practitioner',
        issuer: 'AWS',
        expected: 'Spring 2026',
        awsUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/'
      },
      {
        name: 'AWS Certified Security Specialty',
        issuer: 'AWS',
        expected: 'Summer 2026',
        awsUrl: 'https://aws.amazon.com/certification/certified-security-specialty/'
      },
      {
        name: 'AWS Certified Developer',
        issuer: 'AWS',
        expected: 'Winter 2026',
        awsUrl: 'https://aws.amazon.com/certification/certified-developer-associate/'
      },
      {
        name: 'ISO 27701 Lead Auditor',
        issuer: 'TBD',
        expected: '2026',
        awsUrl: 'https://www.iso.org/standard/85819.html'
      }
    ]
  };

  return (
    <section className={`certifications ${isVisible ? 'visible' : ''}`} id="certifications" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="cert-grid">
          {/* Completed Certifications */}
          <div className="cert-category">
            <h3 className="cert-category-title">Current Certifications</h3>
            <div className="cert-list">
              {certifications.completed.map((cert, index) => (
                cert.credlyUrl ? (
                  <a 
                    key={index}
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cert-card ${cert.highlight ? 'highlight' : ''} clickable`}
                  >
                    <div className="cert-icon-badge">🏆</div>
                    <div className="cert-header">
                      <h4 className="cert-name">{cert.name}</h4>
                      <span className="cert-year">{cert.year}</span>
                    </div>
                    <p className="cert-issuer">{cert.issuer}</p>
                    {cert.details && <p className="cert-details">{cert.details}</p>}
                  </a>
                ) : (
                  <div key={index} className={`cert-card ${cert.highlight ? 'highlight' : ''}`}>
                    <div className="cert-header">
                      <h4 className="cert-name">{cert.name}</h4>
                      <span className="cert-year">{cert.year}</span>
                    </div>
                    <p className="cert-issuer">{cert.issuer}</p>
                    {cert.details && <p className="cert-details">{cert.details}</p>}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* In Progress Certifications */}
          <div className="cert-category">
            <h3 className="cert-category-title">In Progress</h3>
            <div className="cert-list">
              {certifications.inProgress.map((cert, index) => (
                <a 
                  key={index}
                  href={cert.awsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card in-progress clickable"
                >
                  <div className="cert-icon-badge progress-icon">📚</div>
                  <div className="cert-header">
                    <h4 className="cert-name">{cert.name}</h4>
                    <span className="cert-expected">{cert.expected}</span>
                  </div>
                  <p className="cert-issuer">{cert.issuer}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Special Recognition */}
        <div className="special-recognition">
          <div className="recognition-card">
            <h4>🏆 Founding Contributor</h4>
            <p>
              <strong>CSA TAISE (Trusted AI Safety Expert) Certification</strong>
            </p>
            <p className="recognition-description">
              Supporting the development of industry standards for AI security governance
            </p>
            <a 
              href="https://cloudsecurityalliance.org/education/taise-donors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="recognition-link"
            >
              View Recognition →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
