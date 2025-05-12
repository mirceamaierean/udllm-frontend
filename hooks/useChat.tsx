"use client";

import { useState, useRef } from "react";
import { Message } from "@/generated/prisma";
import { addMessage } from "@/services/MessageService";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showConversation, setShowConversation] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const buildContext = (userMessage: string, messages: Message[]) => {
    if (messages.length === 50) {
      // remove the oldest message
      messages.shift();
    }

    const context = messages
      .map((message) => `${message.senderId}: ${message.content}`)
      .join("\n");
    return context;
  };

  const fetchAIResponse = async (
    userMessage: string,
    conversationId: string,
  ) => {
    const context = buildContext(userMessage, messages);
    try {
      const response = await fetch("/api/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage,
          context,
        }),
      });
      const resp = await response.json();

      if (resp.messages.length == 1) {
        const message = await addMessage(
          resp.messages[0].content,
          conversationId,
          "ai",
        );
        return message;
      }

      return resp;
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const includeMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return {
    showConversation,
    setShowConversation,
    chatContainerRef,
    fetchAIResponse,
    includeMessage,
  };
}
