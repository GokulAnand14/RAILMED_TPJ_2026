import React, { useState } from "react";
import { Sparkles, Image as ImageIcon, FileText, CheckCircle2, Copy, Check, Printer } from "lucide-react";
import { dignitariesData } from "../data/dignitariesData";
import { playChime } from "../utils/soundEffects";

export default function InvitationCard() {
  const [showRealScan, setShowRealScan] = useState(false);
  const [copied, setCopied] = useState(false);
  const { chiefGuest, guestsOfHonour, organisingLeadership } = dignitariesData;

  const handleCopyText = () => {
    const text = `RAILMED TPJ 2026 - Southern Railway CME Conclave
19th & 20th September 2026 at Cauvery Meeting Hall, DRM Campus, TPJ
Chief Guest: Dr. S. Kalyani (PCMD / Southern Railway)
TNMC 4 Credit Hours Accredited`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playChime();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Decorative Ornate Outer Gold Halo */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-3xl blur-md opacity-35 transition duration-500" />

      {/* Main Card Container */}
      <div className="relative rounded-2xl bg-[#fffef8] border-2 border-[#d4af37] shadow-2xl p-6 sm:p-10 text-slate-900 overflow-hidden">
        {/* Ornate Corner Accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600/60 rounded-br-lg pointer-events-none" />

        {/* View Switcher: Interactive Card vs Official Image Scan */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold hover:bg-amber-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Details Copied!" : "Copy Details"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold hover:bg-amber-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>

          <div className="inline-flex rounded-xl p-1 bg-amber-100/70 border border-amber-300/80 text-xs font-semibold">
            <button
              onClick={() => {
                setShowRealScan(false);
                playChime();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !showRealScan
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-amber-900 hover:text-amber-700"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Digital Card</span>
            </button>
            <button
              onClick={() => {
                setShowRealScan(true);
                playChime();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                showRealScan
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-amber-900 hover:text-amber-700"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Official Print Scan</span>
            </button>
          </div>
        </div>

        {showRealScan ? (
          <div className="rounded-xl overflow-hidden border border-amber-300 shadow-inner bg-slate-950 flex flex-col items-center">
            <img
              src="/assets/invitation_card.png"
              alt="Official RAILMED TPJ CME 2026 Invitation Card"
              className="w-full h-auto object-contain max-h-[700px]"
            />
            <p className="text-[11px] text-amber-200/90 py-2 bg-slate-900 w-full text-center font-medium">
              Official Invitation • Indian Railway Medical Service Association (Southern Railway)
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Insignia & Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md mx-auto mb-1">
                <div className="w-full h-full rounded-full bg-[#fffdf5] flex items-center justify-center text-red-700 font-bold font-cinzel text-xs tracking-tighter">
                  SR / IR
                </div>
              </div>

              <div className="text-xs uppercase tracking-widest font-bold text-amber-900/80 font-cinzel">
                Southern Railway • Tiruchchirappalli Division
              </div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-600">
                Medical Department & Indian Railway Medical Service Association
              </div>

              {/* Blue & Gold Invitation Banner */}
              <div className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#0a1b3f] via-[#0e275c] to-[#0a1b3f] border border-amber-400 shadow-md inline-block my-2">
                <h2 className="text-xl sm:text-2xl font-black font-cinzel tracking-wider text-gold-gradient uppercase">
                  INVITATION
                </h2>
              </div>
            </div>

            {/* Salutation & Body Text */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed text-center font-cormorant font-semibold text-base sm:text-lg">
              <p className="text-slate-800 font-serif italic mb-2">
                Dear Colleagues, Greetings from the Medical Department of Tiruchchirappalli Division.
              </p>
              <p className="mb-3 text-slate-700">
                It is with great pleasure that we invite you to the Annual Southern Railway CME Programme —
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-900 tracking-wide my-2">
                RAILMED TPJ – 2026
              </div>
              <p className="text-slate-700">
                to be held at <span className="font-bold text-slate-900">Cauvery Meeting Hall, DRM Office Campus, TPJ</span> on <span className="font-bold text-slate-900">19th & 20th September, 2026</span>.
              </p>
            </div>

            {/* Chief Guest Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#fffbf0] to-[#fcf5e0] border-2 border-amber-500/60 shadow-sm text-center space-y-1 relative">
              <span className="text-[11px] uppercase font-bold text-amber-800 tracking-wider">
                We are honoured to have
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-cinzel text-slate-900">
                {chiefGuest.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-amber-900">
                {chiefGuest.designation} / {chiefGuest.institution}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 text-xs font-bold mt-2 border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Chief Guest for the Inauguration • {chiefGuest.time}</span>
              </div>
            </div>

            {/* Guests of Honour Grid */}
            <div>
              <div className="text-center text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 font-cinzel">
                Has Consented to be Guest of Honour
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guestsOfHonour.map((guest, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-300 text-center">
                    <h4 className="font-bold font-cinzel text-slate-900 text-sm">
                      {guest.name}
                    </h4>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      {guest.designation}, {guest.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Scope & TNMC Accreditation Paragraph */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-center leading-relaxed font-sans">
              <p className="mb-2 font-medium">
                The programme has been meticulously planned to cover various topics of interest on <strong className="text-slate-900">Non-Communicable Diseases including Cancer, Diabetes and Hypertension</strong>, which will help us keep abreast with modern updates and thereby improve patient care.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Accredited by Tamil Nadu Medical Council (TNMC) with 4 Credit Hours</span>
              </div>
            </div>

            {/* Sign-off & Organising Committee */}
            <div className="pt-3 border-t border-amber-300 text-center space-y-3">
              <p className="italic font-cormorant text-base font-bold text-amber-900">
                With Warm Regards
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                {organisingLeadership.map((leader, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-bold font-cinzel text-slate-900 text-xs sm:text-sm">
                      {leader.name}
                    </div>
                    <div className="text-[11px] font-semibold text-amber-800">
                      {leader.designation}
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      {leader.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
