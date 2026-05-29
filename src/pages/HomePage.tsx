import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { mentorCategories, mentors, type MentorCategory } from "@/lib/whentor-data";
import { MOOD_OPTIONS, EMOTION_META } from "@/lib/emotions";
import { useMemory } from "@/hooks/useMemory";
import { Search, ArrowRight, Sparkles, Brain, Heart, Activity, Briefcase, Crown, X } from "lucide-react";

const essentialIds = ["christ", "psychologist", "therapist", "visionary", "fitwell", "finance"];
const voiceIds = ["huberman", "jocko", "goggins", "peterson", "naval", "clear", "ferriss", "brene", "dispenza", "sinek"];

type Pill = { id: MentorCategory; label: string; icon: typeof Sparkles; prompts: string[] };
const pills: Pill[] = [
  { id: "Spirituality",      label: "Spiritual", icon: Sparkles,  prompts: ["Connect with God", "Daily prayer", "Find inner peace", "Surrender control"] },
  { id: "Mental Health",     label: "Mind",      icon: Brain,     prompts: ["Calm my anxiety", "Quiet my thoughts", "Heal old wounds", "Sleep better"] },
  { id: "Relationships",     label: "Heart",     icon: Heart,     prompts: ["Reconnect with my partner", "Communicate honestly", "Heal after a breakup", "Set boundaries"] },
  { id: "Fitness & Body",    label: "Body",      icon: Activity,  prompts: ["Build a routine", "Lose weight calmly", "Eat to thrive", "Move every day"] },
  { id: "Business & Career", label: "Work",      icon: Briefcase, prompts: ["Find clarity", "Ask for a raise", "Build my idea", "Lead my team"] },
  { id: "Leadership & Power",label: "Lead",      icon: Crown,     prompts: ["Speak with authority", "Make hard decisions", "Negotiate better", "Inspire others"] },
];

// Mentor recommendations based on mood
const MOOD_TO_MENTORS: Record<string, string[]> = {
  anxious:    ["therapist", "christ", "huberman", "psychologist"],
  sad:        ["christ", "therapist", "psychologist", "brene"],
  frustrated: ["goggins", "stoic-emperor", "peterson", "jocko"],
  lost:       ["christ", "peterson", "stoic-emperor", "philosopher"],
  motivated:  ["goggins", "visionary", "jocko", "huberman"],
  happy:      ["clear", "sinek", "naval", "ferriss"],
  confused:   ["psychologist", "peterson", "philosopher", "therapist"],
  grateful:   ["christ", "spiritual", "brene", "clear"],
  neutral:    essentialIds,
};

// Mood-based prompts
const MOOD_PROMPTS: Record<string, string[]> = {
  anxious:    ["Help me calm down", "I'm overwhelmed", "What's actually in my control?"],
  sad:        ["I'm feeling low", "Help me find hope", "I need someone to talk to"],
  frustrated: ["I'm stuck and angry", "Nothing is working", "I need to break through"],
  lost:       ["What's my purpose?", "I don't know who I am", "Help me find direction"],
  motivated:  ["I want to build something", "Let's level up", "What's my next move?"],
  happy:      ["Keep this momentum", "How do I stay consistent?", "What should I focus on?"],
  confused:   ["Help me get clarity", "I have a hard decision", "What should I think about this?"],
  grateful:   ["I want to grow from this", "How do I give back?", "What's next?"],
  neutral:    ["What's on your mind?", "Connect with God", "Build a workout plan", "I have a business idea"],
};

export function HomePage() {
  const { memory, setMood } = useMemory();
  const essentials = essentialIds.map((id) => mentors.find((m) => m.id === id)!).filter(Boolean);
  const voices = voiceIds.map((id) => mentors.find((m) => m.id === id)!).filter(Boolean);

  const [active, setActive] = useState<MentorCategory>("Spirituality");
  const [showMoodPicker, setShowMoodPicker] = useState(!memory.todayMood);
  const current = pills.find((p) => p.id === active)!;

  const today = new Date().toISOString().slice(0, 10);
  const moodIsToday = memory.todayMoodTimestamp
    ? new Date(memory.todayMoodTimestamp).toISOString().slice(0, 10) === today
    : false;
  const activeMood = moodIsToday ? memory.todayMood : null;
  const moodMeta = activeMood ? EMOTION_META[activeMood] : null;

  // Recommendations based on mood
  const recommendedIds = activeMood ? MOOD_TO_MENTORS[activeMood] ?? essentialIds : essentialIds;
  const recommended = recommendedIds.map((id) => mentors.find((m) => m.id === id)!).filter(Boolean);
  const moodPrompts = activeMood ? MOOD_PROMPTS[activeMood] ?? MOOD_PROMPTS.neutral : MOOD_PROMPTS.neutral;

  // Personalized greeting based on streak and time
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const returningUser = memory.totalSessions > 1;

  return (
    <AppShell>
      {/* ── Hero ── */}
      <section className="relative pt-8 sm:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--neon), transparent 70%)" }}
        />

        <p className="text-sm text-[oklch(0.6_0_0)]">
          {returningUser
            ? `Day ${memory.currentStreak} streak · ${memory.totalSessions} sessions`
            : "Welcome to Whentor AI"}
        </p>
        <h1 className="mt-1 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          {timeGreeting}, <span className="neon-text">{memory.name.split(" ")[0]}.</span>
        </h1>
        <p className="mt-2 max-w-md text-sm text-[oklch(0.6_0_0)] sm:text-base">
          {activeMood && moodMeta
            ? `You're feeling ${moodMeta.label.toLowerCase()} today. Your mentors know.`
            : "What's on your mind today? Your mentors are here."}
        </p>

        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 flex h-14 max-w-xl items-center gap-3 rounded-full border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.04)] px-5 backdrop-blur-xl transition focus-within:border-[oklch(0.92_0.27_132/0.6)]"
        >
          <Search className="h-5 w-5 text-[oklch(0.5_0_0)]" />
          <input
            placeholder="Ask anything…"
            className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-[oklch(0.4_0_0)] text-white"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-full text-black"
            style={{ background: "var(--neon)" }}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Category pills */}
        <div className="mt-5 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {pills.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
                  isActive
                    ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.65_0_0)] hover:border-[oklch(0.92_0.27_132/0.3)] hover:text-white"
                }`}
                style={isActive ? { boxShadow: "0 0 0 1px oklch(0.92 0.27 132 / 0.35), 0 8px 30px -10px oklch(0.92 0.27 132 / 0.4)" } : undefined}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[var(--neon)]" : ""}`} strokeWidth={1.8} />
                <span className="font-medium">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick prompts */}
        <div className="mt-3 -mx-5 flex flex-wrap gap-2 px-5 sm:flex-nowrap sm:overflow-x-auto scrollbar-hide">
          {current.prompts.map((q) => (
            <button
              key={q}
              className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] px-4 py-2 text-xs text-[oklch(0.65_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white sm:text-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* ── Daily Mood Check-in ── */}
      {showMoodPicker && !activeMood && (
        <section className="mt-8 rounded-3xl border border-[oklch(0.92_0.27_132/0.2)] bg-[oklch(0.92_0.27_132/0.04)] p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-white">How are you feeling today?</p>
              <p className="mt-0.5 text-xs text-[oklch(0.55_0_0)]">
                Your mentors adapt their approach based on where you are emotionally.
              </p>
            </div>
            <button onClick={() => setShowMoodPicker(false)} className="text-[oklch(0.5_0_0)] hover:text-white transition">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {MOOD_OPTIONS.map((opt) => (
              <button
                key={opt.emotion}
                onClick={() => { setMood(opt.emotion); setShowMoodPicker(false); }}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] py-3 text-center transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
              >
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-[11px] text-[oklch(0.7_0_0)]">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Mood-based recommendations ── */}
      {activeMood && moodMeta && activeMood !== "neutral" && (
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{moodMeta.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Because you're feeling <span style={{ color: moodMeta.color }}>{moodMeta.label}</span>
                </p>
                <p className="text-[11px] text-[oklch(0.55_0_0)]">These mentors can help right now</p>
              </div>
            </div>
            <button
              onClick={() => setShowMoodPicker(true)}
              className="text-[11px] text-[oklch(0.5_0_0)] hover:text-[var(--neon)] transition"
            >
              Change mood
            </button>
          </div>

          {/* Mood prompts */}
          <div className="-mx-5 mb-3 flex gap-2 overflow-x-auto px-5 scrollbar-hide">
            {moodPrompts.map((q) => (
              <Link
                key={q}
                to={`/mentor/${recommended[0]?.id ?? "therapist"}`}
                className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white whitespace-nowrap"
              >
                {q}
              </Link>
            ))}
          </div>

          {/* Recommended mentor cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recommended.slice(0, 4).map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.id}
                  to={`/mentor/${m.id}`}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)]"
                >
                  <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl ring-1 ring-[oklch(1_0_0/0.08)]">
                    {m.avatar ? (
                      <img src={m.avatar} alt={m.inspiredBy} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                    )}
                  </div>
                  <p className="text-xs font-medium text-white leading-tight">{m.inspiredBy}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Your essentials ── */}
      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Your essentials</h2>
          <Link to="/mentors" className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.55_0_0)] transition hover:text-white">
            All mentors
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {essentials.map((m) => {
            const Icon = m.icon;
            const sessionCount = memory.mentorUsage[m.id] ?? 0;
            return (
              <Link
                key={m.id}
                to={`/mentor/${m.id}`}
                className="group relative flex items-center gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-3 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-[oklch(1_0_0/0.05)] ring-1 ring-[oklch(1_0_0/0.08)]">
                  {m.avatar ? (
                    <img src={m.avatar} alt={m.inspiredBy} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{m.inspiredBy}</p>
                  <p className="truncate text-[11px] text-[oklch(0.55_0_0)]">{m.name}</p>
                  {sessionCount > 0 && (
                    <p className="text-[10px] text-[var(--neon)] mt-0.5">{sessionCount} session{sessionCount > 1 ? "s" : ""}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Today's biggest voices ── */}
      <section className="mt-12">
        <div className="mb-4">
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Today's biggest voices</h2>
          <p className="mt-1 text-xs text-[oklch(0.55_0_0)]">The mentors shaping how we grow right now.</p>
        </div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {voices.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.id}
                to={`/mentor/${m.id}`}
                className="group flex w-[160px] shrink-0 flex-col gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
              >
                <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl ring-1 ring-[oklch(1_0_0/0.08)]">
                  {m.avatar ? (
                    <img src={m.avatar} alt={m.inspiredBy} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{m.inspiredBy}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[oklch(0.55_0_0)]">{m.role}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Explore by life area ── */}
      <section className="mt-10 mb-8">
        <div className="mb-4">
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Explore by life area</h2>
          <p className="mt-1 text-xs text-[oklch(0.55_0_0)]">Pick a topic. We'll guide you.</p>
        </div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {mentorCategories.slice(0, 10).map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                to="/mentors"
                className="group flex w-[130px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)]"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-[oklch(1_0_0/0.08)] transition group-hover:ring-[oklch(0.92_0.27_132/0.4)]"
                  style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}
                >
                  <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight text-white">{c.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-[oklch(0.5_0_0)]">{c.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
