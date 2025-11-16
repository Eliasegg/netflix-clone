import BackgroundHero from "@/components/background-hero";
import HeroBillboard from "@/components/hero-billboard";
import Navbar from "@/components/navbar";
import CategoryCarousel from "@/components/category-carousel";
import { movieSeriesCategories } from "@/lib/movies-series";

export default function Home() {
  return (
    <div
      className="relative bg-black w-full min-h-screen"
      style={{
        fontFamily: "Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif",
        userSelect: "none",
        color: "#fff",
      }}
    >
      {/* Top navigation bar */}
      <Navbar />

      {/* Billboard container matching Netflix structure */}
      <div
        className="billboard-container relative w-full"
        style={{ height: "56.25vw", maxHeight: "100vh" }}
      >
        {/* Background video */}
        <BackgroundHero 
          videoSrc="/frankenstein.webm" 
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

      {/* Categories Section */}
      <div className="relative -mt-[8vw] z-10 pb-20">
        {movieSeriesCategories.map((category) => (
          <CategoryCarousel key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
