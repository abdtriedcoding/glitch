import { Plus, Settings } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { ActionTooltip } from "@/components/action-tooltip";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import {
  Member,
  User,
  Server,
  Channel,
  MemberRole,
  ChannelType,
} from "@prisma/client";

export function ChannelHeading({
  server,
  label,
  sectionType,
  role,
  channelType,
}: {
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
  label: string;
  sectionType: "channels" | "members";
  role: MemberRole | undefined;
  channelType?: ChannelType;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold  text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <CreateChannelModal serverId={server.id} channelType={channelType}>
          <ActionTooltip label="Add a channel" side="right" align="center">
            <DialogTrigger asChild>
              <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                <Plus className="h-4 w-4" />
              </button>
            </DialogTrigger>
          </ActionTooltip>
        </CreateChannelModal>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <MembersModal server={server}>
          <ActionTooltip label="Manage Member" side="right" align="center">
            <DialogTrigger asChild>
              <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                <Settings className="h-4 w-4" />
              </button>
            </DialogTrigger>
          </ActionTooltip>
        </MembersModal>
      )}
    </div>
  );
}
