import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/marketing/navbar";
import { HeroSection } from "@/components/marketing/hero-section";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  let url = "/server";

  if (user) {
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
      url = `/s/${server.id}`;
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-black">
      <Navbar url={url} />
      <HeroSection url={url} />
    </div>
  );
}
