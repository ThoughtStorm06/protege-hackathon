# Protege: The AI Student

Protege flips the usual AI-tutor relationship. Instead of an AI teaching the user, the user teaches Protege — an AI student powered by Gemini. By trying to explain a concept out loud to something that keeps asking "but why?", you find the gaps in your own understanding.

Built for **Kaggle's Intense Vibe Coding** hackathon (Competition Prize Track: Agents for Good).

## The Problem

Richard Feynman's advice was simple: if you can't explain something in plain language, you don't actually understand it. It's backed by real learning science — active recall and self-explanation are consistently among the most effective ways to retain information, far more effective than re-reading or highlighting.

The catch is that the Feynman Technique needs a listener — someone patient enough to sit through your explanation and ask "but why?" until you either fill the gap or find it. Most learners don't have that on demand, so they default to what's accessible: re-reading notes, flashcards, memorization. It works less well, but it's available.

## What We Built

Protege plays a curious, slightly confused student — asking follow-up questions, poking at hand-wavy explanations, pushing for examples — until the user has actually taught the concept properly. When the session ends, a multi-agent evaluation pipeline scores the explanation and produces a mastery report.

## How It Works

Protege isn't a single prompt wearing a persona — it's a multi-agent pipeline built on Google's Agent Development Kit (ADK):

- A **student agent** conducts the live conversation via Gemini, accepting text, voice, and image input (e.g. a diagram) from the user.
- On session end, a **ParallelAgent** runs two branches concurrently: a fact-extraction agent and a knowledge-graph-building agent (itself a **LoopAgent** that iteratively refines extracted concepts and relationships).
- A **SequentialAgent** then takes those outputs and produces the final scored report — coverage, clarity, and confidence — using structured Pydantic output schemas rather than parsing free-text model output.
- Retrieval is intentionally scoped to the current session. Cross-session retrieval was considered (to ground follow-up questions in a user's past sessions) but was ruled out — it risked crediting one topic's evaluation with facts from an unrelated one, and it broke the "Protege starts each session with no prior knowledge of this topic" framing the product depends on.
- A dedicated **agent-evaluation harness** (test datasets + metrics, separate from the product's own scoring) checks the pipeline's own output quality.

## Proof It Works

A real recorded session (Newton's Third Law, explained via a car-braking and wall-pushing example) shows the full pipeline firing correctly end to end: a coherent, in-character multi-turn conversation, a completed evaluation (coverage 85 / clarity 80 / confidence 90), and 17 extracted knowledge-graph concepts that map directly onto what was actually discussed.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Lucide Icons, React Flow
- **Backend:** FastAPI, SQLModel, SQLite
- **AI & Orchestration:** Google Agent Development Kit (ADK) — ParallelAgent / SequentialAgent / LoopAgent — with Gemini for multimodal input (text, audio, and images)

## Features

- **Multimodal Chat:** Protege understands text, voice recordings, and diagrams.
- **Knowledge Graph Extraction:** A LoopAgent iteratively builds a graph of the concepts and relationships you teach it.
- **Evaluation Pipeline:** Parallel and sequential agents score your explanation for coverage, clarity, and confidence.
- **Mastery Reports:** Receive a breakdown of your teaching performance and knowledge gaps when you end the session.

## Getting Started

To run Protege locally, you will need to run both the backend server and the frontend server simultaneously.

### 1. Backend Setup (FastAPI & Google ADK)

The backend requires a Gemini API Key and [uv](https://astral.sh/uv/), a fast Python package installer and resolver.

Installing uv (if you don't have it):

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# via pip
pip install uv
```

```bash
# Navigate to the backend directory
cd backend

# Create your environment variables file
cp .env.example .env

# Edit .env and add your Gemini API Key:
# GEMINI_API_KEY=your_api_key_here

# Install backend dependencies
uv sync

# Run the FastAPI server
uv run uvicorn app.main:app --reload --port 8000
```

The backend server will now be running on `http://127.0.0.1:8000`.

### 2. Frontend Setup (Next.js)

Open a new terminal window/tab to start the frontend.

```bash
# Navigate to the project root
cd protege-hackathon

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will now be running on `http://localhost:3000`.

## Honest Limitations & Next Steps

In the interest of not overselling a hackathon build:

- The knowledge graph is extracted and stored on the backend, but **isn't yet rendered as a visual graph in the frontend** — it currently surfaces only as extracted-concept highlights in the report.
- The knowledge-graph loop agent currently produces some duplicate/near-duplicate nodes across iterations; deduplication is on the roadmap.
- Vector search for fact retrieval is a straightforward in-memory cosine-similarity implementation — fine at hackathon scale, not yet built for production scale.

## Where This Sits in the Landscape

Explain-to-an-AI study tools already exist (Feynman AI, StudyTok AI, and others), and Stanford's SCALE Initiative has published research on a similar "Feynman Bot" concept. Protege doesn't claim to be first to the idea. What's different is the architecture: rather than one model call scoring a paragraph, Protege runs a multi-agent Gemini pipeline — parallel extraction, iterative graph-building, sequential scoring, and its own evaluation harness.

## Contributors

- [@ThoughtStorm06](https://github.com/ThoughtStorm06) — Jeevan
- [@sreevyarao](https://github.com/sreevyarao) — S. Sreevya Rao
- Trozan24 — Creator

## Languages

TypeScript · JavaScript · CSS