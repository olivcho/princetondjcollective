'use client';

import Header from "./components/header";
import Marquee from "react-fast-marquee";

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

  const teamNames = (
    <span className="text-4xl md:text-6xl font-bold whitespace-nowrap">
      {team.map((member) => member.firstName).join(' • ')} •&nbsp;
    </span>
  );

  return (
    <div className="relative flex h-screen items-center justify-center bg-transparent overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-3 -z-10"
      >
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      
      <div className="flex flex-col items-center justify-center gap-12 z-10">
        <Header />
        <p className="text-xl md:text-2xl font-bold px-10 md:px-16">We're Princeton's premier student DJ collective.</p>
        <div className="">
          <Marquee autoFill={true} speed={67} className="overflow-hidden">
            {teamNames}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
