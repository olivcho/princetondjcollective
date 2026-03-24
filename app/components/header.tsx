"use client";

import { TransitionLink } from "./PageTransition";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-3 flex items-center justify-between glass-nav">
      <TransitionLink href="/" className="hover:opacity-70 transition-opacity duration-200">
        <Image src="/logo.png" alt="Princeton DJ Collective" width={220} height={62} className="h-14 w-auto" priority />
      </TransitionLink>
      <nav className="flex items-center gap-8 md:gap-12 text-xs md:text-sm font-bold tracking-widest uppercase">
        <TransitionLink
          href="/canvas"
          className="nav-link transition-all duration-200 hover:text-[var(--princeton-orange)]"
        >
          Canvas
        </TransitionLink>
        <TransitionLink
          href="/education"
          className="nav-link transition-all duration-200 hover:text-[var(--princeton-orange)]"
        >
          Education
        </TransitionLink>
        <TransitionLink
          href="/mixes"
          className="nav-link transition-all duration-200 hover:text-[var(--princeton-orange)]"
        >
          Mixes
        </TransitionLink>
        <TransitionLink
          href="/booking"
          className="nav-link transition-all duration-200 hover:text-[var(--princeton-orange)]"
        >
          Booking
        </TransitionLink>
      </nav>
    </header>
  );
}
