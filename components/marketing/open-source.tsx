import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OpenSource() {
  return (
    <div className="flex h-full transform-gpu flex-col items-center justify-between gap-5 border border-neutral-200 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <section className="flex flex-col items-center justify-center gap-4 py-8 text-center md:py-12 xl:py-16">
        <h2 className="text-3xl font-semibold drop-shadow-xl bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text text-transparent sm:text-3xl md:text-6xl">
          Proudly Open Source
        </h2>
        <p className="max-w-[85%] text-muted-foreground sm:text-lg">
          Glitch is open source and powered by open source software. <br /> The
          code is available on{" "}
          <a
            href="https://github.com/abdtriedcoding/glitch"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 duration-200 hover:text-foreground"
          >
            GitHub
          </a>
          .
        </p>
        <Button asChild>
          <Link href="https://github.com/abdtriedcoding/glitch">
            Star us on GitHub
          </Link>
        </Button>
      </section>
    </div>
  );
}
