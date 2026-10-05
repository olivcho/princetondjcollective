import BackLink from "../components/BackLink";
import ApplyButton from "../components/ApplyButton";
import EducationLibrary from "./EducationLibrary";

export default function Education() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <video autoPlay muted loop playsInline
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }} className="flex min-h-screen items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-10 w-full max-w-4xl">
          <p className="text-xl md:text-2xl font-bold">Education</p>
          <EducationLibrary />
          <ApplyButton />
          <BackLink />
        </div>
      </div>
    </div>
  );
}
