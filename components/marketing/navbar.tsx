import Link from "next/link";
import { User } from "next-auth";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/modals/auth-modal";
import { UserAccountNav } from "@/components/marketing/user-account-nav";

export async function Navbar({
  url,
  user,
}: {
  url: string;
  user: User | undefined;
}) {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 h-16 px-4 flex w-full items-center justify-between bg-background/60 backdrop-blur-xl transition-all border-b shadow-sm">
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
        <AuthModal>
          <Button variant={"primary"}>SignIn</Button>
        </AuthModal>
      )}
    </nav>
  );
}
