import React, { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([
    { id: 1, title: 'Chat 1', messages: [] }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [theme, setTheme] = useState("dark");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Get chat history for active chat
  const activeChat = chats.find(c => c.id === activeChatId);
  const chatHistory = Array.isArray(activeChat?.messages) ? activeChat.messages : [];

  // Set chat history for active chat
  const setChatHistory = (messages) => {
    setChats(prev => prev.map(chat =>
      chat.id === activeChatId ? { ...chat, messages } : chat
    ));
  };

  // Create new chat
  const newChat = () => {
    const newId = chats.length > 0 ? Math.max(...chats.map(c => c.id)) + 1 : 1;
    const newChatObj = { id: newId, title: `Chat ${newId}`, messages: [] };
    setChats(prev => [...prev, newChatObj]);
    setActiveChatId(newId);
  };

  // Switch active chat
  const switchChat = (id) => {
    setActiveChatId(id);
  };

  // Chat list for sidebar
  const chatList = chats.map(({ id, title }) => ({ id, title }));

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ChatContext.Provider value={{
      chatHistory, setChatHistory, theme, toggleTheme, newChat, isTyping, setIsTyping, chatList, activeChatId, switchChat
    }}>
      {children}
    </ChatContext.Provider>
  );
}
