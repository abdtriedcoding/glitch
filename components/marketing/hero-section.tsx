import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { ChevronRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { AuthModal } from "@/components/modals/auth-modal";
import { RainbowButton } from "@/components/ui/rainbow-button";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

export function HeroSection({
  url,
  user,
}: {
  url: string;
  user: User | undefined;
}) {
  return (
    <section className="relative mx-auto pt-40 items-center justify-center max-w-[80rem] px-4 text-center md:px-8">
      <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Introducing Glitch
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
      <h1 className="text-balance bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent  sm:text-6xl md:text-7xl lg:text-8xl">
        Connect and Collaborate
        <br className="hidden md:block" /> with communities in real-time
      </h1>
      <p className="mb-12 text-balance text-lg tracking-tight text-muted-foreground md:text-xl">
        Stay connected with groups and teams in one place.
        <br className="hidden md:block" /> Experience seamless communication and
        collaboration through real-time messaging, voice, and video calls.
      </p>
      {user ? (
        <RainbowButton>
          <Link href={url}>Open Glitch</Link>
        </RainbowButton>
      ) : (
        <AuthModal>
          <RainbowButton>Get Started</RainbowButton>
        </AuthModal>
      )}
      <div className="relative mt-[8rem]">
        <div className="rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] before:animate-image-glow">
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <img
            src="/hero-dark.png"
            alt="Hero Image"
            className="relative hidden h-full w-full rounded-[inherit] border object-contain dark:block"
          />
          <img
            src="/hero-light.png"
            alt="Hero Image"
            className="relative block h-full w-full  rounded-[inherit] border object-contain dark:hidden"
          />
        </div>
      </div>
    </section>
  );
}
