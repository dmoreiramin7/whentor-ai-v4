import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { mentorCategories, mentors, type MentorCategory } from "@/lib/whentor-data";
import { Search, ArrowRight, Sparkles, Brain, Heart, Activity, Briefcase, Crown } from "lucide-react";

const essentialIds = ["christ", "psychologist", "therapist", "visionary", "fitwell", "finance"];

type Pill = { id: MentorCategory; label: string; icon: typeof Sparkles; prompts: string[] };
const pills: Pill[] = [
  { id: "Spirituality", label: "Spiritual", icon: Sparkles, prompts: ["Connect with God", "Daily prayer", "Find inner peace", "Surrender control"] },
  { id: "Mental Health", label: "Mind", icon: Brain, prompts: ["Calm my anxiety", "Quiet my thoughts", "Heal old wounds", "Sleep better"] },
  { id: "Relationships", label: "Heart", icon: Heart, prompts: ["Reconnect with my partner", "Communicate honestly", "Heal after a breakup", "Set boundaries"] },
  { id: "Fitness & Body", label: "Body", icon: Activity, prompts: ["Build a routine", "Lose weight calmly", "Eat to thrive", "Move every day"] },
  { id: "Business & Career", label: "Work", icon: Briefcase, prompts: ["Find clarity", "Ask for a raise", "Build my idea", "Lead my team"] },
  { id: "Leadership & Power", label: "Lead", icon: Crown, prompts: ["Speak with authority", "Make hard decisions", "Negotiate better", "Inspire others"] },
];

const voiceIds = ["huberman", "jocko", "goggins", "peterson", "naval", "clear", "ferriss", "brene", "dispenza", "sinek"];

export function HomePage() {
  const essentials = essentialIds.map((id) => mentors.find((m) => m.id === id)!).filter(Boolean);
  const voices = voiceIds.map((id) => mentors.find((m) => m.id === id)!).filter(Boolean);
  const [active, setActive] = useState<MentorCategory>("Spirituality");
  const current = pills.find((p) => p.id === active)!;

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative pt-10 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--neon), transparent 70%)" }}
        />
        <p className="text-sm text-[oklch(0.7_0_0)]">Welcome back</p>
        <h1 className="mt-1 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
          Hello, <span className="neon-text">Diogo M.</span>
        </h1>
        <p className="mt-3 max-w-md text-sm text-[oklch(0.7_0_0)] sm:text-base">
          What's on your mind today? Choose a mentor, or just start a question.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex h-14 max-w-xl items-center gap-3 rounded-full border border-[oklch(1_0_0/0.1)] bg-[oklch(1_0_0/0.04)] px-5 backdrop-blur-xl transition focus-within:border-[oklch(0.92_0.27_132/0.6)]"
        >
          <Search className="h-5 w-5 text-[oklch(0.7_0_0)]" />
          <input
            placeholder="Ask anything…"
            className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-[oklch(0.7_0_0)] text-white"
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
        <div className="mt-6 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {pills.map((p) => {
            const Icon = p.icon;
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
                  isActive
                    ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.7_0_0)] hover:border-[oklch(0.92_0.27_132/0.3)] hover:text-white"
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
        <div className="mt-3 -mx-5 flex flex-wrap gap-2 px-5 sm:flex-nowrap sm:overflow-x-auto sm:pb-1 scrollbar-hide">
          {current.prompts.map((q) => (
            <button
              key={q}
              type="button"
              className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white sm:text-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Essentials grid */}
      <section className="mt-14">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl tracking-tight sm:text-2xl">Your essentials</h2>
          <Link to="/mentors" className="text-[11px] uppercase tracking-[0.18em] text-[oklch(0.7_0_0)] transition hover:text-white">
            All mentors
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {essentials.map((m) => {
            const Icon = m.icon;
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
                  <p className="truncate text-[11px] text-[oklch(0.7_0_0)]">{m.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Today's biggest voices */}
      <section className="mt-14">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl tracking-tight sm:text-2xl">Today's biggest voices</h2>
            <p className="mt-1 text-xs text-[oklch(0.7_0_0)]">The mentors shaping how we grow right now.</p>
          </div>
        </div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {voices.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.id}
                to={`/mentor/${m.id}`}
                className="group flex w-[170px] shrink-0 flex-col gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
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
                  <p className="mt-0.5 truncate text-[11px] text-[oklch(0.7_0_0)]">{m.role}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Explore by life area */}
      <section className="mt-12 mb-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl tracking-tight sm:text-2xl">Explore by life area</h2>
            <p className="mt-1 text-xs text-[oklch(0.7_0_0)]">Pick a topic. We'll guide you.</p>
          </div>
        </div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
          {mentorCategories.slice(0, 10).map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                to="/mentors"
                className="group flex w-[130px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-[oklch(1_0_0/0.08)] transition group-hover:ring-[oklch(0.92_0.27_132/0.4)]"
                  style={{ background: "oklch(0.92 0.27 132 / 0.06)" }}
                >
                  <Icon className="h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight text-white">{c.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-[oklch(0.7_0_0)]">{c.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
