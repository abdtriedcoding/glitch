import Link from "next/link";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/modals/auth-modal";

export function BottomSectionLanding({
  url,
  user,
}: {
  url: string;
  user: User | undefined;
}) {
  return (
    <section className="mx-auto my-20 max-w-[80rem] px-6 text-center md:px-8 space-y-4">
      <h2 className="translate-y-[-1rem] text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-5xl font-medium leading-none tracking-tighter text-transparent [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">
        Built for everyone
        <br className="hidden md:block" /> Available today.
      </h2>
      <div className="space-x-4">
        {user ? (
          <Button variant={"primary"} asChild>
            <Link href={url}>Open Glitch</Link>
          </Button>
        ) : (
          <AuthModal>
            <Button variant={"primary"}>Get Started for free</Button>
          </AuthModal>
        )}
      </div>
    </section>
  );
}
