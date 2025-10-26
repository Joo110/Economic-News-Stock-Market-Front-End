// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import ConditionalHeader from "@/components/ConditionalHeader";

export const metadata: Metadata = {
  title: "Economic News",
  description: "News, currencies, and stock market updates",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-cairo">
        <Providers>
          <ConditionalHeader>{children}</ConditionalHeader>
        </Providers>
      </body>
    </html>
  );
}
