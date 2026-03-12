import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import NavigationBar from "@/app/Components/Organism/NavigationBar";
import FooterBar from "@/app/Components/Organism/FooterBar";

const helvetica = localFont({
  src: [
    {
      path: "./fonts/Helvetica.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Helvetica-Bold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
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
        className={`${helvetica.variable} font-sans items-center justify-center flex bg-bg-base`}
      >
        <CurrencyProvider>
          <main className="max-w-7xl w-full m-2 flex flex-col gap-2">
            <NavigationBar />
            {children}
            <FooterBar />
          </main>
        </CurrencyProvider>
      </body>
    </html>
  );
}
