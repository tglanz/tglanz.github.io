---
title: Logic
priority: 200
toc: false
categories:
- Computer Science
- AI 
tags:
- Logic
---

# Logic 

**Logic** is the field of knowledge representation and reasoning about this knowledge according to some **Possible World** also known as a **Model**. There are different types of logic formulizations such as **Propositional Logic** and **First Order Logic**, each of which can represent different information.

Formally, each logic defines its **Syntax**, which is the specification of how we express **Sentences**. In addition to syntax, the logic also defines its **Semantics** which specify the meaning of those sentences - it assigns a **Truth Value** to each sentence according to the model.

A set of sentences is known as a **Knowledge Base**. The set of sentences that are given to us and assumed true are known as **Axioms**.

If a given sentence $\alpha$ is true in some model $m$ we say that **$\alpha$ is satisfied by the model $m$**. We will denote $M(\alpha)$ to be the set of all models that satisfy $\alpha$.

**Reasoning** is the process of understanding the entailment between sentences. Given the sentences $\alpha$ and $\beta$, we say that $\alpha$ entails the sentence $\beta$ if and only if $M(\alpha) \subseteq M(\beta)$, meaning that every model $m$ that satisfies $\alpha$ also satisfies $\beta$. We denote entailment by $\alpha \models \beta$.

## Logical Inference

Given a knowledge base $KB$, we want to derive new sentences - such a process is called **Logical Inference**. The algorithm we choose to derive new sentences can be arbitrary, but what's the point? We say that an inference algorithm is **Sound** if and only if it derives entailed sentences.

For example, consider the following axioms:

- Some dogs are black
- Every dog is an animal

Using some inference algorithm, we can infer the sentence: "Every animal is black" - but we know this is wrong, our algorithm is unsound.

Another algorithm can infer the sentence: "Some animals are black" which is sound.

Lastly, consider an inference algorithm that did not produce any sentence. If we desire to logically infer new sentences from the KB, such an algorithm is undesirable. This leads us to the second categorization of inference algorithms:

Inference algorithms that can derive any sentence that is entailed are called **Complete**.

Ideal inference algorithms are both complete and sound. Such algorithms can derive all entailed sentences, and all derived sentences are entailed.

# Propositional Logic

The first logic we will explore is the **Propositional Logic**.

In this logic's syntax, each sentence is either an **Atomic Sentence** or a **Complex Sentence**.

An atomic sentence consists of a **Proposition** - a symbol that can take a boolean value.

A complex sentence is constructed of multiple sentences using **Parentheses** and **Logical Operators**.

Parentheses, as commonly used, specify the precedence of operations.

Logical operators operate on sentences and return a boolean value. The logical operators are:

- The **negation (not)** unary operator $\neg$
- The **conjunction (and)** binary operator $\land$
- The **disjunction (or)** binary operator $\lor$
- The **implication (implies)** binary operator $\Rightarrow$
- The **biconditional (if and only if)** binary operator $\Leftrightarrow$

They are (unsuprisingly) defined by the truth table:

| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ | $P \Rightarrow Q$ | $P \Leftrightarrow A$ |
|-|-|-|-|-|-|-|
|F|F|T|F|F|T|T|
|F|T|T|F|T|T|F|
|T|F|F|F|T|F|F|
|T|T|F|T|T|T|T|

The following **Logical Equivalences** hold:

> Regardig the notation below, note that we use $\cdot$ and $+$ as placeholders for when equivalence holds both for $\land$ and $\lor$. i.e. read $\alpha \cdot \beta$ as $\alpha \land \beta$ and also $\alpha \lor \beta$. When we use both $\cdot$ and $+$, it means we can use both interchangebly.

- **Commutativity**: $\alpha \cdot \beta \equiv \beta \cdot \alpha$ 
- **Associativity** meaning that $((\alpha \cdot \beta)  \cdot \gamma) \equiv (\alpha \cdot (\beta \cdot \gamma))$
- **Double Negation**: $\neg (\neg \alpha) \equiv \alpha$
- **Contraposition**: $\alpha \Rightarrow \beta \equiv \neg \beta \Rightarrow \neg \alpha$
  - This equivalence is frequently used in mathematical proofs and is the basis of "proof by contradiction"
- **Implication Elimination**: $\alpha \Rightarrow \beta \equiv \neg \alpha \lor \beta$
- **Bidirectional Elimination**: $\alpha \Leftrightarrow \beta \equiv (\alpha \Rightarrow \beta) \land (\beta \Rightarrow \alpha))$
- **Demorgan**: $\neg (\alpha \cdot \beta) \equiv \neg \alpha \cdot \neg \beta$
- **Distributivity** $(\alpha \cdot (\beta + \gamma)) \equiv (\alpha \cdot \beta) + (\alpha \cdot \gamma)$

## Inference

A commonly, sound rule that is used to derive sentences is known as **Modus Ponens** rule:

$$
    \frac{\alpha \Rightarrow \beta, \alpha}{\beta}
$$

Read it as: "If we know that $\alpha$ implies $\beta$ and we also know that $\alpha$, we derive that $\beta$".

Another sound rule is quite intuitive and is known as **And Elimination**:

$$
    \frac{\alpha \land \beta}{\alpha}
$$

As additional sound inference rules, we can use all of the known equivalences.

The last sound rule we will show is the **Resolution Rule**. This is an important rule that is used by a complete and sound inference algorithm known as the **Resultion Inference Algorithm** which we will see later.

The resolution rule states the following:

$$
    \frac
    {l_1 \lor l_2 \lor ... \lor l_i \lor ... \lor l_n \~,\~ A \lor \neg l_i}
    {l_1 \lor l_2 \lor ... \lor l_{i-1} \lor l_{i+1} \lor ... \lor l_n \lor A}
$$

Where $A$ is a disjunction of other literals.

For example:

$$
    \frac{P \lor Q \~,\~ \neg P \lor R}{Q \lor R} 
$$

Notice that this important rule operates only on disjunctions. However, our sentences can be in an arbitrary form. We find that every KB is equivalent to another KB that is in a very specific form known as "conjunctive normal form" - In this form, we can easily apply the resolution rule.

## Conjunctive Normal Form (CNF)

A **Clause** is a disjunction of literals. We say that a sentence that is expressed by a conjunction of clauses is in a **Conjunctive Normal Form**.

We already know how to transform a KB to a CNF - using the known equivalences!

1. Eliminate bidirectional sentences
2. Eliminate implications sentences
3. Move negations inwards to literals mostly using double negation and de-morgan rules
4. Apply distribution rules

Let's see an example and convert the following sentence to CNF:

$$
    P \Leftrightarrow Q \lor R
$$

1. Bidirectional elimination: $(P \Rightarrow Q \lor R) \land (Q \lor R \Rightarrow P)$
2. Implication elimination of the left hand conjugate: $(\neg P \lor Q \lor R) \land (Q \lor R \Rightarrow P)$
3. Implication elimination of the right hand conjugate: $(\neg P \lor Q \lor R) \land (\neg (Q \lor R) \lor P)$
4. Move negation inwards (apply de-morgan at the right-hand side): $(\neg P \lor Q \lor R) \land ((\neg Q \land \neg R) \lor P)$
5. Distribute $\lor$ over $\land$ at the right-hand side: $(\neg P \lor Q \lor R) \land (\neg Q \lor P) \land (\neg R \lor P)$

And that's it, we have a sentence in CNF form.

## The Resolution Algorithm

The **Resolution Algorithm** is sound and complete (will not show this here).

Given a KB $K$, we show that $K \models \alpha$ by proving that $K \land \neg \alpha$ is a contradiction (proof by contradiction).

1. We add $\neg \alpha$ to the KB
2. Convert the KB to CNF form
3. As long as we can apply the resolution rule, apply it
    - If the derived sentence is non-empty, add it to the KB if it is doesn't exist there already
    - Else, because this sentence is a contradiction (empty) we have reached a contradiction in the KB because of $\neg \alpha$ - Answer: the KB entails $\alpha$
4. No contradiction occurred - Answer: The KB does not entail $\alpha$

### Example

Assume the initial KB 

- $P \Leftrightarrow Q \lor R$
- $\neg P$

And let's say we want to prove that $\neg Q$.

**Add the negation of $\neg Q$ to the KB**

- $P \Leftrightarrow Q \lor R$
- $\neg P$
- $Q$

**Convert to CNF**

1. $\neg P \lor Q \lor R$
2. $\neg Q \lor P$
3. $\neg R \lor P$
4. $\neg P$
5. $Q$

**Repeatedly apply the Resolution Rule**

6. (5, 2): $P$
7. (6, 4): $\phi$

Because we reached a contradiction, we deduce that the KB entails $\neg Q$.

# First Order Logic

Think of it, how complex are the sentences that we could express via Propositional Logic? It turns out that we can formalize a logic language that is far more expressive than it.

**First Order Logic (FOL)** is a logic formulation that includes objects and their relations to one another.

FOL is a bit closer to natural language. In natural language, we can speak about objects such as a "Chair" or a "Pen". We can also talk about the relations between objects for example: "Pen is on Chair". Lastly, we can map objects to other objects as in "Leg of the Chair", kind of like functions.

FOL builds on top of those concepts. Its components are:

- **Truth Values (Booleans)** False and True
- **Logical Operators** are the same logical operators we saw in propositional logic including the **Equal** operator $=$
- **Terms (or Objects)** are the constants
- **Variables** are placeholders for Terms
- **Quantifiers**
  - **Universal quantifier** (Forall) $\forall x B$ whether the boolean expression $B$ holds for every possible instantiation of the variable $x$
  - **Existential quantifier** (Exists) $\exists x B$ whether the boolean expression $B$ holds for some possible instantiation of the variable $x$
- **Relations (or Predicates)** are mappings from tuples of Terms to a Boolean
- **Functions** are mappings from Term to Term

For clarity, we defined the booleans separately from the predicates. To be more accurate, $True$ and $False$ are also defined as predicates (that always return the same value).

A sentence in FOL is either an **Atomic Sentence** or a **Complex Sentence**.

An atomic sentence is either a Term or a Predicate.

A complex sentence is either an application of multiple sentences using logical operators or a quantified variable followed by a sentence.

## Logical Inference

We won't go over the details about what logical inference is since we already covered it in the section about propositional logic. We will focus on the techniques that are related to FOL.

# Examples from Exercises

## Propositional Logic

## First Order Logic

# Hebrew Appendix

- Entailement - נביעה לוגית
- Sound - נאות
- Complete - שלם
- Proposition - פסוק
