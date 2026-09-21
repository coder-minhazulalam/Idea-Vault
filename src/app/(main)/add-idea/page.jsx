"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "Environment",
  "Social",
  "Other",
];

const AddIdeas = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    tags: "",
    imageUrl: "",
    estimatedBudget: "",
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
      !form.title ||
      !form.shortDescription ||
      !form.category ||
      !form.targetAudience ||
      !form.problemStatement ||
      !form.proposedSolution
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = Object.fromEntries(Object.entries(form));

      data.tags = form.tags
        ? form.tags.split(",").map((tag) => tag.trim())
        : [];

      data.createdAt = new Date();

      const res = await fetch("http://localhost:5000/ideas", {
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
    <div className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold">Submit Your Idea</h1>

        <p className="mb-8 text-sm text-zinc-500">
          Share your idea with the world.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label>Idea Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter idea title"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Short Description *</label>
            <input
              type="text"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Detailed Description</label>
            <textarea
              name="detailedDescription"
              value={form.detailedDescription}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your idea"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3"
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
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="AI, mobile, healthcare"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Estimated Budget</label>
            <input
              type="text"
              name="estimatedBudget"
              value={form.estimatedBudget}
              onChange={handleChange}
              placeholder="e.g. $5,000"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Target Audience *</label>
            <input
              type="text"
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              placeholder="Target audience"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Problem Statement *</label>
            <textarea
              name="problemStatement"
              value={form.problemStatement}
              onChange={handleChange}
              rows={4}
              placeholder="What problem does your idea solve?"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label>Proposed Solution *</label>
            <textarea
              name="proposedSolution"
              value={form.proposedSolution}
              onChange={handleChange}
              rows={4}
              placeholder="How does your idea solve the problem?"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-amber-600 px-8 py-3 text-white cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit Idea"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddIdeas;
