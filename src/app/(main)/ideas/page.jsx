"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Tag, Radio } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "AI & MACHINE LEARNING",
  "CYBERSECURITY",
  "WEB DEVELOPMENT",
  "HEALTH & WELLNESS",
  "FINTECH",
  "EDUCATION",
  "ENVIRONMENT",
  "SOCIAL IMPACT",
  "E-COMMERCE",
  "PRODUCTIVITY",
];

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?${params.toString()}`);
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchIdeas, 400);
    return () => clearTimeout(delay);
  }, [search, category]);

  return (
    <section className="w-full bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-[#09090b] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Latest Ideas
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Discover innovative ideas from founders and creators.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-500 dark:border-white/10 dark:bg-[#111113] dark:text-white dark:placeholder:text-slate-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-amber-500 dark:border-white/10 dark:bg-[#111113] dark:text-slate-300"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea, index) => {
              const founderName = idea.founder || "Unknown Founder";
              const initials = founderName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={idea._id || index}
                  className="group flex min-h-[315px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111113] dark:hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-pink-500 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-400">
                      {idea.category || "General"}
                    </span>
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-[17px] font-bold leading-6 text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {idea.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                    {idea.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {idea.tag && (
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        <Tag className="h-3.5 w-3.5 text-blue-500" />
                        <span>{idea.tag}</span>
                      </div>
                    )}
                    {idea.funding && (
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        <Radio className="h-3.5 w-3.5 text-violet-500" />
                        <span>{idea.funding}</span>
                      </div>
                    )}
                  </div>

                  <div className="my-5 h-px w-full bg-slate-100 dark:bg-white/10" />

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-xs font-semibold text-pink-500 dark:bg-pink-500/10 dark:text-pink-400">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                          {founderName}
                        </p>
                        <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                          {idea.role || "Founder"}
                        </p>
                      </div>
                    </div>

                    <Link href={`/ideas/${idea._id}`}>
                      <button
                        type="button"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                      >
                        Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center dark:border-white/10 dark:bg-[#111113]">
            <div>
              <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
                No ideas found
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Try a different search or category.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IdeasPage;