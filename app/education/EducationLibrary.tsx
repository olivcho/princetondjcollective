"use client";

import { useState } from "react";
import Image from "next/image";
import BackLink from "../components/BackLink";

type TopicId = "beatmatching" | "eq" | "harmonic" | "looping";
type ViewId = "recommended" | TopicId;

type Lesson = {
  id: string;
  title: string;
  topic: TopicId;
  duration: string;
};

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "beatmatching", label: "Beatmatching" },
  { id: "eq", label: "EQ" },
  { id: "harmonic", label: "Harmonic" },
  { id: "looping", label: "Looping" },
];

// Recommended order. Step numbers stay attached to each lesson when a topic tab filters the strip.
const LESSONS: Lesson[] = [
  { id: "briGVH_JTQA", title: "How to beatmatch", topic: "beatmatching", duration: "15:35" },
  { id: "4g0tOBQJ6M4", title: "Three ways to practice beatmatching", topic: "beatmatching", duration: "20:14" },
  { id: "fFcml2J5ElE", title: "Beats, bars, and phrases", topic: "beatmatching", duration: "12:59" },
  { id: "uAtl1kcOnGs", title: "EQ settings for your mixing style", topic: "eq", duration: "7:47" },
  { id: "U_tS7iMwU54", title: "Mixing in key", topic: "harmonic", duration: "6:16" },
  { id: "XkuFFpuJU2w", title: "How to use loops", topic: "looping", duration: "16:17" },
  { id: "CTiFony36zs", title: "Three house mixing techniques", topic: "eq", duration: "8:17" },
  { id: "0Hc8bmEaCqM", title: "Five transition ideas", topic: "beatmatching", duration: "11:40" },
  { id: "1sC-sZhSxU8", title: "The easiest way to mix in key", topic: "harmonic", duration: "6:45" },
  { id: "xVNk9z7j-hg", title: "Bass swapping", topic: "eq", duration: "8:58" },
  { id: "j9Ky8zpsqvY", title: "Looping techniques that change a mix", topic: "looping", duration: "7:37" },
  { id: "9BtHTMG5hno", title: "What makes mixing in key work", topic: "harmonic", duration: "14:01" },
  { id: "q1eCtkmy_JM", title: "A complete harmonic mixing guide", topic: "harmonic", duration: "14:10" },
  { id: "WhHwuemFk4Q", title: "Transitions across BPM and genre", topic: "beatmatching", duration: "18:42" },
  { id: "z0mFNt1ZTBw", title: "Five EQ techniques", topic: "eq", duration: "14:17" },
  { id: "nEQo5LF3Nlw", title: "Master the EQ", topic: "eq", duration: "11:42" },
  { id: "67w0R37oy1M", title: "Loops for live build-ups", topic: "looping", duration: "5:42" },
  { id: "Lk0a6U6m2Zg", title: "From basic transitions to detailed ones", topic: "beatmatching", duration: "15:52" },
  { id: "m2zewzOfnu8", title: "Phrasing and pro-level looping", topic: "looping", duration: "27:35" },
  { id: "t_96CrNV2KU", title: "Looping techniques to know", topic: "looping", duration: "19:48" },
];

const VIEWER_FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function lessonsFor(view: ViewId) {
  if (view === "recommended") return LESSONS;
  return LESSONS.filter((lesson) => lesson.topic === view);
}

export default function EducationLibrary() {
  const [view, setView] = useState<ViewId>("recommended");
  const [activeId, setActiveId] = useState(LESSONS[0].id);
  const [autoplay, setAutoplay] = useState(false);

  const visible = lessonsFor(view);
  const active = LESSONS.find((lesson) => lesson.id === activeId) ?? visible[0];
  const src = `https://www.youtube-nocookie.com/embed/${active.id}?rel=0${autoplay ? "&autoplay=1" : ""}`;

  function selectView(next: ViewId) {
    setView(next);
    const list = lessonsFor(next);
    if (!list.some((lesson) => lesson.id === activeId)) {
      setActiveId(list[0].id);
      setAutoplay(false);
    }
  }

  return (
    <section
      aria-label="DJ lessons"
      className="flex min-h-[calc(100dvh-4rem)] flex-col bg-[#0c0c0c] lg:h-[calc(100dvh-5rem)] lg:flex-row lg:overflow-hidden"
      style={{ fontFamily: VIEWER_FONT }}
    >
      <div className="flex w-full flex-col p-4 sm:p-5 lg:min-w-0 lg:flex-1">
        <div className="flex lg:flex-1 lg:items-center">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
            <iframe
              key={src}
              src={src}
              title={active.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className="pt-3 lg:pt-4">
          <BackLink />
        </div>
      </div>

      <aside className="flex w-full flex-col border-t border-white/10 bg-[#141414] lg:h-full lg:w-[340px] lg:shrink-0 lg:border-t-0 lg:border-l">
        <div
          className="flex flex-wrap gap-x-3.5 gap-y-1 border-b border-white/10 px-4 pt-3"
          role="tablist"
          aria-label="Lesson topics"
        >
          {VIEWS.map((item) => {
            const selected = item.id === view;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectView(item.id)}
                className={`relative pb-2.5 pt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  selected ? "text-[#f4efe4]" : "text-[#9c968c] hover:text-[#f4efe4]"
                }`}
              >
                {item.label}
                {selected ? (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--princeton-orange)]" />
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 p-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          {visible.map((lesson) => {
            const selected = lesson.id === active.id;
            const step = String(LESSONS.findIndex((item) => item.id === lesson.id) + 1).padStart(2, "0");
            return (
              <button
                key={lesson.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActiveId(lesson.id);
                  setAutoplay(true);
                }}
                className={`w-full overflow-hidden rounded-[10px] border bg-[#101010] text-left ${
                  selected ? "border-[var(--princeton-orange)]" : "border-transparent"
                }`}
              >
                <span className="relative block aspect-video w-full">
                  <Image
                    src={`https://i.ytimg.com/vi/${lesson.id}/mqdefault.jpg`}
                    alt=""
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </span>
                <span className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 px-2.5 py-2">
                  <span
                    className={`text-xs font-semibold tabular-nums ${
                      selected ? "text-[var(--princeton-orange)]" : "text-[#9c968c]"
                    }`}
                  >
                    {step}
                  </span>
                  <span className="text-[13.5px] font-semibold leading-snug tracking-tight text-[#f4efe4]">
                    {selected ? <span className="sr-only">Now playing. </span> : null}
                    {lesson.title}
                  </span>
                  <span
                    className={`text-xs tabular-nums ${
                      selected ? "text-[var(--princeton-orange)]" : "text-[#9c968c]"
                    }`}
                  >
                    {lesson.duration}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </section>
  );
}
