"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroBillboardProps {
  imageSrc: string;
  heading: string;
  description: string;
  subtitle: string;
  subtitleVariant?: string;
}

export default function HeroBillboard({
  imageSrc,
  heading,
  description,
  subtitle,
  subtitleVariant,
}: HeroBillboardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState(subtitle);

  useEffect(() => {
    // Shrink después de 3 segundos
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Rotar subtítulo cada 3 segundos cuando está expandido
    if (!isExpanded || !subtitleVariant) return;

    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev === subtitle ? subtitleVariant : subtitle));
    }, 3000);

    return () => clearInterval(interval);
  }, [isExpanded, subtitle, subtitleVariant]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute bottom-56 left-4 sm:left-8 lg:left-12 flex flex-col">
        <div
          className="transition-transform duration-[1300ms] ease-in-out"
          style={{
            transformOrigin: "left bottom",
            transform: isExpanded ? "scale(1)" : "scale(0.583)",
          }}
        >
          <div className="relative w-[700px] h-[1205px]">
            <Image
              src={imageSrc}
              alt="Frankenstein"
              fill
              className="object-contain object-left-bottom"
              priority
            />
          </div>
        </div>

        <div
          className="transition-all duration-[1300ms] ease-in-out"
          style={{
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? "translate3d(0, 0, 0)" : "translate3d(0, -50px, 0)",
          }}
        >
          <div
            className="max-w-xl lg:max-w-2xl space-y-3 lg:space-y-4 transition-opacity duration-[600ms]"
            style={{
              opacity: isExpanded ? 1 : 0,
              transitionDelay: isExpanded ? "200ms" : "0ms",
            }}
          >
            <div className="text-sm sm:text-base lg:text-xl font-semibold text-white">
              {heading}
            </div>

            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed">
              {description}
            </p>

            <p className="text-sm sm:text-base lg:text-lg font-medium italic text-white/95 transition-opacity duration-500">
              {currentSubtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

