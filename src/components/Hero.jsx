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
            GRC Engineer & ISO Lead Auditor
            <br />
            <span className="hero-subtitle">Security & AI Governance</span>
          </h2>
          <p className="hero-location">Fresno, CA | Remote</p>
          
          {/* Key Highlights */}
          <div className="highlights-grid">
            <div className="highlight-item clickable" onClick={() => handleNavigation('projects')}>
              <span className="highlight-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
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
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <div>
                <h4>ISO Lead Auditor</h4>
                <p>27001 & 42001 Certified</p>
              </div>
            </div>
            <div className="highlight-item clickable" onClick={() => handleNavigation('experience')}>
              <span className="highlight-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <path d="M20 8v6M23 11h-6"/>
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
            <a href="/resume/Akeem_Williams_GRC_Engineer_Resume.pdf" className="btn btn-secondary" download>Download Resume</a>
            <button onClick={() => handleNavigation('contact')} className="btn btn-secondary">Contact Me</button>
            <a href="https://github.com/ajwill85" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub</a>
          </div>

          {/* About Me Content */}
          <div className="about-content">
            <div className="about-text">
              <p className="intro">
                I'm a <strong>GRC Engineer and ISO Lead Auditor</strong> specializing in Cloud Security, AI governance, 
                privacy controls, and compliance automation. I bridge the gap between compliance 
                requirements and technical implementation, turning regulatory frameworks into{' '}
                <strong>automated, enforceable controls</strong>.
              </p>
              
              <div className="about-expanded" id="about-expanded">
                <p>
                  My approach combines technical expertise with governance frameworks. I've built 
                  an <strong>AWS AI Governance Framework</strong> implementing 67+ automated controls 
                  using policy-as-code (OPA/Rego), developed serverless applications on AWS, and 
                  certified to conduct ISO 27001/42001 audits for organizations navigating complex compliance landscapes.
                </p>
                
                <p>
                  I'm a <strong>founding contributor to CSA's TAISE (Trusted AI Safety Expert) 
                  certification</strong>, supporting the development of industry standards for secure, 
                  responsible, and ethical use of AI. 
                  As an <strong>OneTrust Fellow of Privacy Technology</strong> and <strong>CISSP</strong>, 
                  I bring a unique blend of privacy engineering, cloud security, and risk management. 
                  I'm passionate about making security and compliance practical, measurable, and 
                  integrated into the development lifecycle—not just checkboxes.
                </p>
                
                <p className="cta">
                  Currently available for GRC engineering roles and audit engagements focused on cloud security compliance,
                  AI governance, privacy automation, and compliance framework implementation.
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
