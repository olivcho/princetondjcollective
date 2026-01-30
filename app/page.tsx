'use client';
import Header from "./components/header";
import { animate, splitText, stagger } from 'animejs';
import { useEffect } from 'react';

export default function Home() {
  
  const team = [
    { firstName: "Abhi", lastName: "Bansal", role: "President" },
    { firstName: "Rohan", lastName: "Pahwa", role: "Co-President" },
    { firstName: "Steven", lastName: "Goetz", role: "Co-President" },
    { firstName: "Sebastian", lastName: "Merkatz", role: "Treasurer" },
    { firstName: "Katie", lastName: "Lee", role: "Social Media" },
    { firstName: "Oliver", lastName: "Cho", role: "Software" },
    { firstName: "Vinayak", lastName: "Menon", role: "Gig Team" },
    { firstName: "Mateo", lastName: "Hoyos", role: "Gig Team" },
    { firstName: "Asher", lastName: "Matthias", role: "Gig Team" },
    { firstName: "Tom", lastName: "Dubnov", role: "Gig Team" },
  ]

  useEffect(() => {

    const hasAnimated = sessionStorage.getItem('hasAnimated');

    if (hasAnimated) return;

    const { words } = splitText('.animate-text', {
      words: { wrap: 'clip' },
    });

    animate(words, {
      y: [
        { to: ['100%', '0%'] },
      ],
      duration: 750,
      ease: 'out(3)',
      delay: stagger(25),
      loop: false,
    });

    sessionStorage.setItem('hasAnimated', 'true');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent animate-text">
      <div className="flex flex-col items-center justify-center gap-12">
        <Header />
        <p className="text-xl md:text-2xl font-bold px-10 md:px-16">Princeton's premier student DJ collective bringing the campus to life, one beat at a time.</p>
        <p className="text-sm md:text-base px-10 md:px-16 text-left">
          {team.map((member) => member.firstName).join(', ')}, and counting <a href="mailto:ab4386@princeton.edu?subject=Interested%20in%20Princeton%20DJ%20Collective" className="text-blue-600">(join us)</a>.
        </p>
      </div>
    </div>
  );
}
