---
title: Kubernetes Deployments 
categories:
  - Kubernetes
tags:
  - Kubernetes
weight: 2
---

# Deployments

A _Deployment_ manages _ReplicaSets_ and _ReplicaSets_ manage _Pods_.

_ReplicaSet_ manage _Pods_ and bring self-healing and scaling capabilities while _Deployments_ manage _ReplicaSets_ and add rollout and rollback capabilities.

### Self-healing and scalability

If _Pods_ managed by a _Deployment_ fail, they will be replaced - this is known as _self healing_.

If _Pods_ managed by a _Deployment_ see increased/decreased load, they will be _scaled_.

In Kubernetes there are 3 related concepts

- _desired state_
- _observerd state_
- _reconciliation_

_ReplicaSets_ are implemented as a controller running background process comparing the _desired state_ vs the _observed state_. If they are different it contacts the cluster to perform _reconciliation_.

### Rolling updates

Zero downtime, rolling updates (a.k.a rollouts) can be supported when a service has backward and forward compatibility. One by one, the _ReplicaSet_ bring a replica down and introduces a new one with the designated version until all of the _Pods_ are updated with the desired version.

It is crucial that the services be stateless and backward/forward compatible for this to work.

### Rollbacks

### Commands

To scale a _Deployment_

    kubectl scale deployment {deployment-name} --replicas {number-of-replicas}

After changing image versions, initiate rollouts simply by reaplying a manifest

    kubectl apply -f {manifest-path}

We can monitor the rollout progress by

    kubectl rollout status deployment {deployment-name}

To pause a rollout

    kubectl rollout pause deployment {deployment-name}

To resume a rollout

    kubectl rollout resume deployment {deployment-name}

In the manifests we can specify ```revisionHistoryLimit``` for containers. 

To show rollout history

    kubectl rollout history deployment {deployment-name}

To rollback to a revision

    kubectl rollout undo deployment {deployment-name} --to-revision={revision-number}


