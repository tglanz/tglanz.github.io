---
title: Navier Stokes Equations
description: |
  The governing equations in fluid dynamics
categories:
- PDEs
tags:
- PDEs
- Math
- Physics
- Fluid Dynamics
---

# Navier-Stokes Equations

The Navier-Stokes equations are a set of PDEs that describe the dynamics of Incompressible, Isothermal [Newtonian Fluids](https://en.wikipedia.org/wiki/Newtonian_fluid). 

Roughly, a fluid is said to be Newtonian if it's _Viscosity_ is Linearly correlated to the Stratin Rate at each point locally.

Let $u : [0, \infty) \times \mathbb{R^d} \rightarrow \mathbb{R^d}$ be the [Flow Velocity](https://en.wikipedia.org/wiki/Flow_velocity) of a fluid.
i.e, $u(x, t)$ is the velocity vector at spatial point $x \in \mathbb{R^d}$ and time $t \geq 0$ where usually $d \in \{ 1, 2, 3 \}$.

The _continuity equation_

$$
\nabla \cdot u = 0
$$

The _Navier-Stokes equation_

$$
  \frac{\partial u}{\partial t} + u \cdot \nabla u = - \frac{1}{\rho} \nabla p + \nu \nabla^2 u
$$

Where

- $\rho$ is the density
- $p$ is the pressure
- $\nu$ is the kinmeatic [visocity](https://en.wikipedia.org/wiki/Viscosity)