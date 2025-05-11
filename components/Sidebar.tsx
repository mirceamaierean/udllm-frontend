import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, User } from "@/generated/prisma";

export function Sidebar({
  user,
  conversations,
}: {
  user: User;
  conversations: Conversation[];
}) {
  return (
    <div className="w-80 bg-[#1A181B] text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6" />
        <h1 className="text-xl font-bold">Newsito Informiro</h1>
      </div>

      <Button className="w-full mb-6 bg-[#498C8A] hover:bg-[#498C8A]/90">
        <Plus className="w-4 h-4 mr-2" />
        New chat
      </Button>

      <div className="mb-4 flex-grow">
        <h2 className="text-sm text-gray-400 mb-2">Chat History</h2>
        <ScrollArea className="h-[calc(100vh-280px)]">
          {(Array.isArray(conversations) ? conversations : []).map(
            (conversation) => (
              <div
                key={conversation.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-[#766C7F] cursor-pointer mb-1"
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{conversation.title}</span>
              </div>
            )
          )}
        </ScrollArea>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.image || undefined} alt="User" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            {/* <User className="h-4 w-4" /> */}
            <span className="sr-only">User settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
