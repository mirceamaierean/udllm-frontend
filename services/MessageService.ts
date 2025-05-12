import { Message } from "@/generated/prisma";

export async function addMessage(
  content: string,
  conversationId: string,
  userId: string,
) {
  console.log(content, conversationId, userId);
  const response = await fetch("/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, conversationId, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add message");
  }
  const message = (await response.json()) as Message;
  return message;
}

export async function updateLikeDislike(promptId: string, liked: boolean) {
  const response = await fetch("/api/prompts", {
    method: "POST",
    body: JSON.stringify({ promptId, liked }),
  });
  if (!response.ok) {
    throw new Error("Failed to update like/dislike");
  }
  return response.json();
}

export async function rewardMessages(
  prompt: string,
  response: string,
  reward: number,
) {
  const resp = await fetch("/api/message/reward", {
    method: "POST",
    body: JSON.stringify({ prompt, response, reward }),
  });
  if (!resp.ok) {
    throw new Error("Failed to reward");
  }
}
