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

We have defined a Linear Program (LP) of **3 variables**, **6 constraints** and an **objective function**. The cosntraints $x_1, x_2, x_3 \geq 0$ are called non-negativity constraints. The set of points $\\{ (x_1, x_2, x_3) \in \mathbb{R}^3 \\}$ that fulfills the constraints is the set of **feasible solutions** or the **feasible region**. The feasible solution subset of points that achieve a minimum for the objective function are called **optimal solutions**.

# Linear Programs

> A solid understanding of Linear Algebra is assumed

A **Linear Programming Problem / Linear Program (LP)** is an optimization problem in which we search a minimum/maximum for a linear objective function subected to constraints that are either linear equalities or linear in-equalities.

A LP can be represented in **matrix form**. Let 
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

## Geometric Intuition

Recall that a hyperplane $H$ in $\mathbb{R}^n$ is a set of the form $H = \\{ x \in \mathbb{R}^n : \langle c, x \rangle = w \\}$ for some $c \in \mathbb{R}^n$ and $w \in \mathbb{R}$. The hyperplane $H$ splits the space into two half-spaces $H^+ = \\{ x \in \mathbb{R}^n : \langle c, x \rangle \geq w \\}$ and $H^- = \\{ x \in \mathbb{R}^n : \langle c, x \rangle \leq w \\}$.

Thus, the **feasible region** is at the intersection of one of the two half-spaces each constraint (as a hyperplane) defines. This intersection is a **[convex polytop](https://en.wikipedia.org/wiki/Convex_polytope)**.

An optimal $x$ for the objective function $\langle c, x \rangle$ is equivalent for finding a supporting hyperplane for the polytop with a normal $c$.

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

## Solution Set

Now, we should ask ourselves whether a LP has an optimal solution? If it does, is it single?

As we will see, all of the following scenarios are possible:
- **No feasible solutions**. A LP with no feasible solutions is called **infeasible** and a LP with at least one feasible solution is called **feasibble**
- **No optimal solution**
- **Infinite number of optimal solutions**
- **Unique optimal solution**

### No feasible solutions

When the feasible region is empty there cannot be any feasible solution (and no optimal solution).

For example, below is a LP with feasible region $\phi$:

\begin{align*}
max~ & x_1 + x_2 \\\\
s.t~ & 2x_1 - x_2 \geq 2 \\\\
     & x_1 - x_2 \leq 1 \\\\
     & x_1, x_2 \geq 0 \\\\
\end{align*}

> TODO: graphics

### No optimal solution

When the linear system is consistent, the objective function can be unbounded with respect to it's constraint. In this case, there are infinitely many feasible solutions - none of them is optimal (since we can always find a better one).

Geometrically speaking, this case arises when the feasible region is an unbounded polytop.

\begin{align*}
max~ & x_1 + x_2 \\\\
s.t~ & 2x_1 - x_2 \leq 2 \\\\
     & x_1 - x_2 \geq 1 \\\\
     & x_1, x_2 \geq 0 \\\\
\end{align*}

> TODO: graphics

### Infinite number of optimal solutions

When the objective function is bounded with respect to it's constraints, the set of feasible solutions is finite - Hence, we can find an optimal solution. The optimal solution is not necessarily unique.

Infinite number of optimial solutions arise when the polytop is not bounded but the set of optimal solutions is the same as one of the polytop's edges.

\begin{align*}
max~ & x_1 + x_2 \\\\
s.t~ & 2x_1 - x_2 \leq 2 \\\\
     & x_1 - x_2 \geq 1 \\\\
     & x_1 + x_2 \leq 3 \\\\
     & x_1, x_2 \geq 0 \\\\
\end{align*}

> TODO: graphics

### Unique optimal solution

Because the polytop is convex, a supporting hyperplane can intersect at either infinitely many points or at one. In case there are feasible solutions but not infinitely many optimal solutions, there can only be a single unique optimal solution.

# Geometry and Algebra of Linear Programs

The main theorem we will present here roughly states that if a LP has an optimal solution, it must also have an optimal solution at one of it's corners.

Besides proving it, There are two difficulties in this statement:
- What exactly is a polytop's corner?
- How can we algebraicly define a corner?

## Corner definitions

We will show multiple definitions for a corner and prove that they are equivalent - Two of those definitions are geometric in nature and one is algebraic. Using those definition we will be ready to prove the above statement.

### Vertex

Given a polytop $P$, a corner is a point $v$ that is a unique optimal solution a LP of the form $\min \{ \langle c, x \rangle : x \in P \}$ (for the minimization problem). For any other point $x \in P$ different from $v$, it will be true that $\langle c, v \rangle < \langle c, x \rangle$.

This leads us to our first definition:

A **vertex** is a point $v \in P$ if there exists $c \in \mathbb{R}^n$ such that $\langle c, v \rangle < \langle c, x \rangle$ forall $x \not = v$.

Another intuition for this definition is that there exist a supporting hyperplane that touches $P$ only at $v$.

### Extreme Point

The following definition for a corner is also geometrically intuitive - No corner is on the line between any two points in $P$.

A **convex combination** of the vectors $v_1, v_2, ..., v_d$ is a linear combination $\sum_{i=1}^{m} \alpha_i v_i$ such that $\sum_{i=1}^{m} \alpha_i = 1$.

An **extreme point** is a point $v \in P$ that cannot be represented as a convex combination in $P$.

Meaning, $v \in P$ is an extreme point if there are no other two points $x, y \in P$ and $\lambda \in [0, 1]$ such that $v = \lambda x + (1 - \lambda)y$.

It is interesting to note (although not very necessary), that in a convex polytop, all points are a convex combination of it's extreme points.

### Basic Feasible Solution

The above definitions are geometric in nature. Can we check for all supporting hyperplanes? How about all possible convex combinations?

For algorithmic purposes we need an algebraic definition. It turns out that we can characterize a corner using the system of constraints the defines the polytop.

Given a point $v$, we say that a constraint (in the system that defines $P$) is a **tight constraint** if it holds for $v$ as an equality.

Using tight constraints, we give the following definition:

Let $P \in \mathbb{R}^n$ be a polytop. A point $v \in \mathbb{R}^n$ is called a **basic solution** of the system that defines $P$ if there are $n$ tight constraints such that $v$ is a unique solution for the corresponding linear system of equations.

If also $v \in P$, $v$ is called **basic feasible solution (bfs)**.

Although algebraic, this definition also have a geometric meaning. Basic solutions are points that are on the intersection of the hyperplanes defined by $n$ equations for the corresponding constraints, that has linearly independent coefficient vectors. It is not mandatory that such points are in the feasible region but if they are, they are called basic feasible solutions.

The following claim holds: Given a system of linear constraints that defines the polytop $P$, a point $v$ is a bfs if and only if the linear system of equation that is constructed by all of $v$'s tight constraints, there are $n$ equations with linearly independent vectors of coefficients.