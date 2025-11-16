"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NetflixButton from "./netflix-button";
import Top10Badge from "./top-10-badge";
import { Play, Info } from "lucide-react";

interface HeroBillboardProps {
  staticImageSrc: string;
  synopsis: string;
  videoId?: string;
  top10Rank?: number;
  top10Label?: string;
}

export default function HeroBillboard({
  staticImageSrc,
  synopsis,
  videoId,
  top10Rank,
  top10Label = "en películas hoy",
}: HeroBillboardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 pointer-events-none" />
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" 
      />
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 flex items-end pb-[10vw] px-[4vw] pointer-events-none">
          <div className="flex flex-col pointer-events-auto">
            <div
              className="origin-bottom-left mb-4"
              style={{
                transform: isExpanded
                  ? "scale(1)"
                  : "scale(0.72) translate3d(0, 11.5vw, 0)",
                transitionDuration: "1300ms",
                transitionDelay: isExpanded ? "0ms" : "5000ms",
              }}
            >
              <div
                className="relative"
                style={{
                  aspectRatio: "630/1085",
                  width: "clamp(14rem, 40vw, 32rem)",
                }}
              >
                <Image
                  src={staticImageSrc}
                  alt="Frankenstein"
                  fill
                  className="object-contain object-bottom-left"
                  priority
                />
              </div>
            </div>

            <div
              style={{
                transform: isExpanded
                  ? "translate3d(0px, 0px, 0px)"
                  : "translate3d(0px, 78.9625px, 0px)",
                transitionDuration: "1300ms",
                transitionDelay: isExpanded ? "0ms" : "5000ms",
              }}
            >
              <div
                style={{
                  opacity: isExpanded ? 1 : 0,
                  transitionDuration: "500ms",
                  transitionDelay: isExpanded ? "0ms" : "5000ms",
                }}
              >
                {top10Rank && (
                  <div className="mb-[1.2vw]">
                    <Top10Badge rank={top10Rank} label={top10Label} />
                  </div>
                )}

                <div
                  style={{ width: "33.33vw" }}
                >
                  <div
                    style={{
                      WebkitTextSizeAdjust: "100%",
                      color: "#fff",
                      lineHeight: "1.2",
                      WebkitFontSmoothing: "antialiased",
                      fontSize: "1.2vw",
                      cursor: "default",
                      fontFamily: "Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif",
                      userSelect: "none",
                    }}
                  >
                    {synopsis}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[1.5vw] flex items-center gap-4 pointer-events-auto">
              <NetflixButton variant="white" onClick={() => console.log("Play clicked")}>
                <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                Reproducir
              </NetflixButton>
              <NetflixButton variant="gray" onClick={() => console.log("More info clicked")}>
                <Info className="w-5 h-5 md:w-6 md:h-6" />
                Más información
              </NetflixButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

