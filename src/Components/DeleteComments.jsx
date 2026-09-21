
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleRevalidation } from "./RevalidationPath";

const DeleteComments = ({ ideaId }) => {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!id) return;

    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    setIsCancelling(true);
    try {
      const res = await fetch(`http://localhost:5000/comments/${ideaId}`, {
        method: "DELETE",
      });

      console.log("DELETE status:", res.status);

      if (res.ok) {
        await handleRevalidation("/mybookings");
        router.refresh();
      }
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isCancelling}
      className="border border-red-300 text-red-500 hover:bg-red-50 text-xs px-3 py-2 rounded transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isCancelling ? "Cancelling..." : "Cancel"}
    </button>

  );
};

export default DeleteComments;
