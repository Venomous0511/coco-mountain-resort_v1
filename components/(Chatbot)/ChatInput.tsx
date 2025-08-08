"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

export default function ChatInput({
  onSend,
}: {
  onSend: (message: string) => void;
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex gap-2 p-2 bg-background border-t">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1"
      />
      <Button onClick={handleSend} size="icon">
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </div>
  );
}
