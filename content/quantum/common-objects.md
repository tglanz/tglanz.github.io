---
title: Common objects in Quantum Computing
tags:
- Quantum Computing
- Quantum
categories:
- Quantum Computing
---

## The bell states

Below are the four **bell states**. Together they form the **bell basis**.

$$
\ket{\phi^+} = \frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{11}
$$

$$
\ket{\phi^-} = \frac{1}{\sqrt{2}}\ket{00} - \frac{1}{\sqrt{2}}\ket{11}
$$

$$
\ket{\psi^+} = \frac{1}{\sqrt{2}}\ket{01} + \frac{1}{\sqrt{2}}\ket{10}
$$

$$
\ket{\psi^-} = \frac{1}{\sqrt{2}}\ket{01} - \frac{1}{\sqrt{2}}\ket{10}
$$

## 3 qubits states

**GHZ State**

The GHZ state is an entangled state.

$$
\frac{1}{\sqrt{2}} \ket{000} + \frac{1}{\sqrt{2}} \ket{111}
$$

**W state**

The W state is an entangled state.

$$
\frac{1}{\sqrt{3}} \ket{001} + \frac{1}{\sqrt{3}} \ket{010} + \frac{1}{\sqrt{3}} \ket{100}
$$

## Common Operations/Gates

**The pauli matrices**

**Pauli-X** is denoted by $X$ and defined by the matrix below. Intuitively, it is a mirroring along the $X$ axis.
$$
X = \begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
$$

**Pauli-Y** is denoted by $Y$ and defined by the matrix below. Intuitively, it is a mirroring along the $Y$ axis.
$$
Y = \begin{bmatrix}
0 & i \\
i & 0
\end{bmatrix}
$$

**Pauli-Z** is denoted by $Z$ and defined by the matrix below. Intuitively, it is a mirroring along the $Z$ axis.
$$
Z = \begin{bmatrix}
1 & 0 \\
0 & -1
\end{bmatrix}
$$

---

**Hadamard** is denoted by $H$ and defined by the matrix below.
$$
H = \frac{1}{\sqrt{2}} \begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix}
$$

---

**Phase(S, P)** is denoted by $S$ and defined by the matrix below.
$$
S = \begin{bmatrix}
1 & 0 \\
0 & i
\end{bmatrix}
$$

---

**$\pi / 8$** is denoted by $T$ and defined by the matrix below.
$$
T = \begin{bmatrix}
1 & 0 \\
0 & e^{i \pi / 4}
\end{bmatrix}
$$

---

**Controlled Not** a.k.a **CNOT** or **CX** is defined by the matrix below. The operation toggles the **target** qubit iff the **control** qubit is $\ket{0}$.
$$
CNOT = \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 1 & 0
\end{bmatrix}
$$

The $CNOT$ is a controlled operation i.e. of the form
$$
\ket{0}\bra{0}\otimes\mathbb{1}_Y + \ket{1}\bra{1}\otimes\mathcal{U} = \begin{pmatrix}
\mathbb{1}_Y & 0 \\
0 & \mathcal{U}
\end{pmatrix}
$$

We can write $CNOT$ as
$$
\ket{0}\bra{0}\otimes\mathbb{1} + \ket{1}\bra{1}\otimes\sigma_x
$$

---

**SWAP** is defined by the matrix below.
$$
SWAP = \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

The $SWAP$ operation swaps the contents of two qubits, i.e.
$$
SWAP \ket{\phi \otimes \psi} = SWAP \ket{\psi \otimes \phi}
$$

There is an interesting relation between the $SWAP$ operation to the bell basis. It leaves all of them alone, except for $\ket{\phi^-}$ which it operates on it by $SWAP \ket{\phi^-} = -\ket{\phi^-}$.