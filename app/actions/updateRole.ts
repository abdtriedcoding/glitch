"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";

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
    await prisma.server.update({
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
  } catch {
    throw new Error("Something went wrong!!");
  }
}
