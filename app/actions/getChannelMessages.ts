"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function getChannelMessages(channelId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const initialMessages = await prisma.message.findMany({
      where: {
        channelId,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return initialMessages;
  } catch {
    throw new Error("Something went wrong!!");
  }
}
