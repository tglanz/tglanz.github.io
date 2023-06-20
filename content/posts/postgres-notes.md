---
layout: post
title: Postgres Notes
date: 2020-09-12
categories:
  - Notes
  - Databases
tags:
  - PostgreSQL
---

Within the REPL, all buit-in commands are prefixed with ```\```. For example;

```
\?              Displays help page
\q              Quits the REPL
\l              Lists all databases
\c {database}   Connect to a different database
```

### Roles

A Role is the single entity for authentication/authorization. According to how it is set up, it can act as a user, a group or both.

Create a role

```sql
CREATE ROLE "somerole"
```

Grant login to the role

```sql
ALTER ROLE "somerole" WITH LOGIN;
```

### Serial (Auto Increment)

```sql
CREATE TABLE some_table (
  id SERIAL PRIMARY KEY,
  other varchar(20)
)
```
