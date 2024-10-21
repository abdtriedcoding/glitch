"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteChannel(serverId: string, channelId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    revalidatePath(`/s/${serverId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting server:", error);
    return { success: false, error: "Failed to delete channel." };
  }
}
