---
title: Physics Informed Neural Networks
categories:
- Computer Science
- AI
- PDEs
priority: 10
toc: false
tags:
- PDEs 
- AI
- Physics
- Neural Networks
- Deep Learning
description: |
  Neural networks that respects physics
---

## Introduction

Standard Physics Informed Neural Networks (PINNs) considers PDEs of the following form:

$$
  u_t + \mathcal{N}[u ; \lambda] = 0
$$

with $u(t, x)$ the unknown function of time $t \in [0, T] \subset \mathbb{R}$ and space $x \in \Omega \subset \mathbb{R}^D$ and $\mathcal{N}$ is a nonlinear differential operator with parameters $\lambda \in \mathbb{R}^k$.

Given a set of measurements, we can raise two questions:

- Part 1, Regarding prediction: For some $\lambda$, what is there to say about $u$? 
  - Can we predict future measurements?
  - Can we guess data points between measurements?

- Part 2, Regarding identification: What $\lambda$s best describe the observations?

Observe that:

- The order of the time derivative is 1

## Part 1: Solution prediction

The $\lambda$s are fixed. We will focus on equations of the form 

\begin{equation}
    f(t, x) = u_t + \mathcal{N}[u]
\end{equation}

To approximate $u(t, x)$ we will use a deep NN. We can differentiate $u$ with respect to $t$ and also apply the differential operator $\mathcal{N}$ to get the PINN $f(t, x)$.

Given the 

- training data $\\{ t_u^i, x_u^i \\}_{i=1}^{N_u}$ 
- set of **colocation points (TODO)** $\\{ t_f^i, x_f^i \\}_{i=1}^{N_f}$

We define the Loss Function $L = MSE_u + MSE_f$ with:

\begin{align*}
    MSE_u &= \frac{1}{N_u} \sum_{i=1}^{N_u}|u(t_u^i, x_u^i)|^2 \\
    MSE_f &= \frac{1}{N_f} \sum_{i=1}^{N_f}|f(t_f^i, x_f^i)|^2
\end{align*}
