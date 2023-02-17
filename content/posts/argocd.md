---
title: ArgoCD
categories:
- ArgoCD 
tags:
- ArgoCD
- Kubernetes
---

This is not formal, but text I keep for my own reference

# Overview

> Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.

## Architecture

### API Server

> gRPC/REST server which exposes the API consumed by the Web UI, CLI and CI/CD systems

Practically, we contact the API Server to define and observer the CD

### Repository Server

Manages Git access by caching, generating and returning the Kubernetes manifests.

### Application Controller

The Application Controller monitors the state of the clusters and reconcile them according to CD definitions.
