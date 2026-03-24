"use client";

import { useState } from "react";
import { TransitionLink } from "./PageTransition";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "About" },
    { href: "/canvas", label: "Canvas" },
    { href: "/education", label: "Education" },
    { href: "/mixes", label: "Mixes" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-3 flex items-center justify-between glass-nav">
      {/* Logo */}
      <TransitionLink href="/" className="hover:opacity-70 transition-opacity duration-200" onClick={() => setMenuOpen(false)}>
        <Image src="/logo.png" alt="Princeton DJ Collective" width={220} height={62} className="h-10 md:h-14 w-auto" priority />
      </TransitionLink>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8 md:gap-12 text-xs md:text-sm font-bold tracking-widest uppercase">
        {navLinks.map(({ href, label }) => (
          <TransitionLink
            key={href}
            href={href}
            className="nav-link transition-all duration-200 hover:text-[var(--princeton-orange)]"
          >
            {label}
          </TransitionLink>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 relative z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile full-screen menu */}
      <div className={`md:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-10 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map(({ href, label }) => (
          <TransitionLink
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold tracking-widest uppercase hover:text-[var(--princeton-orange)] transition-colors duration-200"
          >
            {label}
          </TransitionLink>
        ))}
      </div>
    </header>
  );
}
