import BackLink from "../components/BackLink";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2 }} className="flex min-h-screen items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl text-center">
          <p className="text-xl md:text-2xl font-bold">Booking</p>
          <p className="text-sm md:text-base text-white/70 max-w-lg">
            Need a DJ for your event? Fill out the form and we&apos;ll get back to you. We do Princeton campus events, off-campus events, and private parties.
          </p>
          <BookingForm />
          <BackLink />
        </div>
      </div>
    </div>
  );
}
