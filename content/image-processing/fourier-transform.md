---
title: Image processing, Fourier Transform
categories:
- Image Processing
tags:
- Image Processing
---

## The frequency domain

An image of size $m \times n$ is an element in a linear space of dimension $m \times n$.

An example basis for such space is the basis of matrices of size $m \times n$ with a single $1$ entry and the rest entries are $0$.

We are interested in a basis of waves of different frequencies.in

## Definitions and properties in one variable

The fourier transform
$$
\hat{g}(f) = \int_{-\infty}^{\infty} g(t) e^{-2\pi ft} dt
$$

The inverse fourier transform
$$
g(t) = \int_{-\infty}^{\infty} \hat{g}(f) e^{2 \pi ft} df
$$

We also denote the fourier transform by $\mathcal{F}[g] = \hat{g}$.

**The FT is linear:**
$$
\mathcal{F}[k(t) + g(t)] = \mathcal{F}[k(t)] + \mathcal{F}[g(t)]
$$

**The FT of the derivative:**
$$
\mathcal{F}[g'(t)] = 2 \pi if \cdot \mathcal{F}[g(t)]
$$