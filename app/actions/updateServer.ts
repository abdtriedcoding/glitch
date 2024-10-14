"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export async function updateServer(
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
    throw new Error("Invalid fields. Failed to update server.");
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    await prisma.server.update({
      where: {
        id: serverId,
        userId,
      },
      data: {
        name,
        imageUrl,
      },
    });
  } catch {
    throw new Error("Something went wrong!!");
  }
}
