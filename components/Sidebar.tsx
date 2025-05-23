import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, User } from "@/generated/prisma";
import Link from "next/link";
import { ChatHistory } from "@/components/ChatHistory";
import React from "react";
import { deleteConversation } from "@/services/ConversationService";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function Sidebar({
  user,
  conversations,
  setConversations,
  conversationId,
}: {
  user: User;
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  conversationId?: string | null;
}) {
  const router = useRouter();
  const handleDeleteConversation = async (id: string) => {
    setConversations(conversations.filter((c) => c.id !== id));
    await deleteConversation(id);
    if (conversationId === id) {
      router.push("/chat");
    }
  };

  return (
    <div className="w-80 bg-[#1A181B] text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6" />
        <h1 className="text-xl font-bold">Newsito Informiro</h1>
      </div>

      <Link href="/chat">
        <Button className="w-full mb-6 bg-[#498C8A] hover:bg-[#498C8A]/90">
          <Plus className="w-4 h-4 mr-2" />
          New chat
        </Button>
      </Link>

      <div className="mb-4 flex-grow">
        <h2 className="text-sm text-gray-400 mb-2">Chat History</h2>
        <ChatHistory
          conversations={conversations}
          onDelete={handleDeleteConversation}
        />
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.image as string} alt="User" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => signOut()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 15l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className="sr-only">User settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
