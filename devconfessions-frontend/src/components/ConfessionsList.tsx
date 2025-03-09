import { Confession } from "../pages/HomePage";
import ConfessionItem from "./ConfessionItem";

interface Props {
  confessions: Confession[] | undefined;
  onVote: (confession: Confession) => void;
}

export default function ConfessionsList({ confessions, onVote }: Props) {
  const safeConfessions = Array.isArray(confessions) ? confessions : [];

  return (
    <div className="space-y-4">
      {!confessions && (
        <div className="animate-pulse bg-gray-700 h-20 rounded-xl" />
      )}
      {safeConfessions.map((confession) => (
        <ConfessionItem
          key={confession.id}
          confession={confession}
          onVote={onVote}
        />
      ))}
    </div>
  );
}
