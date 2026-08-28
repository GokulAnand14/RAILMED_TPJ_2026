import React from "react";
import { ShieldCheck, Crown, Star } from "lucide-react";
import { dignitariesData } from "../data/dignitariesData";

export default function DignitariesShowcase({ onOpenInvitationModal }) {
  const { chiefGuest, guestsOfHonour, organisingLeadership, accreditation } = dignitariesData;

  return (
    <section id="dignitaries" className="py-20 bg-gradient-to-b from-[#030917] via-[#05112c] to-[#030917] relative overflow-hidden">
      
      {/* Background Decorative Gold Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cinzel">Patronage & Executive Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            Distinguished <span className="text-gold-gradient">Dignitaries & Patrons</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
            Honouring the distinguished clinical leadership and divisional administration guiding the Southern Railway CME Conclave.
          </p>
        </div>

        {/* Chief Guest Flagship Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d2252] via-[#091b40] to-[#0d2252] border-2 border-amber-400/50 p-6 sm:p-10 shadow-2xl mb-10 overflow-hidden group">
          {/* Subtle gold shimmer effect */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Badge & Icon */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider font-cinzel shadow-md">
                <Crown className="w-4 h-4" />
                <span>Chief Guest</span>
              </div>
              <div className="text-xs font-bold text-amber-300/90 font-cinzel">
                Inauguration Ceremony • 19th Sept 2026 at 09:30 AM
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Cauvery Meeting Hall, DRM Office Campus, TPJ
              </div>
            </div>

            {/* Middle Main Content */}
            <div className="lg:col-span-8 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-amber-500/30 pt-4 lg:pt-0 lg:pl-8 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white text-gold-light">
                {chiefGuest.name}
              </h3>
              <p className="text-sm sm:text-base font-bold text-amber-300 font-sans">
                {chiefGuest.designation}, {chiefGuest.institution}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
                {chiefGuest.bio}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Guests of Honour */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400/90 font-cinzel">
              Has Consented to be Guest of Honour
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guestsOfHonour.map((guest, idx) => (
              <div
                key={idx}
                className="royal-card p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-400/80 transition-all duration-300"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 font-cinzel">
                      {guest.badge}
                    </span>
                    <Star className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold font-cinzel text-white group-hover:text-amber-300 transition-colors">
                    {guest.name}
                  </h4>

                  <div className="text-xs sm:text-sm font-semibold text-amber-400/90 font-sans">
                    {guest.designation} • {guest.institution}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {guest.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Guest of Honour</span>
                  <span className="text-amber-400 font-semibold">RAILMED TPJ 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organising Leadership & TNMC Accreditation Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Organising Chairman */}
          <div className="royal-card p-6 border-amber-500/30 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-900/50 text-blue-300 border border-blue-700/50 uppercase font-cinzel">
                {organisingLeadership[0].role}
              </span>
              <h4 className="text-lg font-bold font-cinzel text-white mt-3 mb-1">
                {organisingLeadership[0].name}
              </h4>
              <p className="text-xs font-semibold text-amber-300">
                {organisingLeadership[0].designation}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {organisingLeadership[0].institution}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-amber-400/80 font-bold uppercase tracking-wider">
              Southern Railway Medical Leadership
            </div>
          </div>

          {/* Organising Vice Chairman */}
          <div className="royal-card p-6 border-amber-500/30 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-900/50 text-blue-300 border border-blue-700/50 uppercase font-cinzel">
                {organisingLeadership[1].role}
              </span>
              <h4 className="text-lg font-bold font-cinzel text-white mt-3 mb-1">
                {organisingLeadership[1].name}
              </h4>
              <p className="text-xs font-semibold text-amber-300">
                {organisingLeadership[1].designation}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {organisingLeadership[1].institution}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-amber-400/80 font-bold uppercase tracking-wider">
              Divisional Administration Leadership
            </div>
          </div>

          {/* TNMC Accreditation Card */}
          <div className="royal-card p-6 bg-gradient-to-br from-[#06241d] to-[#041624] border-emerald-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-cinzel">
                  Accreditation
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold font-cinzel text-white mt-3 mb-1">
                {accreditation.creditHours}
              </h4>
              <p className="text-xs font-bold text-emerald-300">
                {accreditation.council}
              </p>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                {accreditation.scope}. Accredited for CME credit certification.
              </p>
            </div>
            <button
              onClick={onOpenInvitationModal}
              className="mt-4 pt-3 border-t border-emerald-900/60 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center justify-between cursor-pointer"
            >
              <span>View Accreditation in Invitation</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
