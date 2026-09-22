"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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

const AddIdeas = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackUrl=/add-idea");
    }
  }, [session, isPending, router]);

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    founder: "",
    role: "",
    funding: "",
    tag: "",
    image: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.category ||
      !form.title ||
      !form.description ||
      !form.founder ||
      !form.role ||
      !form.funding ||
      !form.tag ||
      !form.image ||
      !form.targetAudience ||
      !form.problemStatement ||
      !form.proposedSolution
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
    const data = { ...form, userId };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to save idea");
      }

      toast.success("Idea submitted successfully!");

      router.push("/ideas");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit idea");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl">

        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Submit Your Idea
        </h1>

        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          Share your idea with the world.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Category *
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            >
              <option value="">Select category</option>

              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Idea Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="SecureNest"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="A simple cybersecurity monitoring platform designed for small businesses."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Founder *
            </label>

            <input
              type="text"
              name="founder"
              value={form.founder}
              onChange={handleChange}
              placeholder="James Carter"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Role *
            </label>

            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Founder & Security Engineer"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Funding *
            </label>

            <input
              type="text"
              name="funding"
              value={form.funding}
              onChange={handleChange}
              placeholder="$35K"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Tag *
            </label>

            <input
              type="text"
              name="tag"
              value={form.tag}
              onChange={handleChange}
              placeholder="Small Business"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Image URL *
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Target Audience *
            </label>

            <textarea
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              rows={3}
              placeholder="Small businesses, startups, and independent professionals."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Problem Statement *
            </label>

            <textarea
              name="problemStatement"
              value={form.problemStatement}
              onChange={handleChange}
              rows={4}
              placeholder="Small businesses often lack the resources and expertise required to monitor cybersecurity threats."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Proposed Solution *
            </label>

            <textarea
              name="proposedSolution"
              value={form.proposedSolution}
              onChange={handleChange}
              rows={4}
              placeholder="An affordable security platform that monitors suspicious activity and provides simple security recommendations."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl bg-amber-600 px-8 py-3 font-medium text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Idea"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddIdeas;
