---
title: Quantum Fourier Transform and Phase Estimation
categories:
- Quantum Computing
tags:
- Quantum Computing
- Quantum Mechanics
---

# Quantum Fourier Transform (QFT)

## Definition

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

## Product Representation

Let $n$ be some integer and the basis $\ket0, \ket1, \cdots, \ket{2^{n-1}}$ the computational basis for an $n$ qubit system.

It is useful to express a basis state $\ket j$ using binary representation. Using binary representation we get that ${\ket j = \ket {j_1 j_2 \cdots j_n}}$ such that ${j = j_1 2^{n-1} + j_2 2^{n-2} + \cdots + j_n 2^0}$

We will also use binary representation for fractions using the notation $0.j_l j_{l+1} ... j_m$ which indicate the binary fraction $j_l/2 + j_{l+1}/4 + \cdots + j_m / 2^{m - l + 1}$.

The quantum fourier transform can be given the following _product representation_:
$$
\ket{j_1 j_2 ... j_n} \longrightarrow \frac{ 
    (\ket{0} + e^{2\pi i 0.j_n}\ket{1}) + (\ket{0} + e^{2\pi i 0.j_{n-1} j_n}\ket{1}) + \cdots + (\ket{0} + e^{2\pi i 0.j_1j_2 \cdots j_n}\ket{1})
}{2^{n/2}}
$$

_Proof:_

By definition
$$
\ket{j} \longrightarrow \frac{1}{2^{n/2}} \sum_{k=0}^{2^n-1} e^{2\pi i jk/2^n} \ket{k}
$$

Using binary representation $\ket{k} = \ket{k_1 k_2 \cdots k_n}$ we get
$$
\frac{1}{2^{n/2}} \sum_{k_1=0}^1 \sum_{k_2=0}^1 \cdots \sum_{k_n=0}^1 e^{2\pi i jk/2^n} \ket{k_1 k_2 \cdots k_n}
$$

Now, notice that because
$$
k/2^n =
\frac{k_1 2^{n-1} + k_2 2^{n-2} + \cdots k_n 2^0}{2^n} =
k_1 2^{-1} + k_2 2^{-2} + \cdots k_n 2^{-n} =
\sum_{l=1}^n k_l 2^{-l}
$$

we can write
$$
\ket{j} \longrightarrow
\frac{1}{2^{n/2}} \sum_{k_1=0}^1 \sum_{k_2=0}^1 \cdots \sum_{k_n=0}^1 e^{2\pi i j (\sum_{l=1}^n k_l 2^{-l})} \ket{k_1 k_2 \cdots k_n}
$$

Observe that
$$
\ket{k_1 k_2 \cdots k_n} = \ket{k_1} \otimes \ket{k_2} \cdots \ket{k_n}
$$

therefore the above can be broken to
$$
\begin{align*}
\ket{j} \longrightarrow&
\frac{1}{2^{n/2}} \sum_{k_1=0}^1 \sum_{k_2=0}^1 \cdots \sum_{k_n=0}^1 \bigotimes_{l=1}^n e^{2\pi i j k_l 2^{-l}} \ket{k_l} \\
=& \frac{1}{2^{n/2}} \bigotimes_{l=1}^n \sum_{k_l=0}^1 e^{2 \pi i j k_l 2^{-l}} \ket{k_l} \\
=& \frac{1}{2^{n/2}} \bigotimes_{l=1}^n \lbrack \ket{0} + e^{2 \pi i j 2^{-l}} \ket{1}  \rbrack \\
=& \frac{1}{2^{n/2}} \bigotimes_{l=1}^n \lbrack \ket{0} + e^{2 \pi i (j_1^{n-1-l} + j_2^{n-2-l} + \cdots + j_n 2^{- l})} \ket{1}  
\end{align*}
$$


Let's look at the tensor product:


$$
\begin{align*}
\bigotimes_{l=1}^n \lbrack \ket{0} + e^{2 \pi i (j_1^{n-1-l} + j_2^{n-2-l} + \cdots + j_n 2^{- l})} \ket{1}
=& \ket{0} + e^{2\pi i(j_1 2^{n-2} + j_22^{n-3}+\cdots+j_n2^{-1})} \\
\otimes& \ket{0} + e^{2\pi i(j_1 2^{n-3} + j_22^{n-4}+\cdots+j_{n-1}2^{-1}+j_n2^{-2})} \\
\otimes& \ket{0} + e^{2\pi i(j_1 2^{n-4} + j_22^{n-5}+\cdots+j_{n-1}2^{-1}+j_{n-2}2^{-2}+j_n2^{-3})} \\
\otimes& \cdots
\end{align*}
$$

Recall that $e^{2 \pi a} = 1$ forall positive $a$. So,
$$
\begin{align*}
\bigotimes_{l=1}^n \lbrack \ket{0} + e^{2 \pi i (j_1^{n-1-l} + j_2^{n-2-l} + \cdots + j_n 2^{- l})} \ket{1}
=& \ket{0} + e^{2\pi i(a_1 +j_n2^{-1})} \\
\otimes& \ket{0} + e^{2\pi i(a_2+j_{n-1}2^{-1}+j_n2^{-2})} \\
\otimes& \ket{0} + e^{2\pi i(a_3+j_{n-1}2^{-1}+j_{n-2}2^{-2}+j_n2^{-3})} \\
\otimes& \cdots \\
=& \ket{0} + e^{2\pi i(j_n2^{-1})} \\
\otimes& \ket{0} + e^{2\pi i(j_{n-1}2^{-1}+j_n2^{-2})} \\
\otimes& \ket{0} + e^{2\pi i(j_{n-1}2^{-1}+j_{n-2}2^{-2}+j_n2^{-3})} \\
\otimes& \cdots \\
=& \ket{0} + e^{2\pi i 0.j_n} \\
\otimes& \ket{0} + e^{2\pi i 0.j_{n-1}j_n} \\
\otimes& \ket{0} + e^{2\pi i 0.j_{n-2}j_{n-1}j_n} \\
\otimes& \cdots \\
\otimes& \ket{0} + e^{2\pi i 0.j_1 j_2 \cdots j_n} \\
\end{align*}
$$

Putting this back we get that
$$
\ket{j} \longrightarrow \frac{ 
    (\ket{0} + e^{2\pi i 0.j_n}\ket{1}) + (\ket{0} + e^{2\pi i 0.j_{n-1} j_n}\ket{1}) + \cdots + (\ket{0} + e^{2\pi i 0.j_1j_2 \cdots j_n}\ket{1})
}{2^{n/2}}
$$