---
title: Bayesian Networks
categories:
- Intro to AI
tags:
- AI
- Probability
---

## Definition

A **Bayesian Network (BN)** is a data structure that represents dependencies among different Random Variables. BNs represent the full joint distribution concisely which leads to more efficient query inferences.

A Bayesian Network is a directed, acyclic graph whose nodes represent a random variable and the edges represent a parent-child relationship. For every node $X$ the network associates the conditioned probabilities of $X$ as an effect of it's parents, i.e. $P(X | Parents(X))$.

Each node is attached with local probability information a.k.a **conditional probability table (CPT)**.

## Example

Let's consider the following scenario. A burglary alarm in Paul's home can be set off by small earthquakes. Paul has two neighbors: Nina and Lei - they promised Paul to call him when they hear the alarm. Nina is very alert but Lei is always busy and is more likely not to hear Paul's alarm. Given a call, what is the probability of a burglary?

Below is a BN describing the scenario:

```plantuml
digraph G {
    {Earthquake, Burglary} -> Alarm;
    Alarm -> {LeiCalls, NinaCalls};
}
```

And the CPT tables:

$P(Burglary=true)$|
----------|
0.001|

$P(Earthquake=true)$|
----------|
0.002|

$Burglary$ | $Earthquake$ | $P(Alarm=true \mid Burglary, Earthquake)$ |
-----------|--------------|---------------|
true|true|0.95
true|false|0.94
false|true|0.29
false|false|0.001

$Alarm$ | $P(NinaCalls=true \mid Alarm)$ |
--------|--------------------------------|
true | 0.9
false | 0.05

$Alarm$ | $P(LeiCalls=true \mid Alarm)$ |
--------|--------------------------------|
true | 0.7
false | 0.01

!> Notice we didn't need to write the complements in the CPTs since they are computable by "1-..."

## Semantics

We defined the syntax of BNs above. The semantics we want to impose on BNs is that different variables are conditionall independent of each other **given their parents**

$$
P(x_1, x_2, ..., x_n) = \Pi_{i=1}^{n}{P(x_i | Parents(x_i))}
$$

In general, we can reduce the joint distribution by iteratively invoking the **product rule**: 

$$
\begin{align*}
P(x_1, x_2, ..., x_n) &= P(x_n | x_1, x_2, ..., x_{n-1}) P(x_1, x_2, ..., x_{n-1}) \\\\
  &= P(x_n | x_1, x_2, ..., x_{n-1}) P(x_{n-1} | x_1, x_2, ..., x_{n=2}) P(x_1, x_2, ..., x_{n-2}) \\\\
  &= ... \\\\
  &= \Pi_{i=1}^{n} P(x_i | x_1, ..., x_{i-1})
\end{align*}
$$

This is a very important formula and is known as the **chain rule**:

$$
P(x_1, x_2, ..., x_n) = \Pi_{i=1}^{n} P(x_i | x_1, ..., x_{i-1})
$$

Combining the chain rule with the first formula we desire the following equality:

$$
\Pi_{i=1}^{n} P(x_i | x_1, ..., x_{i-1}) = \Pi_{i=1}^{n}{P(x_i | Parents(x_i))}
$$

Or in vector form:

$$
P(X_i | X_1, ..., X_{i-1}) = P(X_i | Parents(X_1, ..., X_{i-1}))
$$

We get this by enforcing **topological ordering** and linking nodes to their parents in such a way that they are conditionally independent of any other node given their parents.  