"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const CommentSection = ({ ideaId }) => {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setIsPosting(true);

      const res = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ideaId,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      setComment("");

      toast.success("Comment posted successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to post comment");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Join the Discussion
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Share your thoughts, feedback, or questions about this idea.
        </p>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleComment}>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback here..."
          rows={5}
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-white dark:placeholder:text-zinc-500"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isPosting}
            className="rounded-xl bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPosting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments will appear here */}
      <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          Comments
        </h3>

        <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          No comments yet. Be the first to share your thoughts.
        </p>
      </div>
    </section>
  );
};

export default CommentSection;