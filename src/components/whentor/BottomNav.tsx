import { NavLink, useLocation } from "react-router-dom";
import { Home, Sparkles, TrendingUp, Users, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/mentors", label: "Mentors", icon: Sparkles },
  { to: "/community", label: "Community", icon: Users },
  { to: "/growth", label: "Growth", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4">
      <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 shadow-2xl">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <NavLink
              key={to}
              to={to}
              className={`group relative flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                active ? "text-black" : "text-[oklch(0.7_0_0)] hover:text-white"
              }`}
            >
              {active && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--neon)", boxShadow: "0 0 24px var(--neon)" }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative hidden sm:inline">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
