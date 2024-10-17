import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { getChannelMessages } from "@/app/actions/getChannelMessages";

interface ChannelIdPageProps {
  params: {
    channelId: string;
    serverId: string;
  };
}

export default async function Page({ params }: ChannelIdPageProps) {
  const { channelId, serverId } = params;

  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await prisma.member.findFirst({
    where: {
      serverId,
      userId: user.id,
    },
  });

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
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

  if (!member || !channel || !server) {
    return redirect("/");
  }

  const serializedMessages = await getChannelMessages(channelId);

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col min-h-screen">
      <ChatHeader name={channel.name} server={server} type="channel" />
      <ChatMessages name={channel.name} initialMessages={serializedMessages} />
      <ChatInput
        name={channel?.name}
        channelId={channelId}
        serverId={serverId}
      />
    </div>
  );
}
