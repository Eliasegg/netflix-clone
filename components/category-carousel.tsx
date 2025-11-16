"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import type { Category, MovieOrSeries } from "@/lib/movies-series";
import ThumbnailPreviewCard from "./thumbnail-preview-card";

interface CategoryCarouselProps {
  category: Category;
}

export default function CategoryCarousel({ category }: CategoryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMovedForward, setHasMovedForward] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<MovieOrSeries | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(category.items.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setHasMovedForward(true);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = category.items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextItemIndex =
    (currentPage * itemsPerPage + itemsPerPage) % category.items.length;
  const previewItem = category.items[nextItemIndex];

  return (
    <div className="relative mb-12 pl-[4vw]">
      <div className="flex items-center justify-between mb-4 pr-[4vw]">
        <h2 className="text-white text-[1.4vw] font-medium ml-0">
          {category.title}
        </h2>
        {totalPages > 1 && (
          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`h-[2px] w-3 transition-colors ${
                  index === currentPage ? "bg-gray-300" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative group overflow-x-hidden">
        {totalPages > 1 && hasMovedForward && (
          <button
            onClick={prevPage}
            className="absolute left-0 top-0 bottom-0 z-20 w-[4vw] bg-linear-to-r from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        <div className="relative">
          <div className="flex gap-[0.2vw]">
            {currentItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="relative aspect-video cursor-pointer shrink-0 transition-transform duration-300"
                style={{ width: "calc((100% - 1vw) / 6.5)" }}
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredItem(item);
                  setHoverPosition({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                  });
                }}
                onMouseLeave={() => {
                  if (!isPreviewHovered) {
                    setHoveredIndex(null);
                    setHoveredItem(null);
                    setHoverPosition(null);
                  }
                }}
              >
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title}
                  fill
                  className="object-cover rounded-sm"
                />
                {item.progressWatched > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-sm">
                    <div
                      className="h-full bg-red-600 rounded-bl-sm"
                      style={{ width: `${item.progressWatched}%` }}
                    />
                  </div>
                )}
              </div>
            ))}

            {previewItem && (
              <div
                className="relative aspect-video cursor-pointer shrink-0 opacity-50"
                style={{ width: "calc((100% - 1vw) / 6)" }}
                onClick={nextPage}
              >
                <div className="relative w-full h-full overflow-hidden rounded-sm">
                  <Image
                    src={previewItem.thumbnailUrl}
                    alt={previewItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute inset-y-0 left-0 w-[3vw] flex items-center justify-center bg-linear-to-r from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hoveredItem && hoverPosition && (
        <ThumbnailPreviewCard
          item={hoveredItem}
          isHovered={hoveredIndex !== null || isPreviewHovered}
          position={hoverPosition}
          onPreviewEnter={() => setIsPreviewHovered(true)}
          onPreviewLeave={() => {
            setIsPreviewHovered(false);
            setHoveredIndex(null);
            setHoveredItem(null);
            setHoverPosition(null);
          }}
        />
      )}
    </div>
  );
}

