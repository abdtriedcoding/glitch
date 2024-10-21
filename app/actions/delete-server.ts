"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteServer(serverId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const server = await prisma.server.delete({
      where: {
        id: serverId,
        userId,
      },
    });

    revalidatePath(`/s/${server.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting server:", error);
    return { success: false, error: "Failed to delete server." };
  }
}
