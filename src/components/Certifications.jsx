import './Certifications.css';

const Certifications = () => {

  const categories = [
    { id: 'security', name: 'Security & Governance' },
    { id: 'ai', name: 'AI Safety & Trust' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'privacy', name: 'Privacy' },
    { id: 'tools', name: 'Tools & Platforms' }
  ];

  const certifications = [
    // Security and Risk certs
    {
      name: 'Certified Information Systems Security Professional (CISSP)',
      issuer: 'ISC2',
      year: '2024',
      category: 'security',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/bbae2686-b50a-43c2-883c-bc052d541281'
    },
    {
      name: 'Fellow of Management Systems Auditing',
      issuer: 'Mastermind Assurance',
      year: '2026',
      category: 'security',
      highlight: true,
      details: 'ISO 27001 (ISMS), ISO 27701 (PIMS), ISO 42001 (AIMS)',
      certUrl: 'https://www.credly.com/badges/cf764458-0e06-43b7-a325-5e42539223b4'
    },
    {
      name: 'Certified GRC Engineer - Auditor (CGE-AUD)',
      issuer: 'GRC Engineering Club',
      year: '2026',
      category: 'security',
      certUrl: 'https://cert.grcengclub.com/verify/cgeaud-4433d608-0b63-43cf-a782-2229d291450c'
    },
    {
      name: 'Certified GRC Engineer - Practitioner (CGE-P)',
      issuer: 'GRC Engineering Club',
      expected: '2026',
      category: 'security',
      inProgress: true,
      certUrl: 'https://www.grcengclub.com/academy'
    },
    // {
    //   name: 'Certified in Risk and Information Systems Control (CRISC)',
    //   issuer: 'ISACA',
    //   expected: '2027',
    //   category: 'security',
    //   planned: true,
    //   certUrl: 'https://www.isaca.org/credentialing/crisc'
    // },
    // {
    //   name: 'Certified Information Systems Auditor (CISA)',
    //   issuer: 'ISACA',
    //   expected: '2027',
    //   category: 'security',
    //   planned: true,
    //   certUrl: 'https://www.isaca.org/credentialing/cisa'
    // },
    // {
    //   name: 'Certified in Governance, Risk and Compliance (CGRC)',
    //   issuer: 'ISC2',
    //   expected: '2026',
    //   category: 'security',
    //   planned: true,
    //   details: 'NIST RMF / FedRAMP authorization (ATO) lifecycle',
    //   certUrl: 'https://www.isc2.org/certifications/cgrc'
    // },
    // AI certs
    {
      name: 'ISO 42001 Lead Auditor (AIMS)',
      issuer: 'Mastermind Assurance',
      year: '2025',
      category: 'ai',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/e7430cff-b1a1-4980-af63-3ce72bde04c4'
    },
    {
      name: 'TAISE (Trusted AI Safety Expert)',
      issuer: 'Cloud Security Alliance',
      year: '2026',
      category: 'ai',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/345c2819-8260-4024-86b0-d3fd47f1ee4b/'
    },
    {
      name: 'AWS Certified AI Practitioner',
      issuer: 'AWS',
      expected: 'Summer 2026',
      category: 'ai',
      inProgress: true,
      certUrl: 'https://aws.amazon.com/certification/certified-ai-practitioner/'
    },
    {
      name: 'AIGP (AI Governance Professional)',
      issuer: 'IAPP',
      expected: '2026',
      category: 'ai',
      inProgress: true,
      certUrl: 'https://www.iapp.org/certify/aigp'
    },
    {
      name: 'Claude Certified Architect (CCA-F)',
      issuer: 'Anthropic',
      expected: '2027',
      category: 'ai',
      planned: true,
      certUrl: 'https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request'
    },
    // Cloud certs
    {
      name: 'AWS Cloud Institute - Cloud Application Developer',
      issuer: 'AWS',
      year: '2026',
      category: 'cloud',
      highlight: true,
      certUrl: 'https://www.credly.com/badges/c6ad1947-e1e2-466f-a3f1-a031517f4349'
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'AWS',
      year: '2025',
      category: 'cloud',
      certUrl: 'https://www.credly.com/badges/2d075048-9a61-43d9-8b97-58ff84aa0555'
    },
    {
      name: 'AWS Certified Developer',
      issuer: 'AWS',
      expected: 'Summer 2026',
      category: 'cloud',
      inProgress: true,
      certUrl: 'https://aws.amazon.com/certification/certified-developer-associate/'
    },
    // {
    //   name: 'AWS Certified Security Specialty',
    //   issuer: 'AWS',
    //   expected: '2027',
    //   category: 'cloud',
    //   planned: true,
    //   certUrl: 'https://aws.amazon.com/certification/certified-security-specialty/'
    // },
    // {
    //   name: 'Google Professional Cloud Architect (PCA)',
    //   issuer: 'Google',
    //   expected: '2027',
    //   category: 'cloud',
    //   planned: true,
    //   certUrl: 'https://cloud.google.com/certification/cloud-architect'
    // },
    // {
    //   name: 'Certified Cloud Security Professional (CCSP)',
    //   issuer: 'ISC2',
    //   expected: '2027',
    //   category: 'cloud',
    //   planned: true,
    //   certUrl: 'https://www.isc2.org/certifications/ccsp'
    // },
    // Privacy certs
    {
      name: 'OneTrust Fellow of Privacy Technology',
      issuer: 'OneTrust',
      year: '2024',
      category: 'privacy',
      highlight: false,
      details: '10 specializations including Privacy, GRC, TPRM, PIAs, Data Mapping',
      certUrl: 'https://www.credly.com/badges/de15b56a-e8ba-4e88-9de3-25cde63f3122'
    },
    // {
    //   name: 'CIPP/US (Certified Information Privacy Professional/United States)',
    //   issuer: 'IAPP',
    //   expected: 'Late 2026',
    //   category: 'privacy',
    //   planned: true,
    //   certUrl: 'https://iapp.org/certify/cipp/'
    // },
    // {
    //   name: 'Fellow of Information Privacy (FIP)',
    //   issuer: 'IAPP',
    //   expected: '2027',
    //   category: 'privacy',
    //   planned: true,
    //   details: 'Milestone designation unlocked by AIGP & CIPP/US with CISSP experience waiver.',
    //   certUrl: 'https://iapp.org/certify/fip/'
    // },
    // {
    //   name: 'HITRUST Certified CSF Practitioner (CCSFP)',
    //   issuer: 'HITRUST',
    //   expected: '2028',
    //   category: 'privacy',
    //   planned: true,
    //   details: 'Healthcare security & privacy control framework (HITRUST CSF)',
    //   certUrl: 'https://hitrustalliance.net/hitrust-academy'
    // },
    // Tool and Platform specific certs
    {
      name: 'Verified Vanta Admin',
      issuer: 'Vanta',
      year: '2026',
      category: 'tools',
      highlight: false,
      certUrl: 'https://learning.vanta.com/certificate/-SP5CWG_5w'
    }

    // ---------------------------------------------------------------------
    // EARNED BUT INTENTIONALLY HIDDEN
    // These are all legitimately earned (not roadmap items) and are kept here
    // for the record only. They are commented out to avoid oversaturating the
    // page; anyone who wants the full list can dig into the Credly profile.
    // Uncomment to surface
    // ---------------------------------------------------------------------
    // {
    //   name: 'Security Leadership (GSLC)',
    //   issuer: 'GIAC',
    //   year: '2023',
    //   category: 'security',
    //   certUrl: 'https://www.credly.com/badges/fc7597e4-e4c9-4478-a2e6-99c44369f9b1'
    // },
    // {
    //   name: 'GIAC Advisory Board',
    //   issuer: 'GIAC',
    //   year: '2023',
    //   category: 'security',
    //   details: 'Invitation only, extended to GIAC certified professionals with exemplary exam performance',
    //   certUrl: 'https://www.credly.com/badges/9edca151-4ece-4edf-aca0-dac53b796df1'
    // },
    // {
    //   name: 'Security Awareness Professional (SSAP)',
    //   issuer: 'SANS',
    //   year: '2023',
    //   category: 'security',
    //   details: 'Managing and measuring human cyber risk',
    //   certUrl: 'https://www.credly.com/badges/03638838-693a-4862-a933-60dc0c1f430c'
    // },
    // {
    //   name: 'ISO/IEC 27001:2022 Lead Auditor (ISMS)',
    //   issuer: 'Mastermind Assurance',
    //   year: '2025',
    //   category: 'security',
    //   details: 'Component credential of the Fellow of Management Systems Auditing designation',
    //   certUrl: 'https://www.credly.com/badges/d5f65c4b-4a1a-4c4c-96cf-5971756af729'
    // },
    // {
    //   name: 'ISO/IEC 27701:2025 Lead Auditor (PIMS)',
    //   issuer: 'Mastermind Assurance',
    //   year: '2026',
    //   category: 'privacy',
    //   details: 'Component credential of the Fellow of Management Systems Auditing designation',
    //   certUrl: 'https://www.credly.com/badges/283c675e-3337-41c6-bc48-d01f4b90429a'
    // },
    // {
    //   name: 'OneTrust Certified GRC Professional',
    //   issuer: 'OneTrust',
    //   year: '2023',
    //   category: 'privacy',
    //   details: 'Predecessor credential to the OneTrust Fellow of Privacy Technology',
    //   certUrl: 'https://www.credly.com/badges/8af830aa-2f05-48e3-bc93-8176a82a93b5'
    // },
    // {
    //   name: 'Google AI Professional Certificate',
    //   issuer: 'Coursera',
    //   year: '2026',
    //   category: 'ai',
    //   certUrl: 'https://www.credly.com/badges/89907f6c-485c-431a-a0fa-1dcc021e3488'
    // },
    // {
    //   name: 'Qualys VMDR Certified Specialist',
    //   issuer: 'Qualys',
    //   year: '2023',
    //   category: 'tools',
    //   details: 'Vulnerability Management, Detection and Response. Not a Credly badge',
    //   certUrl: 'https://www.qualys.com/training/certification/'
    // },
    // {
    //   name: 'Google Cybersecurity Professional Certificate',
    //   issuer: 'Coursera',
    //   year: '2023',
    //   category: 'tools',
    //   certUrl: 'https://www.credly.com/badges/de8c4b08-d41d-4210-8e43-423fdcb7dd0e'
    // }
  ];

  const getCertsByCategory = (categoryId) => {
    return certifications.filter(cert => cert.category === categoryId);
  };

  return (
    <section className="certifications visible" id="certifications">
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
                      className={`cert-card ${cert.highlight ? 'highlight' : ''} ${cert.inProgress ? 'in-progress' : ''} ${cert.planned ? 'planned' : ''} clickable`}
                    >
                      <div className="cert-header">
                        <h4 className="cert-name">{cert.name}</h4>
                        <span className={cert.inProgress ? 'cert-expected' : cert.planned ? 'cert-expected planned' : 'cert-year'}>
                          {cert.inProgress || cert.planned ? cert.expected : cert.year}
                        </span>
                      </div>
                      <p className="cert-issuer">{cert.issuer}</p>
                      {cert.details && <p className="cert-details">{cert.details}</p>}
                      {cert.inProgress && <span className="cert-status-badge">In Progress</span>}
                      {cert.planned && <span className="cert-status-badge planned">Roadmap</span>}
                      <span className={`cert-link-indicator ${cert.inProgress ? 'info' : cert.planned ? 'planned' : 'verify'}`}>
                        <span className="cert-link-icon">
                          {cert.inProgress || cert.planned ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="8" r="7" />
                              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                            </svg>
                          )}
                        </span>
                        <span className="cert-link-text">{cert.inProgress || cert.planned ? 'Info' : 'Verify'}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="cert-footer">
          <a
            className="cert-credly-link"
            href="https://www.credly.com/users/akeem-williams.e2621e0a/badges"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
            View more verified credentials on Credly
          </a>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
