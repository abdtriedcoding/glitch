import { z } from "zod";
import { ChannelType } from "@prisma/client";

export const ServerFormSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export const ChannelFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .max(32)
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'.",
    }),
  type: z.nativeEnum(ChannelType),
});

export const ChatInputFormSchema = z.object({
  content: z.string().min(1),
  fileUrl: z.string().optional(),
});

export const EditChannelMessageformSchema = z.object({
  content: z.string().min(1),
});
