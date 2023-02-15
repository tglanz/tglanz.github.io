---
title: Elasticsearch
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
