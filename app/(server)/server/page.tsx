import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CreateServerModal } from "@/components/modals/create-server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/");

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/s/${server.id}`);
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Create Your Server
          </DialogTitle>
          <DialogDescription>
            Your server is, where you and your friends hang out. Make yours and
            start talking.
          </DialogDescription>
        </DialogHeader>
        <CreateServerModal />
      </DialogContent>
    </Dialog>
  );
}
