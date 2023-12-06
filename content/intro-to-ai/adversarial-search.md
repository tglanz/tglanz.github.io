---
title: Adversarial Search 
priority: 4
toc: false
description: Search algorithms in a competitive environment
categories:
- Intro to AI 
---

A **competitive environment** is a multi-agent environment in which two or more adversarial agents have coflicting goals. There are multiple ways we can view a such environments, Here we will model adversarial agents with the techniques of adversarial game-tree search. 

To introduce the topic we will restrict ourselves to **Two-player zero-sum games**.

## Two-player zero-sum games

A game is said to be 

- _Deterministic_ if every action leads to a deterministic state.
- With _Perfect Information_ if it's a _fully observable_ environment. Meaning, every player can see the entire state.
- _Zero-Sum_ when there are zero points alloted to the game at initialization and players gain points by taking them from other players. There is no "win-win" situation.
- _Turn Making_ if only a single player can make a move in each state, alternatively.

A **two-player zero-sum game** is a deterministic, two-player, turn-making, zero-sum game with perfect information.

We will name the two adversaries **MAX** and **MIN**.

Formally we define the game with the following elements:

- $S_0$ is the **initial state**.
- _ToMove(s)_ is the player to make the move in state s.
- _Actions(s)_ is the set of legal moves in state s.
- _Result(s, a)_ is the **transition model** which defines the resulting state of state s after action a.
- _IsTerminal(s)_ is the **terminal test** indicating whether s is a terminal state.
- _Utility(s, p)_ is the **utility function** which defines the value assigned to player p if the game terminated in the terminal state s. This function is also known as **objective function** or **payoff function**

Like many other search problems, $S_0$, _Actions_ and _Result_ define a **state space graph** - A graph where the vertices are states and the edges are the moves. We can impose a **search tree** in order to determine what action to take by searching the graph. We define the complete **game tree** as the tree as the search tree that investigate every possible action for every possible state up to terminals.

Take a look at the example search tree below. Note that by convention we will symbolize the MAX player with a triangle and the MIN player with an inverted triangle.

```plantuml

graph G {
	A [shape=triangle]
	B [shape=invtriangle]
	C [shape=invtriangle]
	D [shape=invtriangle]
	E [shape=triangle]
	F [shape=triangle]
	G [shape=triangle]
	H [shape=triangle]
	I [shape=triangle]
	J [shape=triangle]
	K [shape=triangle]
	L [shape=triangle]
	M [shape=triangle]

	A -- B [label=<a<sub>1</sub>>];
	A -- C [label=<a<sub>2</sub>>];
	A -- D [label=<a<sub>3</sub>>];

	B -- E [label=<b<sub>1</sub>>];
	B -- F [label=<b<sub>2</sub>>];
	B -- G [label=<b<sub>3</sub>>];

	C -- H [label=<c<sub>1</sub>>];
	C -- I [label=<c<sub>2</sub>>];
	C -- J [label=<c<sub>3</sub>>];

	D -- K [label=<d<sub>1</sub>>];
	D -- L [label=<d<sub>2</sub>>];
	D -- M [label=<d<sub>3</sub>>];
}

```

## The Minimax search algorithm

Both MAX and MIN playes aim to optimize their decisions throughout the game. Every action MAX makes MIN also makes an action! MAX cannot hope for MIN to blunder - He needs to find a sequence of actions that will maximize the score assuming MIN tries to minimize the score.

The search approach we take is to keep track of the score after each decision in the tree. Decisions made by MAX aim to increase the score while decisions made by MIN aim to decrease the score - Practically we will run a DFS variant, tracking and modifying the score accordingly. This algorithm is called **minimax search**.

Formally:

\begin{align*}
Minmax(s) =& & \\\\
  & Utility(s, MAX) & if ~ IsTerminal(s) \\\\
  & \max_{a \in Actions(s)}{Minimax(s, a)} & if ~ ToMove(s) = MAX \\\\
  & \min_{a \in Actions(s)}{Minimax(s, a)} & if ~ ToMove(s) = MAX \\\\
\end{align*}

Just computing the Minimax is not enought. Remember, we needed a search algorithm to tell MAX what is his optimal action to take. For this purpose, we need to keep track of the optimal move when computing the Minimax.

```python
def MinimaxSearch(game, state) -> action \\\\
  player = game.ToMove(state)
  value, move = MaxValue(game, state, player)
  return move

def MaxValue(game, state, player) -> (utility, action):
  if game.IsTerminal(state):
    return game.Utility(state, player), null

  return (utility, action) that maximizes
    MinValue(game, game.Result(state, a), player) foreach a in Actions(state)

def MinValue(game, state, player) -> (utility, action):
  if game.IsTerminal(state):
    return game.Utility(state, player), null

  return (utility, action) that minimizes 
    MaxValue(game, game.Result(state, a), player) foreach a in Actions(state)

```

## More than 2 agents

TODO

## Alpha-Beta pruning

TODO
