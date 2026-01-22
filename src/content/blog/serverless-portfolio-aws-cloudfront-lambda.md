---
title: "Building a Serverless Portfolio Website with AWS: CloudFront, Lambda, and DynamoDB"
date: "2025-10-18"
category: "Web Development"
excerpt: "How I built my portfolio website using AWS serverless architecture."
tags: ["AWS", "Serverless", "React", "Vite", "Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "ACM", "SES", "CloudFormation", "IaC"]
---

# Building a Serverless Portfolio Website with AWS: CloudFront, Lambda, and DynamoDB

Creating a portfolio website can be as simple as purchasing a domain and connecting it to a website builder, or paying a third party to do it all for you. However, deploying it with AWS infrastructure gives you a lot more control and is a great way to learn about AWS services, and work on your coding skills. In this post, I'll walk you through how I built **ajwill.ai** using a fully serverless AWS architecture that's scalable, cost-effective, and deployed with Infrastructure as Code (IaC).

## Why AWS Serverless?

When I started building my portfolio, I wanted to learn AWS services hands-on while creating something practical. Traditional hosting options felt limiting, and I wanted features like:

- **Global performance** - Fast loading times worldwide
- **Dynamic features** - Visitor counter and contact form
- **Automated deployments** - No manual file uploads
- **Low cost** - Pay only for what I use
- **Learning opportunity** - Real-world AWS experience

## The Architecture

Here's a high-level view of how the pieces fit together:

```
┌─────────────────┐
│   CloudFront    │ ← Global CDN for fast content delivery
└─────────┬───────┘
          │
┌─────────▼───────┐
│    S3 Bucket    │ ← Static website files (HTML, CSS, JS)
└─────────────────┘

┌─────────────────┐
│   API Gateway   │ ← REST API endpoints
└─────────┬───────┘
          │
┌─────────▼───────┐
│  Lambda Function│ ← Serverless code execution
└─────────┬───────┘
          │
┌─────────▼───────┐
│    DynamoDB     │ ← NoSQL database
└─────────────────┘
```

## AWS Services Used

### 1. S3 + CloudFront: Global Content Delivery

**Amazon S3** stores my website files (HTML, CSS, JavaScript, images). Think of it as a massive hard drive in the cloud, with virtually unlimited storage.

**CloudFront** is AWS's Content Delivery Network (CDN). It caches my website at 700+ Points of Presence in over 300 cities worldwide, so visitors get fast loading times regardless of where they are.

**Key Benefits:**
- Content loads in <50ms from nearby edge locations
- Free SSL certificates through AWS Certificate Manager (ACM)
- Automatic HTTPS redirect for security
- 99.9% uptime SLA

**What I learned:** CDNs make a huge difference in performance. Before CloudFront, my site took 2-3 seconds to load. After? Less than 1 second.

### 2. Lambda + API Gateway: Visitor Counter

I wanted a real-time visitor counter on my site. Instead of running a server 24/7, I used **AWS Lambda** - serverless functions that only run when needed. This saves a lot of money, and less maintenance.

**How it works:**
1. Visitor loads my website
2. JavaScript makes API call to API Gateway
3. API Gateway triggers Lambda function
4. Lambda checks DynamoDB for visitor count
5. Returns updated count to display on site

**Why this is cool:**
- No servers to manage or patch
- Only pay when someone visits (pennies per month)
- Automatically scales if I get traffic spikes
- Lambda handles the logic in Python

**What I learned:** Serverless is perfect for small, event-driven tasks. I don't need a server running 24/7 just to count visitors.

### 3. DynamoDB: Visitor Data Storage

**DynamoDB** is AWS's NoSQL database. I use it to store visitor information with IP-based deduplication (so refreshing the page doesn't inflate the count).

**Why DynamoDB:**
- Serverless - no database servers to manage
- Pay-per-request pricing (very cheap for low traffic)
- Automatically scales with traffic
- Built-in encryption and backups

**What I learned:** NoSQL databases are simpler for basic use cases. I didn't need complex SQL queries, just simple key-value storage.

### 4. SES: Contact Form Emails

**Amazon SES** (Simple Email Service) handles my contact form. When someone fills it out, a Lambda function sends me an email.

**Benefits:**
- Reliable email delivery
- Very cheap (3,000 emails free for first 12 months, then $0.10 per 1,000 emails)
- No email server to maintain
- Built-in spam protection

### 5. ACM: Free SSL Certificates

**AWS Certificate Manager** provides free SSL certificates that auto-renew. This means my site has HTTPS without paying for certificates or manually renewing them.

## Infrastructure as Code (IaC)

Instead of clicking through the AWS console to set everything up, I used **CloudFormation** templates. This means my entire infrastructure is defined in code.

**Benefits of IaC:**
- **Reproducible** - Can recreate everything with one command
- **Version controlled** - Track changes in Git
- **Documented** - The code IS the documentation
- **Testable** - Can deploy to test environments easily

**What I learned:** IaC takes longer upfront but saves massive time later. I can tear down and rebuild my entire infrastructure in minutes.

## Automated Deployment

I created a deployment script that:
1. Builds the React app with Vite
2. Uploads files to S3
3. Invalidates CloudFront cache (so changes appear immediately)

This means deploying updates is as simple as running `./deploy.sh`. No manual file uploads or cache clearing.

## Cost Breakdown

Here's a rough estimate of what this site costs me per month:

| Service | Cost |
|---------|------|
| S3 Storage (1 GB) | $0.02 |
| CloudFront (10 GB transfer) | $0.85 |
| Lambda (100K requests) | $0.20 |
| DynamoDB (1M reads/writes) | $0.25 |
| API Gateway (100K requests) | $0.35 |
| SES (1K emails) | $0.10 |
| **Total** | **~$1.78/month** |

**Reality check:** My actual costs are usually under $1/month and my traffic is lower than these estimates. You're also eligible for AWS Free Tier for the first year, which makes it even cheaper if you're using only free tier services in your AWS account.


## What I Learned

### 1. Serverless is Perfect for Personal Projects
I don't need to worry about server maintenance, scaling, or paying for idle resources. Everything scales automatically and I only pay for what I use. Website builder sites can costs anywhere from $10-30/month, and they're not even as customizable as this. I've used them in the past for ease of setup, but I wanted to get hands on experience with more AWS services, and refresh my coding skills. This is a great way to get hands on experience with AWS services while, and to also display your technical skills to potential employers, while sharing your resume with the world.

### 2. CDNs Make a Huge Difference
CloudFront transformed my site from "okay" to "blazing fast" globally. The performance improvement was immediately noticeable, especially compared to previous websites I created using website builder sites.

### 3. Infrastructure as Code is Worth It
While it took longer to set up initially, being able to version control my infrastructure and redeploy with one command is invaluable. It's also great for demonstrating your technical skills to potential employers.

### 4. AWS Free Tier is Generous
For a personal portfolio site, most AWS services stay within the free tier limits. My costs are minimal, but as you continue to create more projects, and add more services, you may exceed the free tier limits. Keep track of your spending using AWS Budgets to avoid unexpected charges...more on that in a later post!

### 5. Learning by Building Works
I learned more about AWS by building this project than I did from tutorials alone. Having a real use case made concepts stick. Now every time I want to update my resume, I am using the skills I learned from building this project. 

## Challenges I Faced

### CORS Configuration
Getting API Gateway and Lambda to work with my frontend required understanding CORS (Cross-Origin Resource Sharing). This took some trial and error.

### CloudFormation Learning Curve
CloudFormation templates can be intimidating at first. Start small and gradually add complexity.


### IAM Permissions
Getting Lambda permissions right (least privilege principle) required understanding IAM roles and policies. Giving yourself full admin access is not recommended for production environments, so if you're in or plan to be in the security field, start learning about IAM roles and policies early and practice what you preach!

## Future Improvements

I'm planning to add:

- **CI/CD Pipeline** - Automate deployments with GitHub Actions


## Conclusion

Building a serverless portfolio website with AWS was an incredible learning experience. I now have:

- A fast, globally-distributed website
- Hands-on experience with 8+ AWS services
- Infrastructure I can tear down and rebuild in minutes
- A project that costs less than a cup of coffee per month
- Real-world cloud architecture skills

If you're learning AWS, I highly recommend building something real. The lessons you learn going through the process of building something, deploying it, and maintaining it are invaluable.

**The best way to learn AWS is to build with it.**

---

*Live site: [ajwill.ai](https://ajwill.ai) | Source code: [GitHub](https://github.com/ajwill85/my_personal_website)*
