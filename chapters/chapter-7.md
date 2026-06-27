# Embeddings, Vector Databases, and RAG

## The Problem: LLMs Have a Memory Limit

LLMs know a lot — but they don't know *your* stuff. They can't read your company's internal docs, last week's emails, or the latest research paper published yesterday.

And even if you paste documents into the prompt, there's a limit — the context window. You can't paste an entire textbook into every query.

So how do you give an LLM access to specific knowledge without retraining it?

The answer: **Retrieval-Augmented Generation (RAG)**.

---

## Step 1: Embeddings — Turning Text into Numbers

An **embedding** is a way to represent text as a list of numbers (a vector) that captures its *meaning*.

The sentence "The dog chased the ball" might become something like:
`[0.23, -0.45, 0.89, 0.12, -0.67, ...]` (hundreds of dimensions)

The critical property: **similar meanings produce similar vectors.**

- "The puppy ran after the toy" → very close to the dog sentence
- "Stock markets crashed today" → very far away

This means you can measure how *similar* two pieces of text are by measuring the distance between their vectors — using simple math.

---

## Step 2: Vector Databases — Organized Meaning

A **vector database** stores millions of these embeddings and lets you search them by similarity.

Instead of traditional search ("find documents containing the word 'budget'"), you can do **semantic search** ("find documents about financial planning" — even if they never use the word "budget").

Popular vector databases include Pinecone, Weaviate, Chroma, and pgvector (for Postgres).

The process:
1. Take your documents — PDFs, web pages, notes, whatever
2. Split them into chunks (paragraphs or sections)
3. Convert each chunk to an embedding vector
4. Store them in a vector database

Now you have a searchable knowledge base that understands *meaning*, not just keywords.

---

## Step 3: RAG — Putting It All Together

**Retrieval-Augmented Generation** connects your vector database to an LLM:

1. **User asks a question**: "What was our Q3 revenue?"
2. **Retrieve**: Search the vector database for the most relevant document chunks
3. **Augment**: Paste those chunks into the LLM's prompt as context
4. **Generate**: The LLM answers based on the retrieved context

The LLM doesn't need to *know* your Q3 revenue — it just needs to read the relevant document and extract the answer. Just like a human would.

### Why RAG is Powerful:
- **Always up to date** — add new documents anytime, no retraining needed
- **Verifiable** — you can see which documents the answer came from
- **Cheaper than fine-tuning** — no GPU costs, just a vector database
- **Domain-specific** — works with any knowledge base

---

## Chunking Strategy Matters

How you split documents into chunks significantly impacts quality.

**Too small** (individual sentences): Loses context. The model gets fragments without enough information.

**Too large** (entire chapters): The relevant information gets buried in noise, and you waste context window space.

**Best practice**: Split into paragraphs or logical sections. Include overlap between chunks so ideas that span a boundary aren't lost. Many systems use chunks of 200-500 tokens with 50-100 token overlap.

---

## The Limits of RAG

RAG isn't magic. Some failure modes:

- **Retrieval miss**: The most relevant chunk isn't retrieved because the question was phrased differently from the source material
- **Context pollution**: Too many retrieved chunks confuse the model
- **Reasoning gaps**: The answer requires combining information from many sources in complex ways
- **Contradiction**: Different documents say different things, and the model has to choose

> *Think of RAG like giving someone a stack of relevant documents before asking a question. It helps a lot — but if the right document isn't in the stack, or the answer requires reading between the lines of 50 different documents, you might still get a wrong answer.*

---

## Real-World Applications

RAG is everywhere in production AI:

- **Customer support bots** that answer from your help docs
- **Internal search tools** that find relevant company knowledge
- **Research assistants** that pull from paper databases
- **Legal tools** that search through case law
- **Medical systems** that reference drug interactions and treatment guidelines

If you're building an AI application that needs to work with specific data, RAG is almost certainly part of your architecture.
