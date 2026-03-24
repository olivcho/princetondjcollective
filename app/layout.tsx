import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import BackgroundAudio from "./components/BackgroundAudio";
import Header from "./components/header";

const playfair_display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Princeton DJ Collective",
  description: "DJs @ Princeton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair_display.className}>
      <body className="antialiased">
        <BackgroundAudio />
        <Header />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
