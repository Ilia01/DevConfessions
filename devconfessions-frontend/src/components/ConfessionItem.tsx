import { useState } from "react";
import { Confession } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

interface Props {
  confession: Confession;
  darkMode: boolean;
  onVote: (updatedConfession: Confession) => void;
}

export default function ConfessionItem({
  confession,
  darkMode,
  onVote,
}: Props) {
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
    <div
      className={`p-4 rounded-lg shadow-sm transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <p className="mb-3">{confession.text}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded transition-colors duration-150 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => handleVote("up")}
            disabled={voted}
          >
            <FaRegThumbsUp className="w-5 h-5" />
            <span className="text-sm font-medium">{confession.upVote}</span>
          </button>

          <button
            className={`flex items-center gap-1 px-3 py-1 rounded transition-colors duration-150 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            onClick={() => handleVote("down")}
            disabled={voted}
          >
            <FaRegThumbsDown className="w-5 h-5" />
            <span className="text-sm font-medium">{confession.downVote}</span>
          </button>

          {/* Tags */}
        </div>
        <span
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
