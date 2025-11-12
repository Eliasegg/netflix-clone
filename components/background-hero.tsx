"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

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
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // el vídeo debe iniciar en silencio por defecto y estar montado en el DOM al cargar la página
    video.muted = true;
    const play = async () => {
      try {
        await video.play();
      } catch {}
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

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleReplay = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setVideoEnded(false);
    try {
      await video.play();
    } catch {}
  };

  return (
    <div className="relative h-[56.25vw] min-h-[300px] max-h-[800px] w-full overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted={muted}
        playsInline
        poster={posterSrc}
        onEnded={handleVideoEnded}
      >
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta el elemento &quot;video&quot;.
      </video>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Mute/Unmute & rating ribbon */}
      <div className="pointer-events-auto absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={videoEnded ? handleReplay : handleToggleMute}
          className="group rounded-full bg-transparent text-white focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-black/40 backdrop-blur-sm transition group-hover:bg-white/20">
            {videoEnded ? (
              <RotateCcw className="h-4 w-4" />
            ) : muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </div>
        </button>
        <div className="h-8 w-px bg-white/40" />
        <div className="rounded-sm bg-black/60 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
          {ratingLabel}
        </div>
      </div>
    </div>
  );
}
