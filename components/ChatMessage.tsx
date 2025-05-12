import { Message } from "@/generated/prisma";

export function ChatMessage({ message }: { message: Message }) {
  // console.log(message);
  return (
    <div
      className={`flex ${
        message.senderId === "ai" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          message.senderId === "ai"
            ? "bg-white border border-[#947EB0]"
            : "bg-[#498C8A] text-white"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
