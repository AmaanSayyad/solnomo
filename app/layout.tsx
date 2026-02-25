import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solnomo.fun'),
  title: "Solnomo - Real-time Solana gaming on MagicBlock",
  description:
    "Solnomo is a Solana-native, MagicBlock-powered onchain game built for millisecond rounds and instant settlement. Designed for the Solana Graveyard Hackathon MagicBlock gaming track.",
  keywords: [
    "Solana",
    "onchain gaming",
    "MagicBlock",
    "ephemeral rollups",
    "Pyth oracle",
    "real-time game",
    "Graveyard Hackathon",
  ],
  icons: {
    icon: "/overflowlogo.ico",
    shortcut: "/overflowlogo.ico",
    apple: "/overflowlogo.ico",
  },
  openGraph: {
    title: "Solnomo — Real-time Solana gaming on MagicBlock",
    description:
      "Solnomo uses MagicBlock Ephemeral Rollups to deliver Web2-speed onchain gameplay on Solana with oracle-bound outcomes and instant in-game settlement.",
    images: [{ url: '/solnomo-logo.png', width: 512, height: 512, alt: 'Solnomo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Solnomo — Real-time Solana gaming on MagicBlock",
    description: "Play fast, oracle-resolved rounds on Solana with MagicBlock-powered performance.",
    images: ['/solnomo-logo.png'],
  },
};

import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased bg-[#02040a] text-white h-screen overflow-hidden flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
