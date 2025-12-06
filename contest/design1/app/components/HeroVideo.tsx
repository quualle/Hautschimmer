"use client";

import { useState, useRef, useEffect } from "react";

type HeroVideoProps = {
  webmSrc?: string;
  mp4Src?: string;
  poster?: string;
  className?: string;
};

export default function HeroVideo({
  webmSrc = "/videos/hero.webm",
  mp4Src = "/videos/hero.mp4",
  poster = "/images/hero-bg.jpg",
  className = "absolute inset-0 w-full h-full object-cover",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setIsReady(true);
    const onError = () => setHasError(true);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  if (hasError) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className={className}
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        poster={poster}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>

      {/* Overlay: sanfter Vignette + Gradient für Lesbarkeit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-white/40" />
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.35)" }} />
      </div>

      {/* Reduced motion Fallback: statisches Poster */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
          .poster-fallback { display: block; }
        }
      `}</style>
      <img
        src={poster}
        alt="Hero Poster"
        className="poster-fallback hidden absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
