"use client";

import { useState } from "react";

const TUTORIALS = [
  {
    id: "Fg_lB3jL4Wg",
    part: "Part 0",
    title: "How to DJ with a laptop",
  },
  {
    id: "q5XwSH_USJo",
    part: "Part 1",
    title: "DJ software and free music",
  },
  {
    id: "9oCnVJFpXhQ",
    part: "Part 2",
    title: "Phrasing and basic mixing",
  },
  {
    id: "pRq1TXImAoE",
    part: "Part 3",
    title: "Using loops to mix",
  },
  {
    id: "7TTvemNYDNg",
    part: "Part 4",
    title: "Where to set hot cues",
  },
  {
    id: "11lkoeu27Aw",
    part: "Part 5",
    title: "Your first piece of DJ equipment",
  },
] as const;

export default function CrossfaderTutorials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const active = TUTORIALS[activeIndex];
  const src = `https://www.youtube-nocookie.com/embed/${active.id}?rel=0${autoplay ? "&autoplay=1" : ""}`;

  return (
    <section className="flex w-full flex-col gap-4" aria-label="Crossfader tutorials">
      <p className="text-sm md:text-lg font-bold">Crossfader tutorials</p>
      <p className="text-sm md:text-lg font-bold">
        Watch Crossfader&apos;s free beginner series on this page. Choose a lesson and it plays here.
      </p>
      <div className="aspect-video w-full bg-black">
        <iframe
          key={src}
          src={src}
          title={`${active.part}: ${active.title}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <ul className="flex w-full flex-col">
        {TUTORIALS.map((tutorial, index) => {
          const selected = index === activeIndex;
          return (
            <li key={tutorial.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActiveIndex(index);
                  setAutoplay(true);
                }}
                className="w-full py-2 text-left text-sm md:text-lg font-bold transition-colors duration-200 hover:text-[var(--princeton-orange)]"
                style={{ color: selected ? "var(--princeton-orange)" : undefined }}
              >
                {tutorial.part} — {tutorial.title}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
