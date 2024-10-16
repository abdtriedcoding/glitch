import { Hash } from "lucide-react";
import { Member, User, Server, Channel } from "@prisma/client";
import { MobileSidebar } from "@/components/navigation/mobile-sidebar";

export function ChatHeader({
  name,
  server,
  type,
}: {
  name: string;
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
  type: "conversation" | "channel";
}) {
  return (
    <div
      className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200
     dark:border-neutral-800 border-b-2"
    >
      <MobileSidebar server={server} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
}
