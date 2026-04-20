/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { StitchMotionRuntime } from "@/components/shell/StitchMotionRuntime";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blostem AI - Sovereign Command",
  description: "Operational Intelligence for prospect pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StitchMotionRuntime />
        {children}
      </body>
    </html>
  );
}
