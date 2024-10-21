"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateRole(
  serverId: string,
  memberId: string,
  role: MemberRole
) {
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
          update: {
            where: {
              id: memberId,
              userId: {
                not: userId!,
              },
            },
            data: {
              role,
            },
          },
        },
      },
    });

    revalidatePath(`/s/${server?.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating member role:", error);
    return { success: false, error: "Failed to update member role." };
  }
}
