/* Netflix-style top navigation bar */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bell, ChevronDown, Search, X } from "lucide-react";

const MAIN_NAV_ITEMS = [
  {
    label: "Inicio",
    href: "https://www.netflix.com/browse",
  },
  {
    label: "Series",
    href: "https://www.netflix.com/browse/genre/83",
  },
  {
    label: "Películas",
    href: "https://www.netflix.com/browse/genre/34399",
  },
  {
    label: "Juegos",
    href: "https://www.netflix.com/browse/genre/119808",
  },
  {
    label: "Novedades populares",
    href: "https://www.netflix.com/latest",
  },
  {
    label: "Mi lista",
    href: "https://www.netflix.com/my-list",
  },
  {
    label: "Explora por idiomas",
    href: "https://www.netflix.com/browse/audio",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const url = `https://www.netflix.com/search?q=${encodeURIComponent(
      trimmed,
    )}`;
    window.location.href = url;
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled
          ? "bg-linear-to-b from-black/90 via-black/80 to-black/60"
          : "bg-linear-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-[4vw] py-4 text-sm md:text-base">
        {/* Left side: logo + main navigation */}
        <div className="flex items-center gap-8">
          <a
            href="https://www.netflix.com/browse"
            aria-label="Netflix home"
            className="inline-block align-middle mr-[5px] no-underline"
          >
            <span
              style={{
                WebkitTextSizeAdjust: "100%",
                WebkitFontSmoothing: "antialiased",
                userSelect: "none",
                backgroundColor: "transparent",
                fontFamily: "nf-icon",
                speak: "none" as any,
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                lineHeight: 1,
                textTransform: "none",
                transform: "translateZ(0)",
                color: "#e50914",
                cursor: "pointer",
                display: "inline-block",
                verticalAlign: "middle",
                fontSize: 25,
              }}
            >
              N
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-5 text-[0.9rem]">
            {MAIN_NAV_ITEMS.map((item, index) => (
              <li
                key={item.label}
                className={`cursor-pointer whitespace-nowrap transition-colors ${
                  index === 0
                    ? "font-semibold text-white"
                    : "font-normal text-[rgba(255,255,255,0.7)] hover:text-white"
                }`}
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-4 md:gap-6 text-white">
          {isSearchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center border border-white/80 bg-black px-3 py-1 text-sm w-[260px] md:w-[320px]"
              aria-label="Buscar en Netflix"
            >
              <Search className="w-4 h-4 text-white mr-2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Títulos, personas, géneros"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-neutral-500"
              />
              <button
                type="button"
                onClick={handleCloseSearch}
                className="ml-2 text-white/80 hover:text-white"
                aria-label="Cerrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="hidden sm:inline-flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Buscar"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            className="relative inline-flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-[#e50914] text-[0.65rem] font-semibold px-1 min-w-[1.05rem] leading-[1.05rem]">
              2
            </span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 group"
            aria-label="Perfil y configuraciones"
          >
            <div className="relative h-8 w-8 rounded-sm overflow-hidden">
              <Image
                src="/imgs/profile-icon.png"
                alt="Perfil"
                fill
                className="object-cover"
                sizes="32px"
                priority
              />
            </div>
            <ChevronDown className="w-4 h-4 text-white/80 group-hover:text-white transition-transform group-hover:-rotate-180" />
          </button>
        </div>
      </nav>
    </header>
  );
}


