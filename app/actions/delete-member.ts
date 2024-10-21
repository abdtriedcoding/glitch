"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMember(serverId: string, memberId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const server = await prisma.server.update({
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

    revalidatePath(`/s/${server?.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting member:", error);
    return { success: false, error: "Failed to kick member." };
  }
}
