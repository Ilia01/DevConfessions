type SortButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const Button = ({ active, onClick, children }: SortButtonProps) => (
  <button
    className={`px-4 py-2 rounded-md transition-colors ${
      active
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 cursor-pointer"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
