"use client";

import { Sparkle } from "lucide-react";
import { handleSignIn } from "@/app/actions/auth-actions";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  GitHubAuthButton,
  GoogleAuthButton,
} from "@/components/marketing/login-buttons";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL!;

export function AuthModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-w-md md:rounded-2xl md:border">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
            <a href={siteUrl}>
              <Sparkle className="h-10 w-10" />
            </a>
            <h3 className="font-urban text-2xl font-bold">Sign In</h3>
            <p className="text-sm text-gray-500">
              Join our community and connect with fellow enthusiasts. Sign in
              effortlessly to start exploring channels, joining discussions, and
              staying updated in real time.
            </p>
          </div>

          <div className="flex flex-col space-y-2 bg-secondary/50 px-4 py-8 md:px-16">
            <form
              className="w-full"
              action={async () => {
                await handleSignIn("google");
              }}
            >
              <GoogleAuthButton />
            </form>

            <form
              className="w-full"
              action={async () => {
                await handleSignIn("github");
              }}
            >
              <GitHubAuthButton />
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
