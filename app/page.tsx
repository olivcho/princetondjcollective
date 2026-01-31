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


  const teamNames = team.map((member) => member.firstName).join(' • ') + ' •\u00A0';

  return (
    <div className="relative flex h-screen items-center justify-center bg-transparent overflow-hidden">
      {/* Video Background with Enhanced Visibility */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15 -z-10 animate-subtle-zoom"
      >
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#171717]/40 to-[#171717] -z-10" />

      {/* Orange Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--princeton-orange)] rounded-full blur-[120px] opacity-10 animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--princeton-orange)] rounded-full blur-[120px] opacity-10 animate-pulse-slow animation-delay-2000 -z-10" />

      <div className="flex flex-col items-center justify-center gap-12 z-10">
        <div className="animate-fade-in-down">
          <Header />
        </div>
        <div className="flex flex-col gap-4 px-10 md:px-16 animate-fade-in-up animation-delay-200">
          <p className="text-3xl md:text-4xl font-bold text-center gradient-text-glow py-4">
            We're Princeton's premier student DJ collective.
          </p>
          <p className="text-sm md:text-xl max-w-3xl mx-auto text-center leading-relaxed">
            We're dedicated to cultivating a vibrant music culture on campus. We offer a free beginner-friendly education program teaching DJ fundamentals, connect club members to our exclusive campus-wide gig network, and foster a supportive community of music lovers and creators. Our mission is to democratize access to DJ culture and empower student DJs to bring the campus to life, one beat at a time.
          </p>
        </div>
        <div className="text-1xl md:text-2xl font-bold animate-fade-in animation-delay-400">
          <Marquee autoFill={true} speed={14} className="overflow-hidden py-2">
            {teamNames}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
