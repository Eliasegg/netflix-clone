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
    <div 
      className="relative w-full bg-black overflow-hidden"
      style={{
        height: "56.25vw",
        maxHeight: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
      }}
    >
      <div className="absolute inset-0 w-full h-full" aria-hidden="true" role="presentation">
        <div className="relative w-full h-full overflow-hidden">
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
        </div>
      </div>

      {/* Audio toggle and maturity rating */}
      <div
        className="absolute right-0 z-10 flex items-center gap-3 pl-[4vw] pr-0"
        style={{ bottom: "10vw" }}
      >
        <button
          type="button"
          onClick={videoEnded ? handleReplay : handleToggleMute}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-transparent text-white transition hover:border-white hover:bg-white/10 focus:outline-none cursor-pointer"
          aria-label={muted ? "Activar el audio" : "Desactivar el audio"}
          data-uia="audio-toggle"
        >
          {videoEnded ? (
            <RotateCcw className="h-5 w-5" />
          ) : muted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>

        {/* Maturity rating ribbon styled like Netflix */}
        <div data-uia="maturity-rating">
          <div
            style={{
              WebkitTextSizeAdjust: "100%",
              color: "#fff",
              lineHeight: "1.2",
              WebkitFontSmoothing: "antialiased",
              cursor: "default",
              fontFamily:
                "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
              userSelect: "none",
              alignItems: "center",
              backgroundColor: "rgba(51,51,51,.6)",
              border: "3px #dcdcdc",
              borderLeftStyle: "solid",
              boxSizing: "border-box",
              display: "flex",
              fontSize: "1.1vw",
              height: "2.4vw",
              padding: ".5vw 3.5vw .5vw .8vw",
            }}
          >
            <span>{ratingLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
