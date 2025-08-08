"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { MessageCircle, X, SendHorizonal } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMsg.text }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { sender: "ai", text: data.message }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Failed to get AI response." },
      ]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          className="rounded-full h-12 w-12 animate-pulse-scale shadow-primary"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}

      {isOpen && (
        <div className="w-80 h-[400px] bg-background rounded-xl shadow-2xl border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-1 border-b bg-muted">
            <span className="font-semibold text-sm">Coco Bot</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-muted">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} sender={msg.sender} message={msg.text} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-2 border-t bg-background">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSend}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
