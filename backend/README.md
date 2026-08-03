# Emergence Startup Research Pipeline

## Overview

This project is an AI-powered startup research pipeline that discovers startups related to a user-supplied topic, analyzes them against a fixed investment thesis, and generates structured investment memos.

The system automates a workflow typically performed by venture analysts:

1. Discover startups
2. Gather company information
3. Analyze investment potential
4. Score opportunities
5. Generate investment memos

---

## Architecture

```text
User Topic
    │
    ▼
Firecrawl Search API
    │
    ▼
Startup Discovery
    │
    ▼
Firecrawl Scrape API
    │
    ▼
Website Content Extraction
    │
    ▼
Gemini LLM Analysis
    │
    ▼
Structured Investment Analysis
    │
    ▼
Memo Generation
    │
    ▼
Markdown Investment Memos
```

---

## Components

### Stage 1: Startup Discovery (`sourcer.js`)

Responsibilities:

* Accept user topic
* Search startup ecosystem sources
* Filter relevant companies
* Return structured startup data

Output:

```json
{
  "name": "Diligent",
  "description": "...",
  "url": "...",
  "source": "YC"
}
```

---

### Stage 2: Startup Analysis (`analyze.js`)

Responsibilities:

* Scrape company pages
* Extract website content
* Run investment analysis using Gemini
* Score startups against investment thesis

Evaluation Criteria:

* Team
* Product
* Market
* Traction
* Thesis Fit

Output:

```json
{
  "company": "Diligent",
  "teamScore": 14,
  "productScore": 15,
  "marketScore": 18,
  "tractionScore": 10,
  "thesisFitScore": 6
}
```

---

### Stage 3: Memo Generation (`memoWriter.js`)

Responsibilities:

* Generate investment memos
* Calculate overall score
* Produce verdict

Verdicts:

* MEETING
* WATCH
* PASS

Output:

```md
# Diligent

Verdict: WATCH

Score: 63/100

...
```

---

## Investment Thesis

The system evaluates startups using a fixed investment thesis:

* Self-serve onboarding in under 15 minutes
* No IT team required
* No sales call required
* Product must autonomously perform work
* Low defensibility businesses are penalized

---

## Tech Stack

* Node.js
* Firecrawl Search API
* Firecrawl Scrape API
* Google Gemini
* Markdown Memo Generation

---

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create `.env`

```env
FIRECRAWL_KEY=your_key
FIRECRAWL_SEARCH_URL=https://api.firecrawl.dev/v2/search
FIRECRAWL_SCRAPE_URL=https://api.firecrawl.dev/v2/scrape
GEMINI_API_KEY=your_key
```

---

## Run

```bash
node src/index.js "AI agents for fintech"
```

---

## Example Output

```text
output/
├── diligent.md
├── rulebase.md
├── arva_ai.md
└── summary.md
```

---

## Tradeoffs

### Current

* Relies on public startup information
* No private revenue metrics
* No fundraising databases

### Future Improvements

* Crunchbase integration
* Founder background enrichment
* Market sizing analysis
* Multi-source validation
* Portfolio ranking dashboard

---

## Error Handling

Implemented:

* Missing topic validation
* Firecrawl API validation
* Gemini API retry handling
* Scrape failure handling

---

## AI Usage

AI was used for:

* Startup analysis
* Investment memo generation
* Structured scoring

Human judgment remains responsible for investment decisions.


Note:
The analysis layer is provider-agnostic. Gemini was used during development, but OpenAI or other LLM providers can be substituted with minimal code changes.
