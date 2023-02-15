---
categories:
- Aws
---

List streams

    aws kinesis list-streams

Describe a _Stream_, listing it's _Shards_, _Stream's_ ARN, current _SequenceNumbers_ etc...

    aws kinesis list-streams --stream-name {stream-name}

To list the consumers/producers of a given _Stream_

    aws kinesis list-stream-consumers --stream-arn {stream-arn}

## Getting records

_ShardIterator_ is an object used to iterate _Records_ within a specific _Shard_. So, in order to get a _Shard's_ _Records_ we need to acquire a reference to a specific _ShardIterator_.

    aws kines get-shard-iterator --stream-name {stream-name} --shard-id {shard-id} --shard-iterator-type {shard-iterator-type}

The ```shard-iterator-type``` has multiple choices, advise the documentation for those.

The ```get-shard-iterator``` command provided us with an identifier of the _ShardIterator_, we can use it to get _Records_ using

    aws kinesis get-records --shard-iterator {shard-iterator}
