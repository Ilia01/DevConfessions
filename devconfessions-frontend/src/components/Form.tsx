import { FormEvent, ReactNode } from "react";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  actionText: string;
  loadingText: string;
  children: ReactNode;
}

export const Form = ({
  onSubmit,
  isPending,
  actionText,
  loadingText,
  children,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-6 bg-white dark:bg-gray-800 rounded-xl p-8"
    >
      {children}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 shadow-md"
      >
        {isPending ? loadingText : actionText}
      </button>
    </form>
  );
};
