"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { FEATURED_QUESTIONS } from "@/lib/constants";
import { Conversation, User } from "@/generated/prisma";
import getAllConversations from "@/services/ConversationService";

export function ChatInterface({ user }: { user: User }) {
  const {
    conversation,
    showConversation,
    chatContainerRef,
    fetchAIResponse,
    setConversation,
    setShowConversation,
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user" as const,
    };
    setConversation((prev) => [...prev, newMessage]);
    setInputValue("");
    setShowConversation(true);

    await fetchAIResponse(inputValue);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await getAllConversations();
      setConversations(response);
    };

    fetchConversations();
  }, []);

  return (
    <div className="flex h-screen bg-[#EADEDA]">
      <Sidebar user={user} conversations={conversations} />

      <div className="flex-1 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 p-8 pb-16 flex flex-col items-center overflow-y-auto"
        >
          {!showConversation ? (
            <div className="space-y-6 max-w-2xl w-full">
              {FEATURED_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-lg border border-[#947EB0] bg-white flex items-center gap-6 shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-[#498C8A] flex items-center justify-center text-white text-xl flex-shrink-0">
                    ?
                  </div>
                  <p className="text-[#1A181B] text-lg">{q.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-2xl space-y-4 pt-8">
              {conversation.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
        </div>

        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
