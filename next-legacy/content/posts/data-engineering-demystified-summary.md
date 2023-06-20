---
title: Data Engineering Demistified Summary
date: 11/01/2022
---

# Demistified summary

See http://big-data-demystified.ninja

Specifically
- http://big-data-demystified.ninja/2020/07/09/data-lake-architecture-best-practices

## Using Version Control Systems

Environment suggestions

- Dev. Has Read only access of Production data.
- Pre Production. Because some thing can only be tested against production.
- Production.


## Airflow Coding Guidlines

**Keep it simple**. Avoid object oriented abstraction. Very hard to retrospectively understand DAGs, simplicity is king here.

**Avoid using Sensors - Airflow Term?**. Unpredictabilty in production.

It is prefereable if Jobs are

- Recurrentable - Running the same job again won't change nothing
- Debugable - can debug the job easily
- Write after Delete - When deleting data, insert it right after, don't do that in another stage 
**Monitoring is very important!!!**

Pros
- flexibility
- customizability
- scale
- cost

Cons
- learning curve
- diy
- time to market
- open source
- unclear errors

## Data lake

1. Data quality - MonteCarlo, Great Expectations
1. Data pipeline stability - Databand and Honey Comb
1. Data lineage - Apache atlas, amundsen
1. Data classification

## Cleansing and Preparing data

Approaches

**Python parser**

Pros - Simple
Cons - non uniform, hard to maintain

**Dataframe / Pandas**

Pros - Simple, Generic, Flexible
Cons - Not scalable, bounded to the RAM

**ELT**

Pros - Simple, Generic, Peta-Scale 
Cons - Requires Good SQL / Big Data understanding

**Pyspark / Scala**

Cons
- Hard to learn
- Trivial for simple cases / overkill

Pros
- Good for schema evolution

## 3rd party - APIs, Tips and Tricks


## 4 V's

- Volume
- Veracity
- Velocity
- Variety

## Triangle

What is the criteria?

```
       Faster

    /          \

Cheaper  -   Simpler
```
