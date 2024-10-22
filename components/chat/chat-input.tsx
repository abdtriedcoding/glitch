"use client";

import { z } from "zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiPicker } from "@/components/emoji-picker";
import { ChatInputFormSchema } from "@/lib/validation-schemas";
import { sendChannelMessage } from "@/app/actions/send-channel-message";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

export function ChatInput({
  name,
  channelId,
  serverId,
}: {
  name: string;
  channelId: string;
  serverId: string;
}) {
  const form = useForm<z.infer<typeof ChatInputFormSchema>>({
    resolver: zodResolver(ChatInputFormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ChatInputFormSchema>) {
    await sendChannelMessage(values, channelId, serverId);
    form.reset();
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <MessageFileModal channelId={channelId} serverId={serverId}>
                    <button
                      type="button"
                      className="absolute top-7 left-8 h-[24px] w-[24px]
                    bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300
                    transition rounded-full flex items-center justify-center p-1"
                    >
                      <Plus className="w-5 h-5 text-white dark:text-[#313338]" />
                    </button>
                  </MessageFileModal>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0
                      focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message "#" ${name}`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
