from google.adk.agents import Agent, ParallelAgent, SequentialAgent, LoopAgent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types
from app.schemas import EvaluatorOutput, DraftOutput, MetricsOutput

# Model configuration
model_config = Gemini(
    model="gemini-3.5-lite",
    retry_options=types.HttpRetryOptions(attempts=3)
)

# 1. Student Agent (Real-time chat)
student_agent = Agent(
    name="student_agent",
    model=model_config,
    instruction=(
        "You are Protege, a curious AI beginner learning from the user. "
        "The user is trying to teach you a concept. "
        "Strictly adhere to these rules:\n"
        "1. Never act like an expert. You are a student.\n"
        "2. Ask clarifying questions if the user's explanation is confusing, incomplete, or ambiguous.\n"
        "3. Show when you are confused and try to piece things together.\n"
        "4. Keep your responses concise (1-2 short paragraphs max) and conversational.\n"
        "5. If the user greets you or says something off-topic, politely pivot back to asking what they want to teach you."
    ),
)

# 2. Evaluator Agent (Extracts facts for RAG)
evaluator_agent = Agent(
    name="evaluator_agent",
    model=model_config,
    instruction=(
        "You are a strict, objective evaluator agent. Review the provided session transcript "
        "and extract a list of core verifiable factual statements that were discussed.\n"
        "CRITICAL RULES:\n"
        "1. ONLY extract facts explicitly stated by the user. Do NOT hallucinate or infer external knowledge.\n"
        "2. If the transcript is empty, off-topic, or contains no factual claims, return an EMPTY list.\n"
        "3. Each fact must be a standalone, self-contained sentence."
    ),
    output_schema=EvaluatorOutput,
    output_key="extracted_facts",
)

# 3. Draft Agent (Builds Knowledge Graph)
draft_agent = LoopAgent(
    name="draft_agent_loop",
    max_iterations=2,
    sub_agents=[
        Agent(
            name="kg_extractor",
            model=model_config,
            instruction=(
                "You are a meticulous knowledge graph builder. Review the session transcript and "
                "extract the key concepts (nodes) and their relationships (edges).\n"
                "CRITICAL RULES:\n"
                "1. ONLY extract concepts and relationships explicitly discussed in the transcript.\n"
                "2. Do NOT invent nodes. If the transcript lacks substantive concepts, return empty lists.\n"
                "3. Ensure every `source_concept` and `target_concept` in an edge EXACTLY matches a node's `concept_name`."
            ),
            output_schema=DraftOutput,
            output_key="knowledge_graph",
        )
    ]
)

# 4. Parallel Extractor (Runs Evaluator and Draft concurrently)
parallel_extractor = ParallelAgent(
    name="parallel_extractor",
    sub_agents=[evaluator_agent, draft_agent],
)

# 5. Final Agent (Reviews output and calculates metrics)
final_agent = Agent(
    name="final_agent",
    model=model_config,
    instruction=(
        "You are the final review agent. Based on the extracted facts: {extracted_facts} "
        "and the knowledge graph: {knowledge_graph}, evaluate the user's teaching performance.\n"
        "Calculate scores (0-100) based on this strict rubric:\n"
        "- Coverage (0-100): 0 if no facts. 100 if a broad, comprehensive overview of the implied topic was provided.\n"
        "- Clarity (0-100): 0 if explanations were contradictory or confusing. 100 if concepts were explained simply and logically.\n"
        "- Confidence (0-100): 0 if the user hesitated, guessed, or provided fragmented thoughts. 100 for assertive, clear statements.\n"
        "If {extracted_facts} is empty, all scores MUST be 0."
    ),
    output_schema=MetricsOutput,
    output_key="final_metrics",
)

# 6. Post-Session Pipeline
post_session_pipeline = SequentialAgent(
    name="post_session_pipeline",
    sub_agents=[parallel_extractor, final_agent],
)

# Register the main app with the student agent as the root for standard chat routing,
# though we will manually invoke the pipeline agent for evaluations.
app = App(
    root_agent=student_agent,
    name="app",
)
