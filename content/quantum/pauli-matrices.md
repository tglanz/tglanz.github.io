---
title: Quantum mechanics, Pauli Matrices
categories:
- Quantum Computing
tags:
- Quantum Computing
- Quantum Mechanics
---

# Properties and definitions about the Pauli matrices

## Pauli I

$$
\sigma_0 = I = \begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$

**Representation using outer products**

$$
I = \ket0\bra0 + \ket1\bra1
$$

## Pauli X

$$
\sigma_1 = \sigma_x = X =
\begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
$$

**Representation using outer products**

$$
X = \ket1\bra0 + \ket0\bra1
$$

**Eigenvalues/Eigenvectors**

$$
\begin{align*}
\lambda_1 = 1 ~~ &; ~~ u_1 = \begin{pmatrix}1 \\ 1\end{pmatrix} \\
\lambda_2 = -1 ~~ &; ~~ u_2 = \begin{pmatrix}1 \\ -1\end{pmatrix}
\end{align*}
$$

## Pauli Y


$$
\sigma_2 = \sigma_y = Y =
\begin{bmatrix}
0 & -i \\
i & -0
\end{bmatrix}
$$


$$
\begin{align*}
\lambda_1 = 1 ~~ &; ~~ u_1 = \begin{pmatrix}1 \\ i\end{pmatrix} \\
\lambda_2 = -1 ~~ &; ~~ u_2 = \begin{pmatrix}1 \\ -i\end{pmatrix}
\end{align*}
$$

**Representation using outer products**

$$
Y = i \ket1\bra0 - i\ket0\bra1
$$

**Eigenvalues/Eigenvectors**

$$
\begin{align*}
\lambda_1 = 1 ~~ &; ~~ u_1 = \begin{pmatrix}1 \\ i\end{pmatrix} \\
\lambda_2 = -1 ~~ &; ~~ u_2 = \begin{pmatrix}1 \\ -i\end{pmatrix}
\end{align*}
$$

## Pauli Z

$$
\sigma_3 = \sigma_z = Z =
\begin{bmatrix}
1 & 0 \\
0 & -1
\end{bmatrix}
$$

**Representation using outer products**

$$
Z = \ket0\bra0 - \ket1\bra1
$$

**Eigenvalues/Eigenvectors**

$$
\begin{align*}
\lambda_1 = 1 ~~ &; ~~ u_1 = \begin{pmatrix}1 \\ 0\end{pmatrix} \\
\lambda_2 = -1 ~~ &; ~~ u_2 = \begin{pmatrix}0 \\ 1\end{pmatrix}
\end{align*}
$$


# Appendix: Reminder on the outer products

The representation using outer product is due to the _completenes relation_ which states that for any orthonormal basis $\ket i$:

$$
    \sum_i \ket i \bra i = I
$$

As an application we can represent any operator in the outer product notation. Suppose $A : V \rightarrow W$ is a linear operator and $\ket {v_i}$ is an orthonormal basis of $V$ and $\ket {w_i}$ is an orthonormal basis of $W$.

Because

$$
A = I_W A I_V
$$

we can use the completeness relation and obtain

$$
\begin{align*}
A &= I_W A I_V \\
  &= \sum_{i,j} \ket {w_j} \bra{w_j} A \ket {v_i} \bra {v_i} \\
  &= \sum_{i,j} \bra{w_j} A \ket {v_i} \ket {w_j} \bra {v_i}
\end{align*}
$$

We can tell that $A_{ij} = \bra {w_i} A \ket {v_j}$.

For intuition, below are the outer products of the **computational basis** $\ket 0$ and $\ket 1$.

$$
\ket 0 \bra 0 = \begin{bmatrix}
1 & 0 \\
0 & 0
\end{bmatrix}
$$

$$
\ket 1 \bra 0 = \begin{bmatrix}
0 & 0 \\
1 & 0
\end{bmatrix}
$$

$$
\ket 0 \bra 1 = \begin{bmatrix}
0 & 1 \\
0 & 0
\end{bmatrix}
$$

$$
\ket 1 \bra 1 = \begin{bmatrix}
0 & 0 \\
0 & 1
\end{bmatrix}
$$

Simply put $\ket i \bra j$ is a matrix with all zeros but a $1$ in the $i, j$ index. Therefore, a matrix whose values are $A_{ij}$ can be represented as a linear combination of the basis matrices that were produced by the outer product.