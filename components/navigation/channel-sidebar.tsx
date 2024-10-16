import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { Search } from "@/components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChannelHeader } from "@/components/navigation/channel-header";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

const channelIcons = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
};

const roleIcons = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" />,
};

export async function ChannelSidebar({ serverId }: { serverId: string }) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server?.channels.filter(
    (channel) => channel.type === "TEXT"
  );

  const audioChannels = server?.channels.filter(
    (channel) => channel.type === "AUDIO"
  );

  const videoChannels = server?.channels.filter(
    (channel) => channel.type === "VIDEO"
  );

  const members = server?.members?.filter(
    (member) => member.userId !== user.id
  );

  const role = server.members.find((member) => member.userId === user.id)?.role;

  const searchData = [
    {
      label: "Text Channels",
      data: textChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: channelIcons[channel.type],
      })),
    },
    {
      label: "Voice Channels",
      data: audioChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: channelIcons[channel.type],
      })),
    },
    {
      label: "Video Channels",
      data: videoChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        icon: channelIcons[channel.type],
      })),
    },
    {
      label: "Members",
      data: members?.map((member) => ({
        id: member.id,
        name: member.user.name,
        icon: roleIcons[member.role],
      })),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ChannelHeader server={server} role={role || ""} />
      <ScrollArea className="flex-1 px-3">
        <div className="pt-2">
          <Search searchData={searchData} />
        </div>
      </ScrollArea>
    </div>
  );
}
