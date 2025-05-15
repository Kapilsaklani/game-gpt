import React from "react";
import { useChat } from "../contexts/ChatContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useChat();
  return (
    <button
      onClick={toggleTheme}
      className="ml-2 px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
