"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Sidebar } from "@/components/Sidebar";
import { ChatInput } from "@/components/ChatInput";
import { Conversation, Message, User } from "@/generated/prisma";
import getAllConversations, {
  createConversation,
  getConversatioMessagesById,
} from "@/services/ConversationService";
import { useSearchParams, useRouter } from "next/navigation";
import { addMessage, updateLikeDislike } from "@/services/MessageService";
import { ChatArea } from "@/components/ChatArea";
import { MessageWithPromptId } from "@/lib/types";

export function ChatInterface({ user }: { user: User }) {
  const { chatContainerRef, fetchAIResponse } = useChat();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messagesWithPromptId, setMessagesWithPromptId] = useState<
    MessageWithPromptId[]
  >([]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [generatingResponse, setGeneratingResponse] = useState(false);

  useEffect(() => {
    setConversationId(searchParams.get("conversationId"));
  }, [searchParams]);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    const fetchMessages = async () => {
      const { messages } = await getConversatioMessagesById(conversationId);
      setMessages(Array.isArray(messages) ? messages : []);
    };
    fetchMessages();
  }, [conversationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    let id = conversationId;

    if (!id) {
      const newConversation = await createConversation(inputValue);
      id = newConversation.id as string;
      setConversationId(id);
      setConversations((prev) => [newConversation, ...prev]);
      router.push(`/chat?conversationId=${id}`);
    }

    setGeneratingResponse(true);

    try {
      const newMessage = (await addMessage(inputValue, id, user.id)) as Message;
      setMessages((prev) => [...prev, newMessage]);
      const aiMessage = await fetchAIResponse(inputValue, id);
      if (aiMessage.messages.length > 1) {
        setMessagesWithPromptId(aiMessage.messages);
      } else {
        setMessages((prev) => [...prev, aiMessage]);
      }
      setInputValue("");
    } catch (error) {
      console.error("Error adding message:", error);
    } finally {
      setGeneratingResponse(false);
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await getAllConversations();
      console.log(response);
      setConversations(response);
    };

    fetchConversations();
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar
        user={user}
        conversations={conversations}
        setConversations={setConversations}
        conversationId={conversationId}
      />

      <div className="flex-1 flex flex-col">
        <ChatArea
          messages={messages}
          chatContainerRef={chatContainerRef}
          generatingResponse={generatingResponse}
          messagesWithPromptId={messagesWithPromptId}
          onSelectCandidate={async (msg) => {
            if (!conversationId) return;
            const saved = await addMessage(msg.content, conversationId, "ai");
            setMessages((prev) => [...prev, saved]);
            setMessagesWithPromptId([]);
            try {
              await updateLikeDislike(msg.promptId, true);
              // update with dislike the other prompt
              const otherPrompt = messagesWithPromptId.find(
                (m) => m.promptId !== msg.promptId,
              );
              if (otherPrompt) {
                await updateLikeDislike(otherPrompt.promptId, false);
              }
            } catch (error) {
              console.error("Error updating like/dislike:", error);
            }
          }}
        />
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
