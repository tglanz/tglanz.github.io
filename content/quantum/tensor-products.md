---
title: Tensor products in Quantum Computing
tags:
- Quantum
- Quantum Computing
categories:
- Quantum Computing
---

## Tensor product of vectors

### Definition

The tensor product of two vectors
$$
    \ket{\phi} = \sum_{a \in \Sigma} \alpha_a \ket{a} ~~;~~ \ket{\psi} = \sum_{b \in \Gamma} \beta_b \ket{b}
$$

is the vector
$$
\ket{\phi} \otimes \ket{\psi} = \sum_{(a, b) \in \Sigma \times \Gamma} \alpha_a \beta_b \ket{a b}
$$

Explicitly:

$$
\begin{pmatrix}
\alpha_1 \\
\vdots \\
\alpha_m
\end{pmatrix}
\otimes
\begin{pmatrix}
\beta_1 \\
\vdots \\
\beta_k
\end{pmatrix}
=
\begin{pmatrix}
\alpha_1 \beta_1 \\
\vdots \\
\alpha_1 \beta_k \\
\alpha_2 \beta_1 \\
\vdots \\
\alpha_2 \beta_k \\
\vdots \\
\alpha_m \beta_1 \\
\vdots \\
\alpha_m \beta_k \\

\end{pmatrix}
$$

### Notations

Some other notations:
$$
    \ket{\phi} \otimes \ket{\psi} = 
    \ket{\phi} \ket{\psi} = 
    \ket{\phi \otimes \psi}
$$

### Example

Let

$$
    \ket{\phi} = \frac{1}{4}\ket{0} + \frac{3}{4}\ket{1} ~~;~~ \ket{\psi} = \frac{2}{3}\ket{0} + \frac{1}{3} \ket{1}
$$

then the tensor product is
$$
    \ket{\phi} \otimes \ket{\psi} =
    \frac{1}{6} \ket{00} + \frac{1}{12}\ket{01} + \frac{1}{2} \ket{10} + \frac{1}{4}\ket{11}
$$

### Properties

The tensor product is a [Bilinear Map](https://en.wikipedia.org/wiki/Bilinear_map).

Linearity of the first argument:

$$
(\ket{\phi_1} + \ket{\phi_2}) \ket{\psi} = \ket{\phi_1} \ket{\psi} + \ket{\phi_2} \ket{\psi}
$$

$$
(\alpha \ket{\phi}) \ket{\psi} = \alpha (\ket{\phi} \ket{\psi})
$$

Linearity of the second argument is analogous.

## Tensor product of matrices

### Definition

The tensor product of two matrices

$$
M = \sum_{a, b \in \Sigma} \alpha_{ab} \ket{a}\bra{b} ~~;~~
N = \sum_{c, d \in \Gamma} \beta_{cd} \ket{c}\bra{d}
$$

is the matrix
$$
M \otimes N = \sum_{a, b \in \Sigma} \sum_{c, d \in \Gamma} \alpha_{ab} \beta_{cd} \ket{ac} \bra{bd}
$$

$$
\begin{pmatrix}
\alpha_{11} & \cdots & \alpha_{1m} \\
\vdots & \ddots & \vdots \\
\alpha_{m1} & \cdots & \alpha_{mm} \\
\end{pmatrix}
\otimes
\begin{pmatrix}
\beta_{11} & \cdots & \beta_{1k} \\
\vdots & \ddots & \vdots \\
\beta_{k1} & \cdots & \beta_{kk} \\
\end{pmatrix}
=
\begin{pmatrix}
\alpha_{11}\beta_{11} & \cdots & \alpha_{11}\beta_{1k} & & & \alpha_{1m}\beta_{1k} & \cdots & \alpha_{11}\beta_{1k} & & \\
\vdots & \ddots & \vdots & &  \cdots & \vdots & \ddots & \vdots \\
\alpha_{11}\beta_{k1} & \ldots & \alpha_{11}\beta_{kk} & & & \alpha_{1m}\beta_{k1} & \ldots & \alpha_{1m}\beta_{kk} & & \\
& \vdots & & &\ddots & & \vdots \\
\alpha_{m1}\beta_{11} & \cdots & \alpha_{m1}\beta_{1k} & & & \alpha_{mm}\beta_{1k} & \cdots & \alpha_{mm}\beta_{1k} & & \\
\vdots & \ddots & \vdots & &  \cdots & \vdots & \ddots & \vdots \\
\alpha_{m1}\beta_{k1} & \ldots & \alpha_{m1}\beta_{kk} & & & \alpha_{mm}\beta_{k1} & \ldots & \alpha_{mm}\beta_{kk} & &
\end{pmatrix}
$$