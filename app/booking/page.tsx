import BackLink from "../components/BackLink";

export default function Booking() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="flex flex-col items-center justify-center gap-12">
        <p className="text-xl md:text-2xl font-bold px-10 md:px-16">Booking</p>
        <div className="flex flex-col items-start gap-6 max-w-3xl text-base md:text-lg px-8 md:px-0 text-left font-bold">
          <p>Need a DJ? Our team is available for booking.</p>
          <p>Shoot us a quick email at <a href="mailto:ab4386@princeton.edu" className="text-blue-600">ab4386@princeton.edu</a>.</p>
        </div>
        <BackLink />
      </div>
    </div>
  );
}