import React from "react";
import { Building2, Clock, CheckCircle2 } from "lucide-react";
import { sponsorsList } from "../data/sponsorsData";

export default function IndustrySymposia() {
  return (
    <section id="symposia" className="py-20 bg-[#040e24] border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 font-cinzel">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Therapeutic Innovations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            Industry Sponsored <span className="text-gold-gradient">Symposia</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-3 leading-relaxed">
            Cutting-edge pharmacotherapy updates presented in academic partnership with leading healthcare innovators.
          </p>
        </div>

        {/* Symposia Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsList.map((sponsor) => (
            <div
              key={sponsor.id}
              className="royal-card p-6 flex flex-col justify-between hover:border-teal-400/80 transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-cinzel">
                      {sponsor.badge}
                    </span>
                    <h3 className="text-2xl font-black font-cinzel text-white mt-0.5">
                      {sponsor.name}
                    </h3>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 font-cinzel">
                    {sponsor.tier}
                  </span>
                </div>

                {/* Session Title */}
                <div className="p-3.5 rounded-xl bg-[#030917]/90 border border-amber-500/20 mb-4 shadow-inner">
                  <div className="text-xs font-bold text-white leading-snug font-cinzel">
                    {sponsor.sessionTitle}
                  </div>
                  {sponsor.speaker && (
                    <div className="text-[11px] text-amber-300 font-medium mt-1">
                      Faculty: {sponsor.speaker}
                    </div>
                  )}
                </div>

                {/* Timing */}
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-[#030917] px-3 py-1.5 rounded-lg border border-amber-500/20 mb-4">
                  <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{sponsor.schedule}</span>
                </div>

                {/* Focus & Description */}
                <div className="space-y-1.5 mb-4 text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-amber-200 font-cinzel">Therapeutic Area: </span>
                    {sponsor.focus}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {sponsor.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CME Accredited
                </span>
                <span className="text-[11px] text-slate-400">Cauvery Meeting Hall</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
