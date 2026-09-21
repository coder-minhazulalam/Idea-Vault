"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteComments from "./DeleteComments";

const CommentSection = ({ ideaId }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const userid = session?.user?._id;

  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [comments, setComments] = useState([]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    if (!userid) {
      toast.error("Please login first");
      return;
    }

    setIsPosting(true);

    try {
      const res = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          ideaId,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment = await res.json();

      console.log("New comment:", newComment);

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

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/comments/${ideaId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await res.json();

      console.log("Comments:", data);

      setComments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    if (ideaId) {
      fetchComments();
    }
  }, [ideaId]);

  return (
    <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Join the Discussion
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Share your thoughts, feedback, or questions about this idea.
        </p>
      </div>

      <form onSubmit={handleComment}>
        <textarea
          placeholder="Write your feedback here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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

      <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">

        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          Comments
        </h3>

        {comments.length === 0 ? (
          <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {comments.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60"
              >

             <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">

  <div className="flex items-start gap-3">

    <img
      src={user?.image || "/default-avatar.png"}
      alt={user?.name || "User"}
      className="h-10 w-10 shrink-0 rounded-full border-2 border-amber-400 object-cover"
    />

    <div className="min-w-0 flex-1">

      <div className="flex items-center justify-between gap-2">

        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            {user?.name || "Anonymous"}
          </p>

          <p className="mt-0.5 text-[11px] text-zinc-400">
            Commented on this idea
          </p>
        </div>

        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
          Feedback
        </span>

      </div>

      <div className="mt-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
        {item.comment}
      </div>

    </div>

  </div>

</div>


                <div className="mt-3 flex justify-end gap-2">

                  <button
                    type="button"
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400"
                  >
                    Edit
                  </button>
                  
                  <DeleteComments ideaId={ideaId}/>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CommentSection;