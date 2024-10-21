"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { MemberRole } from "@prisma/client";
import { ServerFormSchema } from "@/lib/validation-schemas";

export async function createServer(values: z.infer<typeof ServerFormSchema>) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = ServerFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to create server.");
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    const server = await prisma.server.create({
      data: {
        userId,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              userId,
            },
          ],
        },
        members: {
          create: [
            {
              userId,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    revalidatePath(`/s/${server?.id}`);
    return { success: true, data: server };
  } catch (error) {
    console.error("Error creating server:", error);
    return { success: false, error: "Failed to create server." };
  }
}
