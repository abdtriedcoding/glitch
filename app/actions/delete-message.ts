"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { pusherServer } from "@/lib/pusher-server";

export async function deleteMessage(
  serverId: string,
  channelId: string,
  messageId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const server = await prisma.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      console.error("Error while deleting channel message.");
      return { success: false, error: "Server not found." };
    }

    const channel = await prisma.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      console.error("Error while deleting channel message.");
      return { success: false, error: "Channel not found." };
    }

    const member = server.members.find((member) => member.userId === userId);

    if (!member) {
      console.error("Error while deleting channel message.");
      return { success: false, error: "Channel not found." };
    }

    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
        channelId: channelId,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      console.error("Error while deleting channel message.");
      return { success: false, error: "Message not found." };
    }

    const isAuthor = message.memberId === member.id;
    const isModerator = member.role === MemberRole.MODERATOR;
    const isAdmin = member.role === MemberRole.ADMIN;
    const canModify = isAuthor || isModerator || isAdmin;

    if (!canModify) {
      throw new Error("Unauthorized");
    }

    const deletedMessage = await prisma.message.update({
      where: {
        id: messageId as string,
      },
      data: {
        deleted: true,
        fileUrl: null,
        content: "This message has been deleted.",
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    await pusherServer.trigger(channelId, "message-deleted", deletedMessage);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Error while deleting channel message.",
    };
  }
}
