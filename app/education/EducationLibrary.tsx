"use client";

import { useRef, useState } from "react";

type TopicId = "beatmatching" | "eq" | "harmonic" | "looping";
type ViewId = "recommended" | TopicId;
type Level = "Beginner" | "Intermediate";

type Lesson = {
  id: string;
  title: string;
  channel: string;
  topic: TopicId;
  level: Level;
};

const TOPICS: { id: TopicId; label: string }[] = [
  { id: "beatmatching", label: "Beatmatching & transitions" },
  { id: "eq", label: "EQ" },
  { id: "harmonic", label: "Harmonic mixing" },
  { id: "looping", label: "Looping" },
];

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  ...TOPICS,
];

// Recommended learning order. Step numbers stay stable inside topic sections.
const LESSONS: Lesson[] = [
  {
    id: "briGVH_JTQA",
    title: "How to beatmatch",
    channel: "DJ Carlo",
    topic: "beatmatching",
    level: "Beginner",
  },
  {
    id: "4g0tOBQJ6M4",
    title: "Three ways to practice beatmatching",
    channel: "Club Ready DJ School",
    topic: "beatmatching",
    level: "Beginner",
  },
  {
    id: "fFcml2J5ElE",
    title: "Beats, bars, and phrases",
    channel: "DJ TLM TV",
    topic: "beatmatching",
    level: "Beginner",
  },
  {
    id: "uAtl1kcOnGs",
    title: "EQ settings for your mixing style",
    channel: "Crossfader",
    topic: "eq",
    level: "Beginner",
  },
  {
    id: "U_tS7iMwU54",
    title: "Mixing in key",
    channel: "Crossfader",
    topic: "harmonic",
    level: "Beginner",
  },
  {
    id: "XkuFFpuJU2w",
    title: "How to use loops",
    channel: "Club Ready DJ School",
    topic: "looping",
    level: "Beginner",
  },
  {
    id: "CTiFony36zs",
    title: "Three house mixing techniques",
    channel: "Crossfader",
    topic: "eq",
    level: "Beginner",
  },
  {
    id: "0Hc8bmEaCqM",
    title: "Five transition ideas",
    channel: "Crossfader",
    topic: "beatmatching",
    level: "Beginner",
  },
  {
    id: "1sC-sZhSxU8",
    title: "The easiest way to mix in key",
    channel: "DJ Carlo",
    topic: "harmonic",
    level: "Beginner",
  },
  {
    id: "xVNk9z7j-hg",
    title: "Bass swapping",
    channel: "Club Ready DJ School",
    topic: "eq",
    level: "Intermediate",
  },
  {
    id: "j9Ky8zpsqvY",
    title: "Looping techniques that change a mix",
    channel: "Crossfader",
    topic: "looping",
    level: "Intermediate",
  },
  {
    id: "9BtHTMG5hno",
    title: "What makes mixing in key work",
    channel: "DJ Phil Harris",
    topic: "harmonic",
    level: "Intermediate",
  },
  {
    id: "q1eCtkmy_JM",
    title: "A complete harmonic mixing guide",
    channel: "Club Ready DJ School",
    topic: "harmonic",
    level: "Intermediate",
  },
  {
    id: "WhHwuemFk4Q",
    title: "Transitions across BPM and genre",
    channel: "DJ Phil Harris",
    topic: "beatmatching",
    level: "Intermediate",
  },
  {
    id: "z0mFNt1ZTBw",
    title: "Five EQ techniques",
    channel: "Club Ready DJ School",
    topic: "eq",
    level: "Intermediate",
  },
  {
    id: "nEQo5LF3Nlw",
    title: "Master the EQ",
    channel: "DJ Phil Harris",
    topic: "eq",
    level: "Intermediate",
  },
  {
    id: "67w0R37oy1M",
    title: "Loops for live build-ups",
    channel: "DJ Carlo",
    topic: "looping",
    level: "Intermediate",
  },
  {
    id: "Lk0a6U6m2Zg",
    title: "From basic transitions to detailed ones",
    channel: "Crossfader",
    topic: "beatmatching",
    level: "Intermediate",
  },
  {
    id: "m2zewzOfnu8",
    title: "Phrasing and pro-level looping",
    channel: "Club Ready DJ School",
    topic: "looping",
    level: "Intermediate",
  },
  {
    id: "t_96CrNV2KU",
    title: "Looping techniques to know",
    channel: "Crossfader",
    topic: "looping",
    level: "Intermediate",
  },
];

function lessonsFor(view: ViewId) {
  if (view === "recommended") return LESSONS;
  return LESSONS.filter((lesson) => lesson.topic === view);
}

function topicLabel(topic: TopicId) {
  return TOPICS.find((item) => item.id === topic)?.label ?? topic;
}

export default function EducationLibrary() {
  const [view, setView] = useState<ViewId>("recommended");
  const [activeId, setActiveId] = useState(LESSONS[0].id);
  const [autoplay, setAutoplay] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

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

  function selectLesson(id: string) {
    setActiveId(id);
    setAutoplay(true);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <section className="flex w-full flex-col gap-5" aria-label="DJ lessons">
      <p className="text-sm md:text-lg font-bold">
        Follow the recommended order, or open a topic. Every lesson plays on this page.
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2" role="tablist" aria-label="Lesson topics">
        {VIEWS.map((item) => {
          const selected = item.id === view;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectView(item.id)}
              className="text-left text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:text-[var(--princeton-orange)]"
              style={{ color: selected ? "var(--princeton-orange)" : undefined }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div ref={playerRef} className="aspect-video w-full bg-black">
        <iframe
          key={src}
          src={src}
          title={`${active.title} by ${active.channel}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <ol className="flex w-full flex-col">
        {visible.map((lesson) => {
          const selected = lesson.id === active.id;
          const step = LESSONS.findIndex((item) => item.id === lesson.id) + 1;
          return (
            <li key={lesson.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => selectLesson(lesson.id)}
                className="flex w-full flex-col items-start gap-0.5 py-2.5 text-left transition-colors duration-200 hover:text-[var(--princeton-orange)]"
                style={{ color: selected ? "var(--princeton-orange)" : undefined }}
              >
                <span className="text-sm md:text-lg font-bold">
                  {step}. {lesson.title}
                </span>
                <span className="text-xs md:text-sm font-bold opacity-70">
                  {lesson.channel} · {topicLabel(lesson.topic)} · {lesson.level}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
