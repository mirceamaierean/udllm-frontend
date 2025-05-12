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
  return response.json();
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
