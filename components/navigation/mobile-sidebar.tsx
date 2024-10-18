import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/navigation/sidebar";
import { Member, User, Server, Channel } from "@prisma/client";
import { ChannelSidebar } from "@/components/server/channel-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileSidebarProps {
  server: Server & {
    channels: Channel[];
    members: (Member & { user: User })[];
  };
}

export function MobileSidebar({ server }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <Sidebar />
        </div>
        <ChannelSidebar server={server} />
      </SheetContent>
    </Sheet>
  );
}
