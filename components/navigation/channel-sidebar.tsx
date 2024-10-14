import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ChannelHeader } from "@/components/navigation/channel-header";

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

  // TODO: need to render this on channel sidebar
  // const textChannels = server?.channels.filter(
  //   (channel) => channel.type === "TEXT"
  // );

  // const audioChannels = server?.channels.filter(
  //   (channel) => channel.type === "AUDIO"
  // );

  // const videoChannels = server?.channels.filter(
  //   (channel) => channel.type === "VIDEO"
  // );

  // const members = server?.members?.filter(
  //   (member) => member.userId !== user.id
  // );

  const role = server.members.find((member) => member.userId === user.id)?.role;

  return (
    <div className="min-h-screen flex flex-col text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ChannelHeader server={server} role={role || ""} />
    </div>
  );
}
