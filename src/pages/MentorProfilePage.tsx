import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { mentors } from "@/lib/whentor-data";
import { detectEmotion, EMOTION_META } from "@/lib/emotions";
import { getPersonality } from "@/lib/personalities";
import { getMentorHistory } from "@/lib/memory";
import { useMemory } from "@/hooks/useMemory";
import { ArrowLeft, Send, Mic, Star, Share2, Bookmark } from "lucide-react";

type Message = {
  role: "user" | "mentor";
  text: string;
  emotion?: ReturnType<typeof detectEmotion>;
  timestamp: number;
};

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i} className="block leading-relaxed">
        {parts.map((p, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{p}</strong> : p,
        )}
      </span>
    );
  });
}

export function MentorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const mentor = mentors.find((m) => m.id === id);
  const { memory, recordEmotion, recordConversation, recordMilestone } = useMemory();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [saved, setSaved] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const personality = id ? getPersonality(id) : null;
  const pastHistory = id ? getMentorHistory(memory, id, 3) : [];
  const hasHistory = pastHistory.length > 0;
  const daysSinceLast = hasHistory
    ? Math.floor((Date.now() - pastHistory[pastHistory.length - 1].timestamp) / 86_400_000)
    : 0;

  // Auto-open with greeting
  useEffect(() => {
    if (!personality || !mentor) return;
    const greeting = hasHistory
      ? personality.returningMessage(
          memory.name,
          pastHistory[pastHistory.length - 1].userMessage.slice(0, 40),
          daysSinceLast,
        )
      : personality.greeting(memory.name, false, memory.currentStreak);

    setMessages([{ role: "mentor", text: greeting, timestamp: Date.now() }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!mentor || !personality) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-[oklch(0.7_0_0)]">Mentor not found.</p>
          <Link to="/mentors" className="mt-4 text-sm neon-text">← Back to mentors</Link>
        </div>
      </AppShell>
    );
  }

  const Icon = mentor.icon;
  const sessionCount = memory.mentorUsage[mentor.id] ?? 0;

  function sendMessage(text?: string) {
    if (!mentor || !personality) return;
    const userMsg = (text ?? input).trim();
    if (!userMsg) return;
    setInput("");

    const emotion = detectEmotion(userMsg);
    const userEntry: Message = { role: "user", text: userMsg, emotion, timestamp: Date.now() };
    setMessages((prev) => [...prev, userEntry]);
    setIsTyping(true);

    const memCtx = pastHistory.map((h) => `User said: "${h.userMessage}"`);
    const _mentor = mentor;
    const _personality = personality;

    setTimeout(() => {
      setIsTyping(false);

      const emotionalPre = emotion.intensity >= 2
        ? _personality.emotionalResponses[emotion.emotion] ?? ""
        : "";

      const mainResponse = _personality.respond(userMsg, emotion, memCtx);
      const fullReply = emotionalPre ? `${emotionalPre}\n\n${mainResponse}` : mainResponse;

      setMessages((prev) => [...prev, { role: "mentor", text: fullReply, timestamp: Date.now() }]);

      recordEmotion(emotion.emotion, emotion.intensity, userMsg.slice(0, 60), _mentor.id);
      recordConversation(_mentor.id, userMsg, fullReply, emotion.emotion);

      const milestoneWords = ["breakthrough", "realized", "changed", "finally", "i see now", "thank you", "helped me", "makes sense now"];
      if (milestoneWords.some((w) => userMsg.toLowerCase().includes(w))) {
        recordMilestone(_mentor.id, "personal_growth", userMsg, `Insight with ${_mentor.inspiredBy}`);
      }
    }, 800 + Math.random() * 600);
  }

  // Quick prompts based on mentor category
  const quickPrompts: Record<string, string[]> = {
    Spirituality: ["I'm feeling lost", "Help me pray", "I need peace", "What's my purpose?"],
    "Mental Health": ["I'm anxious", "I've been sad lately", "Help me with my thoughts", "I can't sleep"],
    Relationships: ["My relationship is struggling", "I feel lonely", "How do I communicate better?", "I just went through a breakup"],
    "Mindset & Wisdom": ["I feel stuck", "I want to grow", "Help me with discipline", "How do I find meaning?"],
    "Leadership & Power": ["I need to lead better", "How do I negotiate?", "I want more confidence", "How do I influence people?"],
    "Business & Career": ["I have a business idea", "I'm stuck in my career", "How do I think like you?", "What's your best advice?"],
    "Fitness & Body": ["Build me a program", "I want to lose fat", "I'm a beginner", "How do I build muscle?"],
  };
  const prompts = quickPrompts[mentor.category] ?? ["Tell me about yourself", "What's your philosophy?", "How can you help me?", "What should I know first?"];

  return (
    <AppShell>
      <div className="pt-2">
        <Link to="/mentors" className="inline-flex items-center gap-2 text-sm text-[oklch(0.7_0_0)] hover:text-white transition mb-6">
          <ArrowLeft className="h-4 w-4" /> All mentors
        </Link>

        {/* ── Profile header ── */}
        <div className="flex items-start gap-5 mb-5">
          <div
            className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl ring-2 ring-[oklch(0.92_0.27_132/0.4)]"
            style={{ boxShadow: "0 0 40px oklch(0.92 0.27 132 / 0.2)" }}
          >
            {mentor.avatar ? (
              <img src={mentor.avatar} alt={mentor.inspiredBy} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.08)" }}>
                <Icon className="h-10 w-10 text-[var(--neon)]" strokeWidth={1.4} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-[var(--neon)]">{mentor.category}</p>
            <h1 className="font-display text-2xl sm:text-3xl leading-tight">{mentor.inspiredBy}</h1>
            <p className="mt-0.5 text-sm text-[oklch(0.6_0_0)]">{mentor.name} · {mentor.role}</p>
            <p className="mt-2 text-sm text-[oklch(0.75_0_0)] leading-relaxed max-w-md">{mentor.description}</p>

            {/* Memory badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {sessionCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.07)] px-3 py-1 text-[11px] text-[var(--neon)]">
                  <Star className="h-3 w-3" strokeWidth={1.8} />
                  {sessionCount} session{sessionCount > 1 ? "s" : ""} together
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-3 py-1 text-[11px] text-[oklch(0.6_0_0)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" />
                Voice coming soon
              </span>
            </div>
          </div>
        </div>

        {/* ── Today's mood context ── */}
        {memory.todayMood && memory.todayMood !== "neutral" && (
          <div
            className="mb-4 flex items-center gap-3 rounded-2xl border border-[oklch(1_0_0/0.06)] bg-[oklch(1_0_0/0.02)] px-4 py-3 text-sm"
          >
            <span className="text-lg">{EMOTION_META[memory.todayMood].emoji}</span>
            <p className="text-[oklch(0.65_0_0)]">
              You said you're feeling <span className="text-white">{EMOTION_META[memory.todayMood].label}</span> today.{" "}
              <span className="text-[oklch(0.5_0_0)]">{mentor.inspiredBy} will keep that in mind.</span>
            </p>
          </div>
        )}

        {/* ── Quick prompts ── */}
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide mb-3">
          {prompts.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>

        {/* ── Chat ── */}
        <div className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] overflow-hidden">
          <div className="min-h-[380px] max-h-[520px] overflow-y-auto p-5 space-y-5">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "mentor" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full mt-1 ring-1 ring-[oklch(0.92_0.27_132/0.3)]">
                    {mentor.avatar ? (
                      <img src={mentor.avatar} alt={mentor.inspiredBy} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.1)" }}>
                        <Icon className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-1 max-w-[82%]">
                  {/* Emotion tag on user messages */}
                  {msg.role === "user" && msg.emotion && msg.emotion.emotion !== "neutral" && (
                    <div className="flex justify-end">
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]"
                        style={{
                          background: `${EMOTION_META[msg.emotion.emotion].color}18`,
                          color: EMOTION_META[msg.emotion.emotion].color,
                          border: `1px solid ${EMOTION_META[msg.emotion.emotion].color}30`,
                        }}
                      >
                        {EMOTION_META[msg.emotion.emotion].emoji} {EMOTION_META[msg.emotion.emotion].label}
                      </span>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-[var(--neon)] text-black font-medium"
                        : "bg-[oklch(1_0_0/0.05)] text-[oklch(0.85_0_0)] border border-[oklch(1_0_0/0.08)]"
                    }`}
                  >
                    {msg.role === "mentor" ? renderText(msg.text) : msg.text}
                  </div>

                  {/* Share / save on mentor messages */}
                  {msg.role === "mentor" && i > 0 && (
                    <div className="flex gap-2 pl-1">
                      <button
                        onClick={() => setSaved(true)}
                        className={`flex items-center gap-1 text-[10px] transition ${saved ? "text-[var(--neon)]" : "text-[oklch(0.45_0_0)] hover:text-[oklch(0.7_0_0)]"}`}
                      >
                        <Bookmark className="h-3 w-3" /> {saved ? "Saved" : "Save"}
                      </button>
                      <button className="flex items-center gap-1 text-[10px] text-[oklch(0.45_0_0)] hover:text-[oklch(0.7_0_0)] transition">
                        <Share2 className="h-3 w-3" /> Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-[oklch(0.92_0.27_132/0.3)]">
                  {mentor.avatar ? (
                    <img src={mentor.avatar} alt={mentor.inspiredBy} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center" style={{ background: "oklch(0.92 0.27 132 / 0.1)" }}>
                      <Icon className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.05)] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-[var(--neon)] opacity-60"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-[oklch(1_0_0/0.08)] p-4 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={`Talk to ${mentor.inspiredBy}…`}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[oklch(0.4_0_0)] outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-black transition hover:opacity-90 disabled:opacity-30"
              style={{ background: "var(--neon)" }}
            >
              <Send className="h-4 w-4" />
            </button>
            <button
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[oklch(1_0_0/0.08)] text-[oklch(0.7_0_0)] transition hover:text-white"
              title="Voice — coming soon"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[10px] text-[oklch(0.35_0_0)]">
          {mentor.inspiredBy} · AI-powered · Emotional recognition active · Your conversations are private
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </AppShell>
  );
}
