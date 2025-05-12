import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ToggleSatireButton } from "@/components/ToggleSatireButton";

export function ChatInput({
  value,
  onChange,
  onSubmit,
  satireMode,
  onToggleSatire,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  satireMode: boolean;
  onToggleSatire: () => void;
}) {
  return (
    <div className="mt-auto p-6 border-t border-gray-200">
      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto relative flex flex-col gap-2"
      >
        <div className="flex justify-end mb-2">
          <ToggleSatireButton
            satireMode={satireMode}
            onToggle={onToggleSatire}
          />
        </div>
        <div className="relative">
          <Input
            value={value}
            onChange={onChange}
            placeholder="Type your question here..."
            className="w-full py-6 text-lg bg-white"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#498C8A] hover:bg-[#498C8A]/90"
          >
            <Send className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
