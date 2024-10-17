import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ChannelSidebar } from "@/components/server/channel-sidebar";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen">
      <div className="w-60 min-h-screen hidden flex-col md:flex fixed inset-y-0 z-30">
        <ChannelSidebar server={server} />
      </div>
      <main className="md:pl-60 min-h-screen">{children}</main>
    </div>
  );
}
