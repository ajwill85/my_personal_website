---
title: "Building a Real-Time Cybersecurity News Aggregator with AWS Lambda and DynamoDB"
date: "2025-11-18"
category: "Content Delivery"
excerpt: "How I built a cybersecurity news aggregator that pulls from multiple sources using AWS serverless architecture."
tags: ["AWS", "Lambda", "DynamoDB", "React", "Vite", "API Gateway", "S3", "CloudFront", "Cybersecurity", "News Aggregator"]
---

# Building a Real-Time Cybersecurity News Aggregator with AWS Lambda and DynamoDB

Staying current with cybersecurity news is challenging. Between RSS feeds, Reddit, Hacker News, and various security blogs, it's easy to miss important updates. That's why I built **Human Risk Intelligence** (humanriskintel.com) - a centralized cybersecurity news aggregator that automatically pulls from trusted sources and categorizes content across 15+ security topics.

In this post, I'll share how I used AWS serverless architecture to build a real-time news aggregator that's fast, scalable, and costs almost nothing to run.

## The Problem

I follow a lot of different news sources - RSS feeds, security blogs, Reddit, Hacker News, and especially LinkedIn where I follow other cybersecurity professionals sharing news and insights.

**The challenge:** Sometimes I just want the news without the noise. LinkedIn is great for networking, but scrolling through posts to find actual news is time-consuming. Plus, LinkedIn is starting to feel more and more like twitter, but not in a good way. I wanted an easy way to sort and filter through cybersecurity news for specific topics without the distractions.

I needed a tool that could:
- Aggregate news from multiple trusted sources automatically
- Filter by specific security topics I cared about
- Cut through the social media noise
- Give me just the headlines and links, nothing more

There are existing news aggregators, but I had two main goals:

**1. Solve my own problem:** I wanted custom categorization for the security topics I actually cared about, with full control over data sources and filtering. No subscriptions, no paywalls, no algorithmic feeds trying to keep me engaged.

**2. Learn AWS services:** I wanted to create a project that would help me learn and use AWS services hands-on. Building something real that I'd actually use daily was the perfect way to further build my technical skills while solving a practical problem.

This project gave me the opportunity to work with Lambda, DynamoDB, EventBridge, and API Gateway in a real-world scenario - not just following tutorials, but architecting a solution from scratch.

## The Solution

I built a React-based news aggregator powered by AWS serverless backend that:
- Automatically fetches news from multiple sources I already follow
- Categorizes articles across 15+ security topics
- Updates in real-time without manual intervention
- Caches content for offline access


## Architecture Overview

```
┌─────────────────┐
│  EventBridge    │ ← Scheduled triggers (every 15 minutes)
└─────────┬───────┘
          │
┌─────────▼───────┐
│  Lambda Function│ ← Fetch news from sources
└─────────┬───────┘
          │
┌─────────▼───────┐
│    DynamoDB     │ ← Store articles
└─────────┬───────┘
          │
┌─────────▼───────┐
│   API Gateway   │ ← REST API
└─────────┬───────┘
          │
┌─────────▼───────┐
│  React Frontend │ ← Display news
└─────────────────┘
(Hosted on S3 + CloudFront)
```

## AWS Services Used

### 1. Lambda: Automated News Fetching

**AWS Lambda** runs my news fetching code every 15 minutes without needing a server running 24/7.

**How it works:**
1. EventBridge triggers Lambda function on schedule
2. Lambda fetches from RSS feeds
3. Parses and categorizes articles
4. Stores in DynamoDB
5. Shuts down until next trigger

**Why this is powerful:**
- Only runs for ~30 seconds every 15 minutes
- Costs pennies per month (literally)
- Automatically scales if I add more sources
- No server maintenance or patching

**What I learned:** Event-driven architecture is perfect for scheduled tasks. I don't need a cron job running on a server - Lambda handles everything.

### 2. DynamoDB: Article Storage

**DynamoDB** stores all fetched articles with metadata like source, category, publish date, and URL.

**Benefits:**
- Serverless - no database servers to manage
- Fast queries for recent articles
- Automatic scaling with traffic


### 3. EventBridge: Scheduled Triggers

**EventBridge** (formerly CloudWatch Events) triggers my Lambda function every 15 minutes to fetch new articles.

**Why EventBridge:**
- Reliable scheduling (cron-like)
- No server needed for scheduling
- Built-in monitoring and logging
- Can trigger multiple functions if needed

**What I learned:** EventBridge is like cron jobs in the cloud, but more reliable and easier to manage.

## Data Sources

### 1. RSS Feeds

I pull from trusted cybersecurity blogs and news sites:
- Krebs on Security
- Schneier on Security
- The Hacker News (thehackernews.com)
- Bleeping Computer
- Dark Reading

**Challenge:** Each RSS feed has different formats. I had to normalize data across sources.

### 2. Hacker News

Hacker News has excellent security-related discussions. I filter for posts tagged with security topics.

**API benefits:**
- Clean JSON format
- No authentication required
- Reliable uptime

## Smart Categorization

One of the key features is automatic categorization across 15+ topics:

- **Malware & Ransomware**
- **Phishing & Social Engineering**
- **Vulnerabilities & Exploits**
- **Privacy & Compliance**
- **Cloud Security**
- **AI/ML Security**
- **Incident Response**
- **Threat Intelligence**
- ...and more

**How it works:**
Lambda function uses keyword matching to categorize articles based on title and description. It's not perfect, but it's surprisingly effective.

**What I learned:** Simple keyword matching can be very effective. I don't need complex ML models for basic categorization.


## Challenges I Faced

### RSS Feed Parsing

Different RSS feeds have different formats. Some use `<description>`, others use `<content>`. I had to handle multiple formats.

**Solution:** Created a flexible parser that tries multiple fields and falls back gracefully.

### Duplicate Detection

Same article might appear in multiple sources. I needed to deduplicate.

**Solution:** Hash article URLs and check DynamoDB before inserting. Simple but effective.

### Category Accuracy

Keyword-based categorization isn't perfect. Some articles get miscategorized.

**Solution:** Continuously refine keyword lists based on manual review. It's an ongoing process.

## Future Improvements

Features I may add in the future:

- **Email Digest** - Daily/weekly email summaries using SES
- **Saved Articles** - User accounts to save favorite articles
- **Better Categorization** - ML-based categorization using AWS Comprehend
- **More Sources** - Add Twitter/X feeds and security vendor blogs
- **Mobile App** - Native iOS/Android apps

Frontend needs major work! I was definitely more focused on the backend and AWS services this time around. I'm hoping to improve the frontend in the future.

## Conclusion

Building a cybersecurity news aggregator with AWS serverless architecture was an excellent learning experience. I now have:

- A tool I use daily to stay current on security news
- Hands-on experience with Lambda, DynamoDB, EventBridge, and other AWS services
- A project with minimal costs to operate
- Real-world event-driven architecture skills
- A portfolio project demonstrating cloud expertise


Let me know what you think about the site, and if you have any questions or comments, please let me know!
---

*Live site: [humanriskintel.com](https://www.humanriskintel.com) | Source code: [GitHub](https://github.com/ajwill85/hri_3.0)*
