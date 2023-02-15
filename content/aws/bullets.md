---
title: Aws, Bullets 
categories:
  - Aws
---

# Available Storage Types

- Block
    - EBS
- File
    - EFS
    - FSx Lustre
    - FSx Windows
- Block
    - S3
    - Glacier

# EBS Volume Types

**EBS** is a block storage.

It provides one of the following volume types, with the following categories

- Solid state (SSD)
    - General Purpose SSD - Provides a sane cost/performance balance
    - Provisioned IOPS SSD - High performance, mission-critical, low latency and high-throughput
- Hard disk drives (HDD)
    - Throughput Optimized HDD - Low cost HDD for throughput intensive workloads
    - Cold HDD - Lowest cost HDD for less frequently accessed workloads
- Previous generation

# ELB

- Application Load Balancer (ALB) - Works at application layer (layer 7 osi) HTTP/HTTPS
    - Host based routing - Balance using the host and port portion of the url (scheme://host:port/path)
    - Path based routing - Balance using the path portion of the url (scheme://host:port/path)

- Network Load Balancer (NLB) - Works at the network layer (layer 4 osi) IP

# Route53 routing policies

- Simple Round Robin - Route the user in a round robin fashion accross servers
- Weighted - Weight precentage of routes for each server
- Geolocation - Route the user to the geographically nearest server

# EC2 Instance Types

- General Purpose (m4)
- Compute Optimized
- Memory Optimized
- Accelerated Computing - Using hardware accelerators
- Storage Optimized
- High Memory - Acquired only using special request
