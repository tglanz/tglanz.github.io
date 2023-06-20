---
title: Kubernetes technical overview 
categories:
  - Kubernetes
tags:
  - Kubernetes
weight: 1
---

## Application packaging

An application should be

1. Packaged as a container
1. Wrapped in a _Pod_
1. Deployed via a declerative manifest file

## The declerative model 

According to the _declerative model_, we only declare about how we want the application to look like. It is Kubernetes' jpb to make sure the cluster behaves as intended.

_Manifests_ simple YAML files and they tell Kubernetes how the application should look like - the _desired state_.

_Controllers_ are constantly running and monitor the application's state, reconciling and difference betweeen the _observerd state_ and the _desired state_.

## Pods

In Kubernetes, _Pods_ are the atomic unit of scheduling. Kubernetes demands that every container runs inside a pod.

A simple model is to run a sigle container in every pod. 

Effectively, a _Pod_ is a construct for running one or more containers.

Pods are the most basic unit of scaling. We scale applications by adding or removing pods (not containers).

Pods are deployed atomiclly. A pod is ready only when all containers are up and running. A single pod executes on a single Node.

When a pod dies, a new one takes it's place. The new pod is a different instance with the same semantics, it has different id, ip etc..

Pods are immutable. If we want to change a pod's configuration, we must create a new pod to take it's place.

### Pod theory

There are 3 main reasons for Pods to exist

1. Pods augment containers 1. Pods assist in scheduling
1. Pods enable resource sharing

The augmentation is done in the following ways

- Labels / annotations
- Restart policies
- Probes (startup, readiness, liveness etc...)
- Affinity / anti-affinity rules (Affinities are related to specifying how specific pods behave with other pods)
- Termination control
- Security policies
- Resource requests and limits (min/max values on CPU, memory and I/O)

Pods have __Labels__ which lets us group Pods and associate them with other objects. 

Regarding resource sharing, Pods provide _shared execution environment_ for one or more containers. It includes

- Filesystem
- Network stack (IP address, routing, ports)
- Memory
- Volumes

Pods can be deployed either directly via a Pod manifest or indirectly via a controller. Pods deployed directly are called _static pods_.

## Deployments

A _Deployment_ is a higher-level controller. Usually we will deploy pods indirectly via a deployment.

The deployment controller monitors the state of a wrapped pod providing extra features such as self-healing, scaling, zero-downtime rollouts and versioned rollbacks.

## Services

A _Service_ is a Kubernetes contstruct which provides reliable networking for a set of pods.

As we know, pods are immutable and modifications due to auto scaling, rollbacks etc... result in replacements of pods - and the effective IPs.

_Services_ provide reliable names and IPs and provide load balancing capabilities over a set of pods.

## Examples of controllers

- Deployments
- DaemonSets
- StatefulSets

## Generall usefull commands

List all possible Pod attributes

    kubectl explain pods --recursive

## Multi container patterns

Kubernetes offers several well-defined multi-container Pod patterns

### Sidecar pattern

This pattern has a _main_ application container and a _sidecar_ container. The _sidecar's_ job is to augment and perform secondary tasks for the _main_ application container.

### Adapter pattern

This pattern is a specific variation of the _sidecar pattern_ where the _sidecar_ container takes non-standardized output from the _main_ container and standardize it as required by an external system.

### Ambassador pattern

This is another variation of the _sidecar pattern_ where the _sidecar_ brokers connectivity to an external system.

### Init pattern

This pattern has an _init_ container that's gauranteed to start and complete before your _main_ application container. It is also gauranteed to run exactly once!
