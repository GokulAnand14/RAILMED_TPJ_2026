import React from "react";
import { Award, Calendar, Clock, ShieldCheck, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { orationsList } from "../data/orationsData";
import { openGoogleCalendar } from "../utils/googleCalendar";

export default function OrationsSpotlight() {
  return (
    <section id="orations" className="pt-6 pb-12 bg-[#030917] relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5 font-cinzel">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Honoring Southern Railway Medical Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            Prestigious <span className="text-gold-gradient">Memorial Orations</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-2 leading-relaxed">
            The flagship clinical lectures of RAILMED TPJ CME 2026, commemorating venerable medical leaders and pioneering clinical excellence.
          </p>
        </div>

        {/* Orations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orationsList.map((oration, idx) => (
            <div
              key={oration.id}
              className="royal-card p-6 sm:p-8 flex flex-col justify-between group hover:border-amber-400 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle gold corner ribbon */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 to-transparent pointer-events-none" />

              <div>
                {/* Header Badge & Day/Time */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wide flex items-center gap-1.5 font-cinzel">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Memorial Oration #{idx + 1}</span>
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-[#020713] px-3 py-1 rounded-lg border border-amber-500/30">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{oration.time}</span>
                  </div>
                </div>

                {/* Oration Memorial Name */}
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-cinzel mb-1">
                  {oration.title}
                </div>

                {/* Topic Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white tracking-tight mb-2 text-gold-light">
                  "{oration.topic}"
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-6">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{oration.day}</span>
                </div>

                {/* Orator Profile Box */}
                <div className="p-4 rounded-xl bg-[#040e24]/90 border border-amber-500/30 mb-5 shadow-inner">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex-shrink-0">
                      <div className="w-full h-full rounded-xl bg-[#030917] flex items-center justify-center font-bold text-amber-300 font-mono text-sm">
                        {oration.orator.avatarText}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-cinzel">
                        Distinguished Orator
                      </div>
                      <div className="text-base font-bold text-white leading-snug">
                        {oration.orator.name}
                      </div>
                      <div className="text-xs font-semibold text-amber-300">
                        {oration.orator.designation}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {oration.orator.hospital}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chairperson Info */}
                <div className="p-3 rounded-xl bg-[#07132e]/70 border border-slate-700/60 mb-5 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">Session Chairperson: </span>
                    <strong className="text-amber-200 font-cinzel">{oration.chairperson.name}</strong>
                    <span className="text-slate-400"> ({oration.chairperson.designation})</span>
                  </div>
                </div>

                {/* Abstract Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {oration.abstract}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-cinzel">
                    Key Clinical Highlights:
                  </div>
                  {oration.takeaways?.map((takeaway, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Add this oration to Google Calendar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Cauvery Meeting Hall</span>
                <button
                  onClick={() => openGoogleCalendar(oration)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold transition-all cursor-pointer group"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/80" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
