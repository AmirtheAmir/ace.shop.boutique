import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/Context/CurrencyContext";
import NavigationBar from "@/app/Components/Organism/NavigationBar";
import FooterBar from "@/app/Components/Organism/FooterBar";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-sansFlex",
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
        className={`${googleSansFlex.variable} font-sans items-center justify-center flex bg-bg-base`}
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