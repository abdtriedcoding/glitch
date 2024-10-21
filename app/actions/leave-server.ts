"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function leaveServer(serverId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const server = await prisma.server.update({
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

    revalidatePath(`/s/${server.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error leaving server:", error);
    return { success: false, error: "Failed to leave server." };
  }
}
