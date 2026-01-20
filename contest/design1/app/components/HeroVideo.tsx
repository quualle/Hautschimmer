"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    // On desktop, load video immediately
    // On mobile, delay video loading to improve LCP
    if (!checkMobile()) {
      setShouldLoadVideo(true);
    } else {
      // On mobile, load video after LCP (2 seconds delay)
      const timer = setTimeout(() => setShouldLoadVideo(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

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
  }, [shouldLoadVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Priority poster image for fast LCP */}
      <Image
        src={poster}
        alt="Hautschimmer - Ästhetische Medizin für natürliche Schönheit"
        fill
        priority
        fetchPriority="high"
        quality={85}
        className={`object-cover ${shouldLoadVideo && isReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        sizes="100vw"
      />

      {/* Video loads after poster for better LCP */}
      {shouldLoadVideo && !hasError && (
        <video
          ref={videoRef}
          className={`${className} ${isReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          autoPlay
          playsInline
          muted
          loop
          preload="metadata"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Overlay: sanfter Vignette + Gradient für Lesbarkeit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-white/40" />
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.35)" }} />
      </div>

      {/* Reduced motion Fallback */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none !important; }
        }
      `}</style>
    </div>
  );
}
