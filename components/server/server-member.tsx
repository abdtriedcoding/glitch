"use client";

import { cn } from "@/lib/utils";
import { roleIcons } from "@/constant";
import { Member, Server, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServerMemberProps {
  member: Member & { user: User };
  server: Server;
}

// TODO: need to see we need one-one chat or not
export function ServerMember({ member }: ServerMemberProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <button
      onClick={() =>
        router.push(`/s/${params.serverId}/conversations/${member.id}`)
      }
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zince-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Avatar className="w-6 h-6">
        <AvatarImage src={member.user.image ?? ""} />
        <AvatarFallback>{member.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>

      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member?.user?.name}
      </p>
      {roleIcons[member.role]}
    </button>
  );
}
