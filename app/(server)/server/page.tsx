import { auth } from "@/auth";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateServerModal } from "@/components/modals/create-server-modal";

export const metadata: Metadata = {
  title: "Create a Server",
  description:
    "Set up your own server for group chats, video calls, and real-time collaboration.",
};

export default async function ServerPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/s/${server.id}`);
  }

  return <CreateServerModal />;
}
