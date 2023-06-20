---
title: Notes
categories:
- Kubernetes
---

## Cert Manager ClusterIssuer fails to connect to webhook

If installing through helm, make sure that the leader election is on a specific namespace:

```yaml
values:
  global:
    leaderElection:
      namespace: cert-manager
```

## Check space left in PV

Just execute `df` inside the pod that has the volume mounted.

    kubectl -n {namespace} exec {pod}  -- df -ah
