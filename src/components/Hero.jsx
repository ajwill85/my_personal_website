import './Hero.css';

const Hero = () => {

  const handleNavigation = (route) => {
    window.location.hash = route;
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-profile">
          <img src="/favicon.jpg" alt="Akeem Williams" className="profile-image" />
        </div>
        <div className="hero-text">
          <h1 className="hero-name">Akeem Williams</h1>
          <h2 className="hero-title">
            Security & AI Governance
          </h2>
          <p className="hero-location">CA/FL | Remote</p>

          {/* Key Highlights */}
          <div className="highlights-grid">
            <div className="highlight-item clickable" onClick={() => handleNavigation('projects')}>
              <span className="highlight-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>
              <div>
                <h4>67+ Automated Controls</h4>
                <p>AWS AI Governance Framework</p>
              </div>
            </div>
            <div className="highlight-item clickable" onClick={() => handleNavigation('certifications')}>
              <span className="highlight-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <div>
                <h4>ISO Lead Auditor</h4>
                <p>ISO 27001, 27701 & 42001</p>
              </div>
            </div>
            <div className="highlight-item clickable" onClick={() => handleNavigation('experience')}>
              <span className="highlight-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
              </span>
              <div>
                <h4>CSA TAISE Contributor</h4>
                <p>Founding Member</p>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <button onClick={() => handleNavigation('projects')} className="btn btn-primary">View Projects</button>
            <a href="mailto:aj@ajwill.ai?subject=Resume%20Request" className="btn btn-secondary">Request Resume</a>
            <a href="mailto:aj@ajwill.ai" className="btn btn-secondary">Contact Me</a>
            <a href="https://github.com/ajwill85" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
          </div>

          {/* About Me Content */}
          <div className="about-content">
            <div className="about-text">
              <p className="intro">
                I'm a <strong>GRC professional</strong> specializing in AI governance,
                compliance automation, and Third-Party Risk Management (TPRM) in cloud-native SaaS environments. I bridge the gap between compliance
                requirements and technical implementation, turning regulatory frameworks into{' '}
                <strong>automated, enforceable controls</strong>.
              </p>

              <div className="about-expanded" id="about-expanded">
                <p>
                  My approach combines technical expertise with governance frameworks. I've built
                  an <strong>AWS AI Governance Framework</strong> implementing 67+ automated controls
                  using policy-as-code (OPA/Rego), developed serverless applications on AWS, and
                  certified as a Fellow of Management Systems Auditing (ISO 27001, 27701, 42001) for organizations navigating complex compliance landscapes.
                </p>

                <p>
                  As a <strong>CISSP</strong> and founding contributor to the <strong>CSA TAISE (Trusted AI Safety Expert)</strong> program,
                  I support the development of industry standards for secure, responsible, and ethical AI. I bring a unique blend of
                  cloud security, AI safety governance, and technical risk management, and I'm passionate about making compliance
                  practical, measurable, and integrated into the development lifecycle—not just checkboxes.
                </p>

                <p className="cta">
                  Currently leading security compliance and AI governance at a <strong>venture-backed B2B AI SaaS company</strong>,
                  and available for select GRC consulting and ISO audit engagements.
                </p>
              </div>

              <button
                className="read-more-btn"
                onClick={() => {
                  const expanded = document.getElementById('about-expanded');
                  const btn = event.target;
                  if (expanded.style.display === 'none' || expanded.style.display === '') {
                    expanded.style.display = 'block';
                    btn.textContent = 'Read Less';
                  } else {
                    expanded.style.display = 'none';
                    btn.textContent = 'Read More';
                  }
                }}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
