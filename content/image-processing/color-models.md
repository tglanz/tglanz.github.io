---
title: Image processing, Color models
categories:
- Image Processing
tags:
- Image Processing
---

## RGB

The RGB model fits the way the human eye senses color.

A color in the RGB model is defined by 3 coordinates $r, g, b \in [0, 1]$. The spcae of all colors is the unit cube $[0, 1]^3$.

Notable colors:
- White is $(1, 1, 1)$
- Black is $(0, 0, 0)$
- Red is $(1, 0, 0)$
- Green is $(0, 1, 0)$
- Blue is $(0, 0, 1)$

Some operations doesn't work well in this model so we need to come up with additional models.

## YIQ

A vector in the YIQ model is a triplet $(Y, I, Q)$.

The $Y$ defines the Luminence, which is the brightness of the color.

The $I$ and $Q$ defines the chroma of the value.

A transformation from RGB to YIQ is given by

$$
\begin{pmatrix}
Y \\
I \\
Q
\end{pmatrix}
=
\begin{pmatrix}
0.299 & 0.587 & 0.114 \\
0.596 & -0.275 & -0.321 \\
0.212 & -0.523 & 0.311 \\
\end{pmatrix}
=
\begin{pmatrix}
R \\
G \\
B
\end{pmatrix}
$$

### HSI

A color is defined by the Hue, Saturation and Intensity.

$I$ can be calucated based on the $RGB$ using
$$
I = \frac{R + G + B}{3}
$$

Besides that, the transformation from the $RGB$ space is not linear.

