---
title: Longest increasing subsequence
categories:
  - Algorithms
tags:
  - Dynamic Programming
---


**The problem**

Given a sequence of numbers $N$, find the length of longest subsequence of numbers that is increasing

**Illustration**

- [1, 2, 3, 4] $\rightarrow$ [1, 2, 3, 4]
- [1, 4, 2, 6, 3, 7] $\rightarrow$ [1, 4, 6, 7]

**Solution**

let $(a_i)_{i=1}^n = N$.

$a_i$ can contribute to a subsequence of previous elements only if it is greater than all those elements.

We can also realize the the longest increasing subsequence that ends with $a_i$ is the previous longest subsequence containing elements less that $a_i$, adding $a_i$ to it.

We shall define opt(i) to indicate the length of the longest increasing subsequence that ends with $a_i$.

Trivially,
$$
opt(0) = 0
$$

Recursively,
$$
\forall i > 0; ~ opt(i) = 1 + \max \\{ \\{0\\} \cup \\{ opt(j) | j < i \land a_j < a_i \\} \\}
$$

**Psuedo**

- Initialize opt
  - $opt \leftarrow array(n+1)$
  - $opt[0] \leftarrow 0$

- Build opt in a bottom up fashion
  - $for ~ i = 1, 2, ... n$
    - $opt[i] = 1 + \max_{j < i \land a_j < a_i}{opt[j]}$
- Return the final answer
  - $ans \leftarrow 0$
  - $for ~ i = 1, 2, ... n$
    - $ans \leftarrow max \\{ ans, opt[i] \\}$
  - Return $ans$


**Time Complexity**

- Initialization of opt is $O(1)$ (single access to opt)
  - We exclude the actual array creation
- Building opt takes $O(n)$ iterations
  - Each iteration takes $O(n)$ accesses at the worst case

So in total, the time complexity is $O(n^2)$

**Finding the subsequence using a Journal**

We will keep another data structure $S$ that will act as the journal.

For each $i$, $S$ will contain the index $j$ that contains the previous element in the subsequence.

We can fill it during the algorithm by modifying "Build opt in a bottom up fashion" to be

- Build opt in a bottom up fashion
  - $for ~ i = 1, 2, ... n$
    - $opt[i] = 1 + \max_{j < i \land a_j < a_i}{opt[j]}$
    - $S[i] = $ the $j$ that achieved the max

Finally, to print we shall go back from the position of the result using the indices at the journal. 

**Finding the subsequence using Traceback**

Lets review an example.

Assume $N=[3, 4, 2, 7, 5]$

The final tabulation of opt will be

i|0|1|2|3|4|5
-|-|-|-|-|-|-
$a_i$| |3|4|2|7|5
opt(i)|0|1|2|1|3|2

Here, we need to find $7 \leftarrow 4 \leftarrow 3$. Specifically
- $opt("7") = 3, opt("4") = 2, opt("3") = 1$

Generally, to traceback, we shall find the index i that contains the maximum of opt as we did finding the answer. We notice that the previous element in the relevant subsequence is ending a subsequence of length $opt(i) - 1$. So we traverse back in the opt array until we find an element $a_j$ such that $a_j < a_i$ and $opt(j) = opt(i) - 1$. This $j$ is the index of the previous element in the answer. We will keep going in this manner until index 0. 

**Actual Code**

{{<codepen RwVdYyO>}}