"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function deleteMember(serverId: string, memberId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.server.update({
      where: {
        id: serverId,
        userId: userId!,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            userId: {
              not: userId,
            },
          },
        },
      },
    });
  } catch {
    throw new Error("Something went wrong!!");
  }
}
