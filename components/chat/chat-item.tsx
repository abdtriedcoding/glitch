import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { roleIcons } from "@/constant";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@/components/ui/dialog";
import { ActionTooltip } from "@/components/action-tooltip";
import { Member, MemberRole, Message, User } from "@prisma/client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { editChannelMessage } from "@/app/actions/edit-channel-message";
import { EditChannelMessageformSchema } from "@/lib/validation-schemas";
import { CalendarDays, Edit, FileIcon, Loader2, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteMessagelModal } from "@/components/modals/delete-message-modal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MessageWithMemberWithProfile {
  channelId: string;
  serverId: string;
  message: Message & {
    member: Member & { user: User };
  };
  currentMember: Member;
}

export function ChatItem({
  channelId,
  serverId,
  message,
  currentMember,
}: MessageWithMemberWithProfile) {
  const [isEditiing, setIsEditiing] = useState(false);
  const fileType = message.fileUrl?.split(".").pop();
  const isPdf = fileType === "pdf" && message.fileUrl;
  const isImage = !isPdf && message.fileUrl;
  const isUpdated =
    new Date(message?.updatedAt).getTime() !==
    new Date(message?.createdAt).getTime();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = message.member.id === currentMember.id;
  const canDeleteMessage =
    !message.deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !message.deleted && isOwner && !message.fileUrl;

  const form = useForm<z.infer<typeof EditChannelMessageformSchema>>({
    resolver: zodResolver(EditChannelMessageformSchema),
    defaultValues: {
      content: message.content,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof EditChannelMessageformSchema>
  ) => {
    const { success, error } = await editChannelMessage(
      values,
      serverId,
      channelId,
      message.id
    );
    if (!success) {
      toast.error(error);
    } else {
      form.reset();
      setIsEditiing(false);
    }
  };

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditiing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditiing]);

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-center w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage src={message.member.user.image ?? ""} />
            <AvatarFallback>
              {message.member.user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center space-x-1">
              <HoverCard>
                <HoverCardTrigger className="cursor-pointer hover:underline">
                  {message.member.user.name}
                </HoverCardTrigger>
                <HoverCardContent side="top" className="w-72">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={message.member.user.image ?? ""} />
                      <AvatarFallback>
                        {message.member.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        @{message.member.user.name?.toLowerCase()}
                      </h4>
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                          Joined{" "}
                          {format(
                            new Date(message.member.user.createdAt),
                            "MMMM d, yyyy, HH:mm"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <ActionTooltip label={message.member.role}>
                {roleIcons[message.member.role]}
              </ActionTooltip>
            </div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {format(new Date(message.createdAt), "MMMM d, yyyy, HH:mm")}
            </span>
          </div>
          {isImage && (
            <a
              href={message.fileUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={message.fileUrl!}
                alt="Image"
                className="object-cover object-center"
                width={200}
                height={200}
              />
            </a>
          )}
          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={message.fileUrl!}
                target="_blank"
                rel="noopener norefferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!message.fileUrl && !isEditiing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                message.deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-sm mt-1"
              )}
            >
              {message.content}
              {isUpdated && !message.deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!message.fileUrl && isEditiing && (
            <Form {...form}>
              <form
                className="flex items-center pt-2 gap-x-2 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          disabled={isLoading}
                          className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75
                      border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0
                      text-zinc-600 dark:text-zinc-200"
                          placeholder="Edit your message"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  )}
                />
                <Button size="sm" variant="primary" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div
          className="hidden group-hover:flex items-center gap-x-2 absolute 
        p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm"
        >
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                className="h-4 w-4 text-zinc-500 dark:text-zinc-400
                hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer ml-auto transition"
                onClick={() => setIsEditiing((prev) => !prev)}
              />
            </ActionTooltip>
          )}
          {canDeleteMessage && (
            <DeleteMessagelModal
              serverId={serverId}
              channelId={channelId}
              messageId={message.id}
            >
              <ActionTooltip label="Delete">
                <DialogTrigger asChild>
                  <Trash
                    className="h-4 w-4 text-zinc-500 dark:text-zinc-400
        hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer ml-auto transition"
                  />
                </DialogTrigger>
              </ActionTooltip>
            </DeleteMessagelModal>
          )}
        </div>
      )}
    </div>
  );
}
