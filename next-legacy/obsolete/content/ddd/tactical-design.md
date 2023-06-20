---
title: Tactical Design
series:
  - Domain Driven Design
weight: 2
---

# Entities

Entities are the building blocks of the model.

Entities are differentiated by their Id, not by their attributes.

# Value Objects

Value objects are differentiated by their attributes and contain no Id.

Value objects should be able to implemented in an immutable fashion.

# Services

In the exact same words

> A SERVICE is an operation offered as an interface that stands alone in the model, without encapsulating state, as ENTITIES and VALUE OBJECTS do.

Characterisitcs of a good SERVICE
1. The operation relates to a domain concept that is not a natural part of an ENTITY or VALUE OBJECT
1. The interface is defined in terms of other elements of the domain model
1. The operation is stateless

# Aggregates

In the exact same words

> An AGGREGATE is a cluster of associated objects that we treat as a unit for the purpose of data changes

Each AGGREGATE has a **root** and a **boundary**.

The **boundary** delineate objects within the AGGREGATE.

The **root** is a *single*, *specific* ENTITY that the outside can hold references to.

# Factories

In the exact same words

> When creation of an object, or an entire AGGREGATE, becomes complicated or reveals too much of the internal structure, FACTORIES provide encapsulation

While every ENTITY has a constructor receiving it's idetity, FACTORIES will provide mechanisms to create complex ENTITIES and AGGREGATES.

FACTORIES are responsible for ensuring that all invariants are met for the AGGREGATE's objects.

# Repositories

In the exact same words

> A REPOSITORY represents all objects of a certain type as a conceptual set (usually emulated).

The REPOSITORIES act like collections but they often provide additional query mechanisms/options.
