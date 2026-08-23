import React from "react";
import { Building2, Clock, CheckCircle2 } from "lucide-react";
import { sponsorsList } from "../data/sponsorsData";

export default function IndustrySymposia() {
  return (
    <section id="symposia" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Therapeutic Innovations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Industry Sponsored Symposia
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Scientific updates presented by pharmaceutical partners in oncology, diabetes, respiratory medicine, and cardiometabolic care.
          </p>
        </div>

        {/* Symposia Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsList.map((sponsor) => (
            <div
              key={sponsor.id}
              className="rounded-xl bg-white border border-slate-200 p-6 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                      {sponsor.badge}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                      {sponsor.name}
                    </h3>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {sponsor.tier}
                  </span>
                </div>

                {/* Session Title */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 mb-4">
                  <div className="text-xs font-bold text-slate-900 leading-snug">
                    {sponsor.sessionTitle}
                  </div>
                  {sponsor.speaker && (
                    <div className="text-[11px] text-blue-700 font-medium mt-1">
                      Faculty: {sponsor.speaker}
                    </div>
                  )}
                </div>

                {/* Schedule timing */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/80 mb-4">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{sponsor.schedule}</span>
                </div>

                {/* Focus Area & Description */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Focus: </span>
                    {sponsor.focus}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CME Accredited
                </span>
                <span className="text-[11px]">Main Auditorium</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
