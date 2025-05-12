"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { User } from "@/generated/prisma";

export function UserMenu({ user }: { user: User }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setMenuOpen((open) => !open)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
      >
        <span className="sr-only">User settings</span>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" />
          <circle cx="10" cy="7" r="1.5" fill="#fff" />
          <rect x="9" y="10" width="2" height="5" rx="1" fill="#fff" />
        </svg>
      </Button>
      {menuOpen && (
        <div
          ref={menuRef}
          className="right-0 top-12 bg-white text-black rounded shadow-lg py-2 w-40 z-50 border border-gray-200"
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setMenuOpen(false);
              router.push("/settings");
            }}
          >
            User Settings
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
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
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
