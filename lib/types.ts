export type Sender = "user" | "ai";

export type MessageWithPromptId = {
  content: string;
  promptId: string;
  articles: string[];
  sender: Sender;
};

export interface FeaturedQuestion {
  id: number;
  text: string;
}
