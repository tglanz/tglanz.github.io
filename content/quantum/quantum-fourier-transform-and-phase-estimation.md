---
title: Quantum Fourier Transform and Phase Estimation
categories:
- Quantum Computing
tags:
- Quantum Computing
- Quantum Mechanics
---

# Quantum Fourier Transform (QFT)

The _quantum Fourier Transform_ on an orthonormal basis ${\ket0, \ket1, ..., \ket{N-1}}$ is the linear operator acting on the basis states as follows:
$$
\ket{j} \longrightarrow \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{2\pi i j k/N}\ket{k}
$$

---

_Claim:_ The QFT operator is unitary (Exercise 5.1).

_Proof:_ Let $U$ be the QFT operator. We want to show that $UU^* = I$. By definition:

$$
U^\dagger\ket{j} = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{-2\pi i j k/N}\ket{k}
$$

We will show that for any two basis states $\ket{j}, \ket{j'}$ it is true that the innert product ${\bra{j'} U^\dagger U \ket{j}}$ is $\delta_{j, j'}$ thus proving that $U^\dagger U = I$.

So,
$$
\begin{align*}
\bra{j'} U^\dagger U \ket{j} &= \bra{j'} (\frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} e^{-2\pi i j k/N}\ket{k}) \frac{1}{\sqrt{N}} \sum_{l=0}^{N-1} e^{2\pi i j l/N}\ket{l}) \ket{j} \\
&= \bra{j'} (\frac{1}{N} \sum_{k=0}^{N-1} \sum_{l=0}^{N-1} e^{2\pi i j (l-k)/N} \delta_{k, l}) \ket{j} \\
&= \bra{j'} \frac{N}{N} \ket{j} = \braket{j'|j} = \delta_{j',j} = 1
\end{align*}
$$

Therefore $U^\dagger U = I$

---

Compute the QFT of the $n$ qubit state $\ket{00...0}$. (Exercise 5.2)

There are $2^n = N$ possible states overall.

Each basis state is in the form $\ket{x_1 x_2 ... x_n}$ where $x_i \in \{0, 1\}$.

Therefore, by definition of QFT:
$$
QFT\ket{00 ... 0} = \frac{1}{\sqrt{2^n}} \sum_{k=0}^{N-1} \ket{k} = \frac{1}{2^{n/2}} \sum_{x_i \in \{0, 1\}} \ket{x_1 x_2 ... x_n}
$$

---

