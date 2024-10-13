"use server";

import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export async function createServer(values: z.infer<typeof formSchema>) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const validatedFields = formSchema.safeParse(values);

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

    return server;
  } catch {
    throw new Error("Something went wrong!!");
  }
}
