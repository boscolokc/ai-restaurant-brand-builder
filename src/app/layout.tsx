import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Inter } from "next/font/google";
import { AppStoreProvider } from "@/lib/mock/store";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-ui",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hearth — AI restaurant branding & marketing",
    template: "%s · Hearth",
  },
  description:
    "Turn restaurant photos and info into Brand DNA, then a consistent starter package: kit, website, social, video, menu, and a 30-day plan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}
