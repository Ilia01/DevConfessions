import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-gray-200",
        }}
      />
    </ThemeProvider>
  </React.StrictMode>
);
