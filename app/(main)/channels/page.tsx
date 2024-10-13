import { CreateServerModal } from "@/components/modals/create-server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Page() {
  const user = false;

  if (user) {
    return <p>Redirect user to first ever server, he joined</p>;
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
