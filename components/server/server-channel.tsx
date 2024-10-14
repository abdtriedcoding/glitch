"use client";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import {
  Member,
  User,
  Server,
  Channel,
  MemberRole,
  ChannelType,
} from "@prisma/client";

const channelIcons = {
  [ChannelType.TEXT]: (
    <Hash className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.AUDIO]: (
    <Mic className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
};

export function ServerChannel({
  channel,
  role,
  server,
}: {
  channel: Channel;
  role?: string;
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
}) {
  const params = useParams();

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zince-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {channelIcons[channel.type]}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="flex items-center gap-x-2 ml-auto">
          <EditServerModal
            serverId={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          >
            <Edit
              onClick={() => {}}
              className="hidden group-hover:block h-4 w-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </EditServerModal>
          <DeleteServerModal serverId={server.id} serverName={server.name}>
            <Trash
              onClick={() => {}}
              className="hidden group-hover:block h-4 w-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </DeleteServerModal>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
}
