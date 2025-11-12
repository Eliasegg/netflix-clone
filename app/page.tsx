import BackgroundHero from "@/components/background-hero";
import HeroBillboard from "@/components/hero-billboard";

export default function Home() {
  return (
    <div className="relative">
      {/* Background vid */}
      <BackgroundHero videoSrc="/worlds-2025.mp4" posterSrc="/poster.jpg" ratingLabel="16+" />
      
      {/* Hero billboard. Esencialmente el contenido del hero. TODO: Quizá moverlo inside el BackgroundHero */}
      <div className="absolute inset-0 z-20">
        <HeroBillboard
          imageSrc="/imgs/hero/frankenstein.webp"
          heading="Jugar a ser Dios: Ver ahora"
          description="El ganador del Oscar® Guillermo del Toro adapta el clásico relato de Mary Shelley sobre un científico brillante y la criatura que engendra con su monstruosa ambición."
          subtitle="Todo era nuevo para él."
          subtitleVariant="El calor, el frío, la luz, la oscuridad."
        />
      </div>
    </div>
  );
}
