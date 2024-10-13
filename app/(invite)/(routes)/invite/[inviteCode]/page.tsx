import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    inviteCode: string;
  };
}) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/s/${existingServer.id}`);
  }

  const server = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          userId: user.id!,
        },
      },
    },
  });

  if (server) {
    return redirect(`/s/${server.id}`);
  }

  return <></>;
}