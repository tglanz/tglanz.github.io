---
title: Inner products in Quantum Computing
tags:
- Quantum Computing
- Quantum
categories:
- Quantum Computing
---

The inner product is a known topic. Here we will illustrate it from a different perspective, of the quantum computing.

Given the two kets:
$$
\ket\psi = \begin{pmatrix}
\alpha_1 \\
\vdots \\
\alpha_n
\end{pmatrix}
~~and~~
\ket\phi = \begin{pmatrix}
\beta_1 \\
\vdots \\
\beta_n
\end{pmatrix}
$$

The inner product of $\ket\psi$ and $\ket\phi$ is the scalar defined by
$$
\braket{\psi|\phi} = (\overline{\alpha_1} \cdots \overline{\alpha_n})\begin{pmatrix}
\beta_1 \\
\vdots \\
\beta_n
\end{pmatrix}
=
\sum_{i=1}^n \overline{\alpha_i} \beta_i
$$

### With basis vectors

Looking at it using basis vectors $\ket{a}$ and $\ket{b}$.

Given the vetors
$$
\ket{\phi} = \sum_{a \in \Sigma} \alpha_a \ket{a} ~~and~~ 
\ket{\psi} = \sum_{b \in \Gamma} \beta_b \ket{b} 
$$

We have that
$$
\braket{\psi|\phi} =
(\sum_{a \in \Sigma} \overline{\alpha_a} \bra{a}) (\sum_{b \in \Gamma} \beta_b \ket{b}) =
\sum_{a \in \Sigma} \sum_{b \in \Gamma} \overline{\alpha_a} \beta_b \braket{a | b} = 
\sum_{a \in \Sigma} \overline{\alpha_a} \beta_a
$$

where the last equality stems from the orhogonality of the vectors.

### Euclidean Norm

The Euclidean Norm is the Norm induced from the inner product.

Given the vector
$$
\ket{\psi} = \sum_{a \in \Sigma} \alpha_a \ket{a}
$$

The **Euclidean Norm** is defined by
$$
||\ket{\psi}|| =
\sqrt{ \braket{\psi|\psi} } =
\sqrt{\sum_{a \in \Sigma} \overline{\alpha_a} \alpha_a} =
\sqrt{\sum_{a \in \Sigma} |\alpha_a|^2}
$$

### Properties of the inner product

**Conjugate Symmetry**

For any two vectors $\ket{\psi}$ and $\ket{\phi}$ it holds that
$$
\braket{\psi | \phi} = \overline{\braket{\phi | \psi}}
$$

**Linearity in the second argument**
$$
\bra{\psi}(\alpha_1\ket{\phi_1} + \alpha_2\ket{\phi_2}) =
\alpha_1\braket{\psi|\phi_1} + \alpha_2\braket{\psi|\phi_2}
$$

**Conjugate linearity in the first argument**
$$
\braket{(\beta_1 \ket{\psi_1} + \beta_2 \ket{\psi_2}) |\phi} =
\braket{(\overline{\beta_1} \bra{\psi_1} + \overline{\beta_2} \bra{\psi_2}) |\phi} =
\overline{\beta_1} \braket{\psi_1|\phi} + \overline{\beta_2} \braket{\psi_2|\phi} 
$$

### The cauchy schwartz inequality

A very important inequality the correlates between the inner product and the norm.

For every $\ket{\psi}$ and $\ket{\phi}$:
$$
\lvert \braket{\psi|\phi} \rvert \leq \lVert \ket{\psi} \rVert \cdot \lVert \ket{\phi} \rVert
$$

The equality achieved iff the vectors are linearly dependant.

### Orthogonality and Orthonormality

The vectors $\ket{\psi}$ and $\ket{\phi}$ are said to be orthogonal iff 
$$
\braket{\psi|\phi} = 0
$$

In general, a set of vectors $\{ \ket{\psi_1}, ..., \ket{\psi_m} \}$ is said to be **orgthogonal** iff al possible pairs are orthogonals
$$
\braket{\psi_j|\psi_k} = 0 ~~~~ \forall j \neq k
$$

If in addition, the vectors in the set are unit vectors (norm 1) then the set is said to be **orthonormal** and it will be true that
$$
\braket{\psi_j|\psi_k} = \begin{cases}
1 & j \neq k \\
0 & j = k
\end{cases}
$$

An **orthonormal basis** is an orthonormal basis that forms a basis to the space.

It is widely known (e.g. through Grahm Schmidt process) that any orthonormal set can be extended to an orthonormal basis.

#### Examples

The set $\{ \ket{+}, \ket{-} \}$ is an orthonormal basis for the 2-dimensional space corresponding to a single qubit.

The bell basis is an orthonormal set for the 4-dimensional space corresponding to two qubits.

#### Orthonormality and Unitary matrices

The following facts for a square matrix $\mathcal{U}$ are equivalent

- $\mathcal{U}$ is unitary (i.e. $\mathcal{U}^\dagger \mathcal{U} = 1 = \mathcal{U}\mathcal{U}^\dagger$)
- The rows of $\mathcal{U}$ form an orthonormal basis
- The columns of $\mathcal{U}$ form an orthonormal basis