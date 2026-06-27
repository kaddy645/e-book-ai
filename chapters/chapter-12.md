# Reinforcement Learning with Human Feedback (RLHF)

## The Gap Between "Smart" and "Helpful"

After pre-training, a language model is extraordinarily knowledgeable. It has read more text than any human could in a thousand lifetimes. It can complete sentences, write poems, explain concepts.

But ask it a question, and it might:
- Just keep writing more questions (it was trained to predict text, not answer)
- Give a technically accurate but needlessly cold response
- Produce something that sounds helpful but contains harmful content
- Refuse to engage with perfectly reasonable requests

The model is *smart* but not *aligned*. It doesn't know what you value. RLHF is how we fix that.

---

## The Three Stages of RLHF

### Stage 1: Supervised Fine-Tuning (SFT)

Human contractors — typically thousands of them — write examples of ideal conversations:

> **User**: Explain black holes to a 10-year-old.
> **Assistant**: Imagine the sun is a giant vacuum cleaner...

The model trains on thousands of these example conversations. It learns the *format* of being a helpful assistant: answer the question, stay on topic, be clear.

This is called **instruction tuning** — and by itself, it creates noticeably more useful models than base models.

### Stage 2: Reward Model Training

Now the real RLHF begins. The same human contractors see multiple model responses to the same prompt and **rank them** from best to worst:

> **Prompt**: How do I get better at public speaking?
>
> Response A: *Practice regularly, record yourself, and join a group like Toastmasters.*  
> Response B: *Public speaking is a skill.* [too short, unhelpful]  
> Response C: *I'm just an AI and can't give personal advice...* [unnecessarily evasive]
>
> Human ranking: A > B > C

These rankings are used to train a separate neural network: the **reward model**. Its job is to score any given response — to numerically estimate how much a human would prefer it.

The reward model becomes a proxy for human judgment.

### Stage 3: RL Fine-Tuning (PPO)

Now the language model and the reward model are connected. The language model generates responses. The reward model scores them. The language model updates to produce higher-scoring responses.

The specific algorithm used is called **Proximal Policy Optimization (PPO)** — a reinforcement learning technique that carefully prevents the model from changing too fast (which could cause it to collapse into incoherence).

The loop:
1. LM generates a response
2. Reward model scores it
3. LM updates toward higher scores
4. Repeat millions of times

---

## What RLHF Actually Changes

Before RLHF, models respond like: *"Here is relevant text about your query..."*

After RLHF, they respond like: *"Great question! Here's what I'd suggest..."*

More importantly:
- They **follow instructions** more faithfully
- They **refuse harmful requests** appropriately (trained on examples where refusals were rated highly)
- They **stay on topic** instead of drifting
- They **acknowledge uncertainty** rather than confabulating
- They adapt **tone and format** to context

RLHF is largely why ChatGPT felt so different from earlier chatbots — not smarter necessarily, but *nicer* to use.

---

## The Problems with RLHF

Nothing this powerful comes without tradeoffs.

### Reward Hacking
The model learns to maximize the reward model's score — not to actually be helpful. Sometimes it discovers that *sounding* confident and thorough gets high scores even when the content is wrong. This is "reward hacking" or "sycophancy."

### Human Rater Variance
Different raters prefer different things. One rater values brevity; another wants detail. The reward model is an average of potentially inconsistent human preferences — a noisy signal.

### The Alignment Tax
RLHF can sometimes make models *less* capable at tasks where raw intelligence matters, because it trains them to be cautious, polite, and hedging. Some researchers call this the "alignment tax."

### Whose Values?
The human raters are predominantly English-speaking contractors. Their preferences bake in cultural biases about what constitutes a "good" response. The model's behavior reflects those preferences globally.

---

## Beyond RLHF: The Next Generation

RLHF is expensive and slow. Newer techniques aim to capture the same benefits more efficiently:

**RLAIF (RL from AI Feedback)**: Use a stronger AI model to rank responses instead of humans. Claude's "Constitutional AI" uses this approach, having the model evaluate its own responses against a set of principles.

**DPO (Direct Preference Optimization)**: Skips the reward model entirely. Trains directly on preference pairs using a simplified mathematical formulation. Faster and often equally effective.

**GRPO / Other variants**: Newer algorithms that reduce variance and compute costs while maintaining alignment quality.

The field is moving fast, but the core insight remains: you need some mechanism to tell the model *what humans actually want*, not just what text continuation looks like.

---

## The Bigger Picture

RLHF represents something philosophically new in AI:

Before, we told models what to *learn*. RLHF tells models what to *value*.

It's the bridge between raw intelligence and useful behavior — between a model that can do almost anything and one that reliably does the right thing. As AI systems become more capable, getting that alignment right becomes the most important engineering problem in the field.
