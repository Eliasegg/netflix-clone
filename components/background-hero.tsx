"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  ratingLabel?: string;
}

const DEFAULT_VIDEO_SRC = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function BackgroundHero({
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = "/fallback-image.jpg",
  ratingLabel = "16+",
}: BackgroundHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // el vídeo debe iniciar en silencio por defecto y estar montado en el DOM al cargar la página
    video.muted = true;
    const play = async () => {
      try {
        await video.play();
      } catch (err) {
        // Autoplay puede estar bloqueado; ignorar silenciosamente.
      }
    };

    play();
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta el elemento &quot;video&quot;.
      </video>

      {/* overlay oscuro atrás del vídeo. TODO: cambiarlo para que se parezca más */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Worlds 2025
          </h1>
          <p className="text-sm text-white/80 sm:text-base">
            El evento más grande de la industria de videojuegos. Vívelo.
          </p>
        </div>
      </div>

      {/* Mute/Unmute & rating ribbon */}
      <button
        type="button"
        onClick={handleToggleMute}
        className="group pointer-events-auto absolute bottom-6 right-6 z-20 rounded-full bg-transparent text-white focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-black/40 backdrop-blur-sm transition group-hover:bg-white/20">
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </div>
          <div className="h-8 w-px bg-white/40" />
          <div className="rounded-sm bg-black/60 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
            {ratingLabel}
          </div>
        </div>
      </button>
    </div>
  );
}
