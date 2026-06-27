# The Stack, Assembled — How Everything Fits Together

## You've Come a Long Way

You started this book with the question: *What is AI?*

You now know that AI is a vast, layered stack of interconnected ideas — each one building on the last. This final chapter assembles those pieces into a single coherent picture. Not because the field is finished, but because understanding the whole helps you navigate it.

---

## The Stack, Layer by Layer

Think of modern AI as a stack of technologies. Each layer depends on the ones below it.

```
┌──────────────────────────────────────────────┐
│  Applications: Agents, Copilots, Assistants  │  ← You use these
├──────────────────────────────────────────────┤
│  Context Engineering & Orchestration         │  ← How they're built
├──────────────────────────────────────────────┤
│  RAG, Tool Use, MCP                          │  ← How they get information
├──────────────────────────────────────────────┤
│  Fine-Tuning, RLHF, Prompting                │  ← How models are aligned
├──────────────────────────────────────────────┤
│  Foundation Models (LLMs, SLMs)              │  ← The engines
├──────────────────────────────────────────────┤
│  Transformers & Attention                    │  ← The architecture
├──────────────────────────────────────────────┤
│  Self-Supervised Learning + Training Data    │  ← How they learn
├──────────────────────────────────────────────┤
│  Tokenization + Embeddings/Vectors           │  ← The representation layer
├──────────────────────────────────────────────┤
│  Neural Networks + Compute                   │  ← The substrate
└──────────────────────────────────────────────┘
```

---

## The Journey of a Single Query

Let's trace exactly what happens when you type a message to an AI assistant. Every layer activates.

---

### Step 1 — Your words are tokenized
*"What were the main causes of World War I?"*

The text is split into tokens: `["What", " were", " the", " main", " causes", " of", " World", " War", " I", "?"]`. Each token becomes an integer ID. This is the raw input the model will process. **(Tokenization — Chapter 10)**

---

### Step 2 — Context is assembled
Before your message even reaches the model, an orchestration layer assembles the full context:

- A system prompt defining the assistant's role and behavior
- Conversation history from earlier in the session
- Any retrieved documents (from a RAG system — if your question touches on recent or private information)
- Your current message

This assembly is the work of context engineering. **(Context Engineering — Chapter 16, RAG — Chapter 11, MCP — Chapter 15)**

---

### Step 3 — Tokens become vectors
Each token ID is converted to a high-dimensional embedding vector — a point in meaning-space. Similar concepts produce similar vectors. **(Vectors & Embeddings — Chapter 7)**

---

### Step 4 — The Transformer processes the sequence
The embedding vectors pass through dozens of Transformer blocks. In each block:

- **Self-attention** computes relationships between all tokens — "World" attends to "War" and "I"; "causes" attends to "were" and "I" **(Attention Mechanism — Chapter 5)**
- **Feed-forward networks** process the enriched representation
- Layer by layer, the model builds a rich contextual understanding of your query **(Transformer Architecture — Chapter 5 & 6)**

---

### Step 5 — The model generates a response
The Transformer produces a probability distribution over all possible next tokens. It samples one, appends it to the context, and repeats — generating your answer one token at a time.

This decoding process was learned during:
- **Self-supervised pre-training** on billions of text documents **(Self-Supervised Learning — Chapter 11)**
- **Fine-tuning** to follow instructions **(Fine-Tuning — Chapter 7)**
- **RLHF** to give responses humans actually prefer **(RLHF — Chapter 12)**

---

### Step 6 — The response is shaped by alignment
The model doesn't just output the statistically likely continuation. It has been shaped to be helpful, truthful, and safe. It knows when to express uncertainty, when to use chain of thought reasoning to check its work, and how to match tone and format to your question. **(RLHF — Chapter 12, Chain of Thought — Chapter 14, Few-Shot — Chapter 13)**

---

### Step 7 — If it's an agent, it may take action
If the application is an agent, the response might not just be text — it might be a tool call: "Search the web for X," "Run this code," "Query the database." The tool executes and the result flows back into the context. The model continues reasoning. **(Agents — Chapter 8, MCP — Chapter 15)**

---

### Step 8 — The text is detokenized
The sequence of token IDs is converted back into readable text. The answer arrives in your chat window.

---

## The Big Themes

Looking across all 20 chapters, several unifying themes emerge:

### Scale Unlocks Emergence
Small neural networks learn narrow patterns. Very large ones trained on enormous data start exhibiting capabilities nobody explicitly programmed — reasoning, translation, common sense. Scale is not just "more of the same." At sufficient scale, something qualitatively different happens.

### Representations Are Everything
The core task across almost every chapter is learning good representations — turning raw data into vector spaces where similar things are close together and structure can be computed. Tokenization, embeddings, attention, self-supervised learning — all of it is about finding better ways to represent the world.

### Alignment Is a Separate Problem from Capability
A model can be incredibly capable and still behave terribly — saying harmful things, giving wrong answers confidently, refusing benign requests. RLHF, Constitutional AI, and the growing field of AI safety are about solving the alignment problem separately from the capability problem. Smarter ≠ better aligned.

### The Compression Principle
Distillation, quantization, SLMs — the entire movement toward efficient AI is about finding compact representations that preserve the essential capabilities of larger systems. Intelligence can be compressed. Knowledge can be transferred. Capability doesn't require scale forever.

### Context Is the Interface
For all the complexity in the stack below, the way you interact with AI systems comes down to what you put in the context window. System prompts, retrieved documents, examples, instructions — the quality of context engineering determines the quality of AI applications.

---

## What's Not in This Book

This book covered the foundations. The field extends further:

**Formal AI safety and alignment research** — mathematical frameworks for ensuring AI systems reliably pursue intended goals as they become more capable.

**Neuromorphic and alternative hardware** — chips designed specifically for neural network inference, moving beyond GPUs.

**Embodied AI** — robots and physical agents that must perceive and act in the physical world in real time.

**World models and planning** — AI systems that build internal models of the world and use them for long-horizon planning.

**AI and society** — economics, labor markets, regulation, geopolitics, and the long-term trajectory of a world where AI capability compounds.

Each of these is a book of its own.

---

## Where Things Are Going

If you had to summarize the direction of AI development in one sentence:

**Systems are moving from models that respond to models that act — from language to agency, from chat windows to participants in the world.**

The technologies in this book — attention mechanisms, RAG, agents, MCP, context engineering — are the building blocks of that transition. They're not the destination. They're the foundation for whatever comes next.

---

## A Final Word

Understanding these concepts doesn't make you a passive observer of AI. It makes you someone who can build with it, evaluate it critically, use it effectively, and ask the right questions about where it's heading.

The stack is complex. But now you understand it.

What you build with it is up to you.
