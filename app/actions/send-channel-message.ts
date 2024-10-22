"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pusherServer } from "@/lib/pusher-server";
import { ChatInputFormSchema } from "@/lib/validation-schemas";

export async function sendChannelMessage(
  values: z.infer<typeof ChatInputFormSchema>,
  channelId: string,
  serverId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = ChatInputFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to send message.");
  }

  const { content, fileUrl } = validatedFields.data;

  try {
    const server = await prisma.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      throw new Error("Server not found");
    }

    const channel = await prisma.channel.findFirst({
      where: {
        id: channelId,
        serverId: serverId,
      },
    });

    if (!channel) {
      throw new Error("Channel not found");
    }

    const member = server.members.find((member) => member.userId === userId);

    if (!member) {
      throw new Error("Member not found");
    }

    const message = await prisma.message.create({
      data: {
        content,
        fileUrl,
        channelId,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    pusherServer.trigger(channelId, "incoming-message", message);
    revalidatePath(`/s/${serverId}/channels/${channelId}`);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
