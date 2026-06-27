# What Are Large Language Models?

## The Technology Behind ChatGPT

If you've used ChatGPT, Claude, Gemini, or any AI chatbot, you've interacted with a **Large Language Model** (LLM). But what actually *is* it?

An LLM is a machine learning model trained on massive amounts of text — books, websites, articles, code, conversations — to do one thing really well:

**Predict the next word.**

That's the secret. When ChatGPT writes a paragraph, it's generating one word (technically one "token") at a time, always asking: *"Given everything so far, what's the most likely next word?"*

It sounds simple. But when you train a model with billions of parameters on trillions of words, something remarkable emerges: the model starts to *understand* language. It can summarize, translate, write code, answer questions, and even reason — all from learning to predict the next word.

---

## How They're Built

Building an LLM happens in stages:

### Stage 1: Pre-training
The model reads the internet. Not literally everything, but a huge chunk — Wikipedia, books, news articles, forums, code repositories. During this phase, it learns:
- Grammar and language structure
- Facts about the world
- How to write in different styles
- Patterns in code
- Common sense reasoning

This stage is *incredibly* expensive. Training a large model can cost tens of millions of dollars in computing power.

### Stage 2: Fine-tuning
The raw model is like a very knowledgeable person who doesn't know how to have a conversation. Fine-tuning teaches it to be *helpful*. Human trainers create example conversations — questions and ideal answers — and the model learns to follow that format.

### Stage 3: RLHF (Reinforcement Learning from Human Feedback)
Humans rate the model's responses: "This answer was good," "This one was bad," "This one was harmful." The model adjusts to produce more of the good stuff and less of the bad.

---

## What They Can and Can't Do

### They're Great At:
- Writing and editing text
- Answering questions (when the answer was in their training data)
- Translating between languages
- Summarizing long documents
- Writing and explaining code
- Brainstorming ideas
- Following instructions

### They're Bad At:
- **Math** — they can fake it for simple problems, but they're fundamentally doing pattern matching, not calculation
- **Recent events** — they only know what was in their training data (with a cutoff date)
- **Being truthful** — they sometimes "hallucinate" — confidently stating things that are completely wrong
- **Reasoning deeply** — they can mimic reasoning patterns but don't truly "think" the way humans do

---

## The "Hallucination" Problem

This is the biggest gotcha. LLMs don't *know* things the way you do. They've learned patterns of what text *looks like* when it's correct. Sometimes the pattern produces something that looks right but is factually wrong.

Ask it for a historical date? It might be right 95% of the time — but that other 5%, it'll state the wrong date with complete confidence.

> *Think of it like a very well-read parrot. It's heard so many conversations that it can hold what seems like a real discussion. But it doesn't actually understand what it's saying — it's producing the most statistically likely response.*

That analogy isn't perfect (modern LLMs do something more sophisticated than parroting), but it captures an important truth: **always verify important information from an LLM.**

---

## Why "Large" Matters

The "large" in Large Language Model refers to the number of **parameters** — the adjustable values the model uses to make predictions. 

- A small model might have millions of parameters
- GPT-3 had 175 billion parameters
- Modern frontier models have hundreds of billions to trillions

Researchers discovered something surprising: **as you make models bigger, they don't just get slightly better — they develop entirely new abilities.** A model with 1 billion parameters might struggle with basic reasoning. Scale it to 100 billion, and suddenly it can write poetry, debug code, and explain quantum physics to a five-year-old.

This phenomenon is called **emergent behavior** — capabilities that appear at scale that nobody explicitly programmed.
