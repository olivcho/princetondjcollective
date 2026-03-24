import BackLink from "../components/BackLink";

export default function Education() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }} className="flex min-h-screen items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-3xl">
          <p className="text-xl md:text-2xl font-bold">Education</p>
          <div className="flex flex-col items-start gap-5 text-sm md:text-lg text-left font-bold">
            <p>
              Our education program runs for 2 months, meeting once a week. Each session features a 20–30 minute lecture followed by a 30 minute hands-on segment in small breakout groups, giving you both the knowledge and practical experience to grow as a DJ.
            </p>
            <p>
              The program is open to all skill levels—whether you&apos;re a complete beginner or already have some experience, you&apos;ll find the right mix of challenge and support.
            </p>
            <p>
              At the end of the program, you&apos;ll have the opportunity to complete a skill assessment. Those who pass will be invited to join our &quot;gig group&quot; and perform at campus events.
            </p>
            <p>
              We meet weekly on Thursdays at 6:00pm in JRR A98 starting <u>Feb 5, 2026</u>. Equipment provided.
            </p>
          </div>
          <BackLink />
        </div>
      </div>
    </div>
  );
}
