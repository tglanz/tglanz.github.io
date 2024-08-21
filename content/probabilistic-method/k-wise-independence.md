---
title: k-Wise independence
toc: false
categories:
- Computer Science
- Probabilistic Method
tags:
- Probabilistic Method
meta:
- Matices notation in latex: https://www.math-linux.com/latex-26/faq/latex-faq/article/how-to-write-matrices-in-latex-matrix-pmatrix-bmatrix-vmatrix-vmatrix
---

# k-wise independence

**Definition** The $n$ random variables $X_1, X_2, ..., X_n$ are said to be **k-wise independent** iff any subset of $k$ random variables $X_{i_1}, X_{i_2}, ..., X_{i_k}$ consists of randomly independent variables, i.e.:

$$
    Pr(X_{i_1}, X_{i_2}, ..., X_{i_k}) = \prod_{j=1}^k Pr(X_{i_j})
$$

Combinatorically, there are $n \choose k$ different constraints.

Given $n$, for every $k < n -1$ we can construct a set of $n$ random variables that are k-wise indpendent but not (k+1)-wise independent. Let's see a specific example:


## Example, 2 but not 3 wise independence

For an example, we will show a group of 3 random variables that are 2-wise independent and are not 3-wise independent.

Let $X, Y$ be uniformly random bits (i.e. they are random variables that can assume the values 0 or 1).


The truth table, with the probability of of the entry:

Pr(X, Y) | $X$ | $Y$
:-:|:-:|:-:
$\frac{1}{4}$ |0|0
$\frac{1}{4}$ |0|1
$\frac{1}{4}$ |1|0
$\frac{1}{4}$ |1|1

We can see that $Pr(X, Y) = Pr(X)Pr(Y)$ so obsiously $X$ and $Y$ are independent.

Now, let's define $Z := X \oplus Y$ where $\oplus$ is the XOR operation. We can write the truth table:

$X$ | $Y$ | $Z$
:-:|:-:|:-:
0|0|0
0|1|1
1|0|1
1|1|0

Let's examine only $X$ and $Z$:

Pr(X, Z) | $X$ | $Z$
:-:|:-:|:-:
$\frac{1}{4}$ |0|0
$\frac{1}{4}$ |0|1
$\frac{1}{4}$ |1|1
$\frac{1}{4}$ |1|0

We can see that $Pr(X, Z) = Pr(X)Pr(Z)$ so obsiously $X$ and $Z$ are independent.

Let's examine only $Y$ and $Z$:

Pr(Y, Z) | $Y$ | $Z$
:-:|:-:|:-:
$\frac{1}{4}$ |0|0
$\frac{1}{4}$ |1|1
$\frac{1}{4}$ |0|1
$\frac{1}{4}$ |1|0

We can see that $Pr(Y, Z) = Pr(Y)Pr(Z)$ so obsiously $Y$ and $Z$ are independent.

All in all, we saw that every pair from $X, Y$ and $Z$ are independent. But of course they are not 3-wise indpeendent because by the definition of $Z$ it is not random at all! $Z$ is defined as the XOR of $X$ and $Y$ and is not assuming random values. For example, $Pr(X=0, Y=0, Z=1) = 0$ rather than $\frac{1}{2}^3$.

## The construction of Vandermonde (VDM)

The construction of VDM is a construction of $N$ random variables that are uniformly distributed in $\{ 0, 1, ..., N \}$ that are k-wise independent.

Let $\mathbb{F}$ be a field such that $\mathbb{|F|} = N$ and $N$ is a power of a primary number.

> We limited the genrality a bit by limiting $N$

Let $a_0, a_1, ..., a_k \in \mathbb{F}$ be $k$ independent uniformly random variables. We define a unfiormly random polynomail $p(x)$ of degree $k$ by:

$$
    p(x) = \sum_{i = 0}^{k-1} a_i x^i
$$

For every $\alpha \in \mathbb{F}$ the polynomial $p$ implicitly defines a random variable $p(\alpha)$. 

We will show that for every $k$ different elements $\alpha_0, \alpha_2, ..., \alpha_{k-1} \in \mathbb{F}$ the $k$ random variables $P =  \{ p(\alpha_0), p(\alpha_1), ..., p(\alpha_{k-1}) \}$ are independent and are uniformly distributed.

Once we showed this, we showed that the $N$ random variables which are implicitly defined from all the elements in the field $\mathbb{F}$, are k-wise independent.

To show that $P$ are independent we need to show that for every $v_0, v_1, ..., v_{k-1} \in \mathbb{F}$ it holds true that

$$
  Pr(p(\alpha_0) = v_0, p(\alpha_1) = v_1, ..., p(\alpha_{k-1}) = v_{k-1}) = Pr(p(\alpha_0) = v_0) \cdot Pr(p(\alpha_1) = v_1) \cdot \cdot \cdot Pr(p(\alpha_{k-1}) = v_{k-1})
$$

Or in vector form:

$$
    Pr(p(\alpha) = v) = \prod_{i=0}^{k-1} Pr(p(\alpha_i) = v_i)
$$

And to show that $P$ are uniformly distributed we need to show that

$$
    Pr(p(\alpha) = v) = \prod_{i=0}^{k-1} Pr(p(\alpha_i) = v_i) = N^{-k}
$$

Let's get to work then. We start by expanding the expressions:

\begin{align*}
&p(\alpha_0) = \sum_{i=0}^{k-1} a_i \alpha_0^i = v_0 \\
&p(\alpha_1) = \sum_{i=0}^{k-1} a_i \alpha_1^i = v_1 \\
&... \\
&p(\alpha_{k-1}) = \sum_{i=0}^{k-1} a_i \alpha_{k-1}^i = v_{k-1} \\
\end{align*}

Let $V$ be the matrix:

$$
V = 
\begin{pmatrix}
\alpha_0^0 & \alpha_0^1 & ... & \alpha_0^{k-1} \\
\alpha_1^0 & \alpha_1^1 & ... & \alpha_1^{k-1} \\
\vdots & \vdots & \vdots & \vdots \\
\alpha_{k-1}^0 & \alpha_{k-1}^1 & ... & \alpha_{k-1}^{k-1} \\
\end{pmatrix}
$$

This kind of matrix is well known as the **VDM** matrix of $\alpha$.

Using $V$ we can write the previous equations in matrix form:

$$
    V a = p(\alpha) = v
$$

A simple calculation shows that $det(V) \neq 0$. We conclude then that $V$ is inversible.

So,

$$
    Pr(p(\alpha) = v) = Pr(Va = v) = Pr(a = V^{-1}v)
$$

Well, what is the probability $Pr(a = V^{-1}v)$? $V^{-1}v = u$ is just an arbitrary vector in $\mathbb{F}^k$. The probability of $a$ to be this exact vector is

$$
    Pr \biggr[ a_0 = u_0, a_1 = u_1, ..., a_{k-1} = u_{k-1} \biggr]
$$

By definition, $\{ a_i \}_{i=0}^{k-1}$ are uniform and independent variables so we get that

\begin{align*}
    Pr(p(\alpha) = v) =& Pr(Va = v) \\
    =& Pr(a = V^{-1}v) = Pr(a = u) = \prod_{i=0}^{k-1} \frac{1}{N} \\
    =& N^{k}
\end{align*}

As we wanted.