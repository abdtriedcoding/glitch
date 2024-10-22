"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { pusherServer } from "@/lib/pusher-server";
import { EditChannelMessageformSchema } from "@/lib/validation-schemas";

export async function editChannelMessage(
  values: z.infer<typeof EditChannelMessageformSchema>,
  serverId: string,
  channelId: string,
  messageId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = EditChannelMessageformSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to edit channel message.");
  }

  const { content } = validatedFields.data;

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
      console.error("Error while editing channel message.");
      return { success: false, error: "Server not found." };
    }

    const channel = await prisma.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      console.error("Error while editing channel message.");
      return { success: false, error: "Channel not found." };
    }

    const member = server.members.find((member) => member.userId === userId);

    if (!member) {
      console.error("Error while editing channel message.");
      return { success: false, error: "Member not found." };
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
      console.error("Error while editing channel message.");
      return { success: false, error: "Message not found." };
    }

    const isAuthor = message.memberId === member.id;
    const isModerator = member.role === MemberRole.MODERATOR;
    const isAdmin = member.role === MemberRole.ADMIN;
    const canModify = isAuthor || isModerator || isAdmin;

    if (!canModify) {
      throw new Error("Unauthorized");
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId as string,
      },
      data: {
        content,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    await pusherServer.trigger(channelId, "message-updated", updatedMessage);
    return {
      success: true,
    };
  } catch {
    console.error("Error while editing channel message.");
    return {
      success: false,
      error: "Error while editing channel message.",
    };
  }
}
