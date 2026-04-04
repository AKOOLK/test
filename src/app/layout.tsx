import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberSakura | Anime Cybersecurity Portfolio",
  description: "Cybersecurity analyst portfolio with an anime twist - macOS-style desktop featuring Penetration Testing, CTF, Bug Bounty, and more.",
  keywords: ["cybersecurity", "portfolio", "anime", "macOS", "penetration testing", "CTF", "ethical hacking"],
  authors: [{ name: "CyberWolf" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
