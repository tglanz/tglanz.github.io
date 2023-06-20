---
title: Operator
categories:
- kubernetes
tags:
- Operator
- kubernetes
- guide
---

# Operator

> Operators are software extensions that make use of custom resources to manage applications and their components

A Custom Resource is a custom extension of the kubernetes API.

An Operator defines Custom Resources that it will manage through a Controller in a process called reconciliation. 

Kubernetes constantly invokes Controllers, each making small adjustments to the cluster. Each Controller tracks objects of specific resource types. Those objects have a spec field that represents the desired state of the object which the Controller will try to reach to trhough those small adjustments.

In essence, an Operator contains Custom Resource Definitions (CRDs) and Controllers that implements reconciliation logics to manage those Custom Resources.
