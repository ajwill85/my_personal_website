# Visitor Counter Lambda Function

## Overview
This Lambda function provides accurate unique visitor tracking for the portfolio website with IP-based deduplication and bot filtering.

## Features

### ✅ Unique Visitor Tracking
- **IP-based deduplication**: Only counts each IP address once per 24 hours
- **Privacy-focused**: Stores SHA-256 hash of IP addresses, not actual IPs
- **Bot filtering**: Automatically filters out common bots and crawlers

### ✅ Visit Types
- `new_visitor`: First time seeing this IP address
- `returning_visitor`: IP seen before, but more than 24 hours ago
- `duplicate_within_24h`: Same IP within 24 hours (not counted)
- `bot_filtered`: Request from a bot/crawler (not counted)

### ✅ Bot Detection
Filters requests containing these keywords in user agent:
- bot, crawler, spider, scraper
- curl, wget, python-requests

## DynamoDB Schema

### Main Counter
```json
{
  "id": "visitor-count",
  "count": 130,
  "last_updated": 1729185455
}
```

### Individual Visitor Records
```json
{
  "id": "visitor_<ip_hash>",
  "last_visit": 1729185455,
  "ip_hash": "abc123...",
  "user_agent": "Mozilla/5.0...",
  "visit_count": 3
}
```

## Deployment

### Package and Deploy
```bash
# Create deployment package
cd lambda-visitor-counter
zip -r ../lambda-deployment.zip index.py

# Deploy to AWS
aws lambda update-function-code \
  --function-name your-lambda-function-name \
  --zip-file fileb://lambda-deployment.zip
```

### Test
```bash
# Test the API endpoint
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/count
```

## API Response

### Success Response
```json
{
  "count": 130,
  "message": "Visitor count retrieved successfully",
  "visit_type": "new_visitor",
  "is_bot": false
}
```

### Error Response
```json
{
  "error": "Failed to update visitor count",
  "message": "Error details..."
}
```

## Configuration

### Environment Variables
- `TABLE_NAME`: Your DynamoDB table name (e.g., `portfolio-visitors`)

### IAM Permissions Required
- `dynamodb:GetItem`
- `dynamodb:PutItem`
- `dynamodb:UpdateItem`

## Accuracy Improvements

### Before
- ❌ Counted every page load
- ❌ No bot filtering
- ❌ No deduplication
- ❌ Inflated counts

### After
- ✅ Unique visitors only (24-hour window)
- ✅ Bot filtering
- ✅ IP-based deduplication
- ✅ Accurate visitor counts

## Notes

- **24-hour window**: Same visitor counted again after 24 hours
- **Privacy**: IP addresses are hashed (SHA-256) before storage
- **CORS enabled**: Allows requests from any origin
- **Lightweight**: No external dependencies beyond boto3
