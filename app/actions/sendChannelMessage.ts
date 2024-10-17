"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ChatInputFormSchema } from "@/lib/validationSchemas";

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
    throw new Error("Invalid fields. Failed to create server.");
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

    await prisma.message.create({
      data: {
        content,
        fileUrl,
        channelId,
        memberId: member.id,
      },
    });
  } catch {
    throw new Error("Something went wrong!!");
  }
}
