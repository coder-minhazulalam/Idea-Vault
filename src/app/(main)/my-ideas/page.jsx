"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Tag, Radio } from "lucide-react";
import Link from "next/link";

const MyIdeasPage = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchMyIdeas = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/ideas/user/${userId}`);
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyIdeas();
  }, [userId]);

  if (!session && !loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Please login to see your ideas.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-slate-50 px-4 py-8 dark:bg-[#09090b] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            My Ideas
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            All the ideas you have submitted.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ideas.map((idea, index) => {
              const founderName = idea.founder || "Unknown";
              const initials = founderName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={idea._id || index}
                  className="group flex min-h-[315px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111113]"
                >
                  <span className="inline-flex w-fit rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-pink-500 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-400">
                    {idea.category || "General"}
                  </span>

                  <h3 className="mt-4 line-clamp-2 text-[17px] font-bold leading-6 text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
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
                      <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">
                        Details
                        <ArrowRight className="h-3.5 w-3.5" />
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
                No ideas yet
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Submit your first idea from the Add Idea page.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyIdeasPage;
