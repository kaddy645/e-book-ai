# Transformers — The Architecture That Changed Everything

## The Paper That Started It All

In 2017, a team at Google published a paper with a modest title: **"Attention Is All You Need."**

It introduced the **Transformer** architecture. Within a few years, it would become the foundation of GPT, BERT, Claude, Gemini, and nearly every breakthrough in modern AI.

Before Transformers, AI processed text one word at a time, like reading through a keyhole. Transformers let AI see the *entire page at once*.

---

## The Key Idea: Attention

The core innovation is the **attention mechanism**. Here's the intuition:

When you read the sentence *"The cat sat on the mat because it was tired"* — what does "it" refer to? You instantly know it means "the cat," not "the mat." Your brain does this by paying *attention* to the relevant earlier words.

Transformers do something similar. For every word in a sentence, the model calculates how much attention it should pay to every *other* word.

In the sentence above:
- When processing "it," the model assigns high attention to "cat"
- When processing "tired," the model assigns high attention to both "cat" and "it"

This **self-attention** mechanism is computed mathematically using three concepts:
- **Query**: "What am I looking for?"
- **Key**: "What do I contain?"
- **Value**: "What information do I provide?"

Every word generates all three, and the model uses them to decide what's relevant to what.

---

## Why Transformers Beat Everything Before Them

### 1. Parallelization
Older models (RNNs) processed words one after another — word 5 had to wait for words 1-4 to finish. Transformers process all words simultaneously. This made training dramatically faster and enabled much larger models.

### 2. Long-Range Dependencies
In a long document, the answer to a question in paragraph 10 might depend on something mentioned in paragraph 2. RNNs struggled with this — information faded over distance. Transformers can directly attend to any part of the input, regardless of distance.

### 3. Scalability
Transformers scale beautifully. Double the parameters, double the data, and you get a noticeably better model. This predictable scaling is why companies keep building bigger and bigger models.

---

## Inside a Transformer Block

A single Transformer block does this:

1. **Self-Attention**: Each word looks at all other words and gathers relevant context
2. **Feed-Forward Network**: Process the enriched representation through a small neural network
3. **Normalize & Connect**: Stabilize the numbers and add a shortcut connection

A full Transformer model stacks many of these blocks. GPT-3 has 96 layers. Each layer refines the understanding further — early layers capture grammar and syntax, later layers capture meaning and reasoning.

---

## Encoder vs. Decoder

Transformers come in two flavors:

### Encoder (Understanding)
Reads the full input and produces a rich representation. Good for:
- Understanding text (sentiment analysis, classification)
- Search and retrieval
- **Example**: BERT

### Decoder (Generating)
Generates text one token at a time, only looking at what came before. Good for:
- Writing text
- Chatbots
- Code generation
- **Example**: GPT, Claude

Some models use both (encoder-decoder), like the original Transformer for translation — the encoder understands the source language, the decoder generates the target language.

---

## Tokens, Not Words

Transformers don't actually work with words — they work with **tokens**. A token might be a word, part of a word, or even a single character.

For example, "understanding" might be split into: `["under", "stand", "ing"]`

Why? Because it's more efficient. Common words get their own token, but rare words are broken into familiar pieces. This way, the model can handle any word — even ones it's never seen before — by combining known pieces.

The vocabulary is typically 30,000-100,000 tokens. Every piece of text gets converted to tokens before the model processes it.

> *It's like how you can read a word you've never seen before by sounding out the syllables. The model does the same thing with token pieces.*

---

## The Cost of Attention

There's a catch: self-attention compares every token to every other token. With *n* tokens, that's *n²* comparisons.

- 1,000 tokens → 1 million comparisons
- 10,000 tokens → 100 million comparisons  
- 100,000 tokens → 10 billion comparisons

This is why models have **context windows** — limits on how much text they can process at once. Expanding this window is one of the biggest challenges in current AI research.
