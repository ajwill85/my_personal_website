---
title: "How Amazon Q and Terraform Destroy saved me $100 a month!"
date: "2026-04-14"
category: "DevOps"
excerpt: "I recently used Terraform to manage my AWS infrastructure for a pet project I was working on, but I never realized how much I was wasting until I started using Amazon Q to analyze my costs. I was able to identify several areas where I could optimize my spending, and I'm excited to share my findings with you."
tags: ["AWS", "DevOps", "Terraform", "Amazon Q", "Cost Optimization", "Infrastructure as Code", "CloudFormation", "Security", "Compliance", "Risk Management", "Third Party Risk Management", "Security Audit"]
---

## Learning Costs

See trello board for more.

Blog Notes:

Tools: Cost Explorer, Amazon Q, Terraform, Elastic IPs

Create a blog post about the sentiment analyzer project, and how over the course of multiple months it increased AWS costs. I then used Amazon Q to determine which website(resources) were using EC2 instances, since I didn’t recall setting up any EC2 Instances.

Show Costs from Cost ExplorerAmazon Q prompt: Which website is linked to the EC2 usage?

Screenshots saved in personal files folder.

Terraform destroy is unable to delete S3 bucket and ECR repositories. These have to be manually deleted via AWS Console. This is by AWS design to prevent accidental deletion of data.