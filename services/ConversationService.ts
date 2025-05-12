import { Conversation } from "@/generated/prisma";

export default async function getAllConversations(): Promise<Conversation[]> {
  const conversations = await fetch("/api/conversations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await conversations.json();
  return data.conversations as Conversation[];
}

export async function getConversatioMessagesById(conversationId: string) {
  const data = await fetch(
    `/api/conversation/?conversationId=${conversationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const { messages } = await data.json();
  return { messages };
}

export async function createConversation(title: string) {
  const conversation = await fetch("/api/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title }),
  });
  if (!conversation.ok) {
    throw new Error("Failed to create conversation");
  }
  return conversation.json();
}

export async function deleteConversation(conversationId: string) {
  const conversation = await fetch(
    `/api/conversation?conversationId=${conversationId}`,
    {
      method: "DELETE",
    },
  );
  if (!conversation.ok) {
    throw new Error("Failed to delete conversation");
  }
}
