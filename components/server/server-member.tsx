"use client";

import { roleIcons } from "@/constant";
import { Member, Server, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServerMemberProps {
  member: Member & { user: User };
  server: Server;
}

export function ServerMember({ member }: ServerMemberProps) {
  return (
    <div className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zince-700/10 dark:hover:bg-zinc-700/50 transition mb-1">
      <Avatar className="w-6 h-6">
        <AvatarImage src={member.user.image ?? ""} />
        <AvatarFallback>{member.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>

      <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
        {member?.user?.name}
      </p>
      {roleIcons[member.role]}
    </div>
  );
}
