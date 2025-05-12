import React from "react";

interface ToggleSatireButtonProps {
  satireMode: boolean;
  onToggle: () => void;
}

export function ToggleSatireButton({
  satireMode,
  onToggle,
}: ToggleSatireButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 focus:outline-none"
      aria-pressed={satireMode}
    >
      <span className="text-lg">🃏</span>
      <span className="mr-2 font-medium">Satire</span>
      <span
        className={`relative inline-block w-12 h-6 transition-colors duration-200 rounded-full overflow-hidden ${
          satireMode
            ? "bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-gradient-x"
            : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
            satireMode ? "translate-x-6" : ""
          }`}
        />
      </span>
      <span
        className={`ml-2 text-sm font-semibold ${
          satireMode ? "text-yellow-600" : "text-gray-500"
        }`}
      >
        {satireMode ? "On" : "Off"}
      </span>
    </button>
  );
}
