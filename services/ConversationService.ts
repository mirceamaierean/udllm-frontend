import { Conversation } from "@/generated/prisma";

export default async function getAllConversations(): Promise<Conversation[]> {
  const conversations = await fetch("/api/conversations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await conversations.json();
  return data as Conversation[];
}

export async function getConversationById(conversationId: string) {
  const conversation = await fetch(`/api/conversations/${conversationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return conversation;
}
