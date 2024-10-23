import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Search } from "@/components/server/search";
import { channelIcons, roleIcons } from "@/constant";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerMember } from "@/components/server/server-member";
import { ServerChannel } from "@/components/server/server-channel";
import { ChannelHeader } from "@/components/server/channel-header";
import { ChannelHeading } from "@/components/navigation/channel-heading";
import { Member, User, Server, Channel, ChannelType } from "@prisma/client";

interface ChannelSidebarProps {
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
}

export async function ChannelSidebar({ server }: ChannelSidebarProps) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

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
          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
          {textChannels.length > 0 && (
            <div className="mb-2">
              <ChannelHeading
                server={server}
                label="Text Channels"
                sectionType="channels"
                role={role}
                channelType={ChannelType.TEXT}
              />

              <div className="space-y-1">
                {textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
          {audioChannels.length > 0 && (
            <div className="mb-2">
              <ChannelHeading
                server={server}
                label="Voice Channels"
                sectionType="channels"
                role={role}
                channelType={ChannelType.AUDIO}
              />

              <div className="space-y-1">
                {audioChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
          {videoChannels.length > 0 && (
            <div className="mb-2">
              <ChannelHeading
                server={server}
                label="Video Channels"
                sectionType="channels"
                role={role}
                channelType={ChannelType.VIDEO}
              />

              <div className="space-y-1">
                {videoChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
          {members.length > 0 && (
            <div className="mb-2">
              <ChannelHeading
                server={server}
                label="Members"
                sectionType="members"
                role={role}
              />

              <div className="space-y-1">
                {members.map((member) => (
                  <ServerMember
                    key={member.id}
                    member={member}
                    server={server}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
