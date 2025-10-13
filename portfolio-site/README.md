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

### Deploy to AWS

```bash
# Quick deploy (uses .env file)
./deploy-site.sh

# Or specify credentials
./deploy-site.sh <bucket-name> <distribution-id>
```

## 📁 Project Structure

- **src/** - React source code and components
- **public/** - Static assets
- **cloudformation/** - AWS infrastructure templates
- **scripts/** - Deployment and setup scripts
- **lambda/** - Lambda function code

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[.env.example](.env.example)** - Environment variables template

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS3, Custom animations
- **Hosting**: AWS S3 + CloudFront
- **CDN**: CloudFront with global edge locations
- **SSL**: AWS Certificate Manager
- **DNS**: Cloudflare
- **Backend**: AWS Lambda + API Gateway + DynamoDB

## 💡 Making Updates

1. Edit components in `src/components/`
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Deploy with `./deploy-site.sh`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔒 Security

- Never commit `.env` files
- AWS credentials stored securely
- HTTPS enforced
- Origin Access Control enabled

## 📄 License

© 2025 AJ Williams
