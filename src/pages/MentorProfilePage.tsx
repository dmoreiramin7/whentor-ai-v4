import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { mentors } from "@/lib/whentor-data";
import { ArrowLeft, Send, Mic } from "lucide-react";

export function MentorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const mentor = mentors.find((m) => m.id === id);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "mentor"; text: string }[]>([]);

  if (!mentor) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-[oklch(0.7_0_0)]">Mentor not found.</p>
          <Link to="/mentors" className="mt-4 text-sm text-[var(--neon)]">← Back to mentors</Link>
        </div>
      </AppShell>
    );
  }

  const Icon = mentor.icon;

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "mentor", text: `As ${mentor!.inspiredBy}, I'd say: "${userMsg}" — this is a great question. Let's explore it together. [Voice coming soon]` },
    ]);
  }

  return (
    <AppShell>
      <div className="pt-2">
        <Link to="/mentors" className="inline-flex items-center gap-2 text-sm text-[oklch(0.7_0_0)] hover:text-white transition mb-6">
          <ArrowLeft className="h-4 w-4" /> All mentors
        </Link>

        {/* Profile header */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6 mb-8">
          <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-3xl ring-2 ring-[oklch(0.92_0.27_132/0.4)]" style={{ boxShadow: "0 0 40px oklch(0.92 0.27 132 / 0.2)" }}>
            {mentor.avatar ? (
              <img src={mentor.avatar} alt={mentor.inspiredBy} className="h-full w-full object-cover" />
            ) : (
              <Icon className="h-12 w-12 text-[var(--neon)]" strokeWidth={1.4} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-widest text-[var(--neon)]">{mentor.category}</p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">{mentor.inspiredBy}</h1>
            <p className="mt-1 text-[oklch(0.7_0_0)]">{mentor.name} · {mentor.role}</p>
            <p className="mt-3 max-w-md text-sm text-[oklch(0.75_0_0)]">{mentor.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.08)] px-3 py-1 text-xs text-[var(--neon)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] animate-pulse" />
                Voice coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] overflow-hidden">
          <div className="min-h-[300px] max-h-[420px] overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[260px] text-center gap-3">
                <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl ring-1 ring-[oklch(1_0_0/0.08)]">
                  {mentor.avatar ? (
                    <img src={mentor.avatar} alt={mentor.inspiredBy} className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-6 w-6 text-[var(--neon)]" strokeWidth={1.6} />
                  )}
                </div>
                <p className="text-sm text-[oklch(0.7_0_0)]">Start a conversation with <span className="text-white">{mentor.inspiredBy}</span></p>
                <p className="text-xs text-[oklch(0.5_0_0)]">Ask anything about {mentor.accentTopic.toLowerCase()}, life, purpose, or growth.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-[var(--neon)] text-black"
                      : "bg-[oklch(1_0_0/0.06)] text-white border border-[oklch(1_0_0/0.08)]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-[oklch(1_0_0/0.08)] p-4 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Ask ${mentor.inspiredBy} anything…`}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[oklch(0.5_0_0)] outline-none"
            />
            <button
              onClick={sendMessage}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-black transition hover:opacity-90"
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
      </div>
    </AppShell>
  );
}
