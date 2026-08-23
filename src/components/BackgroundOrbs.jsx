import React, { useState, useEffect } from "react";

export default function BackgroundOrbs() {
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Continuous Subtle Dot Grid with Radial Falloff */}
      <div 
        className="absolute inset-0 bg-dot-blue opacity-40" 
        style={{
          maskImage: "radial-gradient(circle at 50% 30%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)"
        }}
      />

      {/* Interactive Cursor Ambient Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-400/8 blur-[100px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        }}
      />

      {/* Soft Ambient Floating Orbs positioned along the page */}
      {/* Top Hero Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-blue-400/12 via-indigo-300/8 to-cyan-300/12 blur-[130px] rounded-full animate-pulse duration-[10000ms]" />

      {/* Mid-page Schedule & Orations Glow */}
      <div className="absolute top-[30%] -left-40 w-[600px] h-[600px] bg-gradient-to-r from-blue-300/10 via-teal-200/8 to-transparent blur-[140px] rounded-full" />
      <div className="absolute top-[45%] -right-40 w-[650px] h-[650px] bg-gradient-to-l from-indigo-300/10 via-amber-200/8 to-transparent blur-[140px] rounded-full" />

      {/* Lower Panels & Faculty Glow */}
      <div className="absolute top-[70%] left-10 w-[700px] h-[500px] bg-gradient-to-tr from-purple-300/8 via-blue-200/8 to-transparent blur-[140px] rounded-full" />
      <div className="absolute top-[85%] right-10 w-[600px] h-[500px] bg-gradient-to-tl from-teal-300/8 via-indigo-200/8 to-transparent blur-[140px] rounded-full" />
    </div>
  );
}
