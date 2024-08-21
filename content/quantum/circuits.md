---
title: Quantum computing, Circuits
categories:
- Quantum Computing
tags:
- Quantum Computing
- Quantum Mechanics
---

## Rotation operators

For some pauli matrix $\sigma$:

$$
R_\sigma(\theta) = e^{-i \theta/2} = cos \frac{\theta}{2}I - i sin \frac{\theta}{2} \sigma
$$

The operator rotates (in the bloch space) the qubit around the Puali axis ($x,y$ or $z$ according to if $\sigma$ is $\sigma_x, \sigma_y$ or $\sigma_z$ respectively).

## Circuit identities

Recall that Pauli matrices are involutory (i.e. $A^2 = I$), therefore:

$$
    XX = YY = ZZ = I
$$

Hadamard and Pauli

$$
HXH = X; ~~ HYH = -Y; ~~ HZH=X
$$

Hadadamard and $\pi/8$
$$
    HTH = R_x(\pi/4)
$$

## Decomposition of single qubit gates (Corrolary 4.2)

This is a useful corrolary for the construction of multi-qubit controlled unitary operations.

Suppose $U$ is a single-qubit unitary operation. There exist single-qubit unitary operators $A, B, C$ such that $ABC=I$ and ${U = e^{i\alpha} AXBXC}$, where $\alpha$ is some global phase.