import React, { useState } from "react";
import { Train, Plane, Car, CloudSun, Landmark, ExternalLink, Navigation, ShieldCheck, Copy, Check, MapPin } from "lucide-react";
import { venueData } from "../data/venueData";
import { trichyHeritageGuide } from "../data/trichyGuideData";
import { playChime } from "../utils/soundEffects";

export default function VenueGuide() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("Cauvery Meeting Hall, DRM Office Campus, Divisional Railway Hospital, Golden Rock, Tiruchchirappalli - 620004");
    setCopiedAddress(true);
    playChime();
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="venue" className="pt-6 pb-12 bg-[#030917] border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5 font-cinzel">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Venue & Heritage Travel Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            Venue & <span className="text-gold-gradient">Tiruchchirappalli (TPJ)</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-2 leading-relaxed">
            Convenient railway connectivity, airport links, and iconic South Indian heritage landmarks for visiting medical delegates.
          </p>
        </div>

        {/* Venue Highlight Card */}
        <div className="royal-card p-6 sm:p-10 mb-12 border-amber-500/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-cinzel">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Official Conclave Venue</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white mb-2 text-gold-light">
                {venueData.venueName}
              </h3>
              <p className="text-sm text-slate-300 mb-4 font-medium">
                {venueData.campus} • {venueData.address}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#030917] border border-amber-500/20 text-amber-300 font-semibold">
                  <CloudSun className="w-4 h-4 text-amber-400" />
                  <span>{venueData.weatherInfo.avgTemp} (Pleasant September)</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#030917] border border-emerald-500/30 text-emerald-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Air-Conditioned Auditorium • Wi-Fi Enabled</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <a
                href="https://maps.google.com/?q=Divisional+Railway+Hospital+Golden+Rock+Tiruchirappalli"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="px-5 py-3 rounded-xl bg-[#030917] hover:bg-[#071536] border border-amber-500/30 text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAddress ? "Address Copied!" : "Copy Venue Address"}</span>
              </button>

              <a
                href="https://maps.google.com/?q=Cauvery+Meeting+Hall+DRM+Campus+Tiruchirappalli"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#040e24] hover:bg-[#081b47] border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Connectivity Grid */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400/90 font-cinzel">
              Transit & Connectivity Hubs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venueData.connectivity.map((item, idx) => {
              const Icon = idx === 0 ? Train : idx === 1 ? Plane : Car;
              return (
                <div
                  key={idx}
                  className="royal-card p-6 flex flex-col justify-between hover:border-amber-400/70 transition-all"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex items-center justify-center mb-4">
                      <div className="w-full h-full rounded-xl bg-[#030917] flex items-center justify-center text-amber-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold font-cinzel text-white mb-1">
                      {item.mode}
                    </h4>
                    <div className="text-xs font-semibold text-amber-300 mb-2">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {item.details}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 bg-[#030917] px-3 py-1 rounded-lg border border-amber-500/20 inline-block font-semibold self-start">
                    {item.distance}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tiruchirappalli Heritage Sights Spotlight */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel flex items-center justify-center gap-1.5">
              <Landmark className="w-4 h-4" />
              <span>Explore Historic Tiruchirappalli</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white mt-1">
              Iconic <span className="text-gold-gradient">Heritage Landmarks</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trichyHeritageGuide.heritageSights.map((sight) => (
              <div
                key={sight.id}
                className="royal-card p-5 flex flex-col justify-between hover:border-amber-400/80 transition-all"
              >
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-cinzel mb-2 inline-block">
                    {sight.category}
                  </span>
                  <h4 className="text-base font-bold font-cinzel text-white mb-1.5">
                    {sight.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {sight.highlights}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-300 font-medium">
                  <span>{sight.distance}</span>
                  <span className="text-slate-400">({sight.travelTime})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
