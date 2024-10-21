"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ServerFormSchema } from "@/lib/validation-schemas";

export async function updateServer(
  values: z.infer<typeof ServerFormSchema>,
  serverId: string
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = ServerFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields. Failed to update server.");
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    const server = await prisma.server.update({
      where: {
        id: serverId,
        userId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    revalidatePath(`/s/${server.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating server:", error);
    return { success: false, error: "Failed to update server." };
  }
}
