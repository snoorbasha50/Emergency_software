# PROCESS.md

## 1. How I Used AI

AI was used throughout the development process as an engineering assistant.

Primary uses included:

* Bootstrapping the initial project structure
* Evaluating architecture options
* Designing the investment analysis workflow
* Iterating on investment thesis prompts
* Reviewing API integration approaches
* Generating and refining analysis prompts
* Debugging implementation issues

AI was not used to replace engineering decisions. Final architectural choices, technology selection, prompt design, and implementation tradeoffs were made manually after evaluating multiple options.

---

## 2. Prompt Iterations

One of the most important decisions in this project was defining the investment thesis.

Initially, I considered two approaches:

### Approach 1: Dynamic Thesis

The investment thesis would change depending on the search topic.

For example:

* Fintech startups would be scored differently from AI startups.
* Different industries would require different evaluation criteria.

### Approach 2: Fixed Investment Thesis (Selected)

I chose a fixed investment thesis that applies consistently across all startup categories.

The thesis focuses on:

* Self-serve onboarding
* Autonomous value creation
* Minimal operational friction
* Defensibility against competitors

This approach produces more consistent evaluations and makes startup rankings comparable across different searches.

Several prompt iterations were performed to improve:

* Structured JSON outputs
* Scoring consistency
* Hallucination reduction
* Investment reasoning quality

The final prompt instructs the model to reason using available evidence while avoiding invention of unsupported facts.

---

## 3. Why Firecrawl

Initially, I explored startup discovery through:

* Y Combinator APIs
* Product Hunt APIs
* Direct source integrations

During evaluation I found that:

* Y Combinator does not provide a simple public startup discovery API.
* Product Hunt APIs provide only part of the required data.
* Integrating multiple sources would significantly increase implementation complexity.

Firecrawl provided a simpler and more flexible solution.

Reasons for selecting Firecrawl:

* Search and scraping capabilities in a single platform
* Public API availability
* Fast integration
* Domain filtering support
* Ability to target specific startup ecosystems

A particularly useful capability was domain-level filtering.

Example:

```text
Search only within:
- ycombinator.com
- producthunt.com
```

This allowed startup discovery to remain focused on high-signal sources.

---

## 4. Why Gemini

The original implementation plan used OpenAI APIs for startup analysis.

During development I encountered API quota limitations and therefore evaluated alternative LLM providers.

Gemini was selected because:

* Fast integration with Node.js
* Generous free-tier availability
* Strong reasoning capabilities
* Good structured JSON generation
* Large context window

The system architecture was intentionally designed so that the analysis layer can be swapped between providers without affecting the rest of the pipeline.

Current architecture supports replacing Gemini with OpenAI or other LLM providers with minimal changes.

---

## 5. Design Decisions

Several key design decisions shaped the project.

### Separation of Responsibilities

The system is divided into independent stages:

1. Startup Discovery
2. Startup Scraping
3. Startup Analysis
4. Memo Generation

This keeps each component focused on a single responsibility.

### Structured JSON Output

Instead of requesting free-form text from the LLM, the model is required to return structured JSON.

Benefits:

* Easier downstream processing
* Consistent scoring
* Predictable memo generation

### Fixed Investment Framework

A single investment thesis is applied across all startup searches.

Benefits:

* Consistent evaluation criteria
* Comparable startup rankings
* Reduced prompt complexity

### Domain-Constrained Search

Startup discovery is intentionally limited to trusted startup ecosystems such as:

* Y Combinator
* Product Hunt

This improves relevance and reduces noise.

---

## 6. Challenges Encountered

### Investment Thesis Design

The biggest challenge was deciding how startups should be evaluated.

Questions considered:

* Should the thesis change by industry?
* Should scoring be dynamic?
* Should evaluation criteria remain fixed?

After multiple iterations, a fixed thesis was selected because it produced more consistent outputs.

### Startup Discovery Sources

Another challenge was identifying reliable startup discovery sources.

I evaluated:

* Y Combinator
* Product Hunt
* Direct API integrations

Finding publicly accessible startup data sources required experimentation before settling on Firecrawl.

### LLM Reliability

While integrating LLMs, occasional service availability issues were encountered, including quota and rate-limit related constraints.

To improve reliability, retry mechanisms and provider abstraction were considered during development.

---

## 7. Tradeoffs

### Current Tradeoffs

#### Public Data Only

The system relies on publicly available startup information.

Benefits:

* Easy access
* Reproducibility

Limitations:

* Missing private metrics
* Limited visibility into revenue and growth

#### LLM-Based Evaluation

Benefits:

* Fast analysis
* Flexible reasoning
* Rich investment insights

Limitations:

* Scores are probabilistic rather than deterministic
* Output quality depends on available source information

#### Free-Tier Infrastructure

Benefits:

* Rapid development
* No infrastructure costs

Limitations:

* Occasional rate limits
* Potential service availability fluctuations

---

## Future Improvements

Given additional time, I would explore:

* Crunchbase integration
* Founder enrichment from LinkedIn
* Funding history analysis
* Multi-source validation
* Competitive landscape mapping
* Portfolio ranking dashboard
* Historical startup tracking
* Automated memo exports
* Human-in-the-loop investment review
