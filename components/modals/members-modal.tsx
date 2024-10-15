"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateRole } from "@/app/actions/updateRole";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteMember } from "@/app/actions/deleteMember";
import { Member, User, Server, Channel, MemberRole } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MembersModalProps {
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
  children: React.ReactNode;
}

const roleIcons = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
};

export function MembersModal({ server, children }: MembersModalProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");

  const onRoleChange = async (
    serverId: string,
    memberId: string,
    role: MemberRole
  ) => {
    setLoadingId(memberId);
    await updateRole(serverId, memberId, role);
    router.refresh();
    setLoadingId("");
  };

  const onKick = async (serverId: string, memberId: string) => {
    setLoadingId(memberId);
    await deleteMember(serverId, memberId);
    router.refresh();
    setLoadingId("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen scrollbar">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member?.id} className="flex items-center gap-x-2 mb-6">
              <Avatar>
                <AvatarImage src={member.user.image ?? ""} />
                <AvatarFallback>{member.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold items-center flex gap-x-1">
                  {member?.user.name}
                  {roleIcons[member?.role]}
                </div>
                <p className="text-xs text-zinc-500">{member?.user.email}</p>
              </div>

              {server?.userId !== member?.userId &&
                loadingId !== member?.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(server.id, member?.id, "GUEST")
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Guest
                                {member?.role === "GUEST" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(
                                    server.id,
                                    member?.id,
                                    "MODERATOR"
                                  )
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Moderator
                                {member?.role === "MODERATOR" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(server.id, member?.id)}
                        >
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member?.id && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
