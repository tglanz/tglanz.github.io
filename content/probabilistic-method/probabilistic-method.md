---
title: The Probabilistic Method
highlight: true
thumbnail: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fdie&psig=AOvVaw3HreZfo95Ndf1NW1J8PNUp&ust=1700382776099000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDY4s6RzYIDFQAAAAAdAAAAABAD
description: |
  A powerful set of tools to solve combinatorical problems
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

# Random Variables

Another basic object in probability theory is the **Random Variable**. A random variable $X$ is a function that assigns a real number for each element in the sample space, $X : \Omega \rightarrow \mathbb{R}$.

All of the possible inputs and outputs of a random variable is known as it's distribution: $\{ (\omega, X(\omega)) | \omega \in \Omega \}$.

Let's think of the experiment of rolling a fair dice. The sample space is $\Omega = \{ 1, 2, 3, 4, 5, 6 \}$.

Let's define the random variable $X(\omega) = 1 ~if~ \omega \leq 2 ~and~ 0 ~otherwise~$. Meaning, $X$ is 1 if the outcome is $1$ or $2$, otherwise it's zero. $X$'s distribution is $A = \{ (1, 1), (2, 1), (3, 0), (4, 0), (5, 0), (6, 0) \}$. What is the probability for the event that $X = 1$? Combinatorically, we calculate that $Pr(X = 1) = \frac{|\{\omega | X(\omega) = 1 \}|}{|A|} = \frac{2}{6} = \frac{1}{3}$. This is rather intuitive, we know that a third of the outcomes are less than or equal to 2.

Let's define another random variable $Y(\omega) = \omega \cdot 2$. The range of $Y$ is $D = \{ 2, 4, 6, 8, 10, 12 \}$. What is the probability that $Y$ gets the value $4$? Again, combinatorically we see that $Pr(Y=4) = \frac{|\{\omega | Y(\omega) = 2\}|}{|D|}=\frac{1}{6}$. In fact, that is true for all $d \in D$ that $Pr(Y = d) = \frac{1}{6}$!

The random variables $X$ and $Y$ exhibit different, yet common distribution patterns. $X$ behaves like a predicate - it get's the value 1 if some condition holds or 0 if it doesn't. Therefore, the probability of $\{ X = 1 \}$ is the probability of the condition to be true. $Y$ is simple, the probability for it to achieve any value is the same probability - specifically, it is exactly $\frac{1}{|Range(Y)|}$.

$X$'s distribution is known as the **Bernoulli** distribution with probability $p = \frac{1}{3}$. Usually, the Bernoulli distribution with probability $p$ is notated by $B(p)$. We notate the fact that $X$'s distribution is $B(\frac{1}{3})$ by $X \sim B(\frac{1}{3})$.

$Y$'s distribution is known as the **Uniform** distribution with $n = 6$. Simlirarly, we notate $Y \sim Uniform(6)$.

## Expectancy

The **Expectency** of a random variable is the value we would expect the random variable to achieve. For any random variable $V$ we define its expectency by:

$$
  \mathbb{E}(V) := \sum_{v \in Range(V)} vPr(V=v) = \sum_{\omega \in \Omega}Pr(\omega)V(\omega)
$$

Let's calculate the expectencies of $X$ and $Y$ from the previous section:
- $\mathbb{E}(X) = Pr(1)X(1) + Pr(2)X(2) + Pr(3)X(3) + ... + Pr(6)X(6) = \frac{1}{6} \cdot 1+\frac{1}{6} \cdot 1 + \frac{1}{6} \cdot 0 + ... + \frac{1}{6} \cdot 0 = 
\frac{2}{6} = \frac{1}{3}$
  - Not coincidently, the expectancy is exactly the probability $p = \frac{1}{3}$
- $\mathbb{E}(Y) = \sum_{\omega \in \{1, 2, 3, 4, 5, 6\}} Pr(\omega)Y(\omega) = \sum_{\omega \in \{1, 2, 3, 4, 5, 6\}} \frac{1}{6} (\omega \cdot 2) = \frac{\sum_{\omega \in \{1, 2, 3, 4, 5, 6\}} \omega \cdot 2}{6} = 8$
  - Not coincidently, the expectancy is exactly the average of the possible values

The expectancy has an important characteristic, known as the **Linearity of expectation**: For any two random variables $V, U$ and two real numbers $\alpha, \beta$:

$$
  \mathbb{\mathbb{E}(\alpha U + \beta V)} = \alpha \mathbb{E}(U) + \beta \mathbb{E}(V)
$$

This doesn't seems much but it is. As we know from theoretical math, the less constraints a theorem has the more powerful and robust it is. This is the case for the linearity of expectation - It holds for **any** two random variables, now small print, that's it.

## Variance

Observe the two uniform distributions $\{ 0, 100 \}$ and $\{ 49, 51 \}$. Both of their expectancies are 50 but they are inherently different with respect to the distance of the values from it. A measurement for how far the values spread within the distribution is known as the **Variance**.

How will we define the variance then?

- The first idea is to subtract the random variable from it's expectency and take the expectancy of that. i.e., for the random variable $U$ it's variance could have been defined by (but it isn't): $\mathbb{E}(U - \mathbb{E}(U))$. The problem with this definition is that it is analytically hard to work with. When is it negative vs. positive?
- The second idea is to improve upon the previous one by taking the absolute value and measure the distance of the random variable from it's expectancy. i.e. for the random variable $U$ it's variance could be defined by (but it isn't): $\mathbb{E}(|U - \mathbb{E}(U)|)$. The main reason which because it isn't a good definition is because the function of the absolute value is not differentiable at $0$. You may ask how differentiation has anything to do with random variables? Well, recall that random variables are just functions from the probability space. The probability space can also be continuous (we don't use it here though).

> As pointed out, we can define probability spaces as continuous spaces. In our case, we say that the random variables are **Discrete** rather than **Continuous**. Roughly the extention to the continous case is straight forward and all we need to do is use integration instead of summation for the respective definitions (which makes the computations harder but the theory itself is not much more complex).

We define the variance of a random variable $U$ to be the expectancy of the squared distance from it's expectancy:

$$
  Var(U) := \mathbb{E}((U - \mathbb{E}(U))^2)
$$

Let's try to expand upon it a bit:

$$
  Var(U) = \mathbb{E}((U - \mathbb{E}(U))^2) = \mathbb{E}(U^2 -2U\mathbb{E}(U) + \mathbb{E}(U)^2)
$$

By linearity of expectation we get that:
$$
  Var(U) = \mathbb{E}(U^2) - 2\mathbb{E}(U)\mathbb{E}(\mathbb{E}(U))+\mathbb{E}(U)^2
$$

The expectancy itself is a real number, so the expectancy of an expectancy is itself:
$$
  Var(U) = \mathbb{E}(U^2) - 2\mathbb{E}(U)^2 + \mathbb{E}(U)^2
$$

And we will get a useful formula for calculating the variance:
$$
  Var(U) = \mathbb{E}(U^2) - \mathbb{E}(U)^2
$$

The variance is **not linear**. But we can say something about the variance of sums.

For **mutually independent** random variables $\{ U_i \}$ the variance of the sum is the sum of the variances: $Var(\sum U_i) = \sum Var(U_i)$.

So what about variables that are not necessarily mutually independent? The variance of the sum can be expressed as:

$$
  Var(\sum U_i) = \sum Var(U_i) + \sum_{i \neq j}Cov(U_i, U_j)
$$

Where $Cov(U, V)$ is the **Covariance** of $U$ and $V$ and it is defined by:

$$
  Cov(U, V) := \mathbb{E}((U - \mathbb{E}(U))(V - \mathbb{E}(V)))
$$

> Formula of the variance of the sums can be easily reached by straight forward computations according to the expectancy definition

A formula for calculating the covariance is given by:

$$
  Cov(U, V) = \mathbb{E}(UV) - \mathbb{E}(U)\mathbb{E}(V)
$$

> We reach this formula just by expanding the definition

## Common Distributions

We previously saw 2 different common distributions. Let's cover them more generally.

### Bernoulli Distribution

The **Bernoulli** distribution is notated by $B(p)$. It models a single trial that can either **succeed** with probability $p$ in which case the value of the random variable is 1 or **fail** with probability $1 - p$ in which case the value of the random variable is 0.

A random variable $X \sim B(p)$ is also called an **Indicator**.

#### Expectancy

The expectancy is given by $\mathbb{E}(X) = p$.

*Proof*

$$
  \mathbb{E}(X \sim B(p)) = 1 \cdot Pr(X=1) + 0 \cdot Pr(X=0) = Pr(X = 1) = p
$$

#### Variance

The variance is given by $Var(X) = p(1 - p)$.

*Proof*

$$
  Var(X) = \mathbb{E}(X^2) - \mathbb{E}(X)^2 = p - p^2 = p(1 - p)
$$