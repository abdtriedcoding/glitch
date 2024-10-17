"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export function NavigationItem({ id, imageUrl, name }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={() => router.push(`/s/${id}`)} className="group">
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px] border-2 border-green-500"
          )}
        >
          <Image
            fill
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="Server"
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
