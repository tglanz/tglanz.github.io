---
title: Linear Programming
---

# Introduction

Before we define what Linear Programming is, let's take a look at an example:

Assume we want to make a diet. Our job is to prepare meals would to minimize the amount of calories that we consume while consuming at least $60gr$ of protein, $70gr$ fat and $350gr$ of carbon.

Every ingredient contain a certain amount of calories, protein, fat and carbons. For simplicity, let's assume we have 3 ingredients at our disposal:

Ingredient | Calories | Protein | Fat | Carbons
-----------|----------|---------|-----|----------
1          | 50       | 4       | 10  | 25
2          | 30       | 5       | 4   | 32
3          | 60       | 8       | 7   | 12

We can compose a meal using the above ingredient however we like. Let $x_1, x_2$ and $x_3$ be the number of units we use for ingredients $1,2$ and $3$ accordingly.

Our objective is to minimize the expression
$$ 50x_1 + 30x_2 + 60x_2 $$

Under the constraint that we cannot pick a negative number of ingredients
$$ x_1, x_2, x_3 \geq 0 $$

And under the minimum Protein consumption constraint
$$ 4x_1 + 5x_2 + 8x_3 \geq 60 $$

And under the minimum Fat consumption constraint
$$ 10x_1 + 4x_2 + 7x_3 \geq 70 $$

And under the minimum Carbons consumption constraint
$$ 25x_1 + 32x_2 + 12x_3 \geq 350 $$

More compactly, we can write it as a minimization problem subject to a system of linear inequalities

\begin{align*}
minimize~    & 50x_1 + 30x_2 + 60x_3 & \\\\
subject~ to~ & 4x_1 + 5x_2 + 8x_3 &\geq 60 \\\\
             & 10x_1 + 4x_2 + 7x_3 &\geq 70 \\\\
             & 25x_1 + 32x_2 + 12x_3 &\geq 350 \\\\
             & x_1, x_2, x_3 &\geq 0 \\\\
\end{align*}

We have defined a Linear Program (LP) of **3 variables**, **6 constraints** and an **objective function**. The cosntraints $x_1, x_2, x_3 \geq 0$ are called non-negativity constraints. The set of points $\\{ (x_1, x_2, x_3) \in \mathbb{R}^3 \\}$ that fulfills the constraints is the set of **possible solutions**. The possible solution subset of points that achieve a minimum for the objective function are called **optimal solutions**.

# Definition

> A solid understanding of Linear Algebra is assumed

**Linear Programming Problem (LP)** is an optimization problem where we search a minimum/maximum for a linear objective function subected to constraints that are either linear equalities or linear in-equalities.

A LP is usually represented in **matrix form**. Let 
- $x \in \mathbb{R}^n$ be the **variables vector**
- $c \in \mathbb{R}^n$ be the **cost vector**
- $A \in \mathbb{R}^{n \times m}$ be the **constraints matrix**
- $b \in \mathbb{R}^m$

We can now write a LP as:

\begin{align*}
min/max~ &\langle c, x \rangle \\\\
s.t~ & Ax &\lesseqgtr b \\\\
     & x &\lessgtr 0 \\\\
\end{align*}

> From now on, we will allow ourselves focus on either minimization or maximization problems - Those are completely analogue to each other (simply by negation).

## Common Forms

Because general form a LP have no coherent structure they makes them hard to work with. As a result, common forms for linear programs has been formulated.

### LP in Standard Form (LPS)

In LPS, The constraints are all equalities and the variables are all non-negative:

\begin{align*}
min~ &\langle c, x \rangle \\\\
s.t~ & Ax &= b \\\\
     & x &\geq 0 \\\\
\end{align*}

### LP in Canonized Form (LPC)

In LPC, The constraints are all *geq* in minimization problems, *leq* in maximization problems  and the variables are all non-negative:

\begin{align*}
min~ &\langle c, x \rangle \\\\
s.t~ & Ax &\geq b \\\\
     & x &\geq 0 \\\\
\end{align*}

### Convert between commonn forms

The above forms are equivalent and can be converted from one to another in **Polynomial Time**.

To get a LPS from given a general LP

1. *Get rid of variables without non-negativity constraints:* Replace all variables $x_i$ that doesn't have non-negativity constraints with 2 **dummy variables** $x_i^+$ and $x_i^-$. Set $x_i = x_i^+ - x_i^-$ and add the constraints $x_i^+, x_i^- \geq 0$.
2. *Replace in-equality constraints with equality constraints:* For every constraint of the form $A^ix \geq b_i$ add a **dummy variable** $s_i$ and replace the constraint with the constraints $A^ix - s_i = 0$ and $s_i = 0$.

To get a LPC from a given LPS

1. *Replace equality constraints as in-equality:* Replace every constraint of the for $A^ix = b_i$ with $A^ix \geq b_i$ and $(-A^i)x \geq -b_i$.

**For Example**, lets start from the given LP in general form:

\begin{align*}
min~ & x_1 + x_2 + 2x_3 \\\\
s.t~ & 3x_1 + 2x_2 + x_3 &= 1 \\\\
     & 5x_1 + x_2 - x_3 &\geq 3  \\\\
     & x_1 \geq 0 \\\\
     & x_2 \leq 0 \\\\
\end{align*}

To convert it to a LPS we first need to get rid of the variables without non-negativity constraints: $x_2, x_3$. Write $x_2 = x_2^+ - x_2^-$ and $x_3 = x_3^+ - x_3^-$, then add the constraints $x_2^+, x_2^-, x_3^+, x_3^- \geq 0$.

\begin{align*}
min~ & x_1 + x_2^+ - x_2^- + 2x_3^+ - 2x_3^- \\\\
s.t~ & 3x_1 + x_2^+ - x_2^- + x_3^+ - x_3^- &= 1 \\\\
     & 5x_1 + x_2^+ - x_2^- - x_3^+ + x_3^- &\geq 3  \\\\
     & x_2^+ - x_2^- &\leq 0 \\\\
     & x_1, x_2^+, x_2^-, x_3^+, x_3^- \geq 0
\end{align*}

Now we need to make all of the constraints to be equalities. Introduce the slack variables $s_2, s_3$ and write the program as:

\begin{align*}
min~ & x_1 + x_2^+ - x_2^- + 2x_3^+ - 2x_3^- \\\\
s.t~ & 3x_1 + x_2^+ - x_2^- + x_3^+ - x_3^- &= 1 \\\\
     & 5x_1 + x_2^+ - x_2^- - x_3^+ + x_3^- - s_2 &= 3  \\\\
     & x_2^+ - x_2^- + s_3 &= 0 \\\\
     & x_1, x_2^+, x_2^-, x_3^+, x_3^-, s_2, s_3 \geq 0
\end{align*}

We got a LPS! Notice though that we multiplied the number of variables.

Now, to get a LPC we need to double each constraint:

\begin{align*}
min~ & x_1 + x_2^+ - x_2^- + 2x_3^+ - 2x_3^- \\\\
s.t~ & 3x_1 + x_2^+ - x_2^- + x_3^+ - x_3^- &\geq 1 \\\\
     & -3x_1 - x_2^+ + x_2^- - x_3^+ + x_3^- &\geq -1 \\\\
     & 5x_1 + x_2^+ - x_2^- - x_3^+ + x_3^- - s_2 &\geq 3  \\\\
     & -5x_1 - x_2^+ + x_2^- + x_3^+ - x_3^- + s_2 &\geq -3  \\\\
     & x_2^+ - x_2^- + s_3 &\geq 0 \\\\
     & -x_2^+ + x_2^- - s_3 &\geq 0 \\\\
     & x_1, x_2^+, x_2^-, x_3^+, x_3^-, s_2, s_3 \geq 0
\end{align*}