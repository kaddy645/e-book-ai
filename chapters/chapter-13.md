# Few-Shot Prompting — Teaching by Example

## The Power of Showing, Not Telling

There are two ways to teach someone a new task.

You can *explain* it: "When converting informal language to formal, replace contractions, use complete sentences, and avoid slang."

Or you can *show* it:

> "can't make it" → "I regret to inform you that I will be unable to attend."  
> "sounds good" → "That arrangement is satisfactory."  
> "no way" → "I'm afraid that is not feasible."  
> "see ya tomorrow" → ?

Most people learn faster from the second approach. So do language models.

This is **few-shot prompting**: providing a small number of examples inside your prompt to show the model exactly what you want — without changing the model's weights, without retraining, without any special setup.

---

## The Spectrum: Zero, One, Few

### Zero-Shot Prompting
No examples. Just the instruction.

> *"Classify the sentiment of this review as positive, negative, or neutral: 'The delivery was late but the product was excellent.'"*

Works for straightforward tasks the model has seen many times in training. Fails when the task is unusual, ambiguous, or requires a specific format.

### One-Shot Prompting
One example.

> *"Classify sentiment. Example: 'The battery dies after an hour' → negative.*
> *Now classify: 'The delivery was late but the product was excellent.'"*

Better than zero-shot for most tasks. The model understands your format expectations.

### Few-Shot Prompting
Three to ten examples.

> *[Example 1: input → output]*  
> *[Example 2: input → output]*  
> *[Example 3: input → output]*  
> *[New input → ?]*

This is the sweet spot for tasks that require a consistent, specific output format or style.

---

## Why It Works

Language models are trained to predict what comes next given everything before. When you provide examples, you're essentially saying: *"Here is a pattern. Extend it."*

The model doesn't need to be retrained. It uses its existing knowledge about language patterns to infer what you want from the structure of your examples — and then applies that to the new case.

This is sometimes called **in-context learning**: the model learns the task from the context of your prompt rather than from weight updates.

> *It's like handing someone a recipe by saying "I made this, this, and this — now make the next one." They learn your style from the examples, not from a cooking class.*

---

## Crafting Good Few-Shot Examples

The quality of your examples matters more than the quantity.

### Pick Diverse Examples
Cover the range of cases you care about. If you're classifying sentiment and all your examples are strongly positive or strongly negative, the model will struggle with neutral cases.

### Be Consistent in Format
Every example should have exactly the same structure. If you sometimes include punctuation and sometimes don't, the model will be confused about what's essential.

**Inconsistent:**
> "happy" → Positive  
> sad → negative.  
> "angry": NEGATIVE

**Consistent:**
> "happy" → Positive  
> "sad" → Negative  
> "angry" → Negative  

### Choose Unambiguous Examples
If you're not sure what the correct answer is for one of your examples, don't use it. Ambiguous examples teach ambiguous behavior.

### Match the Distribution
Your examples should resemble the real inputs the model will see. Don't train on simple cases and then test on complex ones.

---

## Few-Shot in Practice

**Data extraction**
> *"Extract the name and date from this text.*
> *Example: 'I met John Smith on March 4th.' → Name: John Smith, Date: March 4th.*
> *Now extract from: 'Sarah Johnson called on the 15th of June.'"*

**Code style matching**
> *[Paste 2–3 examples of code written in your team's style]*
> *"Now write a function that does X in the same style."*

**Custom classification**
> *[Examples of your specific labeling scheme]*
> *"Label this new example using the same categories."*

**Tone matching**
> *[Examples of your brand's voice]*
> *"Write a product description in this style for [new product]."*

---

## Limitations

**Context window constraints**: Each example uses tokens. With 5 long examples, you may burn through a significant chunk of the available context before the model even sees your actual input.

**Label bias**: Research shows that for classification tasks, the *distribution* of labels in your examples influences the model more than the actual content. If 4 of your 5 examples are "positive," the model will lean positive — even for genuinely negative inputs.

**Not reliable for complex reasoning**: Few-shot prompting is excellent for format and style. For multi-step reasoning, you need a different technique — Chain of Thought (the next chapter).

**Still not fine-tuning**: Few-shot prompting influences *this conversation*. Fine-tuning changes the model permanently. For high-volume production tasks where consistency matters, few-shot in the prompt eventually gives way to fine-tuning.

---

## The Meta-Insight

Few-shot prompting revealed something profound about language models: they don't just store facts — they can *generalize patterns from examples seen in context*. This wasn't designed in. It emerged from training on enough data.

This insight unlocked an entire research area (in-context learning) and is one reason why prompt engineering became a serious discipline — the right examples, in the right order, can make an LLM behave like a specialized expert without touching a single model weight.
