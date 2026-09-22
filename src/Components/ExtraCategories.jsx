"use client";

import {
  Activity,
  BadgeCheck,
  Brain,
  Building2,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

function ExtraCategories() {
  return (
    <section className="w-full bg-slate-50 px-4 py-8 dark:bg-[#09090b] ">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-[8px] font-bold text-zinc-400">NETWORK</span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              12.8K
            </h3>

            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
              Active Global Builders
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <BadgeCheck className="h-4 w-4 text-pink-500" />
              <span className="text-[8px] font-bold text-zinc-400">
                VALIDATION
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              4,200+
            </h3>

            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
              Ideas Validated
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <Building2 className="h-4 w-4 text-purple-500" />
              <span className="text-[8px] font-bold text-zinc-400">
                CAPITAL
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              $3.2M
            </h3>

            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
              Angel Grants Unlocked
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span className="text-[8px] font-bold text-zinc-400">
                QUALITY SCORE
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              94%
            </h3>

            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
              Constructive Feedback Rate
            </p>
          </div>

        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} className="h-3 w-3 fill-current" />
              ))}
            </div>

            <p className="mt-3 text-[10px] italic leading-5 text-zinc-600 dark:text-zinc-300">
              "We posted our new edge-AI latency thesis on IdeaVault. In 72
              hours, two senior distributed systems engineers dissected our
              packet flow and joined as foundational co-founders."
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-[9px] font-bold text-pink-500">
                KL
              </div>

              <div>
                <p className="text-[9px] font-bold text-zinc-800 dark:text-white">
                  Kenji Laurent
                </p>

                <p className="text-[7px] text-zinc-400">
                  Founder, MeshCompute
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} className="h-3 w-3 fill-current" />
              ))}
            </div>

            <p className="mt-3 text-[10px] italic leading-5 text-zinc-600 dark:text-zinc-300">
              "As an angel scout, IdeaVault is my primary radar. The quality
              of problem-statement articulation here is leagues above generic
              pitch decks."
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-500">
                AY
              </div>

              <div>
                <p className="text-[9px] font-bold text-zinc-800 dark:text-white">
                  Aria Yashimoto
                </p>

                <p className="text-[7px] text-zinc-400">
                  Partner, CyberSeed Capital
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="rounded-xl border border-zinc-200 bg-gradient-to-r from-white to-pink-50 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-pink-950/20 md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <span className="inline-flex rounded-full bg-pink-100 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wide text-pink-500 dark:bg-pink-950/40 dark:text-pink-400">
                Instant Transmission
              </span>

              <h2 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white md:text-2xl">
                Got the next breakthrough?
              </h2>

              <p className="mt-1 max-w-xl text-[10px] leading-5 text-zinc-500 dark:text-zinc-400">
                Post your idea in 3 minutes — no pitch deck or production
                code required. Let global founders critique and validate
                before dawn.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <input
                type="text"
                placeholder="Enter your one-line startup thesis..."
                className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-[10px] text-zinc-700 outline-none focus:border-pink-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 sm:w-64"
              />

              <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-pink-500 px-5 text-[9px] font-bold uppercase tracking-wide text-white transition hover:bg-pink-600">
                <Send className="h-3 w-3" />
                Post an Idea
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ExtraCategories;