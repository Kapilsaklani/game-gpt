import React, { useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { fetchGeminiResponse } from "../api/gemini";
import { fetchGamesComparison } from "../api/gameCompare";

const GEMINI_API_KEY = "AIzaSyCNsatFnfNEEjP9nZWTa6J4wmOInQyE62U"; // <-- Replace with your actual Gemini 2.0 API key

export default function InputBar() {
  const [input, setInput] = useState("");
  const {
    chatHistory,
    setChatHistory,
    isTyping,
    setIsTyping,
    newChat,
  } = useChat();

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { role: "user", parts: [{ text: input }] };

    // Check for 'compare X and Y' pattern (case-insensitive)
    const compareMatch = input.match(/compare\s+([\w\s]+)\s+and\s+([\w\s]+)/i);
    if (compareMatch) {
      setChatHistory([...chatHistory, userMsg, { role: "model", parts: [{ text: "Comparing games..." }] }]);
      setInput("");
      setIsTyping(true);
      try {
        const gameNames = [compareMatch[1].trim(), compareMatch[2].trim()];
        const games = await fetchGamesComparison(gameNames);
        // Send a custom event to trigger the modal in ChatWindow
        window.dispatchEvent(new CustomEvent("showCompareGames", { detail: games }));
        setChatHistory(prev => ([...prev, userMsg, { role: "model", parts: [{ text: "Here is a side-by-side comparison of the games you requested." }] }]));
      } catch (e) {
        setChatHistory(prev => ([...prev, userMsg, { role: "model", parts: [{ text: "Sorry, I couldn't compare those games." }] }]));
      }
      setIsTyping(false);
      return;
    }

    setChatHistory([...chatHistory, userMsg]);
    setInput("");
    setIsTyping(true);
    try {
      const reply = await fetchGeminiResponse([...chatHistory, userMsg], input, GEMINI_API_KEY);
      setChatHistory([
        ...chatHistory,
        userMsg,
        { role: "model", parts: [{ text: reply }] },
      ]);
    } catch (e) {
      setChatHistory([
        ...chatHistory,
        userMsg,
        { role: "model", parts: [{ text: "Sorry, there was an error." }] },
      ]);
    }
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center border-t border-gray-200 dark:border-[#23263a] p-3 bg-gray-100 dark:bg-[#23263a] sticky bottom-0 z-10 rounded-b-xl">

      <textarea
        className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-[#23263a] px-3 py-2 mr-3 bg-white dark:bg-[#181B23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-400 dark:placeholder:text-blue-300 min-h-[40px] max-h-[80px]"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isTyping}
      />
      <button
        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all disabled:opacity-60"
        onClick={handleSend}
        disabled={!input.trim() || isTyping}
        type="button"
      >
        SEND
      </button>
    </div>
  );
}
