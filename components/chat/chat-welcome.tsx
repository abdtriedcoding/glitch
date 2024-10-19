import { Hash } from "lucide-react";

export function ChatWelcome({ name }: { name: string }) {
  return (
    <div className="space-y-2 px-4 mb-4">
      <div
        className="h-[75px] w-[75px] flex items-center justify-center rounded-full
        dark:bg-zinc-700 bg-zinc-500"
      >
        <Hash className="h-12 w-12 text-white" />
      </div>
      <p className="text-xl font-bold md:text-3xl">Welcome to #{name}</p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        This is the beginning of the channel.
      </p>
    </div>
  );
}
