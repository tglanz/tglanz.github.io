---
title: Smart Agents 
priority: 1
toc: false
categories:
- Computer Science
- AI 
---

# Smart Agents 

At a (very) high level there are multiple approaches to AI - Two main questions arise:

1. Do we focus on _thought_ or _behavior_?
2. Do we want to imitate a human behavior or implement an ideal model for a problem?

We will take the stand where a **smart agent** is the one who performs the best action given the scenario.

An **Agent** is any entity that examines it's surrounding through **sensors** and acts in it's environment using **actuators**.

Formally, the **behavior** of an agent is a mathematical function from the percepts (sensory inputs) to actions. The implementation of this function is part of agent's program.

An agent's behavior can be implemented in many ways - But which one is better? What makes an agent "smart" or "dumb"? To answer those question we must add **performance measurments** to the agent's definition.

There are many properties of an enviornment that affects the agents within it:

- **Fully vs Partially Observable**. An environment is said to be fully observable if it's entirety is visible to the agent (think of chess for example). An environment that is not fully observable is said to be partially visible (think of poker for example).

- **Single vs Multi Agent**. Whether the environment contains a single agent (solitare) or multiple agents which can either compete (chess) or cooperate.

- **Deterministic vs Stochastic**. In a deterministic environment, the agent has complete control over the environment through it's actions (chess), where in a stochastic environment the agent has only partial control over it's environment (weather forecast).

- **Episodic vs Sequential**. In an episodic environment the agent's tasks are broken into independent episodes (product defect recognition) while a sequencial environment is where the agent task is single throughout (chess).

- **Static vs Dynamic**. An environment is said to be static if it doesn't change while the agent plans out is next move (chess), otherwise it is said to be dynamic (best traffic route finder).

- **Discrete vs Continuous**. A discrete environment is when we can clearly limit and disinct each action (chess) - Otherwise it is continuous (taxi driver).

- **Known vs Unknown**. A known environment is an environment such that the agent knows the implications for each of it's actions. Otherwise it is unknown.

Our world is a partially observable, multi agent, stochastic, sequential, dynamic, continuous and unknown environment. 

The goal of AI is the to plan the **agent's program** that will manifest the function which map the percepts to actions. 

There are many kinds of agents:

- Simple reflex agents. Agents are affected only from the current percepts.
- Model reflex agents. The agent contains an inner state that depends on the history of percepts. The inner state is updated according to it's **model**.
- Goal based agents. A *goal* is some claim regarding the environment given to an agent which it attempt to fulfill.
- Utility based agents. Some states to the goal can be better than others - The agent tries to maximize the overall quality of it's steps.
- Learning agents. Agents that learn over time. Such agents are usually composed of a _learning element_ that accumulates knowledge, a _critic element_ that gives feedback, a _performance element_ that performs actions and a _problem generator_ element that might suggest new exploration routes.


