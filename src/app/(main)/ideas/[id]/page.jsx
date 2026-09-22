import CommentSection from "@/Components/CommentSection";
import EditIdea from "@/Components/EditIdea";
import DeleteIdea from "@/Components/DeleteIdea";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  let data = null;

  try {
    const res = await fetch(`http://localhost:5000/ideas/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch idea");

    data = await res.json();
  } catch (error) {
    console.error("Error fetching idea:", error);
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-8 py-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Idea not found
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            The idea you are looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <section className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">

          {/* Hero Image */}
          <div className="relative h-64 w-full overflow-hidden md:h-80 lg:h-96">
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-8 md:right-8">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                {data.category}
              </span>
              <h1 className="mt-3 max-w-4xl text-2xl font-bold leading-tight text-white md:text-4xl">
                {data.title}
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-5 md:p-8 lg:p-10">

            {/* Founder row with Edit & Delete */}
            <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {data.founder?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {data.founder}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {data.role}
                  </p>
                </div>
              </div>

              {/* Edit & Delete as separate components */}
              <div className="flex items-center gap-2">
                <EditIdea idea={data} />
                <DeleteIdea ideaId={data._id} />
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                About the Idea
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 md:text-base">
                {data.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {data.tag && (
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  #{data.tag}
                </span>
              )}
              <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {data.category}
              </span>
              <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                Idea
              </span>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/60">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Validations</p>
                <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{data.validations}</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/60">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Feedback</p>
                <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{data.feedback}</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/60 md:col-span-1">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Budget</p>
                <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">{data.funding}</p>
              </div>
            </div>

            {/* Target Audience + Problem */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    👥
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Target Audience</h3>
                </div>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{data.targetAudience}</p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    !
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Problem Statement</h3>
                </div>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{data.problemStatement}</p>
              </div>
            </div>

            {/* Proposed Solution */}
            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/60 p-6 dark:border-amber-900/30 dark:bg-amber-950/20">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  ✓
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">Proposed Solution</h3>
              </div>
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">{data.proposedSolution}</p>
            </div>

          </div>
        </section>

        <CommentSection ideaId={id} />
      </div>
    </main>
  );
};

export default IdeaDetailsPage;