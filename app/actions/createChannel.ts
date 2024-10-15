"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ChannelType, MemberRole } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Server name is required.",
    })
    .max(32)
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'.",
    }),
  type: z.nativeEnum(ChannelType),
});

export async function createChannel(
  values: z.infer<typeof formSchema>,
  serverId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to create channel.");
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
          create: {
            name,
            type,
            userId,
          },
        },
      },
    });
  } catch {
    throw new Error("Something went wrong!!");
  }
}
