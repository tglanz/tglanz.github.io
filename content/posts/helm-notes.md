---
title: Helm Notes
categories:
- Notes
tags:
- Helm
- Kubernetes
- Notes
---

# 

List charts in a repo

    helm search repo prometheus-community

Show values of a chart

    helm show values prometheus-community/prometheus

Upgrade or install chart to a specific namespace with a specific version

    helm --namespace observability upgrade --install my-prometheus prometheus-community/prometheus --version "19.0.1"
