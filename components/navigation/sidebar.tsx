import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddServerButton } from "@/components/server/add-server-button";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { UserAccountNav } from "@/components/marketing/user-account-nav";

export async function Sidebar() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!servers) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col py-3 space-y-4 items-center text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8]">
      <AddServerButton />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <div className="flex flex-col items-center gap-y-4">
        <ThemeToggle />
        <UserAccountNav user={user} />
      </div>
    </div>
  );
}
