"use client";

import Link from "next/link";
import { User } from "next-auth";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { AuthModal } from "@/components/modals/auth-modal";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  Bell,
  MessageSquare,
  Mic,
  Palette,
  Server,
  Settings,
  Shield,
  UserPlus,
  Users,
} from "lucide-react";

const cardData = [
  {
    id: 1,
    title: "Servers",
    icon: Server,
  },
  {
    id: 2,
    title: "Voice Channels",
    icon: Mic,
  },
  {
    id: 3,
    title: "Direct Messages",
    icon: MessageSquare,
  },
  {
    id: 4,
    title: "Friends",
    icon: Users,
  },
  {
    id: 5,
    title: "Notifications",
    icon: Bell,
  },
  {
    id: 6,
    title: "Roles & Permissions",
    icon: Shield,
  },
  {
    id: 7,
    title: "Settings",
    icon: Settings,
  },
  {
    id: 8,
    title: "Invite Members",
    icon: UserPlus,
  },
  {
    id: 9,
    title: "Themes",
    icon: Palette,
  },
];

export function IntegrationsSectionLanding({
  url,
  user,
}: {
  url: string;
  user: User | undefined;
}) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { amount: 0.25 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const handleConfettiClick = () => {
    Confetti({});
  };

  return (
    <div className="flex my-20 h-full transform-gpu flex-col items-center justify-between gap-5 border border-neutral-200 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] xl:flex-row">
      <div className="flex w-full flex-col items-start justify-between gap-y-10 p-10 xl:h-full xl:w-1/2">
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text text-transparent">
          Seamless Communication on Our Platform
        </h2>
        {user ? (
          <Button variant={"primary"} asChild>
            <Link href={url}>Open Glitch</Link>
          </Button>
        ) : (
          <AuthModal>
            <Button variant={"primary"}>Get started for free</Button>
          </AuthModal>
        )}
      </div>
      <div className="relative w-full overflow-hidden xl:w-1/2">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-white dark:from-black"></div>
        <div
          ref={containerRef}
          className="relative -right-[50px] -top-[100px] grid max-h-[450px] grid-cols-3 gap-5 [transform:rotate(-15deg)translateZ(10px);]"
        >
          <AnimatePresence>
            {cardData.map((card, index) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.96, y: 25 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                initial="hidden"
                animate={controls}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: {
                    duration: 0.1,
                    ease: cubicBezier(0.22, 1, 0.36, 1),
                  },
                }}
                transition={{
                  duration: 0.2,
                  ease: cubicBezier(0.22, 1, 0.36, 1),
                  delay: index * 0.04,
                }}
                key={card.id}
                className="flex flex-col items-center gap-y-2 rounded-md border bg-white/5 p-5"
              >
                <card.icon className="h-20 w-20 text-gray-700 dark:text-gray-300" />
                <p className="text-sm dark:text-neutral-200/50">{card.title}</p>
                <a
                  onClick={handleConfettiClick}
                  className="cursor-pointer rounded-md border border-indigo-500 bg-indigo-500 p-2 py-0.5 text-white shadow-xl drop-shadow-lg hover:bg-indigo-400 dark:border-indigo-500 dark:bg-indigo-600"
                >
                  See more
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
