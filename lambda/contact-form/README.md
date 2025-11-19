# Contact Form Lambda Function

## Overview
Serverless contact form handler that sends email notifications via AWS SES when users submit the contact form.

## Features

- ✅ **Email notifications** via AWS SES
- ✅ **Input validation** for required fields
- ✅ **CORS enabled** for cross-origin requests
- ✅ **HTML & plain text emails** for better compatibility
- ✅ **Environment-based configuration** (no hardcoded values)

## Environment Variables

- `FROM_EMAIL` - Verified SES sender email address
- `TO_EMAIL` - Recipient email address for form submissions

## Request Format

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "budget": "$10k-$50k",
  "message": "I'd like to discuss a project..."
}
```

## Response Format

### Success (200)
```json
{
  "message": "Email sent successfully",
  "messageId": "abc123..."
}
```

### Error (400/500)
```json
{
  "error": "Missing required fields"
}
```

## Deployment

### Package and Deploy
```bash
# Create deployment package
cd lambda/contact-form
zip -r ../contact-form-deployment.zip index.js

# Deploy to AWS
aws lambda update-function-code \
  --function-name your-contact-form-function \
  --zip-file fileb://../contact-form-deployment.zip
```

### Using CloudFormation
```bash
aws cloudformation deploy \
  --template-file infrastructure/contact-form-api.yaml \
  --stack-name portfolio-contact-form \
  --parameter-overrides SESFromEmail=your-verified-email@example.com \
  --capabilities CAPABILITY_IAM
```

## IAM Permissions Required

- `ses:SendEmail`
- `ses:SendRawEmail`

## SES Setup

1. **Verify sender email** in AWS SES console
2. **Request production access** (if sending to unverified emails)
3. **Configure environment variables** in Lambda function

## Testing

```bash
# Test the API endpoint
curl -X POST https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Notes

- **SES Sandbox**: In sandbox mode, you can only send to verified email addresses
- **Rate limits**: Default SES sending rate is 1 email/second (can be increased)
- **CORS**: Configured to allow all origins (`*`) - restrict in production if needed
