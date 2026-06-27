# Tokenization — How AI Reads Text

## The First Thing That Happens

Before an AI model can understand a single word you write, it has to do something that might seem odd: it *destroys* the words.

Not permanently. But the model doesn't work with words — it works with **tokens**, and turning your text into tokens is the very first step in every interaction with a language model.

---

## What Is a Token?

A token is a chunk of text. That chunk might be:

- A whole word: `"hello"` → `["hello"]`
- Part of a word: `"unhappiness"` → `["un", "happin", "ess"]`
- A punctuation mark: `"."` → `["."]`
- A space + word: `" the"` → `[" the"]`

There's no single universal rule. The exact chunking depends on the **tokenizer** — the algorithm trained alongside the model to break text apart efficiently.

A useful rule of thumb: **1 token ≈ 4 characters ≈ ¾ of a word** in English. So 1,000 tokens is roughly 750 words.

---

## Why Not Just Use Words?

You might wonder: why not treat each word as one unit? Three reasons:

### 1. Vocabulary Would Explode
English has over 170,000 words — and that's before accounting for names, places, slang, technical terms, and typos. Storing a unique entry for every possible word is impractical. Tokens let you cover the same ground with a vocabulary of just 30,000–100,000 pieces.

### 2. Unknown Words Become Solvable
New words, rare words, and misspellings don't break the system. The model can handle `"flibbertigibbet"` by breaking it into recognizable sub-pieces, just like you can sound out a word you've never read before.

### 3. Languages Share Structure
Many languages share root forms, prefixes, and suffixes. A shared token vocabulary means a multilingual model can represent dozens of languages without treating each as completely separate.

---

## How Tokenization Works: BPE

Most modern models use an algorithm called **Byte Pair Encoding (BPE)**.

Here's the intuition:

1. Start with individual characters: `["u", "n", "h", "a", "p", "p", "y"]`
2. Find the most frequent pair of adjacent characters and merge them: `"pp"` → `"pp"`
3. Repeat: merge the next most frequent pair
4. Keep going until you hit your target vocabulary size

The result is a vocabulary where common sequences (like `"ing"`, `"tion"`, `"the"`) become single tokens, while rare characters stay as individual pieces.

> *It's like Morse code — common letters get short codes, rare ones get longer ones. The system naturally becomes efficient.*

---

## The Token Is the Unit of Cost

This matters practically: **AI APIs charge per token**, and models have **token limits**.

| Model | Context Window |
|-------|---------------|
| GPT-4 | 128,000 tokens |
| Claude 3.5 | 200,000 tokens |
| Gemini 1.5 Pro | 1,000,000 tokens |

When you exceed the context window, the model literally cannot "see" the earlier text. It's not that it forgets — it never had access.

This is why context management (which we'll discuss in Chapter 14) is such a critical skill when building AI applications.

---

## Tokenization Surprises

Tokenization can produce unexpected results that matter for AI behavior:

**Counting is hard**
Ask an LLM "how many letters are in the word 'strawberry'?" and it often gets it wrong. That's because it never sees individual letters — it sees tokens. The word `"strawberry"` might be one or two tokens, and the model has to infer the character count from that.

**Numbers are tricky**
The number `12345` might tokenize as `["123", "45"]` or `["1", "2345"]` — inconsistently. This is one reason arithmetic is unreliable for LLMs without a calculator tool.

**Languages differ in cost**
A sentence in English might use 10 tokens. The same meaning in Japanese might use 30+ tokens, because the tokenizer was trained on mostly English text and handles Japanese characters less efficiently.

---

## The Vocabulary File

Every model ships with a vocabulary file — a list that maps token strings to integer IDs. When you type a message, the tokenizer converts it to a sequence of integers like `[15496, 11, 616, 1438, 318]` ("Hello, my name is"), and those integers are what the model actually processes.

At the output side, the model produces a probability distribution over all possible next token IDs, picks one (based on temperature and sampling settings), and decodes it back to text.

**Token in → integer → model processes → probability over integers → token out → text**

That's the full loop.

---

## Why This Chapter Matters

Understanding tokenization explains many "weird" LLM behaviors:
- Why they struggle with character-level tasks (anagrams, counting letters)
- Why prompts in some languages cost more
- Why there are hard context limits
- Why some words get "split" in confusing ways mid-generation

The next time an LLM surprises you, there's a good chance tokenization is involved.
