// pages/Settings.tsx
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const { token } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 dark:text-black">User Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="mb-4">Logged in as user ID: {token?.user_id}</p>
        {/* Add your settings form/options here */}
      </div>
    </div>
  );
}
