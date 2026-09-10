import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-30 p-3 rounded-full bg-[#040d21]/90 backdrop-blur-xl border border-amber-500/50 text-amber-400 hover:text-slate-950 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:border-amber-400 shadow-xl shadow-black/80 active:scale-90 transition-all duration-200 cursor-pointer animate-in fade-in zoom-in-75 group"
      aria-label="Scroll back to top"
      title="Back to Top"
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
