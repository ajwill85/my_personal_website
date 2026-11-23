# Contact Form Lambda Function

## Overview
Serverless contact form handler that sends email notifications via AWS SES when users submit the contact form.

## Features

- ✅ **Email notifications** via AWS SES
- ✅ **Input validation** for required fields, email format, and maximum lengths
- ✅ **CORS enabled** for cross-origin requests
- ✅ **HTML & plain text emails** for better compatibility
- ✅ **Environment-based configuration** (no hardcoded values)

## Environment Variables

- `FROM_EMAIL` - Verified SES sender email address, set from the `SESFromEmail` parameter
- `TO_EMAIL` - Recipient address, set from the `ContactToEmail` parameter. The function returns an error when this is unset.

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

### Using CloudFormation
```bash
aws cloudformation deploy \
  --template-file infrastructure/contact-form-api.yaml \
  --stack-name ajwill-contact-form-api \
  --parameter-overrides SESFromEmail=you@example.com SESIdentityName=you@example.com ContactToEmail=you@example.com \
  --capabilities CAPABILITY_NAMED_IAM
```

`SESFromEmail` and `SESIdentityName` are required and have no default. `SESIdentityName` must be a verified SES identity (email or domain). `ContactToEmail` is required and has no default. `FunctionName` and `ApiName` default to the deployed names `ajwill-contact-form-handler` and `ajwill-contact-form-api`.

The real addresses can live in an optional git-ignored `samconfig.toml` (`parameter_overrides = "SESFromEmail=you@example.com SESIdentityName=you@example.com ContactToEmail=you@example.com"`). `samconfig.toml` is listed in `.gitignore`.

CloudFormation keeps the inline placeholder code. After the stack update, deploy `index.js` separately:

```bash
cd lambda/contact-form
zip ../contact-form-deployment.zip index.js
aws lambda update-function-code \
  --function-name ajwill-contact-form-handler \
  --zip-file fileb://../contact-form-deployment.zip
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
