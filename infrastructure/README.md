# Infrastructure as Code

CloudFormation templates for AWS resources.

## Templates

### Core Infrastructure

- **`visitor-counter.yaml`** - DynamoDB + Lambda + API Gateway for visitor tracking
  - Creates DynamoDB table for visitor data
  - Lambda function with IP-based deduplication
  - API Gateway HTTP API endpoint
  - IAM roles and permissions

- **`contact-form-api.yaml`** - API Gateway + Lambda + SES for contact form
  - Lambda function for form handling
  - SES integration for email notifications
  - API Gateway HTTP API with CORS
  - IAM roles for SES permissions

### Website Hosting

- **`website-infrastructure.yaml`** - S3 + CloudFront + ACM + Route53
  - S3 bucket for static hosting
  - CloudFront distribution with SSL
  - ACM certificate for custom domain
  - Route53 DNS configuration
  - **Use this if**: Managing DNS with Route53

- **`website-infrastructure-cloudflare.yaml`** - S3 + CloudFront + ACM (Cloudflare DNS)
  - Same as above, but without Route53
  - **Use this if**: Managing DNS with Cloudflare

- **`website-infrastructure-no-domain.yaml`** - S3 + CloudFront only
  - Basic hosting without custom domain
  - **Use this if**: Testing or using CloudFront domain

## Deployment

### Deploy Visitor Counter

```bash
aws cloudformation deploy \
  --template-file visitor-counter.yaml \
  --stack-name portfolio-visitor-counter \
  --parameter-overrides ProjectName=my-portfolio \
  --capabilities CAPABILITY_IAM
```

### Deploy Contact Form

```bash
aws cloudformation deploy \
  --template-file contact-form-api.yaml \
  --stack-name ajwill-contact-form-api \
  --parameter-overrides SESFromEmail=you@example.com SESIdentityName=you@example.com ContactToEmail=you@example.com \
  --capabilities CAPABILITY_NAMED_IAM
```

`SESFromEmail` and `SESIdentityName` are required and have no default. `SESIdentityName` must be a verified SES identity (email or domain). `ContactToEmail` is required. `FunctionName` and `ApiName` default to `ajwill-contact-form-handler` and `ajwill-contact-form-api`.

CloudFormation keeps the inline placeholder handler. After the stack update, deploy the function code separately:

```bash
cd lambda/contact-form
zip ../contact-form-deployment.zip index.js
aws lambda update-function-code \
  --function-name ajwill-contact-form-handler \
  --zip-file fileb://../contact-form-deployment.zip
```

To keep real addresses out of shell history, put the same overrides in an optional git-ignored `samconfig.toml` (`parameter_overrides = "SESFromEmail=you@example.com SESIdentityName=you@example.com ContactToEmail=you@example.com"`). `samconfig.toml` is listed in `.gitignore`.

### Deploy Website Infrastructure

```bash
# With custom domain (Route53)
aws cloudformation deploy \
  --template-file website-infrastructure.yaml \
  --stack-name portfolio-website \
  --parameter-overrides DomainName=example.com \
  --capabilities CAPABILITY_IAM

# With custom domain (Cloudflare DNS)
aws cloudformation deploy \
  --template-file website-infrastructure-cloudflare.yaml \
  --stack-name portfolio-website \
  --parameter-overrides DomainName=example.com \
  --capabilities CAPABILITY_IAM

# Without custom domain
aws cloudformation deploy \
  --template-file website-infrastructure-no-domain.yaml \
  --stack-name portfolio-website \
  --capabilities CAPABILITY_IAM
```

## Get Stack Outputs

```bash
# Get API endpoints and resource names
aws cloudformation describe-stacks \
  --stack-name portfolio-visitor-counter \
  --query 'Stacks[0].Outputs'
```

## Update Stacks

```bash
# After modifying a template
aws cloudformation deploy \
  --template-file visitor-counter.yaml \
  --stack-name portfolio-visitor-counter \
  --capabilities CAPABILITY_IAM
```

## Delete Stacks

```bash
# Warning: This will delete all resources
aws cloudformation delete-stack --stack-name portfolio-visitor-counter
```

## Parameters

### Common Parameters

- **ProjectName**: Prefix for resource names (lowercase, hyphens only)
- **DomainName**: Your custom domain (e.g., example.com)
- **SESFromEmail**: Required verified SES email address. No default. Pass `--parameter-overrides SESFromEmail=you@example.com`.
- **ContactToEmail**: Required recipient address. No default. Pass `ContactToEmail=you@example.com`.
- **SESIdentityName**: Required verified SES identity (email or domain). No default. Pass `SESIdentityName=you@example.com`.
- **FunctionName**: Lambda function name. Defaults to `ajwill-contact-form-handler`.
- **ApiName**: HTTP API name. Defaults to `ajwill-contact-form-api`.

### Environment-Specific

Set these in your `.env` file after deployment:
- `VITE_VISITOR_COUNTER_API` - From visitor-counter stack outputs
- `VITE_CONTACT_FORM_API` - From contact-form stack outputs
- `VITE_S3_BUCKET_NAME` - From website stack outputs
- `VITE_CLOUDFRONT_DISTRIBUTION_ID` - From website stack outputs

## Best Practices

1. **Use parameters** instead of hardcoding values
2. **Tag resources** for cost tracking and organization
3. **Enable CloudFormation drift detection** to catch manual changes
4. **Use stack policies** to prevent accidental deletion of critical resources
5. **Version control** all template changes

## Troubleshooting

### Stack Creation Failed

```bash
# View stack events to see what failed
aws cloudformation describe-stack-events \
  --stack-name portfolio-visitor-counter \
  --max-items 20
```

### Stack Stuck in UPDATE_ROLLBACK_FAILED

```bash
# Continue rollback
aws cloudformation continue-update-rollback \
  --stack-name portfolio-visitor-counter
```

## Notes

- All templates include proper IAM roles with least-privilege access
- CORS is configured for API endpoints
- CloudFront distributions include security headers
- DynamoDB tables use on-demand billing for cost optimization
