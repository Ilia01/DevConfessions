import { Confession } from "../App";
import ConfessionItem from "./ConfessionItem";

interface Props {
  confessions: Confession[] | undefined;
  darkMode: boolean;
  onVote: (confession: Confession) => void;
}

export default function ConfessionsList({
  confessions,
  darkMode,
  onVote,
}: Props) {
  const safeConfessions = Array.isArray(confessions) ? confessions : [];

  return (
    <div className="space-y-4">
      {!confessions && (
        <div className="animate-pulse bg-gray-100 h-20 rounded" />
      )}
      {safeConfessions.map((confession) => (
        <ConfessionItem
          key={confession.id}
          confession={confession}
          darkMode={darkMode}
          onVote={onVote}
        />
      ))}
    </div>
  );
}
