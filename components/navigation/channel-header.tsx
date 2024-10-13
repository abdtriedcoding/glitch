"use client";

import { InviteModal } from "@/components/modals/invite-modal";
import { Member, User, Server, Channel, MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServerHeaderProps {
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
  role: string;
}

export function ChannelHeader({ server, role }: ServerHeaderProps) {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR || isAdmin;
  const inviteCode = server.inviteCode;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 
        border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          {server.name}
          <ChevronDown className="h-5 w-5 text-neutral-400 dark:text-neutral-500 ml-2 sm:ml-auto transition" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-1">
        {isModerator && (
          <InviteModal inviteCode={inviteCode}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 cursor-pointer text-sm"
            >
              Invite people
              <UserPlus className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </InviteModal>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 cursor-pointer text-sm">
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 cursor-pointer text-sm">
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 cursor-pointer text-sm">
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 cursor-pointer text-sm">
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="px-3 py-2 cursor-pointer text-sm">
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
