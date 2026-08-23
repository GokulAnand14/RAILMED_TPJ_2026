import React from "react";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Lightweight CSS Dot Matrix Background */}
      <div 
        className="absolute inset-0 bg-dot-pattern opacity-15"
        style={{
          maskImage: "radial-gradient(ellipse at 50% 20%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, black 40%, transparent 80%)"
        }}
      />

      {/* Pure Lightweight Top Gradient Wash (Zero GPU blur, Zero JS overhead) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-blue-100/40 via-indigo-50/20 to-transparent rounded-full pointer-events-none" />
    </div>
  );
}
