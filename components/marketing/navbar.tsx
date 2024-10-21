import Link from "next/link";
import { auth } from "@/auth";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/modals/auth-modal";
import { UserAccountNav } from "@/components/marketing/user-account-nav";

export async function Navbar({ url }: { url: string }) {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all border-b">
      <div className="container flex h-16 px-4 items-center justify-between">
        <Link href="/" className="items-center space-x-2 flex">
          <Sparkle className="w-8 h-8" />
          <span className="text-xl font-bold">Glitch</span>
        </Link>
        {user ? (
          <div className="items-center space-x-2 flex">
            <Button variant={"primary"} asChild>
              <Link href={url}>Open Glitch</Link>
            </Button>
            <UserAccountNav user={user} />
          </div>
        ) : (
          <AuthModal />
        )}
      </div>
    </nav>
  );
}
