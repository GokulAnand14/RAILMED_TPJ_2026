import React from "react";
import { ShieldCheck, Award, MessageSquare, BookOpen, Stethoscope, Building2 } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-3xl mx-auto my-6 p-4 sm:p-6 bg-white/80 border border-slate-200/90 rounded-3xl shadow-sm backdrop-blur-xs">
      {/* Decorative Grid Lines (Pure lightweight SVG) */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 rounded-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-center">
        {/* Left Feature Pill: Orations & Panels */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">2 Memorial Orations</div>
              <div className="text-[11px] text-amber-800 font-medium">Dhandapani & Rahulan</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-300 text-purple-800 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">2 Clinical Panels</div>
              <div className="text-[11px] text-purple-800 font-medium">Cancer Care & Diabetes</div>
            </div>
          </div>
        </div>

        {/* Center Nexus: Main Emblem */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-700 text-white text-center shadow-md shadow-blue-500/15 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-3">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-blue-200 font-mono">
            Southern Railway
          </span>
          <h4 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
            Zonal Medical Conclave
          </h4>
          <p className="text-[11px] text-blue-100 mt-1">
            Cauvery Meeting Hall • Golden Rock, Trichy
          </p>
        </div>

        {/* Right Feature Pill: Sessions & Faculty */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 text-blue-800 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">22 CME Sessions</div>
              <div className="text-[11px] text-blue-800 font-medium">Evidence-Based Medicine</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-300 text-teal-800 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">JIPMER & Rly Faculty</div>
              <div className="text-[11px] text-teal-800 font-medium">Multi-specialty Exchange</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
