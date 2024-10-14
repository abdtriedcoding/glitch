import { Plus, Settings } from "lucide-react";
import { MembersModal } from "@/components/modals/members-modal";
import { Member, User, Server, Channel, MemberRole } from "@prisma/client";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";

export function ChannelHeading({
  server,
  label,
  sectionType,
  role,
}: {
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
  label: string;
  sectionType: "channels" | "members";
  role: MemberRole | undefined;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold  text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <CreateChannelModal serverId={server.id}>
          <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Plus className="h-4 w-4" />
          </button>
        </CreateChannelModal>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <MembersModal server={server}>
          <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Settings className="h-4 w-4" />
          </button>
        </MembersModal>
      )}
    </div>
  );
}
