---
title: Services
categories:
    - Aws
---

# S3

- Object-Based, Serverless, Unlimited storage service
- Data is replicated across at least 3 AZs which ensures 99.99% __Availability__ and 11' 9s of __Durability__
- Objects contain data and can have size for 0 Byts to 5 Terabytes
- Buckets names are unique globally and contain either Objects or Folders (which in turn contain Objects)

- __Lifecycle Management__ is a mechanism to delete/move objects between __Storage Classes__ based on schedule or some criteria

[Exampro Cheatsheet](https://youtu.be/Ia-UEYYR44s?t=3524)

Types of Replication
- Cross-Region Replication (CRR) - Bucket is **asynchronously** replicated to another region
- Same-Region Replication (SRR) - Bucket is **asynchronously** replicated to the same region

# Snowball

- Snowball
- Snoball Edge
- Snowmobile

# VPC

- VPC Peering
- Route Tables
- Internet Gateway
- Bastion / Jumpbox
- Direct Connect

## VPC Endpoints

- Interface Endpoints
- Gateway Endpoints

## VPC Flow Logs

# NACL

# Security Groups 

# NAT

# IAM

# COGNITO

# DNS

# Route 53

# EC2

## EC2 Pricing

## AMI

## Auto Scaling Groups

## ELB

# EFS

# EBS

# Cloud Front

# Aurora

# Redshift

# DynamoDB

# CloudFormation

# CloudWatch

# CloudTrail

# Lambda

# SQS

# SNS

# ElasticCache

# High Availability

# Elastic Beanstalk

# Kinesis

Realtime processing platform.

# Storage Gateway

Provides on-premise storage access to cloud storage.

Practically you install a VM on the on-premise host which will can be connected as NFS/SMB.

Storage Types
- S3 File Gateway
- FSx File Gateway
- Tape Gateway
- Volume Gateway

Modes
- Gateway Stored - Access data in the VM and synchronously get data from remote
- Cached Stored - Frequently accessed data is cached at the VM and data is invalidated asynchronously
