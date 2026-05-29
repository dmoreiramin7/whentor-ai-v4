import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import { mentors, mentorCategories, type MentorCategory } from "@/lib/whentor-data";

export function MentorsPage() {
  const [activeCategory, setActiveCategory] = useState<MentorCategory | "All">("All");
  const filtered = activeCategory === "All" ? mentors : mentors.filter((m) => m.category === activeCategory);

  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          All <span className="neon-text">Mentors</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.7_0_0)]">Choose who guides your next conversation.</p>

        {/* Category filter */}
        <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {(["All", ...mentorCategories.map((c) => c.id)] as (MentorCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === cat
                  ? "border-[oklch(0.92_0.27_132/0.7)] bg-[oklch(0.92_0.27_132/0.1)] text-white"
                  : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] text-[oklch(0.7_0_0)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.id}
                to={`/mentor/${m.id}`}
                className="group flex flex-col gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
              >
                <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl ring-1 ring-[oklch(1_0_0/0.08)]">
                  {m.avatar ? (
                    <img src={m.avatar} alt={m.inspiredBy} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-6 w-6 text-[var(--neon)]" strokeWidth={1.6} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{m.inspiredBy}</p>
                  <p className="mt-0.5 text-[11px] text-[oklch(0.7_0_0)]">{m.name}</p>
                  <p className="mt-2 text-[11px] text-[oklch(0.6_0_0)] line-clamp-2">{m.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
