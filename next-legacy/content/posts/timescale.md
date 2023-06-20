---
title: Timescale
tags:
  - Notes
---

Timescale is a time series optimized system built on top of posgres.

It provides pg extensions

- timescaledb
- timescaledb_toolkit

One can perhaps even use the ```promscale``` extension

# Hypertables

Hypertables are the core construct behind timescale.

Practically, the Hypertable is an abstraction of multiple tables, called Chunks.

A Hypertable replaces a standard Postgres table and partition it by time, and potentially by space.

## Creating a hypertable

A Hypertable imposes the criteria that the column we partition by will included in all UNIQUE or PRIMARY indexes.

Take the following table

```sql
CREATE TABLE events (
    id SERIAL,
    name VARCHAR,
    timestamp timestamptz,
    domain VARCHAR
);
```

To create a Hypertable, partitioning by ```timestamp```, with chunk sizes of 1 week each, with a space partition using ```domain``` we use

```sql
select create_hypertable(
    'event', 'timestamp',
    partitioning_column => 'domain',
    number_partitions => 10);
``` 

Additional parameters and information can be found [In the docs](https://docs.timescale.com/api/latest/hypertable/create_hypertable/#create-hypertable)
