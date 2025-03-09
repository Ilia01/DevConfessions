"use client";
import { useState } from "react";
import axios from "axios";
import { useFetchConfessions } from "../hooks/useFetchConfessions";
import ConfessionsList from "../components/ConfessionsList";
import SubmissionForm from "../components/SubmissionForm";
import { Button } from "../components/SortButton";

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
  const [newConfession, setNewConfession] = useState("");
  const [sortBy, setSortBy] = useState<"new" | "top">("new");
  const { confessions, setConfessions, fetchConfessions } =
    useFetchConfessions(sortBy);

  const handleVoteUpdate = (updatedConfession: Confession) => {
    setConfessions((prev) =>
      prev.map((c) => (c.id === updatedConfession.id ? updatedConfession : c))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    try {
      await axios.post(`${API_URL}/confessions`, {
        text: newConfession.trim(),
        tags: [],
      });
      setNewConfession("");
      fetchConfessions();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 mx-auto max-w-2xl p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 mt-16">
        <h1 className="text-3xl font-bold">DevConfessions</h1>
        <div className="flex items-center gap-3">
          <Button active={sortBy === "new"} onClick={() => setSortBy("new")}>
            New
          </Button>
          <Button active={sortBy === "top"} onClick={() => setSortBy("top")}>
            Top
          </Button>
        </div>
      </header>

      {/* Submission Form */}
      <SubmissionForm
        newConfession={newConfession}
        setNewConfession={setNewConfession}
        handleSubmit={handleSubmit}
      />

      {/* Confessions List */}
      <ConfessionsList confessions={confessions} onVote={handleVoteUpdate} />
    </div>
  );
}
