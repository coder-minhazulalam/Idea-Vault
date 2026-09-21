
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const DeleteComments = ({ commentId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!commentId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }

      toast.success("Comment deleted successfully");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="border border-red-300 text-red-500 hover:bg-red-50 text-xs px-3 py-1.5 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-red-900/40 dark:hover:bg-red-950/20"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteComments;
