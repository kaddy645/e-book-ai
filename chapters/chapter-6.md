# Training, Fine-Tuning, and Prompt Engineering

## The Three Ways to Shape AI Behavior

You now know that LLMs learn from data. But there are actually three distinct stages where you can influence *what* the model knows and *how* it behaves:

1. **Pre-training** — the big, expensive learning phase
2. **Fine-tuning** — specialized training for specific tasks
3. **Prompt engineering** — shaping behavior through clever instructions

Each operates at a different level, like teaching a person through school, job training, and daily instructions.

---

## Pre-training: The Foundation

This is where the model learns language itself. It reads billions of pages of text and learns:

- How language works (grammar, syntax)
- Facts about the world
- Patterns of reasoning
- Cultural context and common knowledge

**Cost**: Tens of millions of dollars in GPU compute. Months of training time. Terabytes of data.

**Who does this**: Only a handful of companies — OpenAI, Google, Anthropic, Meta, Mistral. You almost certainly won't pre-train a model yourself.

The result is a **base model** — incredibly knowledgeable but not particularly useful. It's like a person who has read every book in the library but has never had a conversation. Ask it a question, and it might just continue generating random text instead of answering.

---

## Fine-Tuning: Teaching Manners

Fine-tuning takes the base model and teaches it *how to behave*. There are several approaches:

### Instruction Tuning
Train the model on examples of instructions and ideal responses:
- "Summarize this article" → [good summary]
- "Write a haiku about rain" → [good haiku]
- "Explain quantum physics simply" → [good explanation]

After thousands of these examples, the model learns to follow instructions generally — even for types it hasn't seen before.

### RLHF (Reinforcement Learning from Human Feedback)
Human evaluators rank multiple model responses from best to worst. The model learns to produce the kind of responses humans prefer. This is what makes ChatGPT feel "helpful" rather than just "smart."

### Domain Fine-Tuning
Train on data from a specific field — medical records, legal documents, financial reports — to make the model an expert in that area.

**Cost**: Thousands to hundreds of thousands of dollars. Can be done by companies and well-funded research teams.

---

## Prompt Engineering: The Art of Asking

This is the one *you* can do right now, for free.

Prompt engineering is crafting your input to get better output. The same model can give wildly different responses depending on how you ask.

### Bad Prompt:
> "Tell me about climate change"

### Better Prompt:
> "Explain the top 3 causes of climate change in simple language. Use analogies a high school student would understand. Keep it under 200 words."

### Key Techniques:

**1. Be Specific**
Don't say "write something about dogs." Say "write a 100-word paragraph about why golden retrievers make good family pets, aimed at first-time dog owners."

**2. Provide Context**
"You are an experienced Python developer reviewing code for a junior developer. Point out bugs gently and explain why they're problems."

**3. Give Examples (Few-Shot)**
Show the model what you want:
> "Convert these to formal language:
> - 'Hey, can't make it' → 'I regret to inform you that I will be unable to attend.'
> - 'Sounds good to me' → 'That arrangement is satisfactory.'
> - 'No way that's gonna work' → "

The model learns the pattern and continues it.

**4. Chain of Thought**
Ask the model to think step by step:
> "Solve this math problem. Show your reasoning step by step before giving the final answer."

This dramatically improves accuracy on reasoning tasks.

---

## Temperature and Other Controls

When generating text, you can adjust several parameters:

**Temperature** (0.0 - 2.0)
- Low (0.0-0.3): Precise, deterministic, repetitive. Good for facts and code.
- Medium (0.5-0.8): Balanced. Good for most tasks.
- High (1.0+): Creative, surprising, sometimes chaotic. Good for brainstorming.

**Top-p (Nucleus Sampling)**
Controls how many word choices the model considers. Lower = more focused. Higher = more diverse.

**Max Tokens**
Simply limits how long the response can be.

> *Think of temperature like a personality dial. Turn it down and the model is a careful librarian. Turn it up and it's a jazz musician — creative but occasionally hitting wrong notes.*

---

## The Power of System Prompts

Most AI applications use a **system prompt** — hidden instructions that shape the model's entire personality and behavior.

When you use ChatGPT, there's a system prompt you never see that says something like: "You are a helpful assistant. Be concise. Don't produce harmful content."

Companies building AI products spend enormous effort crafting these system prompts. A well-designed system prompt can turn a general model into a specialized tutor, coding assistant, therapist, or customer service agent — without any fine-tuning at all.
