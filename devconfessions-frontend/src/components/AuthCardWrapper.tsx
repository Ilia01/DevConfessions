export function AuthFormCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Dev Confessions
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            A place to share your dev struggles and learn from others.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
