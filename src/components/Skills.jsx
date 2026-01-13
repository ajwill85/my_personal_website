import './Skills.css';

const Skills = () => {

  const skillCategories = [
    {
      title: 'Risk & Security Management',
      skills: [
        'Risk Assessment & Management',
        'Security Auditing & Control Implementation',
        'Policy Development & Compliance Management',
        'Security Architecture',
        'Third-Party Risk Management (TPRM)'
      ]
    },
    {
      title: 'Compliance & Governance',
      skills: [
        'ISO Standards (27001, 42001, 27701)',
        'NIST Frameworks (CSF, RMF, AI RMF)',
        'Privacy Regulations (GDPR, CCPA)',
        'SOC 2'
      ]
    },
    {
      title: 'AI Safety & Trust',
      skills: [
        'AI/ML Governance & Safety',
        'AI Safety & Trustworthiness',
        'AI Risk Assessment Methodologies',
        'AI Ethics & Responsible AI'
      ]
    },
    {
      title: 'Privacy & Data Protection',
      skills: [
        'Privacy Impact Assessments (PIAs)',
        'Data Subject Rights & Consent Management',
        'Privacy by Design & Data Mapping',
        'PII Protection & Data Masking',
        'Privacy Program Management'
      ]
    },
    {
      title: 'Cloud Security & Infrastructure',
      skills: [
        'AWS Security (IAM, KMS, CloudTrail, CloudWatch)',
        'AWS AI/ML (SageMaker)',
        'CloudFront CDN & ACM',
        'EventBridge & Event-Driven Architecture',
        'DNS Management (Cloudflare, Route 53) & SSL/TLS'
      ]
    },
    {
      title: 'Leadership & Communication',
      skills: [
        'Technical Writing & Documentation',
        'Project Management',
        'Stakeholder Communication',
        'Security Training & Awareness'
      ]
    },
    {
      title: 'Programming & Automation',
      skills: [
        'Python (boto3, FastAPI, NLP/Vader)',
        'JavaScript (Node.js, React, Vite, TypeScript)',
        'Policy-as-Code (OPA/Rego)',
        'Bash Scripting'
      ]
    },
    {
      title: 'DevOps & Infrastructure',
      skills: [
        'Infrastructure as Code (CloudFormation, Terraform)',
        'AWS Serverless (Lambda, API Gateway, DynamoDB, S3, SES)',
        'Containerization (Docker)',
        'CI/CD (GitHub Actions, Pipelines)'
      ]
    }
  ];

  return (
    <section className="skills visible" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category"
            >
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
