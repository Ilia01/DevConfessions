"use client";
import { useState } from "react";
import axios from "axios";
import { useFetchConfessions } from "./hooks/useFetchConfessions";
import ConfessionsList from "./components/ConfessionsList";
import SubmissionForm from "./components/SubmissionForm";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

export interface Confession {
  id: number;
  text: string;
  upVote: number;
  downVote: number;
  tags: string[];
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const { isDark } = useTheme();
  const [newConfession, setNewConfession] = useState("");
  const [sortBy, setSortBy] = useState<"new" | "top">("new");
  const { confessions, fetchConfessions } = useFetchConfessions(sortBy);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    try {
      await axios.post(`${API_URL}/confessions`, {
        text: newConfession.trim(),
        tags: [],
      });
      setNewConfession("");
      fetchConfessions(); // Refresh confessions after submission
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-2xl p-4 md:p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">DevConfessions</h1>
          <div className="flex items-center gap-3">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                sortBy === "new"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSortBy("new")}
            >
              New
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                sortBy === "top"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSortBy("top")}
            >
              Top
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Submission Form */}
        <SubmissionForm
          newConfession={newConfession}
          setNewConfession={setNewConfession}
          handleSubmit={handleSubmit}
          darkMode={isDark}
        />

        {/* Confessions List */}
        <ConfessionsList
          confessions={confessions}
          darkMode={isDark}
          onVote={fetchConfessions} // Pass fetchConfessions to refresh after voting
        />
      </div>
    </div>
  );
}
