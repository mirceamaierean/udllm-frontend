import { Message } from "@/generated/prisma";
import React from "react";

export function ChatMessage({
  message,
  onLikeClick,
}: {
  message: Message;
  onLikeClick: (message: Message, score: number) => void;
}) {
  // console.log(message);
  const isAI = message.senderId === "ai";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          isAI ? "bg-white border border-[#947EB0]" : "bg-[#498C8A] text-white"
        }`}
      >
        <p>{message.content}</p>
        {isAI && (
          <div className="flex gap-2 mt-2 justify-end">
            <button
              className="hover:bg-gray-100 rounded-full p-1 transition"
              title="Like"
              onClick={() => onLikeClick(message, 1)}
            >
              👍
            </button>
            <button
              className="hover:bg-gray-100 rounded-full p-1 transition"
              title="Dislike"
              onClick={() => onLikeClick(message, -1)}
            >
              👎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
