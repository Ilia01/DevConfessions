import { useState } from "react";
import { Confession } from "../pages/HomePage";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

interface Props {
  confession: Confession;
  onVote: (updatedConfession: Confession) => void;
}

export default function ConfessionItem({ confession, onVote }: Props) {
  const [voted, setVoted] = useState(false);

  const handleVote = async (type: "up" | "down") => {
    if (voted) return;

    const updatedConfession = {
      ...confession,
      upVote: type === "up" ? confession.upVote + 1 : confession.upVote,
      downVote: type === "down" ? confession.downVote - 1 : confession.downVote,
    };
    onVote(updatedConfession);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/confessions/${
          confession.id
        }/${type}vote`
      );
      setVoted(true);
      toast.success(`${type === "up" ? "Upvote" : "Downvote"} recorded!`);
    } catch (err) {
      onVote(confession);
      toast.error(`Failed to ${type}vote. Try again!`);
    }
  };

  const formattedDate = new Date(confession.createdAt).toLocaleDateString();

  return (
    <div className="p-5 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <p className="mb-4 text-gray-800 dark:text-gray-100">{confession.text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleVote("up")}
            disabled={voted}
          >
            <FaRegThumbsUp className="w-5 h-5" />
            <span className="text-sm font-medium">{confession.upVote}</span>
          </button>
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleVote("down")}
            disabled={voted}
          >
            <FaRegThumbsDown className="w-5 h-5" />
            <span className="text-sm font-medium">{confession.downVote}</span>
          </button>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
