"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrigin } from "@/hooks/use-origin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function InviteModal({
  children,
  inviteCode,
}: {
  children: React.ReactNode;
  inviteCode: string;
}) {
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);

  const inviteUrl = `${origin}/invite/${inviteCode}`;

  const onCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(inviteUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center">
            Share this link to let others join your server.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={inviteUrl} readOnly />
          </div>
          <Button disabled={copied} onClick={onCopy} size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="primary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
