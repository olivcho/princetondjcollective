"use client";

import Link from "next/link";

export default function Header() {

  return (
    <header>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12 font-bold">
          <Link href="/canvas"><u>Canvas</u></Link>
          <Link href="/education"><u>Education</u></Link>
          <Link href="/mixes"><u>Mixes</u></Link>
          <Link href="/booking"><u>Booking</u></Link>
        </div>
      </div>
    </header>
  );
}