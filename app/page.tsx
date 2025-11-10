import BackgroundHero from "@/components/background-hero";
import Image from "next/image";

export default function Home() {
  return (
    <BackgroundHero videoSrc="/worlds-2025.mp4" posterSrc="/poster.jpg" ratingLabel="16+" />
  );
}
