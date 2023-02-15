---
layout: post
title: Neo4j Cheatsheet 
image: /assets/neo4j-256.png
subtitle:
    Remember neo4j stuff 
date: 2021-03-09
category: linux neo4j databases 
tags: tutorial notes 
---

# Cypher

Cypher is the query language for neo4j.

We can use it through the web interface, libraries or through cypher-shell.

We can always reference the [Cypher manual](https://neo4j.com/docs/cypher-manual/current/)

## Command examples

### Administration

list and display information of all databases

    SHOW DATABASES

display information for database "neo4j"

    SHOW DATABASE neo4j

display information of the default database

    SHOW DEFAULT DATABASE

create a database named "check"

    CREATE DATABASE check

### Elements

A **node** has an ```id```, ```label``` and properties. To create one

    CREATE (someid:SomeLabel {first_prop: "first value", second_prop: 123})

A **relationship** has an ```id```, ```type```, ```property map```, ```start_id``` and ```end_id```. To create one

    CREATE (thefirstid)-[:SOME_RELATION_TYPE]->(thesecondid)

Match all nodes

    MATCH (n)

    
