import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateServerModal } from "@/components/modals/create-server-modal";

export default async function Page() {
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
