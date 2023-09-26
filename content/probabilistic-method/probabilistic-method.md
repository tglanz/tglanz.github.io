---
title: The Probabilistic Method
priority: 1
categories:
- Computer Science
- Probabilistic Method
tags:
- Probabilistic Method
- Probability
- Algorithms
---

# Introduction

In this page we will discuss the probabilistic method which is a powerful tool to prove the existence of a combinatorial object. For a long time we have used conventional approaches for this purpose - Either we provided a proof by contruction or we provided a non-constructive proof. The probabilistic method is a non-constructive method first introduced by [Paul Erdos](https://en.wikipedia.org/wiki/Paul_Erd%C5%91s) while he was working on the development of the [Ramsey Theory](https://en.wikipedia.org/wiki/Ramsey_theory).

In essence, the method shows that the probability that some object with the desired property exist is greater than 0 and therefore one such instance surely exist, otherwise the probability was strictly 0. 

We will use many practical examples and uses of this method which we will link to throughout this page.

# Basic definitions and results

Before we continue we need to review the definition of probability spaces.

A **probability space** is a triplet $(\Omega, \Sigma, Pr)$ where

1. $\Omega$ is a non-empty set known as the **sample space**. It represents all possible outcomes of some experiment.
    - We will limit ourselves to a finite sample space.

2. $\Sigma$ is the collection of subsets of $\Omega$ which is closed under the **complement ($x'$)**, **union ($x \cup y$)** and **intersection ($x \cap y$)** operations.
    - An element $A \in \Sigma$ is called an **event**.

3. $Pr : \Sigma \rightarrow [0, 1]$ is a function with the following properties:
    - $Pr(\Omega) = 1$
    - $\forall A, B \in \Sigma ; A \cap B = \phi \implies Pr(A) + Pr(B) = Pr(A \cup B)$
    - $\forall \omega \in \Omega ; $  we will denote $Pr(\omega) = Pr(\\{\omega\\})$

> Methematically, a probability space is a measure space with the measure function over $\Omega$ where $\Sigma$ is the $\sigma$-algebra over $\Omega$ and $Pr$ is the measure of the space such that $Pr(\Omega) = 1$.

## Union Bound

The measue function is sub-additive with respect to the union operation. Meaning, every two events $A, B$ satisfies $Pr(A \cup B) \leq Pr(A) + Pr(B)$.

It makes sense, if the two events are not disjointed, the intersection part must be calculated once, not twice as is calculated in $Pr(A) + $Pr(B)$.

More generally, the **Union Bound** theorem states that for any set of events $\\{ A_i \\}$ it holds that:

$$
  Pr(\bigcup_i A_i) \leq \sum_i Pr(A_i)
$$

## Conditional Probability

The probability of some event $A$, given that we know that the event $B$ happened is called the **conditional probability of $A$ given $B$** and is notated and given by

$$
  Pr(A | B) = \frac{Pr(A \cap B)}{Pr(B)}
$$

This definition is intuitive. The probability $A$ happens given $B$ happens is firstly at the intersection between them. Then, we scale this probability of the intersection to limit ourselves to the "world" of $B$ only.

Another variant of this definition is known as the **product rule**:

$$
  Pr(A \cap B) = Pr(A | B) Pr(B)
$$

Let's see an example - Consider the experiment of rolling a six-sided die and let $A$ be the event that the number $2$ was thrown and $B$ the event that an even number was thrown. Formally, $A = \\{ 2 \\}, B = \\{2, 4, 6 \\}$. It is obvious that $Pr(A) = \frac{1}{6}$ and $Pr(B) = \frac{3}{6} = \frac{1}{2}$. Intuitively, the probability that $A$ given $B$ is $\frac{1}{3}$ since if we know an even number was rolled it means that one of three numbers 2, 4 and 6 were rolled - from those, the probability that 2 was rolled is $\frac{1}{3}$. We can verify the intuition using the formula: $Pr(A | B) = \frac{Pr(A \cap B)}{Pr(B)} = \frac{\frac{1}{6}}{\frac{1}{2}} = \frac{1}{3}$.

Now, what happens when what we know about $B$ doesn't affect $A$? For example, consider $A$ to be the result of a die roll and $B$ the event that it is Sunday - the result of the roll is not affected by the day of week at all. Such events are called **independent**, let's define it:

Two events $A$ and $B$ such that $Pr(A | B) = Pr(A)$ are said to be **independent**.

For two independent events $A$ and $B$ we can see that:

$$
    Pr(A) = Pr(A | B) = \frac{Pr(A \cap B)}{Pr(B)} \implies Pr(A)Pr(B) = Pr(A \cap B)
$$

We can generalize this and get the important claim.

For every set of pair-wise independent events $\\{ A_i \\}$ it holds true that:

$$
   Pr(\bigcap_i A_i) = \prod_i Pr(A_i)
$$

## Bayes rule

Although we won't use it much here, it is important to show a straight-forward result which stems from the definitions of conditional probability.

Using a bit of algebra, we can get the **very** important rule, **Bayes Rule** which states that we can always invert the conditional causality:

$$
    Pr(A | B) = \frac{Pr(B | A) Pr(A)}{Pr(B)}
$$

# Probabilistic method - Union bound and Intersection of independent events

Up until now we saw only basic results which we are all familiar with. Although basic, they provide provide the basic and most common tools for the probabilistic method. Usually the way we will use them is as follows.

Assume we want to bound the probability of some event $A$ which we cannot calculate the probability of directly because it is somewhat complex.

Represent the $A$ as smaller, usually simpler events $A_i$ such that $A = \bigcup_i A_i$. From the union bound we know that $Pr(A) \leq \sum_ Pr(A_i)$.

Usually we will now be able to calculate $A_i$ directly. We will break such events even further such that $A_i = \bigcup B_{ij}$ where $\\{ B_{ij} \\}$ is a set of pair-wise independent events. It is immediately follows by the intersection of independent event rule that $Pr(A_i) = \prod_j Pr(B_{ij})$.

Finally we can conclude that $Pr(A) \leq \sum_i \prod_j Pr(B_{ij})$.

Usually, we will see that the probabilities of the smaller events are similar to each other.

## Examples

- [Hypergraph 2 Coloring](../hypergraph-2coloring)
- [Coupons Collector 1](../coupons-collector-v1)
