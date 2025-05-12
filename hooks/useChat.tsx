"use client";

import { useState, useRef } from "react";
import { Message } from "@/generated/prisma";
import { addMessage } from "@/services/MessageService";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showConversation, setShowConversation] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const buildContext = (userMessage: string, messages: Message[]) => {
    while (messages.length > 50) {
      // remove the oldest message
      messages.shift();
    }

    const context = messages
      .map(
        (message) =>
          `${message.senderId === "ai" ? "assistant" : "user"} : ${
            message.content
          }`,
      )
      .join("\n");
    return context;
  };

  const findPreviousMessageSendByUser = (messageId: string) => {
    // find index of messageId
    const index = messages.findIndex((message) => message.id === messageId);
    // find the message sent by user before the current message
    if (index === 0) return null;
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].senderId !== "ai") {
        return messages[i];
      }
    }
    return null;
  };

  const fetchAIResponse = async (
    userMessage: string,
    conversationId: string,
    mode: "satirical" | "normal",
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
          mode,
        }),
      });
      const resp = await response.json();

      if (resp.messages.length == 1) {
        const message = (await addMessage(
          resp.messages[0].content,
          conversationId,
          "ai",
        )) as Message;

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
    messages,
    setMessages,
    findPreviousMessageSendByUser,
  };
}
