"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServer } from "@/app/actions/create-server";
import { ServerFormSchema } from "@/lib/validation-schemas";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddServerModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof ServerFormSchema>>({
    resolver: zodResolver(ServerFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ServerFormSchema>) {
    const { data, success, error } = await createServer(values);
    form.reset();
    if (success && data) {
      toast.success("Your new community server has been created! 🎉");
      router.push(`/s/${data.id}`);
    } else {
      toast.error(error);
    }
    setOpen(false);
  }

  const isLoading = form.formState.isSubmitting;

  const handleModalChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen scrollbar">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Create Your Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Your server is, where you and your friends hang out. Make yours and
            start talking.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      endpoint="serverImage"
                      disabled={isLoading}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant={"primary"} disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
