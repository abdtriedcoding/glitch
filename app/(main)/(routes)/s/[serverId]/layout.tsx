import { auth } from "@/auth";
import { ChannelSidebar } from "@/components/navigation/channel-sidebar";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

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
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen">
      <div className="w-60 min-h-screen hidden flex-col md:flex fixed inset-y-0 z-30">
        <ChannelSidebar serverId={params.serverId} />
      </div>
      <main className="md:pl-60 min-h-screen">{children}</main>
    </div>
  );
}
