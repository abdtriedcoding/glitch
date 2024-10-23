import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "real-time messaging",
    "group communication",
    "collaboration tool",
    "video calls",
    "server management",
    "chat app",
    "community engagement",
    "user-friendly interface",
    "file sharing",
    "online meetings",
  ],
  authors: [
    {
      name: "abdtriedcoding",
    },
  ],
  creator: "abdtriedcoding",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@abdtriedcoding",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased bg-white dark:bg-[#36393f]", font.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster richColors position="bottom-right" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
