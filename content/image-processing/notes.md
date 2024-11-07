---
title: Image processing, Notes
categories:
- Image Processing
tags:
- Image Processing
---

# Halftoning

Reduce the quantization levels of some channel.

For example, 

- Reduce the grayscale image levels from 255 to 4
- Reduce the Red channel levels from 255 to 2

**Dithering**

Multiply each pixel and round it. Then compare pass a threshold matrix $\begin{bmatrix}
0 & 2 \\
3 & 1
\end{bmatrix}$ such that if the new pixel value is above it's corresponding matrix value, the new value will be white.

**Error Diffusion**

From top to bottom, left to right: Clam each pixel to it's nearest level and get the error (old value - new value). Spread this error to neighbouring, unvisited pixels by adding a fraction of the error ass follows: 7/16 east, 3/16 southwest, 5/16 south and 1/16 southeast.

# Color fundamentals

The pure colors defined by the CIE are the **R**ed, **G**reen and **B**lue. The human eye see colors are variable combination of these colors (as indicated in the book page 401).

# Fourier transform

### 2D DFT, Definition and properties

Summarized at p258-259

Definition of DFT and IDFT
$$
\mathcal{F}[f(x, y)] = \sum_{x=0}^{M-1} \sum_{y=0}^{N-1} f(x, y) e^{-2\pi i (ux/M + vu/N)}
\tag{4-67 @ p240}
$$

$$
\mathcal{F}^{-1}[F(u, v)] = \frac{1}{MN} \sum_{x=0}^{M-1} \sum_{y=0}^{N-1} F(u, v) e^{2\pi i (ux/M + vu/N)}
\tag{4-68 @ p240}
$$

Remember

- Linearity
- Derivative
- Unit impulse

**Duality**

If
$$
f(x) \Longleftrightarrow F(u)
$$

Then
$$
F(u) \Longleftrightarrow f(-x)
$$

Or equivalently, using the time reversal property
$$
F(-u) \Longleftrightarrow f(x)
$$

Proof: Assume $f(x) \Longleftrightarrow F(u)$. Then according to the inverse transform, ${f(t) = \int_{-\infty}^{\infty} F(u) e^{2\pi i ut}du}$.

Substitute $t = -x$ and get that ${f(-x) = \int_{-\infty}^{\infty} F(u) e^{-2\pi i ux}du}$ meaning that $\mathcal{F}[F(u)] = f(-x)$ as we wanted to show.

### 1D Convolution

Continuous
$$
(f \star h)(t) = \int_{\infty}^{\infty} f(\tau) h(t - \tau) d\tau
\tag{4-24 @ 214}
$$

**The Convolution Theorem**

Version 1
$$
(f \star h)(t) \Longleftrightarrow (H \cdot F)(u) \tag{4-25 @ p214}
$$

Version 2
$$
(f \cdot h)(t) \Longleftrightarrow (H \star F)(u)
$$

### 2D Convolution

The 2D discrete convolution
$$
(f \star h)(x, y) = \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f(m, n) (x - m, y - n)
\tag{4-94 @ 253}
$$

**The convolution theorem**

Version 1
$$
(f \star h)(x, y) \Longleftrightarrow (F \cdot H)(u, v)
\tag{4-95 @ 254}
$$

Version 2
$$
(f \cdot h)(x, y) \Longleftrightarrow \frac{1}{MN} (F \star H)(u, v)
$$

### Impulse, Sifting

Integral of impulse times a function is the impulse at the zero (or offset):

$$\int_{-\infty}^{\infty} f(t) \delta(t - t_0) dt = f(t_0) \tag{4-13 @ 208}$$

In the 2D discrete case

$$
\sum_{x=0}^{\infty} \sum_{y=0}^{\infty} f(x, y) \delta(x - x_0, y - y_0) = f(x_0, y_0)
\tag{4-58 @ 230}
$$

# Geometric transformation

### Affine transformation

An affine transformation $A$ is a transformation that _scale_, _rotate_, _translate_ or _sheer_.

It **translates triangles to triangles** and as such doesn't perserve angles between lines. It does however perserve parallelism.

To transform 2d vectors using $A$, we can represent the vectors using homogeneus coordinates and $A$ as a $3 \times 3$ matrix:

$$
\begin{bmatrix}
x' \\ y' \\ 1
\end{bmatrix}
= A \begin{bmatrix}
x \\ y \\ 1
\end{bmatrix}
= \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
0 & 0 & 1 \\
\end{bmatrix}
\begin{bmatrix}
x \\ y \\ 1
\end{bmatrix}
\tag{2-45 @ p101}
$$

A list of the basic transformation can be found at **Table 2.3, page 102**. We can compose those basic operations using matrix multiplication (i.e. operator composition).

**Properties (ChatGPT)**

- _Line Preservation_: Straight lines remain straight. If two points are on a line, their transformed counterparts will also lie on a line.

- _Parallelism_: Parallel lines remain parallel after the transformation. Affine transformations do not affect the parallelism between lines.

- _Ratios of Distances_: The ratio of distances along a line remains constant. This means that an affine transformation preserves relative distances along a line, but not necessarily absolute distances.

- _Convexity_: A convex set remains convex after an affine transformation.

- _Midpoints_: The midpoint of a line segment remains the midpoint after the transformation.

- _Angles and Lengths are not preserved_: Angles and lengths are not generally preserved. Affine transformations can scale or distort the image, meaning angles between lines and the lengths of line segments can change.

### Projective transformation

Doesn't perserve parallelism.

p-146 at the workbook.

#### Perspective transformation

A subclass of a projective transformation the **translates squares to rectangles**.

# Compression

## Golomb

The benefit of Golomb is that it is optimial when the source has Exponential distribution ($\lambda e^{-\lambda x}$). 

Images don't have Exponential distribution so Golomb doesn't fit images (per-se) well.

# Morphological Filters

The complement of $A$ is denoted by $A^C$ and defined by 
$$
A^C = \{a | a \notin A \}
$$

The subtraction of $B$ from $A$ is defined by
$$
A - B = \{ a | a \in A \land a \notin B \}
$$

The translation of $A$ by $z$ is defined by
$$
(A)_z = \{ a + z | a \in A \}
$$

The reflection of $B$ is defined by
$$
\hat{B} = \{ -b | b \in B \}
$$

## Dialation

The dialation is defined by
$$
A \oplus B = \{ z | (\hat{B}_z) \cap A \neq \phi \}
$$

The dialation is the set of points $z$ such that the reflected filter $B$, translated by $z$, touches $A$.

Below are some properties of the dialation. The way we prove those illustrate the standard way to prove such things in this context.

**Commutativity**

The dialation is commutative, i.e. $A \oplus B = B \oplus A$.

Let $x \in A \oplus B$. By definition, $(\hat{B})_x \cap A \neq \phi$.

Therefore, there exists $a \in A$ and $b \in B$ such that $-b + x = a$.

We will rearrange the above equation to get $-a + x = b$.

> This equation means that if we take some a, reflect it, translate it by x, we get something in B.

We understand from the above that $(\hat{A})_x \cap B \neq \phi$.

Therefore $x \in B \oplus A$.

The proof is analogue to the other side.

From containment from both sides we deduce equality.

**Associativity**

We want to show that ${(A \oplus B) \oplus C = A \oplus (B \oplus C)}$.

Let $x \in (A \oplus B) \oplus C$. By definition, there are $c \in C$ and $y \in A \oplus B$ such that $-c + x = y$.

Therefore, by definition there is $b \in B$ and $a \in A$ such that $-b + y = a$.

By substituting $y$ we get that $-b - c + x = a$. Let $z = b + c$ and note that we now get that $-z + x = a$.

Also note that $b = -c + c + b = -c + z$ so $z \in B \oplus C$.

From the above, we conclude that $x \in A \oplus (B \oplus C)$.

## Erosion

Erosion is defined by:

$A \ominus B = \{ z | (B)_z \cap A^C = \phi \}$

Or equivelantly

$A \ominus B = \{ z | (B)_z \subseteq A \}$

**Question:** Prove that $A \ominus B = \bigcap_{b\in B} (A)_{-b}$.

Proof: Let $x \in A \ominus B$. By definition, for all $b \in B$, $b + x \in A$. For all $b \in B$, there is some $a_b \in A$ such that $x + b = a_b$.

It means that $x = a_b + (-b)$, i.e. $x \in (A)_{-b}$.

It applies reading backwards as well so its an "iff".

# Other stuff

## Logs

Change of base
$$
log_b(a) = \frac{log_x(a)}{log_x(b)}
$$

For example, assume you have $\log_2 (qp_i)$, then to transform it to $ln$ you'd write
$$
\log_2 (qp_i) = \frac{\ln (qp_i)}{ \ln 2}
$$

## Prove the discrete, 1D convolution theorem

Given $f(x)$ and $h(x)$ we want to show that
$$
\mathcal{F}[f \star h] = \mathcal{F}[F] \cdot \mathcal{F}[H]
$$

Let $g(x) = f(x) \star h(x) = \sum_{c=0}^{N-1} f(c) h(x - c)$ according to 4-94.

$$
\hat{g}(u)  = \
\sum_{x=0}^{N-1} \sum_{c=0}^{N-1} f(c) h(x - c) e^{-2 \pi i xc/N} = \
\sum_{c=0}^{N-1} f(c) \sum_{x=0}^{N-1} h(x - c) e^{-2 \pi i xc/N} = \
\sum_{c=0}^{N-1} f(c) \mathcal{F}[h(x-c)]
$$

From translation property (3 @ p259) we know that
${\mathcal{F}[h(x-c)] = \hat{h}(x) e^{-2\pi i xc/N}}$ so

$$
\hat{g}(u) = \
\sum_{c=0}^{N-1} f(c) \hat{h}(x) e^{-2\pi i xc/N} = \
\hat{h}(x) \sum_{c=0}^{N-1} f(c) e^{-2\pi i xc/N} = \hat{h}(x) \cdot \hat{f}(x)
$$

## Prove that the fourier transform of a gaussian is a gaussian

We need to show that if
$$
\hat{f}(u, v) = e^{-(u^2 + v^2)/2\sigma^2}
$$

then
$$
f(x, y) = 2\pi\sigma^2 e^{-2\pi^2\sigma^2(x^2 + y^2)}
$$

Proof: By definitions of the Fourier Pair

$$
f(x, y)
= \mathcal{F}^{-1}[\hat{f}(u, x)]
= \int_{-\infty}^{\infty} e^{- \frac{u^2 + v^2}{2 \sigma^2}} e^{j2\pi (ux + vy)} \mathrm{d}u \mathrm{d}v
= g(x) \cdot g(y)
$$

with $g(t)$ defined by:
$$
    g(t) = \int_{-\infty}^{\infty} e^{- \frac{\omega^2 - j4\pi\sigma^2t\omega}{2\sigma^2}} \mathrm{d}\omega
$$

Notice that by complementing to the square, we get that
$$
\omega^2 - j4\pi\sigma^2t\omega = (\omega - j2\pi\sigma^2 t)^2 + 4\pi^2\sigma^4 t^2
$$

and therefore
$$
g(t) 
= e^{- 2 \pi^2 \sigma^2 t^2} \cdot \int_{-\infty}^{\infty} e^{- \frac{(w - j2\pi \sigma t)^2}{2\sigma^2}} \mathrm{d}\omega
$$

By using the fact about Gaussian Integrals
$$
\int_{-\infty}^{\infty} e^{-a(t + b)^2}\mathrm{d}t = \sqrt{\frac{\pi}{a}}
$$

we compute
$$
\int_{-\infty}^{\infty} e^{- \frac{(\omega - j2\pi \sigma t)^2}{2 \sigma^2}} \mathrm{d}\omega = \sqrt{2 \sigma ^2 \pi} = \sigma \sqrt{2\pi}
$$

And we get that
$$
g(t) = \sigma \sqrt{2\pi} \cdot e^{- 2 \pi^2 \sigma^2 t^2}
$$

Finally, putting it all together we get that
$$
f(x, y) = g(x) \cdot g(y) = 2\pi \sigma^2 e^{- 2 \pi^2 \sigma^2 (x^2 + y^2)}
$$

as we wanted to show.

## Prove that $sinc(x) \star sinc(x) = sinc(x)$

Denote the box function in the interval $[-\frac{1}{2}, \frac{1}{2}]$ by
$$
g(t) = \begin{cases}
1 &  -\frac{1}{2} \leq t \leq \frac{1}{2} \\
0 & otherwise
\end{cases}
$$

We have learnt in class (lecture 2 with $X = 1$) that $\mathcal{F}[g(t)] = sinc(f)$. Therefore, by the duality principle we get that

$$
\mathcal{F}[sinc(-t)] = g(f)
$$

and because

$$
sinc(-t) = \frac{sin (- \pi t)}{- \pi t} = \frac{- sin(\pi t)}{-\pi t} = \frac{sin(\pi t)}{\pi t} = sinc(t)
$$

we get that

$$
\mathcal{F}[sinc(t)] = g(f)
$$

Now, by the convolution theorem:

$$
sinc(t) \ast sinc(t) = \mathcal{F}^{-1}[g(f) \cdot g(f)] =\mathcal{F}^{-1}[g(f)] = sinc(t)
$$

as we wanted to show.

## Prove that the sum of the color is an interpolation on the C.D.

Given to colors $C_i = (X_i, Y_i, Z_i)$ and $C = C_1 + C_2$, with points $c_i$ and $c$ on the chromaticity diagram respectively, prove that there is $\lambda \in [0, 1]$ such that $c = \lambda c_1 + (1-\lambda c_2)$.

Proof: Denote $E_i = X_i + Y_i + Z_i$ and notice that $X_i = x_i E_i$ and $X = xE$. Because $C = C_1 + C_2$, we know that $X = X_1 + X_2$ so $xE = x_1 E_1 + x_2 E_2$  and after arrangement
$$
x = \frac{E_1}{E_1 + E_2} x_1 + \frac{E_2}{E_1 + E_2} x_2
$$

Denote $\lambda = \frac{E_1}{E_1 + E_2}$ and notice that $x = \lambda x_1 + (1-\lambda x_2)$.