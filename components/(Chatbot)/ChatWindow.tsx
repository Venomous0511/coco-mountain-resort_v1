"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (text: string) => {
    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const aiReply: Message = {
        sender: "ai",
        text: data.message,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Failed to get AI response." },
      ]);
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col h-[90vh] border rounded-lg overflow-hidden shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted">
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} message={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
