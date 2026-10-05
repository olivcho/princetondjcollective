import EducationLibrary from "./EducationLibrary";

export default function Education() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#000" }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
      >
        <source src="/princetondjvid.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1 }} />
      <div style={{ position: "relative", zIndex: 2 }} className="pt-16 lg:pt-20">
        <EducationLibrary />
      </div>
    </div>
  );
}
