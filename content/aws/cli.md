---
title: Aws, The cli
categories:
  - Aws
weight: 2
---

The _aws cli_ is a utility that captures all of the administration capabilities with aws.

## Configuration

We can apply initial configuration using the `configure` command which will create a default configuration. This configuration is called a __profile__. For any action, if no profile is specified, the default one will be used.


Alternatively, we can create named profiles and use each separately and specifically. The selected profile is determined using a cli argument or by an environment variable (AWS_PROFILE).

{{< alert "Perhaps providing a test environment as the default is the safest option!" >}}

## Cli vs Console

This is probably subjective, but I highly advocate the use of the cli.