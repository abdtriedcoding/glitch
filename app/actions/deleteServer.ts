"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function deleteServer(serverId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.server.delete({
      where: {
        id: serverId,
        userId,
      },
    });
  } catch {
    throw new Error("Something went wrong!!");
  }
}
