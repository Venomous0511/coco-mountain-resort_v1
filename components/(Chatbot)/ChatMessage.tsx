// components/ChatMessage.tsx
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
}

export function ChatMessage({ message, sender }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "max-w-xs px-4 py-2 rounded-2xl shadow-sm text-sm whitespace-pre-wrap",
        sender === "user"
          ? "ml-auto bg-blue-600 text-white rounded-br-none w-[60%]"
          : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none w-[60%]"
      )}
    >
      {message}
    </div>
  );
}
