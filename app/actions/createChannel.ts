"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ChannelFormSchema } from "@/lib/validation-schemas";

export async function createChannel(
  values: z.infer<typeof ChannelFormSchema>,
  serverId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = ChannelFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to create channel.");
  }

  const { name, type } = validatedFields.data;

  try {
    const server = await prisma.server.update({
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
          create: {
            name,
            type,
            userId,
          },
        },
      },
    });

    revalidatePath(`/s/${server?.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error creating channel:", error);
    return { success: false, error: "Failed to create channel." };
  }
}
