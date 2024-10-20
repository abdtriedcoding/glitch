import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { OpenSource } from "@/components/marketing/open-source";
import { HeroSection } from "@/components/marketing/hero-section";
import { Testimonials } from "@/components/marketing/testimonials";
import { BackgroundParticles } from "@/components/marketing/background-particles";
import { BottomSectionLanding } from "@/components/marketing/bottom-section-landing";
import { IntegrationsSectionLanding } from "@/components/marketing/Integrations-section-landing";

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
    <div className="bg-gray-50 dark:bg-black relative flex flex-col overflow-hidden">
      <Navbar url={url} user={user} />
      <HeroSection url={url} user={user} />
      <IntegrationsSectionLanding url={url} user={user} />
      <Testimonials />
      <BottomSectionLanding url={url} user={user} />
      <OpenSource />
      <BackgroundParticles />
      <Footer />
    </div>
  );
}
