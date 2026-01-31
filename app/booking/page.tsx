import BackLink from "../components/BackLink";

export default function Booking() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="flex flex-col items-center justify-center gap-12">
        <p className="text-xl md:text-2xl font-bold px-10 md:px-16">Booking</p>
        <div className="flex flex-col items-center gap-6 max-w-3xl text-base md:text-lg px-8 md:px-0 text-center font-bold">
          <p>Need a DJ? We're an email away.</p>
          <p>Ping us with event details at <a href="mailto:ab4386@princeton.edu" className="text-blue-600">ab4386@princeton.edu</a>.</p>
        </div>
        <BackLink />
      </div>
    </div>
  );
}