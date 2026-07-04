export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export type DirectiveType = "hint" | "correction" | "challenge" | "praise";

export interface Directive {
  id: string;
  type: DirectiveType;
  content: string;
  timestamp: string;
}

export interface LearningMetric {
  label: "Coverage" | "Clarity" | "Confidence";
  score: number;
  fullMark: number;
}

export interface PastSession {
  id: string;
  topic: string;
  date: string;
  score: number;
  avatar: string;
  accent: string;
}

export interface SessionStats {
  topic: string;
  duration: string;
  messagesExchanged: number;
  conceptsCovered: number;
  coverageScore: number;
  clarityScore: number;
  confidenceScore: number;
}
