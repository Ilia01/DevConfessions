import { useState } from "react";

interface Props {
  newConfession: string;
  setNewConfession: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function SubmissionForm({
  newConfession,
  setNewConfession,
  handleSubmit,
}: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="relative rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-4 transition-colors duration-300">
        <textarea
          value={newConfession}
          onChange={(e) => setNewConfession(e.target.value)}
          maxLength={140}
          placeholder="Confess your dev sins..."
          className="w-full resize-none bg-transparent dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none"
          rows={3}
          onInput={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            setIsDisabled(textarea.value.length === 0);
          }}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <span className="text-sm dark:text-gray-400">
            {140 - newConfession.length}
          </span>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={isDisabled}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
