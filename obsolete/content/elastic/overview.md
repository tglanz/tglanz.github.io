---
title: Elasticsearch Notes 
categories:
    - Elasticsearch
    - Notes
tags:
    - Elasticsearch
weight: 1
---

Concepts and examples to get reminded of once in a whilei

## What is Elasticsearch 

_Elasticsearch_ is a distributed search and analytics engine, providing a _near real-time_ search for a large array of data types, structured or un-structured.

Some of the usecases
- Backend for search boxes
- Metrics and Log analysis

Elasticsearch uses _Apache Lucene_ under the hood as it's underlying search engine.

## Documents & Indices

Technically, and I quote - "Elasticsearch is a distributed documented store". It serializes any kind of structure into JSON documents. In an Elasticsearch cluster, the documents are distributed accross multiple nodes and are accessible from any (really?) of the nodes.

__TODO__ Are the documents distributed accross all nodes, or a part of the cluster? It actually seems unreasonable to me that it is a full replication.

Elasticsearch maintains an _Inverted Index_ to provide fast search capabilities on all of a document's fields (They say that a document is fully searchable within 1 sec). Practically, the index is the data structure the collects multiple documents and provides fast access to them according to search criteria.

We can think of the model as such
```
Field
    key: String
    value: Any

Document
    fields: Field[]

Index
    documents: Document[]
```

By default, Elasticsearch index all fields in all documents, and it has different mehcanisms to index different data types.

## Search & Aggregations

Elasticsearch provides a REST API that supports
- Structured queries -  Queries that are structurely similiar to SQL queries
- Full text queries - Queries that return all documents that match the query, sorted by relevance
- Complex queries - A combination of the above

Elasticsearch can maintain aggregations of the data enabling us to analyze summaries providing insights regarding metrics, patterns and trends. For example, we can query for
- Total numbers that match X
- The average that match Y

Furthermore, aggregations can operate alongside the search requests, meaning that we can gain aggregative information for all search results.

### cat API

The ```_cat``` endpoint provides "Compact and Aligned Text" meaning, a general, __consumed by humans__ information.

Get the list of cat APIs

    /_cat

Get information about indices using [cat indices API](https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-indices.html)

    /_cat/indices
    /_cat/indices/_all
    /_cat/indices?format=json
    /_cat/indices/my-index
    /_cat/indices/my-index?format=json

### search API

The ```<target>/_search``` endpoint provides searching functionality.

The ```<target>``` parameter is optional and is a comma seperated list indicating data streams, indices and aliases to search. It supports wildcards (*).

There are many query parameters that affects how the search is being performed and how the results are being returned. We won't list them all here but here is a small list that give a vibe on the kind of possible parameters

- q(string) - The query. Note that it can alternetively be provided through the body
- explain(boolean) - If true, returns a defailed information about the score computation  
- timeout(time units) - Sets the timeout for the request  
- from(integer) - Starting document offset  
- size(integer) - Number of hits to return  

The body also contains important information the important one is the "query" field.

### shards

Show shards

    /_cat/shards
    /_cat/shards?h=index,shard

### Usage

#### Basics, insert and retrieve documents

Assume the scenario with indices ```tglanzma-small-1,2,3``` and a document model

```
{
    _id: string
    x: string
    y: string
    z: number
    tags: string[]
}
```

To add documents to and index we use the [Index API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html). For example

```
PUT tglanzma-small-1/_doc/1
{
  "x": "x of 1",
  "y": "y of 1",
  "z": 1,
  "tags": [
    "first tag of 1",
    "second tag of 1"
  ]
}
```

To get a specific document by it's id we use the [Document's Get API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html). For example

```
GET tglanzma-small-1/_doc/1
```

To get multiple documents by their ids, use the [Multi get API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html). For example

```
GET _mget
{
  "docs": [{
    "_index": "tglanzma-small-1",
    "_id": 1
  }, {
    "_index": "tglanzma-small-1",
    "_id": 2
  }]
}
```

### Searching an index

To search for documents we use the [Search API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html).

To search for all documents within a specific index

```
GET tglanzma-small-1/_search
```

To specify exactly what fields we want returned from each document we will use the ```_source``` parameter, as so

```
GET tglanzma-small-1/_search
{
  "_source": [
    "x",
    "y"
  ]
}
```

To specify the search query we use the ```query``` parameter. This is a query object and we specify it using the [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html).

The Query DSL is an AST defined as

```
Query := Leaf | Compound
Compound := [Compound | Leaf]
```


Search documents where ```x === x of 1``` we use the [Match phrase query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html)

```
GET tglanzma-small-1/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "x": "x of 1"
          }
        }
      ]
    }
  }
}
```

For a fuzzy search, we use the [Match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html).

```
GET tglanzma-small-1/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "x": "x of 1"
          }
        }
      ]
    }
  }
}
```

The returned documents might not have an exact match because we fuzzy searched. Each document is assigned with a score determining how close it is to a full match. We can control the minimum we want using the ```min_score``` parameter

```
GET tglanzma-small-1/_search
{
  "min_score": 0.6,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "x": "x of 1"
          }
        }
      ]
    }
  }
}
```

The [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) matches boolean combinations over documents.

The ```must``` acts as an AND operator and the ```should``` acts as an OR operator. Intuitively, the ```must_not``` acts as negation.

To search for query that have either ```x = x of 1``` and ```y = y of 1``` we use the ```must``` query

```
GET tglanzma-small-1/_search
{
  "min_score": 0.6,
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase": {
            "x": "x of 1"
          }
        },
        {
          "match_phrase": {
            "y": "y of 1"
          }
        }
      ]
    }
  }
}
```

To search for query that have either ```x = x of 1``` or ```y = y of 2``` we use the ```should``` query

```
GET tglanzma-small-1/_search
{
  "min_score": 0.6,
  "query": {
    "bool": {
      "should": [
        {
          "match_phrase": {
            "x": "x of 1"
          }
        },
        {
          "match_phrase": {
            "y": "y of 2"
          }
        }
      ]
    }
  }
}
```

As mentioned, compound queries are recursively defined so we can compose combinations. For example, to match documents where (```x = x of 1``` AND ```y = y of 1```) OR (```x = x of 2``` AND ```y = y of 2```)

```
GET tglanzma-small-1/_search
{
  "min_score": 0.6,
  "query": {
    "bool": {
      "should": [
        {
          "bool": {
            "must": [
              {
                "match_phrase": {
                  "x": "x of 1"
                }
              },
              {
                "match_phrase": {
                  "y": "y of 1"
                }
              }
            ]
          }
        },
        {
          "bool": {
            "must": [
              {
                "match_phrase": {
                  "x": "x of 2"
                }
              },
              {
                "match_phrase": {
                  "y": "y of 2"
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```
