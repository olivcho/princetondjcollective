"use client";

import { TransitionLink } from "./PageTransition";

export default function Header() {

  return (
    <header>
      <div className="flex items-center">
        <div className="flex text-1xl md:text-2xl items-center gap-12 font-bold px-10 md:px-16">
          <TransitionLink href="/canvas" className="transition-colors duration-200 hover:text-[var(--princeton-orange)]"><u>Canvas</u></TransitionLink>
          <TransitionLink href="/education" className="transition-colors duration-200 hover:text-[var(--princeton-orange)]"><u>Education</u></TransitionLink>
          <TransitionLink href="/mixes" className="transition-colors duration-200 hover:text-[var(--princeton-orange)]"><u>Mixes</u></TransitionLink>
          <TransitionLink href="/booking" className="transition-colors duration-200 hover:text-[var(--princeton-orange)]"><u>Booking</u></TransitionLink>
        </div>
      </div>
    </header>
  );
}