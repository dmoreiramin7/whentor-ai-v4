import { AppShell } from "@/components/whentor/AppShell";
import { TrendingUp, Flame, Target, Calendar, Brain, Dumbbell, Heart } from "lucide-react";

const areas = [
  { icon: Brain, label: "Mental Health", progress: 72, streak: 14, color: "var(--neon)" },
  { icon: Dumbbell, label: "Fitness & Body", progress: 45, streak: 7, color: "#60a5fa" },
  { icon: Heart, label: "Relationships", progress: 58, streak: 3, color: "#f472b6" },
  { icon: TrendingUp, label: "Business & Career", progress: 83, streak: 21, color: "#fb923c" },
];

export function GrowthPage() {
  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          Your <span className="neon-text">Growth</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.7_0_0)]">Track your progress across every life area.</p>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: Flame, label: "Day Streak", value: "21" },
            { icon: Target, label: "Goals Active", value: "4" },
            { icon: Calendar, label: "Sessions", value: "87" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center">
              <Icon className="mx-auto h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
              <p className="mt-2 font-display text-2xl">{value}</p>
              <p className="text-[11px] text-[oklch(0.7_0_0)]">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress by area */}
        <div className="mt-8 space-y-4">
          <h2 className="font-display text-lg">Progress by life area</h2>
          {areas.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${a.color}18` }}>
                      <Icon className="h-5 w-5" style={{ color: a.color }} strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{a.label}</p>
                      <p className="text-[11px] text-[oklch(0.6_0_0)]">{a.streak} day streak 🔥</p>
                    </div>
                  </div>
                  <span className="font-display text-2xl" style={{ color: a.color }}>{a.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[oklch(1_0_0/0.06)]">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${a.progress}%`, background: a.color }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming soon */}
        <div className="mt-8 rounded-2xl border border-[oklch(0.92_0.27_132/0.2)] bg-[oklch(0.92_0.27_132/0.04)] p-6 text-center">
          <p className="text-sm font-medium text-[var(--neon)]">AI Growth Report — Coming Soon</p>
          <p className="mt-2 text-xs text-[oklch(0.6_0_0)]">Your mentors will generate a weekly insight report based on your conversations and growth patterns.</p>
        </div>
      </div>
    </AppShell>
  );
}
