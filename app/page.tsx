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
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-5 -z-10"
      >
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      
      <div className="flex flex-col items-center justify-center gap-12 z-10">
        <Header />
        <div className="flex flex-col gap-4 px-10 md:px-16">
          <p className="text-3xl md:text-4xl font-bold text-center">
            We're Princeton's premier student DJ collective.
          </p>
          <p className="text-sm md:text-xl max-w-3xl mx-auto">
            We're dedicated to cultivating a vibrant music culture on campus. We offer a free beginner-friendly education program teaching DJ fundamentals, connect club members to our exclusive campus-wide gig network, and foster a supportive community of music lovers and creators. Our mission is to democratize access to DJ culture and empower student DJs to bring the campus to life, one beat at a time.
          </p>
        </div>
        <div className="text-1xl md:text-2xl font-bold">
          <Marquee autoFill={true} speed={14} className="overflow-hidden">
            {teamNames}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
