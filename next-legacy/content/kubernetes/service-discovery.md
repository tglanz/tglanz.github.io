---
title: Service Discovery 
categories:
  - Kubernetes
tags:
  - Kubernetes
weight: 4 
---

# Service Discovery

Service discovery is a mean for applications to find one another in the cluster.

There are two major components to service discovery

- Registration
- Discovery

Service registration is when an application registers itself in a _service registry_.

Kubernetes uses its internal DNS as a _service registry_, and as we know, _Services_ are automatically registered with DNS.

For discovery to work, Kubernetes provides a well-known internal DNS services that are called the __cluster DNS__, in the namespace __kube-system__. Every _Pod_ in the cluster is automatically configured to where this service is. The relevant _Pods_ are managed by a _Deployment_ called __coredns__ and frontend by a _Service_ called __kube-dns__. 

For illustration

```
kubectl get pods --namespace kube-system --selector k8s-app=kube-dns

NAME                       READY   STATUS    RESTARTS   AGE
coredns-6d4b75cb6d-4lpv9   1/1     Running   0          139m
coredns-6d4b75cb6d-vmkfz   1/1     Running   0          139m

```

We specify a _Service_ DNS using it's name (in the metadata)
