"use client";

import { TransitionLink } from "./PageTransition";

export default function Header() {

  return (
    <header>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12 font-bold">
          <TransitionLink href="/canvas"><u>Canvas</u></TransitionLink>
          <TransitionLink href="/education"><u>Education</u></TransitionLink>
          <TransitionLink href="/mixes"><u>Mixes</u></TransitionLink>
          <TransitionLink href="/booking"><u>Booking</u></TransitionLink>
        </div>
      </div>
    </header>
  );
}