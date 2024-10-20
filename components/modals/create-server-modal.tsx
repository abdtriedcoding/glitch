"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServer } from "@/app/actions/create-server";
import { ServerFormSchema } from "@/lib/validation-schemas";
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

export function CreateServerModal() {
  const router = useRouter();

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
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open>
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
              <div className="flex items-center justify-between w-full">
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    form.reset();
                    router.push("/");
                  }}
                  variant="secondary"
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant={"primary"} disabled={isLoading} type="submit">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
