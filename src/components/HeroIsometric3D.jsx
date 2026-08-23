import React, { useState, useEffect } from "react";
import { ShieldCheck, Stethoscope, Activity, Award, HeartPulse, Sparkles, CheckCircle2, Building, Flame } from "lucide-react";

export default function HeroIsometric3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl mx-auto h-[290px] sm:h-[400px] flex items-center justify-center my-4 sm:my-6 select-none perspective-[1000px] scale-[0.85] sm:scale-100 origin-center"
    >
      {/* Isometric 3D Base Grid & Glowing Ring */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${15 - mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft Radial Ambient Aura beneath 3D objects */}
        <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/15 blur-3xl" />

        {/* Isometric Ground Grid Lines */}
        <div className="absolute w-[360px] sm:w-[500px] h-[220px] sm:h-[280px] rounded-3xl border border-blue-200/50 bg-gradient-to-b from-blue-50/40 via-white/60 to-transparent shadow-[0_20px_50px_rgba(37,99,235,0.06)] transform -rotate-x-12 rotate-45 opacity-90 backdrop-blur-2xs" />

        {/* Connecting Isometric Circuit Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-300/60 stroke-[1.5] [stroke-dasharray:4_4] animate-pulse"
          viewBox="0 0 800 400"
          fill="none"
        >
          <path d="M 220 220 L 400 160 L 580 220" />
          <path d="M 400 160 L 400 90" />
          <path d="M 220 220 L 220 280" />
          <path d="M 580 220 L 580 280" />
        </svg>

        {/* Center 3D Floating Stage (Memorial Orations & Zonal Leadership) */}
        <div
          className="absolute transform -translate-y-8 flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Isometric Podium Base */}
          <div className="relative">
            <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-3xl bg-gradient-to-b from-white via-blue-50 to-blue-100 border border-blue-200 shadow-xl shadow-blue-500/10 flex items-center justify-center p-3 relative transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <ShieldCheck className="w-8 sm:w-9 h-8 sm:h-9 text-white stroke-[1.75]" />
              </div>

              {/* Glowing Pulse Ring around Shield */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 text-[9px] text-white font-bold items-center justify-center">✓</span>
              </span>
            </div>

            {/* Badge floating below center */}
            <div className="mt-3 px-3 py-1 rounded-full bg-white/95 border border-blue-200/90 shadow-md text-[11px] sm:text-xs font-bold text-slate-800 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>RAILMED Zonal Conclave</span>
            </div>
          </div>
        </div>

        {/* Left 3D Node: Oncology & Orations Podium */}
        <div
          className="absolute left-6 sm:left-24 top-24 sm:top-28 transform -translate-y-4 flex flex-col items-center group transition-transform duration-300 hover:scale-105"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-white/90 border border-amber-200/90 shadow-lg shadow-amber-500/5 flex items-center justify-center p-2 backdrop-blur-sm">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] sm:text-[11px] font-bold text-amber-900 shadow-2xs whitespace-nowrap">
            2 Memorial Orations
          </div>
        </div>

        {/* Right 3D Node: Diabetes, Cardiology & Multi-specialty */}
        <div
          className="absolute right-6 sm:right-24 top-24 sm:top-28 transform -translate-y-4 flex flex-col items-center group transition-transform duration-300 hover:scale-105"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-2xl bg-white/90 border border-teal-200/90 shadow-lg shadow-teal-500/5 flex items-center justify-center p-2 backdrop-blur-sm">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
              <HeartPulse className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[10px] sm:text-[11px] font-bold text-teal-900 shadow-2xs whitespace-nowrap">
            22 Scientific Sessions
          </div>
        </div>

        {/* Floating Mini 3D Chips around */}
        <div
          className="hidden sm:flex absolute left-8 bottom-12 items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-md text-xs font-semibold text-slate-700 animate-bounce duration-[4000ms]"
          style={{ transform: "translateZ(40px)" }}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>JIPMER & Southern Railway Faculty</span>
        </div>

        <div
          className="hidden sm:flex absolute right-8 bottom-12 items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-md text-xs font-semibold text-slate-700 animate-bounce duration-[5000ms]"
          style={{ transform: "translateZ(40px)" }}
        >
          <Building className="w-3.5 h-3.5 text-indigo-600" />
          <span>5 Industry Symposia</span>
        </div>
      </div>
    </div>
  );
}
