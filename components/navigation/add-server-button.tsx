import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

export function AddServerButton() {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
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
      </ActionTooltip>
    </div>
  );
}
