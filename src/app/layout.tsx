import 'server-only'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Ticketing Tool",
  description: "Kanban-style board built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh h-full`}
      >
        <div className="min-h-dvh flex flex-col">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
