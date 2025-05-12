import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <div className="bg-white/80 rounded-xl shadow-xl p-10 flex flex-col items-center max-w-xl w-full mx-4">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-[#947EB0] drop-shadow-lg">
          Newsito Informiro
        </h1>
        <p className="text-lg text-center mb-6 text-gray-700">
          Welcome to{" "}
          <span className="font-semibold text-[#498C8A]">
            Newsito Informiro
          </span>{" "}
          — your AI-powered, satirical news chat!
          <br />
          <span className="inline-block mt-2">
            Ask questions, get answers, and toggle{" "}
            <span className="font-bold text-yellow-500">Satire Mode 🃏</span>{" "}
            for a wild ride through the news.
          </span>
        </p>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🃏</span>
          <span className="text-2xl">🤡</span>
          <span className="text-2xl">🎭</span>
          <span className="text-2xl">🎉</span>
        </div>
        <Link href="/chat">
          <button className="px-6 py-3 rounded-full bg-[#498C8A] text-white font-bold text-lg shadow hover:bg-[#947EB0] transition">
            Start Chatting
          </button>
        </Link>
        <p className="mt-6 text-sm text-gray-500 text-center">
          <span className="font-semibold text-yellow-600">Satire Mode</span>{" "}
          lets you experience the news with a twist. Toggle it on or off anytime
          in the chat!
        </p>
      </div>
    </main>
  );
}
