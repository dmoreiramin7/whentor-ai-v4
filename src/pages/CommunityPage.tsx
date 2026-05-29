import { AppShell } from "@/components/whentor/AppShell";
import { Users, Flame, MessageCircle, TrendingUp } from "lucide-react";

const posts = [
  { user: "Alex M.", avatar: "AM", time: "2h ago", category: "Mindset", text: "After 30 days with Marcus Aurelius mentor, I stopped reacting to everything. Stoicism is not cold — it's deeply warm when you actually practice it.", likes: 47, replies: 12 },
  { user: "Sara K.", avatar: "SK", time: "5h ago", category: "Fitness", text: "FitWell coach gave me a 12-week program. Week 4 and I haven't missed a day. The voice feature is going to be a game-changer.", likes: 89, replies: 23 },
  { user: "James T.", avatar: "JT", time: "1d ago", category: "Business", text: "Elon mentor pushed me to think from first principles on my startup idea. Rebuilt the whole pitch deck. Investor meeting went different this time.", likes: 134, replies: 41 },
  { user: "Priya R.", avatar: "PR", time: "1d ago", category: "Spirituality", text: "Spending 10 minutes with the Jesus Christ mentor every morning before meetings. The calm it gives is unlike anything else I've tried.", likes: 201, replies: 67 },
  { user: "Daniel F.", avatar: "DF", time: "2d ago", category: "Mental Health", text: "Carl Jung helped me see my procrastination wasn't laziness — it was shadow avoidance. That reframe changed everything.", likes: 312, replies: 88 },
];

export function CommunityPage() {
  return (
    <AppShell>
      <div className="pt-4">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          <span className="neon-text">Community</span>
        </h1>
        <p className="mt-2 text-sm text-[oklch(0.7_0_0)]">People growing with AI mentors — in public.</p>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "Members", value: "12,847" },
            { icon: MessageCircle, label: "Conversations", value: "94K" },
            { icon: TrendingUp, label: "Growth streaks", value: "3,201" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center">
              <Icon className="mx-auto h-5 w-5 text-[var(--neon)]" strokeWidth={1.6} />
              <p className="mt-2 font-display text-xl">{value}</p>
              <p className="text-[11px] text-[oklch(0.7_0_0)]">{label}</p>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-8 space-y-4">
          {posts.map((p, i) => (
            <div key={i} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-black" style={{ background: "var(--neon)" }}>
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{p.user}</span>
                    <span className="rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.08)] px-2 py-0.5 text-[10px] text-[var(--neon)]">{p.category}</span>
                    <span className="text-[11px] text-[oklch(0.5_0_0)]">{p.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-[oklch(0.85_0_0)] leading-relaxed">{p.text}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-[11px] text-[oklch(0.6_0_0)] hover:text-[var(--neon)] transition">
                      <Flame className="h-3.5 w-3.5" /> {p.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-[11px] text-[oklch(0.6_0_0)] hover:text-white transition">
                      <MessageCircle className="h-3.5 w-3.5" /> {p.replies}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
