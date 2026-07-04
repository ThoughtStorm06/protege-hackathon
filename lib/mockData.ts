import { Message, Directive, LearningMetric, PastSession, SessionStats } from "./types";

export const suggestedTopics = [
  "Neural Networks",
  "Supply & Demand",
  "TCP/IP Protocol",
  "French Revolution",
  "CRISPR Gene Editing",
  "Game Theory",
];

export const initialMessages: Message[] = [
  {
    id: "m1",
    role: "ai",
    content:
      "Hi! I'm your Protege. I know nothing about this topic yet. Explain it to me like I'm a curious beginner - start wherever you like!",
    timestamp: "10:00 AM",
  },
];

export const aiFollowUps = [
  "Wait, why does that happen? Can you break it down further?",
  "Interesting! How is this different from what you said earlier?",
  "Can you give me a real-world example of that?",
  "I think I get it, but what happens if we change one variable?",
  "Hmm, I'm a bit confused - could you rephrase that more simply?",
  "That makes sense! What's the most common mistake beginners make here?",
  "So if I understood correctly, it means... is that right?",
  "What would happen in an edge case, like extreme values?",
];

export const directiveTemplates: { type: Directive["type"]; content: string }[] = [
  { type: "hint", content: "Try using an analogy to simplify this concept." },
  { type: "correction", content: "Minor inaccuracy detected - double-check the last statement." },
  { type: "challenge", content: "Push deeper: ask the Protege to apply this to a new scenario." },
  { type: "praise", content: "Great clarity! The Protege's understanding improved." },
  { type: "hint", content: "Consider breaking this into smaller sub-concepts." },
  { type: "challenge", content: "Test retention - ask the Protege to summarize in their own words." },
];

export const mockDirectives: Directive[] = [
  {
    id: "d1",
    type: "hint",
    content: "Start with a simple analogy before diving into details.",
    timestamp: "10:00 AM",
  },
];

export const pastSessions: PastSession[] = [
  {
    id: "neural-networks",
    topic: "Neural Networks",
    date: "2 Jul 2026",
    score: 84,
    avatar: "NN",
    accent: "from-violet-500 to-cyan-400",
  },
  {
    id: "gradient-descent",
    topic: "Gradient Descent",
    date: "30 Jun 2026",
    score: 78,
    avatar: "GD",
    accent: "from-emerald-400 to-sky-500",
  },
  {
    id: "linear-regression",
    topic: "Linear Regression",
    date: "28 Jun 2026",
    score: 81,
    avatar: "LR",
    accent: "from-amber-300 to-rose-500",
  },
  {
    id: "system-design",
    topic: "System Design Basics",
    date: "26 Jun 2026",
    score: 73,
    avatar: "SD",
    accent: "from-slate-300 to-blue-500",
  },
];

export const learningMetrics: LearningMetric[] = [
  { label: "Coverage", score: 84, fullMark: 100 },
  { label: "Clarity", score: 78, fullMark: 100 },
  { label: "Confidence", score: 72, fullMark: 100 },
];

export const sessionStats: SessionStats = {
  topic: "Neural Networks",
  duration: "18m 42s",
  messagesExchanged: 24,
  conceptsCovered: 7,
  coverageScore: 84,
  clarityScore: 78,
  confidenceScore: 72,
};
