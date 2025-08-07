"use client";

import { useEffect, useState } from "react";
import { getPlanityBookingUrl, openPlanityBooking } from "../utils/planityBooking";

export default function BookingOrb() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={getPlanityBookingUrl()}
      onClick={openPlanityBooking}
      className={`fixed right-6 bottom-6 z-50 rounded-full w-16 h-16 flex items-center justify-center transition-all focus-glow
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      aria-label="Jetzt Termin Buchen"
      style={{
        background: "linear-gradient(135deg, var(--lux-gold), var(--lux-pearl))",
        boxShadow: "0 10px 30px rgba(210,180,140,0.35), 0 0 0 1px rgba(255,255,255,0.3) inset",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12L16 14" stroke="#2A2420" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2A2420" strokeWidth="1.5" />
      </svg>
    </a>
  );
}


