"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

const EditIdea = ({ idea }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    category: idea?.category || "",
    title: idea?.title || "",
    description: idea?.description || "",
    founder: idea?.founder || "",
    role: idea?.role || "",
    funding: idea?.funding || "",
    tag: idea?.tag || "",
    image: idea?.image || "",
    targetAudience: idea?.targetAudience || "",
    problemStatement: idea?.problemStatement || "",
    proposedSolution: idea?.proposedSolution || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:5000/ideas/${idea._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Idea updated successfully");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update idea");
    } finally {
      setIsUpdating(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Edit Idea
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 p-6">

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Category
                </label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Title
                </label>
                <input type="text" name="title" value={form.title} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Description
                </label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Founder
                  </label>
                  <input type="text" name="founder" value={form.founder} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Role
                  </label>
                  <input type="text" name="role" value={form.role} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Funding
                  </label>
                  <input type="text" name="funding" value={form.funding} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Tag
                  </label>
                  <input type="text" name="tag" value={form.tag} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Image URL
                </label>
                <input type="text" name="image" value={form.image} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Target Audience
                </label>
                <textarea name="targetAudience" value={form.targetAudience} onChange={handleChange} rows={2} className={inputClass} />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Problem Statement
                </label>
                <textarea name="problemStatement" value={form.problemStatement} onChange={handleChange} rows={3} className={inputClass} />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Proposed Solution
                </label>
                <textarea name="proposedSolution" value={form.proposedSolution} onChange={handleChange} rows={3} className={inputClass} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-xl bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60 cursor-pointer"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditIdea;
