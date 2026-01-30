"use client";

import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { TransitionLink } from "./PageTransition";

export default function BackLink() {
  return (
    <TransitionLink href="/">
      <ArrowLongLeftIcon className="w-8 h-8" />
    </TransitionLink>
  );
}
