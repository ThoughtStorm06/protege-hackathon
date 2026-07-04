"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FlagTriangleRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ChatWindow from "@/components/session/ChatWindow";
import DirectiveLog from "@/components/session/DirectiveLog";
import PastSessionsPanel from "@/components/session/PastSessionsPanel";
import ProgressPanel from "@/components/session/ProgressPanel";
import {
  aiFollowUps,
  directiveTemplates,
  initialMessages,
  mockDirectives,
  pastSessions,
} from "@/lib/mockData";
import { Directive, Message, PastSession } from "@/lib/types";

export default function SessionPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("Your Topic");
  const [selectedSessionId, setSelectedSessionId] = useState(pastSessions[0].id);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [directives, setDirectives] = useState<Directive[]>(mockDirectives);
  const [isTyping, setIsTyping] = useState(false);
  const [coverage, setCoverage] = useState(58);
  const [clarity, setClarity] = useState(64);
  const [confidence, setConfidence] = useState(51);
  const [concepts, setConcepts] = useState(2);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("protege_topic");
    if (saved) setTopic(saved);

    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const elapsed = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  const pushDirectiveMaybe = useCallback(() => {
    if (Math.random() > 0.55) {
      const template = directiveTemplates[Math.floor(Math.random() * directiveTemplates.length)];
      setDirectives((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: template.type,
          content: template.content,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, []);

  const handlePastSessionSelect = (session: PastSession) => {
    setSelectedSessionId(session.id);
    setTopic(session.topic);
    setCoverage(session.score);
    setClarity(Math.max(62, session.score - 6));
    setConfidence(Math.max(58, session.score - 12));
  };

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setConcepts((c) => c + 1);
    setCoverage((value) => Math.min(100, value + Math.floor(Math.random() * 5) + 2));
    setClarity((value) => Math.min(100, value + Math.floor(Math.random() * 4) + 1));
    setConfidence((value) => Math.min(100, value + Math.floor(Math.random() * 5) + 1));

    setTimeout(() => {
      const reply = aiFollowUps[Math.floor(Math.random() * aiFollowUps.length)];
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      pushDirectiveMaybe();
    }, 1100 + Math.random() * 700);
  };

  return (
    <main className="min-h-screen bg-base-900">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-accent-400">Teaching Session</p>
            <h1 className="text-2xl font-bold text-white">{topic}</h1>
            <p className="mt-1 text-sm text-gray-500">Explain, upload diagrams, or teach by voice.</p>
          </div>
          <button
            onClick={() => router.push("/report")}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
          >
            End Session <FlagTriangleRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <div className="h-auto xl:h-[72vh]">
            <PastSessionsPanel
              sessions={pastSessions}
              selectedId={selectedSessionId}
              onSelect={handlePastSessionSelect}
            />
          </div>
          <div className="h-[72vh]">
            <ChatWindow messages={messages} isTyping={isTyping} onSend={handleSend} />
          </div>
          <div className="flex h-auto flex-col gap-5 xl:h-[72vh]">
            <ProgressPanel
              coverage={coverage}
              clarity={clarity}
              confidence={confidence}
              concepts={concepts}
              messagesCount={messages.length}
              elapsed={elapsed}
            />
            <div className="min-h-[220px] max-h-[260px] overflow-hidden">
              <DirectiveLog directives={directives} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
