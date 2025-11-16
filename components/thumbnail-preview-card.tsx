"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import type { MovieOrSeries } from "@/lib/movies-series";
import {
  getNetflixWatchUrlForTitle,
  getNetflixSearchUrlForTitle,
} from "@/lib/netflix-name-id-map";

interface ThumbnailPreviewCardProps {
  item: MovieOrSeries;
  isHovered: boolean;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
  onPreviewEnter?: () => void;
  onPreviewLeave?: () => void;
}

export default function ThumbnailPreviewCard({
  item,
  isHovered,
  position,
  onPreviewEnter,
  onPreviewLeave,
}: ThumbnailPreviewCardProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        const timer = setTimeout(() => {
          videoRef.current?.play().catch(() => {});
        }, 300);
        return () => clearTimeout(timer);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const isSeries = item.genres.includes("Serie") || item.genres.includes("Novela");
  const displayGenres = item.genres.filter((g) => !["Serie", "Novela", "Película"].includes(g));

  const hash = Array.from(item.title).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const ageRatings = ["7+", "13+", "16+", "18+"];
  const ageRating = ageRatings[hash % ageRatings.length];

  const seriesLabels = ["1 temporada", "2 temporadas", "3 temporadas", "4 temporadas"];
  const movieLabels = ["1 h 30 min", "1 h 45 min", "2 h 5 min", "2 h 20 min"];
  const middleLabel = isSeries
    ? seriesLabels[hash % seriesLabels.length]
    : movieLabels[hash % movieLabels.length];

  const handlePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const watchUrl = getNetflixWatchUrlForTitle(item.title);
    const url = watchUrl ?? getNetflixSearchUrlForTitle(item.title);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!position || !isHovered) return null;

  const baseWidth = position.width * 1.8;
  const cardWidth = Math.min(Math.max(baseWidth, 260), 460);
  const top = Math.max(60, position.top - position.height * 0.4);
  const left = position.left + position.width / 2;

  return (
    <div
      className="fixed z-40 bg-[#181818] rounded-md overflow-hidden shadow-2xl"
      style={{
        width: cardWidth,
        top,
        left,
        transform: "translateX(-50%)",
      }}
      onMouseEnter={onPreviewEnter}
      onMouseLeave={onPreviewLeave}
      onClick={handlePlay}
    >
      <div className="relative aspect-video w-full bg-black">
        {item.previewUrl ? (
          <>
            <video
              ref={videoRef}
              src={item.previewUrl}
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            <button
              onClick={toggleMute}
              className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-white/60 bg-transparent hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </>
        ) : (
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-full bg-white hover:bg-white/80 flex items-center justify-center transition-colors"
            aria-label="Play"
            onClick={handlePlay}
          >
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-white">
          <span className="px-1.5 py-0.5 border border-gray-400 rounded text-[10px] font-medium">
            {ageRating}
          </span>
          <span className="font-medium">{middleLabel}</span>
          <span className="px-1 py-0.5 border border-gray-400 rounded text-[9px] font-semibold">
            HD
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-white/90">
          {displayGenres.slice(0, 3).map((genre, index, arr) => (
            <span key={genre}>
              {genre}
              {index < arr.length - 1 && (
                <span className="mx-1.5 text-gray-500">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

