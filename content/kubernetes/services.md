---
title: Kubernetes Services 
categories:
  - Kubernetes
tags:
  - Kubernetes
weight: 3 
---

# Services 

_Service_ provides reliable access to _Pods_.

Main _Service_ concepts

- _Services_ are REST objects in the API that we define in a manifest file or post to the API server.
- Every service gets it's own __stable IP address__, it's own __stable DNS name__ and it's own __stable port__.
- _Services_ use __labels__ and __selectors__ to dynamically select the _Pods_ they send traffic to.

_Services_ get a list of healthy pods that match the relevant selctors using a Kubernetes object called an _Endpoint_. Kubernetes is continuously monitoring the state of the _Pods_ and updates the relevant _Endpoints'_ lists.

```bash
              +----------------+     +------------+     +--------------------------+
{request} --> | DNS resolution | --> | Service IP | --> | Pod in the Endpoint List |
              +----------------+     +------------+     +--------------------------+
```

Kubernetes native applications can query the API and directly find the _Service_ IP, bypassing DNS resolution.

