import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const { serverId } = params;

  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const server = await prisma.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name === "general") {
    redirect(`/s/${serverId}/channels/${initialChannel.id}`);
  }

  return redirect("/");
}
