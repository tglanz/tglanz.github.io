---
title: The Probabilistic Method
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

# Probability Background

Before we continue we need to review some basic probability concepts.

A **probability space** is a triplet $(\Omega, \Sigma, Pr)$ where

1. $\Omega$ is a non-empty set known as the **sample space**. It represents all possible outcomes of some experiment.
  - We will limit ourselves to a finite sample space.
2. $\Sigma$ is the collection of subsets of $\Omega$ which is closed under the **complement ($'$)**, **union ($\cup$)** and **intersection ($\cap$)** operations.
  - An element $A \in \Sigma$ is called an **event**.
3. $Pr : \Sigma \rightarrow [0, 1]$ is a function with the following properties:
  - $Pr(\Omega) = 1$
  - $\forall A, B \in \Sigma ; A \cap B = \phi \implies Pr(A) + Pr(B) = Pr(A \cup B)$
  - $\forall \omega \in \Omega ; $  we will denote $Pr(\omega) = Pr(\\{\omega\\})$

  > Methematically, a probability space is a measure space with the measure function over $\Omega$ where $\Sigma$ is the $\sigma$-algebra over $\Omega$ and $Pr$ is the measure of the space such that $Pr(\Omega) = 1$.
