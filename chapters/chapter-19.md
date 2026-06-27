# Quantization — Making Models Fit

## The Size Problem

A large language model is, at its core, a gigantic collection of numbers. GPT-3 has 175 billion parameters. Each parameter is a number that gets multiplied and added during inference.

In its full precision form, each number is stored as a **32-bit floating point** — 4 bytes. That means:

175 billion parameters × 4 bytes = **700 GB**

That's more than most computers have in RAM, let alone a phone or laptop. Running such a model requires a rack of specialized GPU hardware.

**Quantization** is the technique that makes large models practical: instead of storing each number with 32 bits of precision, you store it with far fewer — 16, 8, 4, or even fewer bits.

The tradeoff: slightly lower precision. The result: dramatic reductions in size and speed — often with minimal impact on quality.

---

## Bits, Bytes, and Precision

To understand quantization, it helps to understand what "32-bit floating point" actually means.

A 32-bit float can represent numbers across an enormous range, with high precision. Think of it like a ruler that can measure down to the nanometer.

An 8-bit integer (INT8) can only represent 256 distinct values (0 to 255, or −128 to 127). Think of it like a ruler that only measures whole centimeters.

For most neural network weights, that precision loss doesn't matter much in practice. The model's behavior is determined by the *relative* magnitude of millions of weights working together. No single weight needs to be stored with nanometer precision — centimeter precision is usually enough.

---

## Types of Quantization

### Post-Training Quantization (PTQ)
Take an already-trained model and convert its weights to lower precision *after* training. No retraining required.

Fast and simple. Works well for 8-bit quantization. Quality can degrade at 4-bit and below without more careful calibration.

### Quantization-Aware Training (QAT)
Include the effects of quantization *during* training. The model learns to compensate for the reduced precision as it trains.

Produces better quality at aggressive compression levels but requires access to the training pipeline — not always available.

### GPTQ / AWQ / GGUF (Popular Formats)
Modern quantization methods specifically designed for large language models. They use clever techniques to minimize quality loss — for example, weighting the importance of different parameters and being more careful with high-impact weights.

- **GPTQ**: GPU-optimized, 4-bit quantization. Enables running 70B models on a consumer GPU.
- **AWQ**: Activation-aware weight quantization. Preserves the most important weights.
- **GGUF**: CPU-friendly format used by `llama.cpp`. Lets you run models on a laptop CPU.

---

## What Quantization Does to Size and Speed

| Precision | Bits | Llama 3 70B Size | Hardware Required |
|-----------|------|-------------------|-------------------|
| FP32 | 32-bit | ~280 GB | 4× A100 GPUs |
| FP16 | 16-bit | ~140 GB | 2× A100 GPUs |
| INT8 | 8-bit | ~70 GB | 1× A100 GPU |
| INT4 | 4-bit | ~35 GB | Consumer GPU (RTX 4090) |
| 2-bit | 2-bit | ~17 GB | Laptop GPU or CPU |

Quantization can reduce a model's memory footprint by **8× or more** — making a model that required enterprise GPU clusters runnable on consumer hardware.

And it's not just memory: smaller models load faster, run faster, and consume less power — critical for edge deployment and mobile devices.

---

## Quality vs. Compression

Quantization isn't free. The quality tradeoff curve looks like this:

- **FP16 → INT8**: Almost undetectable quality loss. Standard practice.
- **INT8 → INT4**: Slight degradation on complex reasoning tasks. Usually acceptable.
- **INT4 → 2-bit**: Noticeable quality loss. Only suitable for simpler tasks.
- **1-bit**: Extreme compression. Special architectures (like BitNet) required.

The practical sweet spot for most use cases is **4-bit quantization** — it reduces the model to roughly 1/8 of its original size while maintaining most of its capability.

---

## Quantization Enables the Open-Source Revolution

This matters enormously for the democratization of AI.

When Meta released Llama 2 and Llama 3 in 4-bit quantized form, suddenly anyone with a decent gaming PC could run a capable 7B or 13B model locally:

- No API costs
- No internet required
- Complete privacy — data never leaves the device
- Ability to fine-tune the model yourself

Tools like **Ollama** and **LM Studio** have built user-friendly interfaces on top of quantized models, letting non-technical users run powerful AI locally with a few clicks.

---

## Quantization in Production

For cloud inference providers, quantization is about economics. Running INT8 instead of FP32:
- Doubles throughput (twice as many requests served per GPU)
- Halves memory costs
- Halves the energy per inference

At scale — millions of queries per day — these savings are substantial. Most commercial AI APIs serve quantized models, even when they advertise "GPT-4" or "Claude."

---

## The Limit: 1-Bit Models

Researchers are exploring the extreme end: **1-bit quantization**, where every weight is simply +1 or −1. Microsoft's BitNet project showed that models specifically designed and trained for 1-bit precision can still be useful, with weights and activations represented as ternary values (−1, 0, +1).

1-bit models could eventually run on tiny devices — microcontrollers, IoT sensors, hearing aids — without any GPUs at all.

---

## The Practical Takeaway

Quantization is one of those techniques that lets AI escape the lab and enter the real world. It's not glamorous — it's numerical engineering. But without it:

- No AI on phones
- No private, local AI
- No small open-source models
- Much higher API costs for everyone

In the chain of techniques that makes AI practical, quantization is the link between "what researchers train" and "what the rest of the world uses."
