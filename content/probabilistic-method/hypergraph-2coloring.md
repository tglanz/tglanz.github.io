---
title: Hypergraph 2 Coloring
priority: 32
categories:
- Computer Science
- Probabilistic Method
tags:
- Probabilistic Method
- Probability
- Algorithms
---

# Hypergraph 2 Coloring

A **hypergraph** is the pair $H = (V, E)$ where $V$ is a set of **hypernodes** (a.k.a **nodes**) and $E$ is a set of **hyperedges** (a.k.a **edges**) such that every element $e \in E$ is a non-empty subset of $V$. A **k-uniform** hypergraph is a hypergraph such that the size of every hyperedge is exactly $k$.

A **k-coloring** of an hypergraph is a mapping of every node to the set of colors $\\{ C_1, C_2, ..., C_k \\}$. A hyperedge is said to be **monochromatic** if all of it's nodes are of the same color. A hypergraph is said to be **k-colorable** if there exist a k-coloring such that there is no monochromatic edges.

## Theorem

If $H = (V, E)$ is a k-uniform hypergraph such that $|E| < 2^{k-1}$ then $H$ is 2-colorable.

## Proof

Let $H = (V, E)$ be a k-uniform hypergraph such that $m = |E| < 2^{k-1}$.

Let there be a random colorization of $H$ such that every node is mapped to either $RED$ or $BLUE$ uniformly and let $A$ denote the event the the colorization is proper (i.e. there is no monochromatic edge).

If we will show that $Pr(A) > 0$, then we can conclude that **there is** a 2-coloring, otherwise the probability was 0. We will work with the complement $A'$ and show that $Pr(A') < 1$ and therefore $Pr(A) > 0$.

Let $B_e$ be the event that the hyperedge $e \in E$ is monochromatic. It is true that $A' = \bigcap_{e \in E} B_e$. By the union bound: $Pr(A') \leq \sum_{e \in E} Pr(B_e)$. The probability that a hyperedge is monochromatic is the same for all edges, therefore we can write $Pr(A') \leq m Pr(B_e)$ (we abuse notation a bit, $e$ is some candidate edge).

A hyperedge is monochromatic if either all of it's vertices are $BLUE$ or $RED$ - we will denote those events respectively by $C_{eb}$ and $C_{er}$. By symmetry, $Pr(C_{eb}) = Pr(C_{er})$ and the events are disjointed; therefore $Pr(B_e) = 2Pr(B_{eb})$.

Let's calculate the probability that hyperedge $e$ is $BLUE$, i.e. $Pr(B_{eb})$. We will define yet other events $X_v$ indicating whether $v \in V$ is $BLUE$. By our sampling definition, $Pr(X_v) = \frac{1}{2}$ forall $v \in V$. Because $X_v$ and $X_u$ are independent for all $u,v \in V$, we realize that $B_{eb} = \bigcup \prod_{v \in e} Pr(X_v) = 2^{-k}$.

Therefore $Pr(B_e) = 2 \cdot 2^{-k} = 2^{1-k}$ so $Pr(A') \leq m 2^{1-k}$.

By the assumption that $m < 2^{k-1}$ we conclude that $Pr(A') < 2^0 = 1$ as we wanted.
