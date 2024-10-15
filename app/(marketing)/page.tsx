import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignIn, SignOut } from "@/components/login-logout";

// TODO: Need to code marketing page
export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  let url;
  if (server) {
    url = `/s/${server.id}`;
  } else {
    url = "/server";
  }

  return (
    <>
      <h1 className="text-3xl text-center bg-red-500">Marketing Page</h1>
      <main className="flex flex-col space-y-5">
        {session?.user ? (
          <>
            <p>Hey {session.user.name}</p>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
        <Button asChild>
          <Link href={url}>Open Glitch</Link>
        </Button>
        <ThemeToggle />
      </main>
    </>
  );
}
