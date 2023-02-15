---
title: Bloom Filter
description: Illustrate the Bloomfilter data structure
categories:
  - Algorithms
tags:
---

## Summary

A _Bloom Filter_ is an data structure that given a set of elements $S$ and a subset $X \subset S$, answers the question whether some element $s \in S$ is in $X$.

The main difference between this and standard data structures using sets and lists is in the fact that this is a probabilistic data structure. Specifically, it can return False Positives but never False Negatives.

|           | Positive      | Negative
|-----------|---------------|---------
| **True**  | Always        | Always
| **False** | Probabilistic | Never

A standard implementation of _Bloom Filters_ support adding elements to $X$ but does not support removal requiring the application to reconstruct the data structure accordingly.

_Bloom Filter_ provides a more efficient memory usage than most other constructs such as lists and sets in the cost of a chance for False Positives.

To illustrate, consider the following interface

```c#
interface BloomFilter<S> {
    // Add {element} to the container
    void add(S element);

    // Determines whether {element} is in the container
    bool contains(S element);
}
```

## Implementation

- Set __A__ to be an $m$ bits bit array.
- Set __H__ to be a set of $k$ functions mapping $S$ onto $\\{1, 2, ..., m \\}$

__add(x)__

Apply all hash functions of $H$ on $x$ and set the corresponding bit in $A$ to 1.

- $\forall h \in H$  
  - $A[h(x)] \leftarrow 1$

__contains(x)__

Apply all hash functions of $H$ on $x$ and return true if and only if all of the corresponding bits in $A$ are set to 1.

- $\forall h \in H$
  - $A[h(x)] = 1 \Rightarrow True$

Now we can easily understand where the False Positives comes from.

## False Positives

Assume 

- $S = \\{x_1, x_2, x_3\\}$
- $m=5$
- $k=2$

With the hash functions  

- $h_1(x_1)=1 ~~ h_1(x_2)=3 ~~ h_1(x_3)=3$
- $h_2(x_1)=4 ~~ h_2(x_2)=1 ~~ h_2(x_3)=4$

And the scenario of $X = \\{x_1, x_2\\}$ as shown below

| 1 | 2 | 3 | 4 | 5 |
|:-:|:-:|:-:|:-:|:-:|
|$x_1, x_2$||$x_2$|$x_1$||

Applying __contains($x_3$)__ will yield a False Positive.

What was the chance of that happening?

Assuming equal distribution of the hash functions, the probability that a specific bit is unset after applying $k$ functions on an element is $(1 - \frac {1}{m})^k \approx e^{-\frac{k}{m}}$ for large $m$.

Now we can conclude that after the addition of $n$ elements (using __add(x)__) to the data structure the probability for a specific bit to be unset is $e^{-\frac{kn}{m}}$ and for it to be set is $1 - e^{-\frac{kn}{m}}$.

For the containment check to return true it is enough for $k$ specific bits to be set. From the above, the probability for this is $(1 - e^{-\frac{kn}{m}})^k$.

__To summarize, the probability for a _False Positive_ is $(1 - e^{-\frac{kn}{m}})^k$.__

## Picking the hash functions

[This paper](https://www.eecs.harvard.edu/~michaelm/postscripts/tr-02-05.pdf) describes a technique of constructing a set of $k$ hash functions based upon exactly 2 hash functions $h_1$ and $h_2$.

The usefulness of this approach relies in the fact that not all scenarios require the same number of hash functions $k$. Thus, allowing us to provide only 2 base functions $h_1$ and $h_2$ and construct a set of hash functions for any arbitrary $k$.

There they describe a partitioning of the bit array, each partition of a primary size $p$, such that each hash function maps to $\\{ 1, 2, ..., p \\}$ within it's own unique partition. (Note that this is just a restatement of the original view).

Now, forall $i$ we can have
$$
    g_i(x) = h_1(x) + ih_2(x) \mod p
$$

> The paper discusses a lot more and more in-depth