---
title: Longest substring that is a Palindrom
categories:
  - Algorithms
tags:
  - Dynamic Programming
  - Palindrom
---

# Overview

A string $S$ is a palindrom iff $S = reverse(S)$

**The Problem**

Given a string S, find the longest *substring* of S that is also a palindrom

> Remember that substrings are consequtive

**To illustrate**

- a**bcb**ea $\rightarrow$ bcb (not abcba)
- **abbcbba**dad $\rightarrow$ abbcbba

# Solution

We shall define $opt(i, j)$ to indicate the length of the longest palindrom substring between the i'th character to the j'th character by the recurrence relation

for all i, opt(i, i) = true since a single character is a palindrom of itself.

for all i and $j > i$, opt(i, j) true if S[i] = S[j] and also opt(i + 1, j - 1) = true.

Finally, to figure out the length of the longest substring that is a palindrom we need to find i and j that maximizes $j - i$ and such that opt(i, j) = true.

**Psuedo**

- Initialize opt
  - $opt \leftarrow matrix(n, n)$
    - initialize all values false by default
    - $\forall i$
      - $opt(i, i) = true$
      - $opt(i, i + 1) \leftarrow S[i]=S[i+1]$

- Build opt in a bottom up fashion
  - $for ~ l = 2, 3, ... n - 1$
    - $for ~ i = 1, ..., n - l$
      - $j \leftarrow i +  - 1$
      - $opt(i, j) \leftarrow S[i] = S[j] \land opt(i + 1, j - 1)$
- Find the length of the longest substring that is a palindrom
  - $for~ l = n-1, n-2, ..., 1$
    - $for~ i = 1, 2, ..., n - l$
      - $if~ opt(i, i + l)$
        - return l

**Time Complexity**

- Initialization of opt is $O(n^2)$
- Building opt takes $O(n^2)$ iterations
  - Each iteration takes $O(1)$ accesses to opt

So in total, the time complexity is $O(n^2)$