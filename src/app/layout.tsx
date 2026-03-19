import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Navigation from "@/app/components/organisms/Navigation";
import FooterContaienr from "@/app/components/organisms/FooterContaienr";

const sansFlex = localFont({
  src: [
    {
      path: "./fonts/GoogleSansFlex-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GoogleSansFlex-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-SansFlex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ace Shop",
  description: "Your Exclusive Watch Boutique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFlex.variable} font-sans items-center justify-center flex bg-bg-base`}
      >
        <CurrencyProvider>
          <main className="max-w-7xl w-full min-h-screen mx-2 flex flex-col gap-2">
            <Navigation />
            <div className="flex-1">{children}</div>
            <FooterContaienr />
          </main>
        </CurrencyProvider>
      </body>
    </html>
  );
}
