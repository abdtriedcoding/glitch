"use client";

import { cn } from "@/lib/utils";
import { channelIcons } from "@/constant";
import { Edit, Lock, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DialogTrigger } from "@/components/ui/dialog";
import { ActionTooltip } from "@/components/action-tooltip";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { Member, User, Server, Channel, MemberRole } from "@prisma/client";

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
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/s/${server.id}/channels/${channel.id}`);
  };

  return (
    <button
      onClick={(e) => onClick(e)}
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
          <EditChannelModal
            serverId={server.id}
            channelId={channel.id}
            name={channel.name}
            type={channel.type}
          >
            <ActionTooltip label="Edit channel" side="right" align="center">
              <DialogTrigger asChild>
                <Edit
                  onClick={(e) => e.stopPropagation()}
                  className="hidden group-hover:block h-4 w-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </DialogTrigger>
            </ActionTooltip>
          </EditChannelModal>
          <DeleteChannelModal
            serverId={server.id}
            channelId={channel.id}
            channelName={channel.name}
          >
            <ActionTooltip label="Delete Channel" side="right" align="center">
              <DialogTrigger asChild>
                <Trash
                  onClick={(e) => e.stopPropagation()}
                  className="hidden group-hover:block h-4 w-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </DialogTrigger>
            </ActionTooltip>
          </DeleteChannelModal>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
}
