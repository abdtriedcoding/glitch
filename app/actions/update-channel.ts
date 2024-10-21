"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ChannelFormSchema } from "@/lib/validation-schemas";

export async function updateChannel(
  values: z.infer<typeof ChannelFormSchema>,
  serverId: string,
  channelId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = ChannelFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to edit channel.");
  }

  const { name, type } = validatedFields.data;

  try {
    await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: userId!,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    revalidatePath(`/s/${serverId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating server:", error);
    return { success: false, error: "Failed to update channel." };
  }
}
