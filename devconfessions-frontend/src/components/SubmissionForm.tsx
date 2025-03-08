import { useState } from "react";

interface Props {
  newConfession: string;
  setNewConfession: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  darkMode: boolean;
}

export default function SubmissionForm({
  newConfession,
  setNewConfession,
  handleSubmit,
  darkMode,
}: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div
        className={`relative rounded-lg border ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
        } p-4 transition-colors duration-300`}
      >
        <textarea
          value={newConfession}
          onChange={(e) => setNewConfession(e.target.value)}
          maxLength={140}
          placeholder="Confess your dev sins..."
          className={`w-full focus:outline-none resize-none bg-transparent ${
            darkMode
              ? "text-gray-100 placeholder-gray-400"
              : "text-gray-900 placeholder-gray-500"
          }`}
          rows={3}
          onInput={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            const isDisabled = textarea.value.length === 0;
            setIsDisabled(isDisabled);
          }}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <span
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {140 - newConfession.length}
          </span>
          <button
            type="submit"
            className={`px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
            } cursor-pointer disabled:opacity-50`}
            disabled={isDisabled}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
