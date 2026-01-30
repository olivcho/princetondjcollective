import BackLink from "../components/BackLink";

export default function Education() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="flex flex-col items-center justify-center gap-12">
        <p className="text-xl md:text-2xl font-bold px-10 md:px-16">Education</p>
        <div className="flex flex-col items-start gap-6 max-w-3xl text-base md:text-lg px-8 md:px-0 text-left font-bold">
          <p>
            Our education program runs for 2 months, meeting once a week. Each session features a 20–30 minute lecture followed by a 30 minute hands-on segment in small breakout groups, giving you both the knowledge and practical experience to grow as a DJ.
          </p>
          <p>
            The program is open to all skill levels—whether you're a complete beginner or already have some experience, you'll find the right mix of challenge and support.
          </p>
          <p>
            At the end of the program, you'll have the opportunity to complete a skill assessment. Those who pass will be invited to join our "gig group" and perform at campus events.
          </p>
          <p>
            We meet weekly on Thursdays at 6:00pm in JRR A98 starting <u>Feb 5, 2026</u>. Equipment provided.
          </p>
        </div>
        <BackLink />
      </div>
    </div>
  );
}