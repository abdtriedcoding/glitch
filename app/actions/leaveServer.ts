"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function leaveServer(serverId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.server.update({
      where: {
        id: serverId,
        userId: {
          not: userId,
        },
        members: {
          some: {
            userId,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            userId,
          },
        },
      },
    });
  } catch {
    throw new Error("Something went wrong!!");
  }
}
