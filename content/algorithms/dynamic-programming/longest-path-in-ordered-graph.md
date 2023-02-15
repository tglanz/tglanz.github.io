---
title: Longest Path in Ordered Graph
categories:
  - Algorithms
tags:
  - Dynamic Programming
---

A directed graph $G=(V, E)$ is **ordererd**  

if
$$
  \forall (v_i, v_j) \in E \Rightarrow i < j
$$

and
$$
  \forall v_i \in V / \\{ v_n \\} ~;~ \exists j>i, e=(v_i, v_j) \in E
$$

**The problem**

Given such graph, find the length of the longest path from $v_1$ to $v_n$ where $n = |V|$.

**Illustration**

{{< mermaid >}}
  graph LR
    v1 --> v2
    v3 --> v4
    v4 --> v5
    v1 --> v4
    v2 --> v4
    v2 --> v5
{{</ mermaid >}}

For this example, the longest path is $(v_1, v_2) \rightarrow (v_2, v_4) \rightarrow (v_4, v_5)$.

**Solution**

We shall define $opt(i)$ to indicate the length of the longest path from $v_1$ to $v_i$ by

$$
  opt(0) = 0
$$

$$
  opt(i)_{1 > 0} = 1 + \max \\{ opt(k) | (v_k, v_i) \in E \\}
$$

The answer we are looking for is given by $opt(n)$.

The intuition here is breaking the problem into smaller subproblems. The most straight forward way of doing so is by starting from $v_1$ and incrementally adding more vertices into consideration.

**Psuedo**

As always, pseudo is very important in dynamic programming algorithms in order to illustrate pattenr of building the data structure (bottom up).

- Initialize opt
  - $opt \leftarrow array(n)$
  - $opt[0] \leftarrow 0$
  - $\forall i \in \\{ 1, 2, ..., n \\}$
    - $opt[i] \leftarrow nil$
- Build opt in a bottom up fashion
  - $for ~ i \leftarrow 1 ~ to ~ n$
    - $opt[i] \leftarrow 1 + \max \\{ opt(k) | (v_k, v_i) \in E \\}$
- Return $opt[n]$

**Time Complexity**

- Initialization of opt is $O(n)$
- Building opt takes $O(n)$ iterations
  - Each iteration takes $O(n)$ accesses to opt

So in total, the time complexity is $O(n^2)$