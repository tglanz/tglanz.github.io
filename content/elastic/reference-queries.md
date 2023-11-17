---
title: Elasticsearch, Reference Queries
categories:
- Elasticsearch
tags:
- Elastissearch
priority: 10
---

# Reference Queries

Count docs in ```some-index```

```GET some-index/_count```

Find min of ```field-a``` and max of ```field-b``` in ```some-index```

```
POST some-index/_search
{
  "size": 0,
  "aggs": {
    "min-field-a": {
      "min": {
        "field": "field-a"
      }
    },
    "max-field-b": {
      "max": {
        "field": "field-b"
      }
    }
  }
}
```

Delete by query - where ```x = 1```.

```
POST some-index/_delete_by_query
{
  "query": {
    "match": {
      "x": 1
    }
  }
}
```