# AI Agents and Tool Use

## Beyond Chat: AI That Takes Action

So far, everything we've discussed involves AI that *responds* — you ask, it answers. But the frontier of AI is about systems that *act*.

An **AI agent** is an LLM that can:
1. **Plan** — break a complex task into steps
2. **Use tools** — call APIs, search the web, run code, read files
3. **Observe** — check the results of its actions
4. **Iterate** — adjust its plan based on what happened

Instead of just answering "How do I analyze this dataset?", an agent can actually *analyze the dataset* — writing code, running it, interpreting results, and presenting findings.

---

## The Agent Loop

At its core, an AI agent follows this cycle:

```
Think → Act → Observe → Think → Act → Observe → ... → Done
```

**Example: "Find the cheapest flight from NYC to London next month"**

1. **Think**: I need to search flight comparison sites
2. **Act**: Use web search tool to query flight data
3. **Observe**: Found 15 results, cheapest appears to be $340
4. **Think**: I should verify this on the airline's direct site
5. **Act**: Use web browser tool to check the airline site
6. **Observe**: Confirmed — $340, departing March 15
7. **Done**: Report the finding to the user

The LLM is the "brain" deciding what to do. The tools are the "hands" that interact with the world.

---

## Tool Use: Giving AI Hands

Tools extend what an LLM can do beyond generating text. Common tools include:

### Code Execution
The model writes Python code, runs it in a sandbox, and reads the output. This solves the "LLMs are bad at math" problem — they just write code to calculate instead.

### Web Search
The model searches the internet for current information, solving the "training data cutoff" problem.

### File Operations
Read, write, and manipulate files. This enables document processing, data analysis, and content creation workflows.

### API Calls
Interact with external services — send emails, create calendar events, query databases, post to social media.

### Function Calling
The model outputs structured JSON specifying which function to call with what parameters. The application executes the function and feeds results back to the model.

---

## How Function Calling Works

Modern LLMs support **function calling** natively. You define available tools:

```
Tool: get_weather
Parameters: city (string), unit (celsius/fahrenheit)
Description: Returns current weather for a city
```

When a user asks "What's the weather in Tokyo?", the model doesn't guess — it outputs:

```
Call: get_weather(city="Tokyo", unit="celsius")
```

Your application executes this, gets the result (say, "22°C, partly cloudy"), feeds it back to the model, and the model writes a natural language response.

This is how AI assistants integrate with real-world services reliably.

---

## Multi-Agent Systems

What if you have multiple agents working together?

- **Researcher Agent**: Searches and summarizes information
- **Writer Agent**: Creates content based on research
- **Reviewer Agent**: Checks the content for accuracy and quality
- **Editor Agent**: Polishes the final output

Each agent has its own system prompt, tools, and specialization. They pass work between each other like a team of humans.

Frameworks like LangGraph, CrewAI, and AutoGen make it possible to orchestrate these multi-agent workflows.

---

## The Reliability Problem

Agents sound amazing — but they're fragile. Each step introduces a chance of failure:

- The LLM might misunderstand the task
- The tool might return unexpected results
- The plan might be wrong from the start
- Errors compound across steps — if step 3 fails, steps 4-10 all go wrong

Current agent systems work well for:
- Short, well-defined workflows (3-5 steps)
- Tasks with clear success criteria
- Environments with good error recovery

They struggle with:
- Long, open-ended tasks requiring many steps
- Tasks requiring nuanced human judgment
- Novel situations with no clear playbook

> *Think of current AI agents like a capable but literal-minded intern. They can follow instructions, use tools, and get things done — but they need clear direction and sometimes mess up in ways a human wouldn't.*

---

## The Future of Agents

Despite current limitations, agents represent the most likely near-term path to dramatically more capable AI. The trend is clear:

- **2023**: LLMs that just chat
- **2024**: LLMs with basic tool use (web search, code execution)
- **2025**: Multi-step agents handling complex workflows
- **Beyond**: Autonomous agents that manage projects, write software, conduct research

The gap between "AI that advises" and "AI that does" is closing fast.
