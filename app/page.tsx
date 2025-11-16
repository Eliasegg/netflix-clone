import BackgroundHero from "@/components/background-hero";
import HeroBillboard from "@/components/hero-billboard";

export default function Home() {
  return (
    <div 
      className="relative bg-black w-full"
      style={{
        fontFamily: "Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif",
        userSelect: "none",
        color: "#fff",
      }}
    >
      {/* Billboard container matching Netflix structure */}
      <div className="billboard-container relative w-full" style={{ height: "56.25vw", maxHeight: "100vh" }}>
        {/* Background video */}
        <BackgroundHero 
          videoSrc="/worlds-2025.mp4" 
          posterSrc="/poster.jpg" 
          ratingLabel="16+" 
        />
        
        {/* Hero billboard content */}
        <HeroBillboard
          staticImageSrc="/imgs/hero/frankenstein.webp"
          synopsis="El ganador del Oscar® Guillermo del Toro adapta el clásico relato de Mary Shelley sobre un científico brillante y la criatura que engendra con su monstruosa ambición."
          videoId="81507921"
          top10Rank={2}
          top10Label="en películas hoy"
        />
      </div>
    </div>
  );
}
