# Portfolio Website

Modern, responsive portfolio website built with React and Vite, deployed on AWS with serverless architecture.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
my_personal_website/
├── src/              # React components and source code
├── public/           # Static assets (favicon, images)
├── lambda/           # AWS Lambda functions
│   ├── visitor-counter/  # Visitor counter Lambda
│   └── contact-form/     # Contact form Lambda
├── infrastructure/   # CloudFormation IaC templates
├── scripts/          # Deployment and setup scripts
├── docs/             # Project documentation
├── dist/             # Build output (gitignored)
├── deploy.sh         # Main deployment script
└── .env.example      # Environment variables template
```

## 🚀 Deployment

### Prerequisites

1. Copy `.env.example` to `.env` and fill in your AWS values:
   ```bash
   cp .env.example .env
   ```

2. Configure AWS CLI with your profile:
   ```bash
   aws configure --profile your-profile-name
   ```

### Deploy to AWS

```bash
# Make deploy script executable (first time only)
chmod +x deploy.sh

# Build and deploy
./deploy.sh
```

This will:
- Build the React app
- Upload to S3
- Invalidate CloudFront cache
- Site live in 1-2 minutes

## 📚 Documentation

- **[.env.example](.env.example)** - Environment variables template
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Detailed deployment guide
- **[docs/PORTFOLIO_RECOMMENDATIONS.md](docs/PORTFOLIO_RECOMMENDATIONS.md)** - Portfolio enhancement suggestions
- **[infrastructure/](infrastructure/)** - CloudFormation templates for AWS resources

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS3, Custom animations
- **Backend**: AWS Lambda, API Gateway, DynamoDB
- **Hosting**: AWS S3 + CloudFront CDN
- **Infrastructure**: CloudFormation (IaC)

## 💡 Making Updates

1. Edit components in `src/components/`
2. Test locally with `npm run dev`
3. Build with `npm run build`

## 🔒 Security

- Never commit `.env` files
- Environment variables for API endpoints
- HTTPS enforced

## 📄 License

© 2025 AJ Williams
