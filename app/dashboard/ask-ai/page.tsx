"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { SendHorizonal } from "lucide-react";

export default function AskAiPage() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user" as const, content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botReply = data?.reply || "Sorry, I didn't understand that.";
    const botMessage = { role: "bot" as const, content: botReply };

    setMessages((prev) => [...prev, botMessage]);
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-[100%] flex flex-col bg-background">
      <Card className="flex flex-col flex-1 w-full max-w-6xl mx-auto border">
        <ScrollArea className="flex-1 p-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center mt-24">Start chatting with Coco Bot...</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-lg px-4 py-2 max-w-[50%] ${
                  msg.role === "user" ? "bg-primary text-white self-end ml-auto" : "bg-muted text-foreground self-start"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center p-3 border-t gap-2"
        >
          <Input
            className="flex-1"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            <SendHorizonal className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
