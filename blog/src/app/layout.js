import React from "react";
import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
          :root {
            ${inter.styles}
            ${lora.styles}
          }
        `}
        </style>
      </head>
      <body className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
