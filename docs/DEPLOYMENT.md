# Portfolio Site Deployment Guide

This folder contains everything needed to develop, build, and deploy your portfolio website to AWS.

## 📁 Project Structure

```
portfolio-site/
├── src/                          # React source code
│   ├── components/               # React components
│   ├── assets/                   # Images, fonts, etc.
│   └── main.jsx                  # App entry point
├── public/                       # Static assets
├── dist/                         # Build output (generated)
├── cloudformation/               # AWS infrastructure templates
│   ├── website-infrastructure.yaml
│   ├── website-infrastructure-cloudflare.yaml
│   ├── website-infrastructure-no-domain.yaml
│   ├── visitor-counter.yaml
│   └── contact-form-api.yaml
├── scripts/                      # Deployment scripts
│   ├── deploy.sh                 # Main deployment script
│   ├── bootstrap.sh              # Environment setup
│   └── validate-stack.sh         # CloudFormation validation
├── lambda/                       # Lambda function code
│   └── visitor-counter/          # Visitor counter Lambda
├── package.json                  # Node dependencies
├── vite.config.js                # Vite build config
└── DEPLOYMENT.md                 # This file
```

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to AWS

```bash
# Deploy to your live site
./scripts/deploy.sh <bucket-name> <distribution-id>

# Or with a specific AWS profile
./scripts/deploy.sh <bucket-name> <distribution-id> my-profile
```

---

## 📝 Making Content Updates

### 1. Update Project Information

Edit `src/components/Projects.jsx` to add/modify projects:

```javascript
const projects = [
  {
    name: 'Project Name',
    description: 'Project description...',
    technologies: ['React', 'AWS', 'Python'],
    liveLink: 'https://example.com',      // Optional
    githubLink: 'https://github.com/...'  // Optional
  }
];
```

### 2. Update Other Sections

- **About**: `src/components/About.jsx`
- **Skills**: `src/components/Skills.jsx`
- **Contact**: `src/components/Contact.jsx`
- **Hero**: `src/components/Hero.jsx`

### 3. Test Locally

```bash
npm run dev
```

### 4. Build and Deploy

```bash
# Build
npm run build

# Deploy
./scripts/deploy.sh <bucket-name> <distribution-id>
```

---

## 🏗️ AWS Infrastructure

### Current Setup

Your site uses:
- **S3**: Static file hosting
- **CloudFront**: Global CDN
- **Route 53**: DNS management (if using custom domain)
- **ACM**: SSL certificate
- **Lambda**: Visitor counter API
- **API Gateway**: API endpoint
- **DynamoDB**: Visitor count storage

### CloudFormation Templates

1. **website-infrastructure-cloudflare.yaml**
   - Main infrastructure template
   - Uses Cloudflare for DNS
   - Includes S3, CloudFront, ACM

2. **visitor-counter.yaml**
   - Lambda function for visitor counter
   - API Gateway endpoint
   - DynamoDB table

3. **contact-form-api.yaml**
   - Contact form Lambda
   - SES email integration

### Getting Stack Information

```bash
# List your CloudFormation stacks
aws cloudformation describe-stacks

# Get specific stack outputs
aws cloudformation describe-stacks \
  --stack-name <your-stack-name> \
  --query 'Stacks[0].Outputs'
```

---

## 🔧 Deployment Scripts

### deploy.sh

Main deployment script that:
1. Validates AWS credentials
2. Uploads files to S3
3. Invalidates CloudFront cache

**Usage:**
```bash
./scripts/deploy.sh <bucket-name> <distribution-id> [aws-profile]
```

**Example:**
```bash
./scripts/deploy.sh ajwill-portfolio-bucket E1A2B3C4D5E6F default
```

### bootstrap.sh

One-time setup script that:
- Installs AWS CLI
- Configures AWS credentials
- Sets up development environment

**Usage:**
```bash
./scripts/bootstrap.sh
```

### validate-stack.sh

Validates CloudFormation templates before deployment:

**Usage:**
```bash
./scripts/validate-stack.sh cloudformation/website-infrastructure.yaml
```

---

## 📦 Complete Deployment Workflow

### First Time Setup (Already Done)

1. ✅ AWS account created
2. ✅ CloudFormation stacks deployed
3. ✅ Domain configured
4. ✅ SSL certificate validated
5. ✅ Site deployed

### Regular Updates (Your Workflow)

1. **Make changes** to React components
2. **Test locally**: `npm run dev`
3. **Build**: `npm run build`
4. **Deploy**: `./scripts/deploy.sh <bucket> <distribution-id>`
5. **Wait 1-2 minutes** for CloudFront cache invalidation
6. **Verify** changes at https://ajwill.ai

---

## 🔍 Finding Your AWS Resources

### Bucket Name

```bash
aws cloudformation describe-stacks \
  --stack-name <your-stack-name> \
  --query 'Stacks[0].Outputs[?OutputKey==`WebsiteBucket`].OutputValue' \
  --output text
```

### CloudFront Distribution ID

```bash
aws cloudformation describe-stacks \
  --stack-name <your-stack-name> \
  --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
  --output text
```

### Or check the AWS Console:
- CloudFormation → Stacks → Your Stack → Outputs tab

---

## 🛠️ Troubleshooting

### Changes Not Showing Up

1. **Clear CloudFront cache** (deploy script does this automatically)
2. **Hard refresh browser**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. **Wait 2-3 minutes** for invalidation to complete
4. **Check invalidation status**:
   ```bash
   aws cloudfront list-invalidations --distribution-id <distribution-id>
   ```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist .vite
npm run build
```

### Deployment Errors

```bash
# Verify AWS credentials
aws sts get-caller-identity

# Check S3 bucket exists
aws s3 ls s3://<bucket-name>

# Check CloudFront distribution
aws cloudfront get-distribution --id <distribution-id>
```

### 404 Errors on Page Refresh

This is already handled in CloudFormation template with error responses that redirect to index.html.

---

## 💡 Tips & Best Practices

### Development

- Use `npm run dev` for hot-reload during development
- Test responsive design at different screen sizes
- Check browser console for errors

### Deployment

- Always build before deploying: `npm run build`
- Use meaningful commit messages
- Test locally with `npm run preview` before deploying
- Keep your AWS credentials secure (never commit them)

### Performance

- Optimize images before adding them
- Use WebP format for images when possible
- Lazy load components with React.lazy()
- Monitor bundle size: `npm run build` shows sizes

### Security

- Never commit `.env` files with secrets
- Rotate AWS access keys regularly
- Use IAM roles with minimal permissions
- Enable MFA on AWS account

---

## 📊 Monitoring & Analytics

### CloudWatch Metrics

View CloudFront and Lambda metrics:
```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=<distribution-id> \
  --start-time 2025-01-01T00:00:00Z \
  --end-time 2025-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

### Access Logs

Enable CloudFront logging in the CloudFormation template to track:
- Page views
- Geographic distribution
- Popular pages
- Error rates

---

## 💰 Cost Tracking

### Current AWS Services

- **S3**: ~$0.10-0.50/month
- **CloudFront**: ~$0.50-2.00/month
- **Route 53**: $0.50/month
- **Lambda**: Free tier (1M requests/month)
- **DynamoDB**: Free tier (25GB storage)

### Set Up Billing Alerts

1. Go to AWS Billing Dashboard
2. Create budget alert
3. Set threshold (e.g., $10/month)
4. Add email notification

---

## 🔄 CI/CD (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: |
          aws s3 sync dist/ s3://${{ secrets.BUCKET_NAME }} --delete
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.DISTRIBUTION_ID }} \
            --paths "/*"
```

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/)
- [AWS CloudFront](https://docs.aws.amazon.com/cloudfront/)

---

## 🎯 Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Deployment
./scripts/deploy.sh <bucket> <distribution-id>

# AWS CLI
aws s3 ls s3://<bucket-name>                    # List S3 files
aws cloudfront create-invalidation ...          # Clear cache
aws cloudformation describe-stacks ...          # Get stack info
```

### File Locations

- **Components**: `src/components/`
- **Styles**: `src/components/*.css` or `src/*.css`
- **Assets**: `src/assets/` or `public/`
- **Build Output**: `dist/`
- **CloudFormation**: `cloudformation/`
- **Scripts**: `scripts/`

---

**Need help?** Check the troubleshooting section or refer to the original `aws-deployment-kit` folder for detailed guides.

**Happy deploying!** 🚀
