---
title: Kafka
---

# Overview

## What is kafka?

> Kafka is a streamsing platform for ingesting, storing, accessing and processing streams of data

# High level concepts

## Communication model

On the contrary of a **Directed Communication** where every service is aware of the other process to send messages to, kafka provides a centralized hub in which processes can send and receieve messages without being aware of each other. Such communication model is known as the **Publish/Subscribe** model which enhance the decoupling between different processes.

> Of course those are not termed by kafka

> Recall the different communication formalization according the sync/async and persistent/transient dimensions. Kafka fills conforms to the asynchronous and persisted model. This is unintuitive since this model is usually used for classical **Queues** rather than **Pubsubs**.

## Core components

A **Topic** is a named stream of data (/ channel - CSP?).

**Producer**s are processes that publish data to a Topic.

**Consumer**s are processes that subscribe to data in one or more Topics.

A **Consumer Group** is a set of Consumers that work together as a group.

## Storage

### Commit Log

A **Commit Log** is an append only data structure which contain an *Ordered Sequence* of events (/records)

- Records in the log are immutable
- Records are ordered and their ordinal is known as their **Offset**

> It is very similiar to existing transaction logs (Redo Log especially) which can be found in classical Relational Databases.

> To gain perspectives we can find similiarities to STM concurrency mode, Redux stores etc...

### Partitions

In order to provide distribution capabilities, there is no 1 to 1 correlation of Topic to Log since then each Topic would need to be stored on a single machine. Rather, a Topic is broken into smaller units called **Partitions**.

Effectively, every Partition is a single Log. Such model allows kafka to distribute a Topic with N partitions to at most N workers and we can have K Consumers under the same Consumer Group sharing the load of consumption as long as LEQ(K, N). If K>N than it means that some consumers will be idle.

It makes sense from a technical POV. Kafka simply assigns a Partition to a Consumer.

- If the number of Consumers is less than the number of Partitions, by the pigenhole principle there is at least a single Consumers that is assigned with more than one partition
- If the number of Consumers is greather than the number of Partitions, there cannot be a surjective mapping from the Partitions the Consumers

### Event

A unit of data in a Topic has many interchangeable names - Event, Message, Record. We favour the term Event.

> Out of the kafka scope, events in the fotware world are *Entities* that desribe something that *happened in the past*. Therefore, event are past tense verbse. Well, it is the same in kafka

An **Event** is a timestamped key-value pair the records something that happened.

Event is composed of **Headers**, **Keys**, a **Timestamp** and a **Value**. We will cover some of those at a later time but for a very brief overview

**Headers** contain optional metadata about the Event. One can use them to annotate, monitor and audit and Event. This is very like HTTP headers.

**Keys** are optional values that affect how data is distributed accross partitions (Again, this is known concept, think of Partition Keys and partitioning schemes in different distributed systems). We will explore this concept independently.

**Timestamp** holds information about when the thing that happened hapenned. There are multiple semantics of time we can speak of - When the Event created? When was it ingested? When was it processed? This is a whole topic of it's own which we will explore independantly.

**Value** is the content of the message. Practically this is just a byte array and should be serialized according to the application.

## The Cluster

TODO: cover concepts below

**Broker** TODO

**Replication** TODO

**Leader** TODO

**Follower** TODO
