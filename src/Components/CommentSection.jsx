"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



const CommentSection = ({ ideaId }) => {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Fetch comments
  const fetchComments = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `http://localhost:5000/comments/${ideaId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await res.json();

      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  // Post comment
  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setIsPosting(true);

      const res = await fetch( `http://localhost:5000/comments/${ideaId}`, {
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

      const newComment = await res.json();

      // Add new comment immediately
      setComments((prev) => [...prev, newComment]);

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

      {/* Comments */}
      <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          Comments
        </h3>

        {isLoading ? (
          <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Loading comments...
          </p>
        ) : comments.length > 0 ? (
          <div className="mt-4 flex flex-col gap-4">
            {comments.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60"
              >
                <div className="flex gap-2 justify-start ">
                    <img
                      src={user.image || "/assets/default-avatar.png"}
                      alt={user.name || "User"}
                      className="h-5 w-5 object-cover border-[50%]"
                    />

                 <p className="mt-2 text-xs text-zinc-400">
                  {user?.name}
                </p>

                </div>

                <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {item.comment}
                </p>

                

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No comments yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </section>
  );
};

export default CommentSection;