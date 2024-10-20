"use client";

import { Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { ActionTooltip } from "@/components/action-tooltip";
import { AddServerModal } from "@/components/modals/add-server-modal";

export function AddServerButton() {
  return (
    <div>
      <AddServerModal>
        <ActionTooltip label="Add a server" side="right" align="center">
          <DialogTrigger asChild>
            <button className="group">
              <div
                className="flex h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] 
          transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700
         group-hover:bg-emerald-500"
              >
                <Plus
                  className="text-emerald-500 group-hover:text-white transition"
                  size={25}
                />
              </div>
            </button>
          </DialogTrigger>
        </ActionTooltip>
      </AddServerModal>
    </div>
  );
}
