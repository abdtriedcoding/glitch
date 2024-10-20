import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <p className="text-sm">
          Built by
          <a
            href="https://github.com/abdtriedcoding"
            className="font-medium underline"
          >
            {" "}
            @abdtriedcoding
          </a>
          . Open source for everyone.
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
