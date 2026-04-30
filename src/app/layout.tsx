import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import AppShell from "@/app/components/organisms/AppShell";
import { Analytics } from "@vercel/analytics/next";

const sansFlex = localFont({
  src: [
    {
      path: "./fonts/GoogleSansFlex-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSansFlex-SemiBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-SansFlex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aruna",
  description: "Collectible Toys",
};

export const microgramma = localFont({
  src: [
    {
      path: "./fonts/Microgramma.otf",
      style: "normal",
    },
  ],
  variable: "--font-microgramma", 
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFlex.variable} ${microgramma.variable} font-sans min-h-screen flex justify-center bg-bg-base`}
      >
        <CurrencyProvider>
          <AppShell>
            {children}
            <Analytics />
          </AppShell>
        </CurrencyProvider>
      </body>
    </html>
  );
}
