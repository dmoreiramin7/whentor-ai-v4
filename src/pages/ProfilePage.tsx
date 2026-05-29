import { AppShell } from "@/components/whentor/AppShell";
import { Settings, Bell, Shield, CreditCard, LogOut, ChevronRight } from "lucide-react";
import logoSrc from "@/assets/whentor-logo.png";

const menuItems = [
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Preferences" },
  { icon: Shield, label: "Privacy & Data" },
  { icon: CreditCard, label: "Subscription" },
];

export function ProfilePage() {
  return (
    <AppShell>
      <div className="pt-4">
        {/* Avatar + name */}
        <div className="flex flex-col items-center text-center py-8">
          <div
            className="grid h-24 w-24 place-items-center rounded-full ring-2 ring-[oklch(0.92_0.27_132/0.5)]"
            style={{ background: "oklch(0.92 0.27 132 / 0.12)", boxShadow: "0 0 40px oklch(0.92 0.27 132 / 0.2)" }}
          >
            <img src={logoSrc} alt="D" className="h-12 w-12 rounded-xl" />
          </div>
          <h1 className="mt-4 font-display text-2xl">Diogo M.</h1>
          <p className="text-sm text-[oklch(0.6_0_0)]">diogo@whentor.ai</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.08)] px-4 py-1.5 text-xs text-[var(--neon)]">
            ✦ Free Plan · Upgrade for voice access
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Sessions", value: "87" },
            { label: "Mentors used", value: "12" },
            { label: "Day streak", value: "21" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-center">
              <p className="font-display text-2xl neon-text">{value}</p>
              <p className="text-[11px] text-[oklch(0.7_0_0)]">{label}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-5 py-4 text-sm text-white hover:border-[oklch(0.92_0.27_132/0.3)] transition"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-[oklch(0.7_0_0)]" strokeWidth={1.6} />
                {label}
              </div>
              <ChevronRight className="h-4 w-4 text-[oklch(0.5_0_0)]" />
            </button>
          ))}
          <button className="w-full flex items-center gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-5 py-4 text-sm text-red-400 hover:border-red-400/30 transition">
            <LogOut className="h-4 w-4" strokeWidth={1.6} />
            Sign out
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-[oklch(0.4_0_0)]">Whentor AI · MVP v4 · May 2026</p>
      </div>
    </AppShell>
  );
}
