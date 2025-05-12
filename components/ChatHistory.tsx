import { Conversation } from "@/generated/prisma";
import { MessageSquare, Trash } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatHistory({
  conversations,
  onDelete,
}: {
  conversations: Conversation[];
  onDelete: (id: string) => void;
}) {
  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      {(Array.isArray(conversations) ? conversations : []).map(
        (conversation) => (
          <div
            key={conversation.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-[#766C7F] cursor-pointer mb-1 justify-between"
          >
            <Link
              href={`/chat?conversationId=${conversation.id}`}
              className="flex items-center gap-2 flex-grow"
            >
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{conversation.title}</span>
            </Link>
            <button
              onClick={() => onDelete(conversation.id)}
              className="ml-2 p-1 rounded hover:bg-red-100"
              title="Delete chat"
            >
              <Trash className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ),
      )}
    </ScrollArea>
  );
}
