import React from "react";
import { Message } from "@/generated/prisma";
import { ChatMessage } from "@/components/ChatMessage";
import { FEATURED_QUESTIONS } from "@/lib/constants";
import { MessageWithPromptId } from "@/lib/types";

// New component for candidate AI messages
function MessageCandidates({
  candidates,
  onSelect,
}: {
  candidates: MessageWithPromptId[];
  onSelect: (msg: MessageWithPromptId) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 pt-8">
      <div className="text-[#947EB0] font-semibold mb-2 text-lg flex items-center gap-2">
        <span role="img" aria-label="party">
          🎉
        </span>
        Newsito Informiro has cooked up two answers for you! Click your favorite
        to add it to the chat.
      </div>
      <div className="flex gap-8 justify-center w-full">
        {candidates.map((msg, idx) => (
          <div
            key={msg.promptId || idx}
            className="flex-1 max-w-xs min-w-[250px] bg-white border border-[#e0d7e6] rounded-lg shadow-md p-6 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:border-[#947EB0] hover:shadow-lg cursor-pointer"
            onClick={() => onSelect(msg)}
          >
            <div className="text-lg font-medium text-[#1A181B] mb-2">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatArea({
  messages,
  chatContainerRef,
  generatingResponse,
  messagesWithPromptId,
  onSelectCandidate,
  onLikeClick,
}: {
  messages: Message[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
  generatingResponse?: boolean;
  messagesWithPromptId?: MessageWithPromptId[];
  onSelectCandidate?: (msg: MessageWithPromptId) => void;
  onLikeClick: (aiMessage: Message, score: number) => void;
}) {
  return (
    <div
      ref={chatContainerRef}
      className="flex-1 p-8 pb-16 flex flex-col items-center overflow-y-auto"
    >
      {!messages.length ? (
        <div className="space-y-6 max-w-2xl w-full">
          {FEATURED_QUESTIONS.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-lg border border-[#947EB0] bg-white flex items-center gap-6 shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-[#498C8A] flex items-center justify-center text-white text-xl flex-shrink-0">
                ?
              </div>
              <p className="text-[#1A181B] text-lg">{q.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-4 pt-8">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onLikeClick={onLikeClick}
            />
          ))}
          {messagesWithPromptId &&
            messagesWithPromptId.length > 1 &&
            onSelectCandidate && (
              <MessageCandidates
                candidates={messagesWithPromptId}
                onSelect={onSelectCandidate}
              />
            )}
          {generatingResponse && (
            <div className="flex items-center space-x-2 text-[#947EB0] pt-4">
              <span className="animate-bounce">AI is thinking...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
