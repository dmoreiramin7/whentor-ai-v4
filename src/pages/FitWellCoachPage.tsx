import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/whentor/AppShell";
import {
  ArrowLeft, Send, Mic, Dumbbell, Flame, Target, Zap,
  Heart, TrendingUp, RotateCcw, Timer, ChevronRight, Star,
} from "lucide-react";

// ─── Smart fitness responses ────────────────────────────────────────────────

type FitnessResponse = { triggers: string[]; reply: string };

const responses: FitnessResponse[] = [
  {
    triggers: ["hello", "hi", "hey", "start", "begin"],
    reply: `Hey! I'm your FitWell Coach — think of me as your personal trainer, available 24/7. 💪

Tell me about yourself so I can build the perfect program:
• What's your main goal? (lose fat / build muscle / get fit / athletic performance)
• How many days per week can you train?
• Beginner, intermediate, or advanced?

Or just pick a quick-start below and I'll get you moving right now.`,
  },
  {
    triggers: ["beginner", "new to", "just started", "never worked out", "first time", "starting"],
    reply: `Perfect time to start — beginners make the fastest gains! Here's your **Beginner Foundation Program**:

**3 Days/Week (Mon / Wed / Fri)**

🔵 **Day A — Full Body Strength**
• Goblet Squat — 3×12
• Push-Up (or Bench Press) — 3×10
• Dumbbell Row — 3×12 each arm
• Plank — 3×30s

🔵 **Day B — Full Body Cardio + Core**
• 20 min brisk walk or light jog
• Hip Hinge (Romanian Deadlift) — 3×12
• Overhead Press — 3×10
• Dead Bug — 3×10

**Golden Rules for Beginners:**
1. Form before weight — always
2. Rest 60–90s between sets
3. Sleep 7–9h — that's when muscle grows
4. Eat enough protein: 1g per pound of body weight

Want me to explain any exercise in detail?`,
  },
  {
    triggers: ["lose weight", "fat loss", "burn fat", "weight loss", "slim", "cut", "cutting", "calorie"],
    reply: `Fat loss comes down to one thing: a **calorie deficit + muscle preservation**. Here's exactly how:

**🔥 Fat Loss Protocol — 4 Days/Week**

**Day 1 — Upper Body Strength**
• Bench Press — 4×8
• Barbell Row — 4×8
• Shoulder Press — 3×10
• Dips — 3×12
• Bicep Curl — 3×12

**Day 2 — HIIT Cardio (20 min)**
• 30s sprint → 90s walk × 8 rounds
• Burns ~250 cal + keeps metabolism elevated for 24h

**Day 3 — Lower Body Strength**
• Squat — 4×8
• Romanian Deadlift — 4×10
• Leg Press — 3×12
• Walking Lunges — 3×12 each

**Day 4 — Steady State Cardio (30–40 min)**
• Moderate pace — keeps cortisol low, burns fat without muscle loss

**Nutrition basics:**
• 300–500 cal deficit per day
• 1g protein per lb bodyweight (preserves muscle)
• Minimize ultra-processed food

You'll lose 0.5–1 lb/week — sustainable, real fat loss. Want a meal plan to go with this?`,
  },
  {
    triggers: ["build muscle", "gain muscle", "bulk", "bulking", "hypertrophy", "bodybuilder", "bodybuilding", "mass", "big"],
    reply: `Muscle building = **progressive overload + enough protein + recovery**. Here's the blueprint:

**💪 Hypertrophy Program — 4 Days/Week (Upper/Lower Split)**

**Day 1 — Upper Push**
• Bench Press — 4×8-10
• Incline Dumbbell Press — 3×10-12
• Shoulder Press — 3×10
• Lateral Raise — 4×15
• Tricep Pushdown — 3×12

**Day 2 — Lower Quad-Focus**
• Squat — 4×8
• Leg Press — 3×12
• Leg Extension — 3×15
• Calf Raise — 4×20

**Day 3 — Upper Pull**
• Pull-Up or Lat Pulldown — 4×8-10
• Seated Cable Row — 3×12
• Face Pull — 3×15
• Barbell Curl — 3×10
• Hammer Curl — 3×12

**Day 4 — Lower Hinge-Focus**
• Romanian Deadlift — 4×10
• Leg Curl — 3×12
• Bulgarian Split Squat — 3×10 each
• Hip Thrust — 3×15

**Key rules:**
• Add weight or reps every week (progressive overload)
• Eat 200–300 cal surplus
• 0.7–1g protein per lb bodyweight
• Sleep is non-negotiable — growth hormone peaks at night

Want me to break down any specific exercise or muscle group?`,
  },
  {
    triggers: ["chest", "pecs", "bench"],
    reply: `**Chest Workout — Full Activation** 🎯

The chest has 3 zones: upper, mid, and lower. Hit all three:

**Upper Chest (incline emphasis)**
• Incline Barbell Press — 4×8 (45° bench)
• Incline Dumbbell Flye — 3×12

**Mid Chest (flat emphasis)**
• Flat Bench Press — 4×8
• Dumbbell Press — 3×10

**Lower Chest (decline emphasis)**
• Decline Push-Up — 3×15
• Cable Crossover (low to high) — 3×15

**Isolation finisher**
• Pec Deck / Cable Fly — 3×15 with a 2s squeeze at the top

**Tips for faster chest growth:**
• Retract your scapula before pressing
• Control the negative (3s down)
• Full stretch at the bottom of flyes
• Don't flare elbows — 45° angle to torso

Train chest 2x/week for maximum growth. Want a full push day to pair with this?`,
  },
  {
    triggers: ["back", "lats", "pull", "row"],
    reply: `**Back Workout — Wide & Thick** 🎯

Think width (lats) + thickness (mid back) + lower back. Here's the full attack:

**Width — Lat focus**
• Wide-Grip Pull-Up — 4×6-8 (or Lat Pulldown)
• Straight-Arm Pushdown — 3×15

**Thickness — Mid back**
• Barbell Row — 4×8
• Seated Cable Row (narrow grip) — 3×12
• One-Arm Dumbbell Row — 3×10 each

**Lower back + posterior chain**
• Deadlift or Romanian Deadlift — 3×8
• Back Extension — 3×15

**Rear Delt (often neglected, makes the whole back pop)**
• Face Pull — 4×15
• Reverse Flye — 3×15

**Key coaching cue:** Pull with your elbows, not your hands. Imagine your hands are just hooks — your back does the work.

Want me to break down the deadlift technique step by step?`,
  },
  {
    triggers: ["legs", "squat", "glutes", "quads", "hamstring", "calves"],
    reply: `**Leg Day — No Skipping** 🦵

Legs are the biggest muscle group. Training them releases the most testosterone and growth hormone — good for your entire body.

**Quad-Dominant**
• Barbell Squat — 4×8 (king of all exercises)
• Leg Press — 3×12
• Leg Extension — 3×15 (feel the burn)

**Posterior Chain (glutes + hamstrings)**
• Romanian Deadlift — 4×10
• Leg Curl — 3×12
• Hip Thrust / Glute Bridge — 3×15

**Single-Leg (fixes imbalances)**
• Bulgarian Split Squat — 3×10 each leg
• Step-Up — 3×12 each

**Calves (train them, seriously)**
• Standing Calf Raise — 4×20 (full range)
• Seated Calf Raise — 3×15

**Squat form checklist:**
✅ Feet shoulder-width, toes slightly out
✅ Brace core like you're about to get punched
✅ Knees track over toes
✅ Break parallel — full range = full muscle

Need a full lower body program or help with squat form?`,
  },
  {
    triggers: ["arms", "bicep", "tricep", "curl"],
    reply: `**Arm Day — Guns Out** 💪

**Biceps — 3 angles for full development**
• Barbell Curl — 4×10 (mass builder)
• Incline Dumbbell Curl — 3×12 (long head stretch)
• Hammer Curl — 3×12 (brachialis + forearm)
• Concentration Curl — 2×15 (peak contraction)

**Triceps — 2/3 of your arm size**
• Close-Grip Bench Press — 4×8
• Overhead Tricep Extension — 3×12 (long head)
• Tricep Pushdown — 3×15
• Diamond Push-Up — 2×failure

**Forearms (grip & size)**
• Wrist Curl — 3×20
• Reverse Curl — 3×15
• Dead Hangs — 3×30s

**Tip:** Biceps peak = supinate (rotate your wrist outward) at the top of every curl. You'll feel the difference instantly.

For maximum arm growth: train arms 2x/week, prioritize compound movements first (rows for biceps, pressing for triceps).`,
  },
  {
    triggers: ["shoulders", "delts", "overhead press"],
    reply: `**Shoulder Day — Boulder Shoulders** 🎯

Hit all 3 heads: front (anterior), side (lateral), rear (posterior). Most people only train front.

**Compound press first**
• Barbell/Dumbbell Overhead Press — 4×8-10
• Arnold Press — 3×12

**Lateral delts (create width, the "V" taper)**
• Lateral Raise — 4×15 (slight forward lean, lead with elbow)
• Cable Lateral Raise — 3×15 (constant tension)

**Rear delts (critical for posture + aesthetics)**
• Face Pull — 4×15
• Reverse Pec Deck — 3×15
• Bent-Over Dumbbell Raise — 3×15

**Front delts (usually already developed from pressing)**
• Front Raise — 2×15 if lagging

**Tip:** Rear delts are the most undertrained muscle in gym-goers. If you sit at a desk, train rear delts TWICE as much as front. Better posture + better look.`,
  },
  {
    triggers: ["cardio", "running", "endurance", "stamina", "hiit"],
    reply: `**Cardio Guide — Right Type for Your Goal** 🏃

**For Fat Loss: HIIT (High Intensity Interval Training)**
• 20–25 min, 2–3x/week
• 30s sprint / 90s walk — repeat 8 times
• Burns fat for 24–48h after (afterburn effect)
• Do AFTER weights, not before

**For Endurance & Heart Health: Zone 2 Cardio**
• 30–45 min, 2–3x/week
• Conversational pace (you can speak but not sing)
• Running, cycling, rowing, swimming
• Builds mitochondria, improves VO2 max, reduces stress

**For Athleticism: Sport-Specific**
• Agility drills, sprints, jump rope
• 3×/week, 20–30 min

**The golden rule:**
Don't do long cardio right before lifting (kills strength). Do weights first, cardio after, or on separate days.

What's your main goal — fat loss, general health, or athletic performance? I'll dial in the exact protocol.`,
  },
  {
    triggers: ["abs", "core", "six pack", "stomach"],
    reply: `**Abs & Core — The Real Truth** 🔥

First, the hard truth: **abs are revealed in the kitchen, not the gym**. You can have strong abs but not see them if body fat is too high. Fat loss comes first.

**Core Strength (functional, injury-prevention)**
• Plank — 3×45s (full body tension)
• Dead Bug — 3×10 (anti-rotation)
• Bird Dog — 3×10 each
• Pallof Press — 3×12

**Six-Pack Visible Abs**
• Cable Crunch — 3×15
• Hanging Leg Raise — 3×12
• Ab Wheel Rollout — 3×10
• Bicycle Crunch — 3×20

**Obliques (the "side abs")**
• Russian Twist — 3×20
• Side Plank — 3×30s each
• Woodchop — 3×12

**Train abs 3x/week.** They recover fast. Combine with a calorie deficit and you'll see them within 8–12 weeks.

What's your current body fat estimate? I'll give you a realistic timeline.`,
  },
  {
    triggers: ["rest", "recovery", "sore", "pain", "overtraining", "sleep"],
    reply: `**Recovery is where you actually GROW** 💤

This is the most underrated part of fitness. The muscle breaks down in the gym — it builds while you sleep.

**Active Recovery on Rest Days**
• 20–30 min walk (increases blood flow, reduces soreness)
• Foam rolling — 10 min on sore areas
• Stretching / yoga (increases mobility)
• Swimming — full body, zero impact

**Sleep Optimization**
• 7–9 hours = non-negotiable for muscle growth
• Growth hormone peaks in first 2 hours of deep sleep
• Keep room cold (65–68°F / 18–20°C)
• No screens 30 min before bed

**Reduce Soreness (DOMS)**
• Warm up properly before training
• Cold shower or ice bath post-workout
• Stay hydrated — muscle is 75% water
• Eat protein within 1–2h after training

**Signs you need MORE rest:**
• Performance dropping week over week
• Joints hurt (not muscles)
• Sleep quality declining
• Mood / motivation low

Listen to your body. Taking 1–2 extra rest days won't cost you gains — pushing through real injury will cost you months.`,
  },
  {
    triggers: ["nutrition", "diet", "eat", "protein", "meal", "food", "macros"],
    reply: `**Nutrition for Fitness — Simple Rules That Work** 🥗

**Protein — The #1 priority**
• 0.7–1g per pound of bodyweight per day
• Chicken, eggs, fish, beef, cottage cheese, Greek yogurt
• Distribute across 3–4 meals (maximizes muscle synthesis)

**Carbs — Your gym fuel**
• Rice, oats, potatoes, fruit — eat around workouts
• Pre-workout: 30–60g carbs 1–2h before
• Post-workout: 50–80g carbs within 1–2h after

**Fats — Don't fear them**
• 20–35% of total calories
• Avocado, nuts, olive oil, fatty fish
• Critical for hormone production (testosterone included)

**Sample Day for Muscle Building:**
• Breakfast: 4 eggs + oats + banana
• Lunch: Chicken breast + rice + vegetables
• Pre-workout: Greek yogurt + fruit
• Dinner: Salmon + sweet potato + salad
• Optional: Cottage cheese before bed (casein protein overnight)

**For fat loss:** Same foods, just less total calories (300–500 deficit).

Want a full weekly meal plan matched to your goal?`,
  },
  {
    triggers: ["motivation", "discipline", "give up", "tired", "lazy", "stuck", "unmotivated"],
    reply: `Let's be real with you — and I say this because I want you to win. 💪

**Motivation is a liar.** It's a feeling, and feelings come and go. The people with the best physiques aren't always motivated. They show up anyway.

**Build systems, not motivation:**
• Schedule your workouts like doctor appointments
• Lay your gym clothes the night before
• Train at the same time every day — it becomes automatic
• Start with 10 minutes. You'll always do more.

**When you want to quit, remember:**
• The discomfort you feel right now? That's the exact signal that change is happening.
• Every rep you don't want to do is a vote for the person you're trying to become.
• You won't regret showing up. You will regret skipping.

**Science-backed hack:** Tell someone your goal. Public commitment increases follow-through by 65%.

What's holding you back right now? Be specific — I can help you solve it.`,
  },
  {
    triggers: ["program", "plan", "week", "schedule", "routine"],
    reply: `**Your Weekly Training Blueprint** 📅

I'll give you 3 options — pick what fits your life:

**Option A — 3 Days (Minimalist, Maximum Results)**
• Mon: Full Body Strength A
• Wed: Full Body Strength B
• Fri: Full Body Strength A
*Best for: beginners, busy schedules*

**Option B — 4 Days (Upper/Lower Split)**
• Mon: Upper Push
• Tue: Lower Quad
• Thu: Upper Pull
• Fri: Lower Hinge
*Best for: intermediate, balanced development*

**Option C — 5 Days (Push/Pull/Legs)**
• Mon: Push (Chest, Shoulders, Triceps)
• Tue: Pull (Back, Biceps)
• Wed: Legs
• Thu: Push (variation)
• Fri: Pull (variation)
*Best for: advanced, dedicated to the gym*

**Always include:**
• 1–2 cardio sessions (20–40 min)
• 1–2 active recovery days (walk, stretch, foam roll)

Tell me your goal, schedule, and experience level and I'll build your exact program.`,
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const r of responses) {
    if (r.triggers.some((t) => lower.includes(t))) return r.reply;
  }
  return `Great question about "${input}". Let me give you solid advice:

The foundation of any fitness result is **consistency + progressive overload + recovery**. Without those three, no program will work. With those three, almost any program will.

Be specific with me — tell me:
• Your goal (fat loss / muscle / fitness / performance)
• Your experience level
• How many days/week you can train

I'll build something that actually fits your life, not just a generic template.`;
}

// ─── Workout plan data ───────────────────────────────────────────────────────

const weekPlan = [
  { day: "Mon", label: "Push", focus: "Chest · Shoulders · Triceps", done: true },
  { day: "Tue", label: "Pull", focus: "Back · Biceps · Rear Delts", done: true },
  { day: "Wed", label: "Legs", focus: "Quads · Hamstrings · Glutes", done: false },
  { day: "Thu", label: "Rest", focus: "Active Recovery · Stretch", done: false },
  { day: "Fri", label: "Push", focus: "Chest · Shoulders · Triceps", done: false },
  { day: "Sat", label: "Pull", focus: "Back · Biceps · Cardio", done: false },
  { day: "Sun", label: "Rest", focus: "Full Recovery", done: false },
];

const muscleGroups = [
  { label: "Chest", prompt: "Give me a chest workout", icon: "🫀" },
  { label: "Back", prompt: "Give me a back workout", icon: "🦾" },
  { label: "Legs", prompt: "Give me a leg workout", icon: "🦵" },
  { label: "Shoulders", prompt: "Give me a shoulder workout", icon: "💪" },
  { label: "Arms", prompt: "Give me an arm workout", icon: "💪" },
  { label: "Core / Abs", prompt: "How do I get visible abs?", icon: "🔥" },
  { label: "Cardio", prompt: "Best cardio for fat loss", icon: "🏃" },
  { label: "Recovery", prompt: "How do I recover faster?", icon: "💤" },
];

const quickPrompts = [
  "Build me a workout plan",
  "I want to lose fat",
  "Help me build muscle",
  "I'm a complete beginner",
  "Best exercises for weight loss",
  "How much protein do I need?",
];

// ─── Chat message renderer (supports **bold** and bullets) ──────────────────

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i} className="block leading-relaxed">
        {parts.map((p, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{p}</strong> : p
        )}
      </span>
    );
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FitWellCoachPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "coach"; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [tab, setTab] = useState<"chat" | "plan" | "muscles">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text?: string) {
    const userMsg = (text ?? input).trim();
    if (!userMsg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "coach", text: getResponse(userMsg) }]);
    }, 900 + Math.random() * 500);
  }

  return (
    <AppShell>
      <div className="pt-2">
        <Link to="/mentors" className="inline-flex items-center gap-2 text-sm text-[oklch(0.7_0_0)] hover:text-white transition mb-6">
          <ArrowLeft className="h-4 w-4" /> All mentors
        </Link>

        {/* ── Header ── */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="relative grid h-24 w-24 shrink-0 place-items-center rounded-3xl ring-2 ring-[oklch(0.92_0.27_132/0.5)]"
            style={{ background: "oklch(0.92 0.27 132 / 0.08)", boxShadow: "0 0 40px oklch(0.92 0.27 132 / 0.25)" }}
          >
            <Dumbbell className="h-11 w-11 text-[var(--neon)]" strokeWidth={1.4} />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs" style={{ background: "var(--neon)", color: "#000" }}>
              ✦
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-[var(--neon)]">Fitness & Body</p>
            <h1 className="font-display text-3xl sm:text-4xl">FitWell Coach</h1>
            <p className="mt-0.5 text-sm text-[oklch(0.6_0_0)]">Personal Trainer · Strength & Performance</p>
            <p className="mt-2 text-sm text-[oklch(0.75_0_0)] max-w-md leading-relaxed">
              Your 24/7 personal trainer. Workouts, nutrition, recovery — built around your goals, not a template.
            </p>
            {/* Badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { icon: Flame, label: "Fat Loss" },
                { icon: Dumbbell, label: "Muscle Building" },
                { icon: Heart, label: "Cardio & Health" },
                { icon: Zap, label: "Athletic Performance" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-3 py-1 text-[11px] text-[oklch(0.7_0_0)]">
                  <Icon className="h-3 w-3 text-[var(--neon)]" strokeWidth={1.8} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { icon: Target, label: "Goals Covered", value: "12+" },
            { icon: Timer, label: "Avg Session", value: "45 min" },
            { icon: TrendingUp, label: "Programs", value: "8" },
            { icon: Star, label: "Rating", value: "5.0" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-3 text-center">
              <Icon className="mx-auto h-4 w-4 text-[var(--neon)]" strokeWidth={1.6} />
              <p className="mt-1 font-display text-lg leading-none">{value}</p>
              <p className="mt-0.5 text-[10px] text-[oklch(0.55_0_0)] leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-1 mb-4">
          {(["chat", "plan", "muscles"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
                tab === t ? "text-black" : "text-[oklch(0.6_0_0)] hover:text-white"
              }`}
              style={tab === t ? { background: "var(--neon)" } : undefined}
            >
              {t === "chat" ? "💬 Coach Chat" : t === "plan" ? "📅 Weekly Plan" : "💪 Muscle Groups"}
            </button>
          ))}
        </div>

        {/* ── Tab: Chat ── */}
        {tab === "chat" && (
          <div className="flex flex-col gap-3">
            {/* Quick prompts */}
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="shrink-0 rounded-full border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] px-4 py-2 text-xs text-[oklch(0.7_0_0)] transition hover:border-[oklch(0.92_0.27_132/0.4)] hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="rounded-3xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.02)] overflow-hidden">
              <div className="min-h-[360px] max-h-[500px] overflow-y-auto p-5 space-y-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center gap-4">
                    <div
                      className="grid h-16 w-16 place-items-center rounded-2xl"
                      style={{ background: "oklch(0.92 0.27 132 / 0.08)", boxShadow: "0 0 20px oklch(0.92 0.27 132 / 0.15)" }}
                    >
                      <Dumbbell className="h-8 w-8 text-[var(--neon)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Ready to train?</p>
                      <p className="mt-1 text-xs text-[oklch(0.5_0_0)]">
                        Ask me anything — workouts, nutrition, fat loss, muscle building, or recovery.
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "coach" && (
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full mt-1" style={{ background: "oklch(0.92 0.27 132 / 0.12)" }}>
                        <Dumbbell className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-[var(--neon)] text-black font-medium"
                          : "bg-[oklch(1_0_0/0.05)] text-[oklch(0.85_0_0)] border border-[oklch(1_0_0/0.08)]"
                      }`}
                    >
                      {msg.role === "coach" ? renderText(msg.text) : msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: "oklch(0.92 0.27 132 / 0.12)" }}>
                      <Dumbbell className="h-4 w-4 text-[var(--neon)]" strokeWidth={1.8} />
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

              {/* Input */}
              <div className="border-t border-[oklch(1_0_0/0.08)] p-4 flex items-center gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask your coach anything…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-[oklch(0.45_0_0)] outline-none"
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

            <p className="text-center text-[10px] text-[oklch(0.4_0_0)]">
              FitWell Coach · AI personal trainer · Voice mode coming soon
            </p>
          </div>
        )}

        {/* ── Tab: Weekly Plan ── */}
        {tab === "plan" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[oklch(0.7_0_0)]">Sample week — PPL Split (Push/Pull/Legs)</p>
              <button
                onClick={() => sendMessage("Build me a workout plan")}
                className="text-[11px] text-[var(--neon)] hover:underline"
              >
                Customize →
              </button>
            </div>

            {weekPlan.map((d) => (
              <div
                key={d.day}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition ${
                  d.done
                    ? "border-[oklch(0.92_0.27_132/0.3)] bg-[oklch(0.92_0.27_132/0.05)]"
                    : "border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)]"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl text-center ${d.done ? "text-black" : "text-[oklch(0.7_0_0)] bg-[oklch(1_0_0/0.05)]"}`}
                  style={d.done ? { background: "var(--neon)" } : undefined}>
                  <p className="text-[10px] font-semibold leading-none">{d.day}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${d.done ? "text-[var(--neon)]" : "text-white"}`}>{d.label}</p>
                  <p className="truncate text-[11px] text-[oklch(0.55_0_0)]">{d.focus}</p>
                </div>
                {d.done ? (
                  <span className="text-[11px] text-[var(--neon)] font-medium">Done ✓</span>
                ) : d.label !== "Rest" ? (
                  <button
                    onClick={() => { setTab("chat"); sendMessage(`Give me the ${d.label} workout for today`); }}
                    className="grid h-8 w-8 place-items-center rounded-full border border-[oklch(0.92_0.27_132/0.3)] text-[var(--neon)] hover:bg-[oklch(0.92_0.27_132/0.1)] transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <RotateCcw className="h-4 w-4 text-[oklch(0.5_0_0)]" />
                )}
              </div>
            ))}

            <div className="mt-4 rounded-2xl border border-[oklch(0.92_0.27_132/0.2)] bg-[oklch(0.92_0.27_132/0.04)] p-5 text-center">
              <p className="text-sm font-medium text-[var(--neon)]">Want a personalized plan?</p>
              <p className="mt-1 text-xs text-[oklch(0.6_0_0)]">Tell me your goal, schedule, and experience level and I'll build one just for you.</p>
              <button
                onClick={() => { setTab("chat"); sendMessage("Build me a custom workout plan"); }}
                className="mt-3 rounded-full px-5 py-2 text-xs font-semibold text-black transition hover:opacity-90"
                style={{ background: "var(--neon)" }}
              >
                Build My Plan
              </button>
            </div>
          </div>
        )}

        {/* ── Tab: Muscle Groups ── */}
        {tab === "muscles" && (
          <div>
            <p className="mb-4 text-sm text-[oklch(0.6_0_0)]">Tap any area to get a dedicated workout instantly.</p>
            <div className="grid grid-cols-2 gap-3">
              {muscleGroups.map((g) => (
                <button
                  key={g.label}
                  onClick={() => { setTab("chat"); sendMessage(g.prompt); }}
                  className="group flex items-center gap-3 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-4 text-left transition hover:-translate-y-0.5 hover:border-[oklch(0.92_0.27_132/0.4)] hover:bg-[oklch(1_0_0/0.05)]"
                >
                  <span className="text-2xl">{g.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{g.label}</p>
                    <p className="mt-0.5 text-[10px] text-[oklch(0.5_0_0)] truncate">{g.prompt}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[oklch(0.5_0_0)] group-hover:text-[var(--neon)] transition" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[oklch(1_0_0/0.08)] bg-[oklch(1_0_0/0.03)] p-5">
              <p className="text-sm font-semibold text-white mb-3">Or ask anything specific</p>
              <div className="flex gap-2">
                <input
                  placeholder="e.g. How do I grow bigger arms?"
                  className="flex-1 rounded-xl border border-[oklch(1_0_0/0.08)] bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-[oklch(0.45_0_0)] outline-none focus:border-[oklch(0.92_0.27_132/0.4)]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTab("chat");
                      sendMessage((e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <button
                  className="grid h-10 w-10 place-items-center rounded-xl text-black transition hover:opacity-90"
                  style={{ background: "var(--neon)" }}
                  onClick={(e) => {
                    const inp = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                    if (inp.trim()) { setTab("chat"); sendMessage(inp); }
                  }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
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
