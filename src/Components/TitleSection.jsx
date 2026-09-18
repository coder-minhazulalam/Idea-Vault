"use client";

const categories = [
  "ALL CATEGORIES",
  "TECH & SAAS",
  "AI & MACHINE LEARNING",
  "HEALTHTECH",
  "CLEANTECH & ESG",
  "FINTECH",
  "WEB3 & CRYPTO",
  "EDTECH",
];

export default function TitleSection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-zinc-950/50 px-4 py-8 border-y border-zinc-200 dark:border-zinc-800 transition-colors">

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            onClick={(e) => e.preventDefault()}
            className={`
              rounded-full border px-4 py-1.5
              text-[9px] font-medium tracking-wide
              transition-all duration-200 cursor-pointer
              ${
                index === 0
                  ? "border-[#ff2f75] bg-[#ff2f75] text-white shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Heading Area */}
      <div className="mx-auto mt-10 flex max-w-6xl items-end justify-between gap-8">

        {/* Left */}
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-pink-400"></span>

            <span className="text-[14px] font-semibold uppercase tracking-[0.12em] text-[#ff4b87]">
              Live Innovation Feed
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-[30px]">
            Trending Startup Pitches
          </h2>
        </div>

        {/* Right */}
        <p className="max-w-sm text-right text-[15px] leading-4 text-zinc-500 dark:text-zinc-400">
          Peer-reviewed concept blueprints. Cast validations, inspect
          economic models, and leave critique for founders.
        </p>
      </div>
    </section>
  );
}