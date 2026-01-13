import './Experience.css';

const Experience = () => {

  const publications = [
    {
      title: 'Is Security Awareness a Dirty Word?',
      publication: 'Human Risk Management',
      link: 'https://humanriskintel.beehiiv.com/p/human-risk-management-security-awareness-is-a-dirty-word',
      date: '2024-01-15',
      type: 'Article'
    },
    {
      title: 'GIAC Advisory Board Member',
      publication: 'Global Information Assurance Certification',
      link: 'https://www.credly.com/badges/9edca151-4ece-4edf-aca0-dac53b796df1',
      date: '2023',
      type: 'Recognition'
    },
    {
      title: 'TAISE Founding Contributor',
      publication: 'Cloud Security Alliance',
      link: 'https://cloudsecurityalliance.org/education/taise-donors',
      date: '2025',
      type: 'Contribution'
    }
  ];

  return (
    <section className="experience visible" id="experience">
      <div className="container">
        <h2 className="section-title">Thought Leadership & Recognition</h2>

        <div className="publications-grid">
          {publications.map((pub, index) => (
            <article key={index} className="publication-card">
              <div className="publication-header">
                <span className="publication-type">{pub.type}</span>
                <span className="publication-date">{pub.date}</span>
              </div>
              <h3 className="publication-title">
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  {pub.title}
                </a>
              </h3>
              <p className="publication-source">{pub.publication}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
