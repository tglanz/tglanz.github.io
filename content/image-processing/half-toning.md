---
title: Image processing, Half toning
categories:
- Image Processing
tags:
- Image Processing
---

Reduce the number of hues without reducing the resolution.

### Thresholding

One approach is **thresholding**. i.e., for each pixel, determine its new color according to a predefined constant threshold.

### Dithering

Another approach is **dithering**. Determine the thresholds for each $k_1 \times k_2$ pixels by overlapping a threshold matrix. The threshold matrix is defined by some threshold function such as $threshold = \frac{(pixel + 1) \cdot 255}{5}$.

For example, given the $2 \times 2$ pixel patch
$$
\begin{pmatrix}
0 & 2 \\
3 & 1
\end{pmatrix}
$$

The threshold matrix will be
$$
\begin{pmatrix}
51 & 153 \\
204 & 102
\end{pmatrix}
$$

We will determine the new pixels' values by overlapping them with the threshold matrix.

### Error diffusion