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

  const categories = [
    { id: 'security', name: 'Security & Governance' },
    { id: 'cloud', name: 'Cloud & AI' },
    { id: 'privacy', name: 'Privacy & Compliance' },
    { id: 'leadership', name: 'Leadership & Recognition' }
  ];

  const certifications = [
    {
      name: 'Certified Information Systems Security Professional (CISSP)',
      issuer: 'ISC2',
      year: '2024',
      category: 'security',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/bbae2686-b50a-43c2-883c-bc052d541281'
    },
    {
      name: 'ISO 27001 Lead Auditor (ISMS)',
      issuer: 'Mastermind Assurance',
      year: '2025',
      category: 'security',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/d5f65c4b-4a1a-4c4c-96cf-5971756af729'
    },
    {
      name: 'GIAC Security Leadership (GSLC)',
      issuer: 'GIAC',
      year: '2023',
      category: 'security',
      certUrl: 'https://www.credly.com/badges/fc7597e4-e4c9-4478-a2e6-99c44369f9b1'
    },
    {
      name: 'Security Awareness Professional (SSAP)',
      issuer: 'SANS',
      year: '2023',
      category: 'security',
      certUrl: 'https://www.credly.com/badges/03638838-693a-4862-a933-60dc0c1f430c'
    },
    {
      name: 'Certified Information Systems Auditor (CISA)',
      issuer: 'ISACA',
      expected: 'Summer 2026',
      category: 'security',
      inProgress: true,
      certUrl: 'https://www.isaca.org/credentialing/cisa'
    },
    {
      name: 'AWS Certified Security Specialty',
      issuer: 'AWS',
      expected: 'Spring 2026',
      category: 'security',
      inProgress: true,
      certUrl: 'https://aws.amazon.com/certification/certified-security-specialty/'
    },
    {
      name: 'ISO 42001 Lead Auditor (AIMS)',
      issuer: 'Mastermind Assurance',
      year: '2025',
      category: 'cloud',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/e7430cff-b1a1-4980-af63-3ce72bde04c4'
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'AWS',
      year: '2025',
      category: 'cloud',
      certUrl: 'https://www.credly.com/badges/2d075048-9a61-43d9-8b97-58ff84aa0555'
    },
    {
      name: 'TAISE (Trusted AI Safety Expert)',
      issuer: 'Cloud Security Alliance',
      expected: 'Spring 2026',
      category: 'cloud',
      inProgress: true,
      certUrl: 'https://cloudsecurityalliance.org/artifacts/taise-course-outline'
    },
    {
      name: 'AWS Certified AI Practitioner',
      issuer: 'AWS',
      expected: 'Summer 2026',
      category: 'cloud',
      inProgress: true,
      certUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/'
    },
    {
      name: 'AWS Certified Developer',
      issuer: 'AWS',
      expected: 'Winter 2026',
      category: 'cloud',
      inProgress: true,
      certUrl: 'https://aws.amazon.com/certification/certified-developer-associate/'
    },
    {
      name: 'OneTrust Fellow of Privacy Technology',
      issuer: 'OneTrust',
      year: '2024',
      category: 'privacy',
      highlight: true,
      details: '10 specializations including Privacy, GRC, TPRM, PIAs, Data Mapping',
      certUrl: 'https://www.credly.com/badges/de15b56a-e8ba-4e88-9de3-25cde63f3122'
    },
    {
      name: 'ISO 27701 Lead Auditor (PIMS)',
      issuer: 'TBD',
      expected: 'Winter 2026',
      category: 'privacy',
      inProgress: true,
      certUrl: 'https://www.iso.org/standard/85819.html'
    },
    {
      name: 'GIAC Advisory Board Member',
      issuer: 'GIAC',
      year: '2023',
      category: 'leadership',
      certUrl: 'https://www.credly.com/badges/9edca151-4ece-4edf-aca0-dac53b796df1'
    },
    {
      name: 'TAISE Founding Contributor',
      issuer: 'Cloud Security Alliance',
      year: '2025',
      category: 'leadership',
      highlight: true,
      details: 'Supporting the development of industry standards for AI security governance',
      certUrl: 'https://cloudsecurityalliance.org/education/taise-donors'
    }
  ];

  const getCertsByCategory = (categoryId) => {
    return certifications.filter(cert => cert.category === categoryId);
  };

  return (
    <section className={`certifications ${isVisible ? 'visible' : ''}`} id="certifications" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="cert-grid">
          {categories.map((category) => {
            const certs = getCertsByCategory(category.id);
            if (certs.length === 0) return null;
            return (
              <div key={category.id} className="cert-category">
                <h3 className="cert-category-title">{category.name}</h3>
                <div className="cert-list">
                  {certs.map((cert, index) => (
                    <a 
                      key={index}
                      href={cert.certUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cert-card ${cert.highlight ? 'highlight' : ''} ${cert.inProgress ? 'in-progress' : ''} clickable`}
                    >
                      <div className="cert-header">
                        <h4 className="cert-name">{cert.name}</h4>
                        <span className={cert.inProgress ? 'cert-expected' : 'cert-year'}>
                          {cert.inProgress ? cert.expected : cert.year}
                        </span>
                      </div>
                      <p className="cert-issuer">{cert.issuer}</p>
                      {cert.details && <p className="cert-details">{cert.details}</p>}
                      {cert.inProgress && <span className="cert-status-badge">In Progress</span>}
                      <span className={`cert-link-indicator ${cert.inProgress ? 'info' : 'verify'}`}>
                        <span className="cert-link-icon">{cert.inProgress ? '📚' : '🏆'}</span>
                        <span className="cert-link-text">{cert.inProgress ? 'Info' : 'Verify'}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
