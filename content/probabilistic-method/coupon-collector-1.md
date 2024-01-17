---
title: Coupons Collector 1
priority: 35
categories:
- Probabilistic Method
- Algorithms
tags:
- Probabilistic Method
- Probability
- Algorithms
---

# Coupons Collector

There exists $n$ types of coupons. Each box contains a single coupon of a uniformly chosen type. 

We are interested in the correlection between the number of boxes we open and the probability of us acquiring every type of coupon.

## Theorem

If we unbox at least $k = 2n \ln n$ boxes, then the probability of us **not** collecting all types of coupons goes to 0 as $n$ goes to infinity.

## Proof

Let

- $X$ be an indicator whether there are coupon types we havn't collected yet after the $k$th unboxing
- $Y_{ij}$ be an indicator whether we havn't yet collected the $j$th coupon after the $i$th unboxing

It holds that $X = \bigcup_{j=1}^{n} Y_{kj}$ so by the union bound we get that $Pr(X) \leq \sum_{j=1}^{n} Pr(Y_{kj})$. By symmetry we get that $Pr(X) \leq n Pr(Y_{kj})$ (for some $j$).

Let $Z_{ij}$ be an indicator whether coupon of type $j$ was not collected in the $i$th unboxing. Then it is true that $Y_{kj} = \bigcap_{i=1}^{k} Z_{ij}$. Forall $k_1 \neq k_2$ the two events $Y_{k_1j}, Y_{k_2j}$ are indepenedent so we get that $Pr(Y_{kj}) = \prod_{i=1}^{k} Pr(Z_{ij})$. By uniformity we get that $Pr(Z_{ij}) = 1 - \frac{1}{n}$ and therefore $Pr(Y_{kj}) = (1 - \frac{1}{n})^k$.

Overall we get that

$$
    Pr(X) \leq n Pr(Y_{kj}) = n(1 - \frac{1}{n})^k
$$

From exponential inequalities

$$
    Pr(X) \leq n e^{-\frac{k}{n}}
$$

We substitue back $k = 2n \ln n$ and get that

$$
    Pr(X) \leq n e^{-\frac{2n\ln n}{n}} = \frac{n}{n^2} = \frac{1}{n} \implies 0
$$
