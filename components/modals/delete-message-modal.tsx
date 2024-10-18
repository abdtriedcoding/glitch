"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteMessage } from "@/app/actions/deleteMessage";
import {
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function DeleteMessagelModal({
  children,
  serverId,
  channelId,
  messageId,
}: {
  children: React.ReactNode;
  serverId: string;
  channelId: string;
  messageId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await deleteMessage(serverId, channelId, messageId);
    router.refresh();
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this <br />
            The message will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={() => setOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button variant={"primary"} disabled={isLoading} onClick={onDelete}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
