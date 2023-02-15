---
title: Elasticsearch, Usecase 1, Simple rollover
categories:
- elasticsearch
tags:
- elasticsearch
- ilm
weight: 100
---

# Use case

Create ILM policy with the following

- Rollover daily
- Delete indexes that are older than 3 days 

# Steps

## ILM Policy

Create an ILM policy named ```tal``` using the [ILM Policy API](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management-api.html).

At first we specify that the ```hot``` phase should rollover on a daily basis.

We also specify that the ```delete``` phase contains indices with a minimum age of 3 days. To delete the indices that are in the delete phase  we need to add the ```delete``` action to the phase - It is not implicit.

```
PUT _ilm/policy/tal
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_age": "1d"
          }
        }
      },
      "delete": {
        "min_age": "3d",
        "actions": {
          "delete": {} 
        }
      }
    }
  }
}
```

To verify, get the newly created policy by

```
GET _ilm/policy/tal
```

## Index Template

Create an index template.

Our intention is to have rollover that will create 3 indices in the form ```tal-00001```, ```tal-00002``` and ```tal-00003```. In order to interact with those as a single index we provide an ```alias``` for them. For example, we could have searched them by pattern or individually, but it's preferable to have a virtual, single ```tal``` index that we could interact with. On a technical level, Elasticsearch needs an alias so it can manage the rollovers with.

So we will apply an index template using a pattern of ```tal-*```, specify the alias ```tal``` and attach the ILM policy ```tal``` which has been created beforehand.

```
PUT _index_template/tal
{
  "index_patterns": ["tal-*"], 
  "template": {
    "settings": {
      "index.lifecycle.name": "tal",
      "index.lifecycle.rollover_alias": "tal"
    }
  }
}
```

To verify, get the newly created template by

```
GET _index_template/tal
```

## Create the index

The index ```tal``` should be just an alias. If we will insert documents to ```tal``` it will be created concretely which is not what we want.

We need to create the first aliased index ```tal-00001``` and specify that it is the current write index.

```
PUT tal-00001
{
  "aliases": {
    "tal": {
      "is_write_index": true,
      "is_hidden": false
    }
  },
  "mappings": {
    "properties": {
      "timestamp": {
        "type": "date" 
      }
    }
  }
}
```

Now we can insert documents to ```tal``` - Notice it is inserted to the managed indices.

# Further notes

## Explaining ILM state

To review the state of the policy with respect to the indices we can run

```
GET tal/_ilm/explain
```

It indicates what phase every index is at, it's age, size etc...
