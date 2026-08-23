import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Building2, ArrowRight, Download, Clock, ShieldCheck, Award, Users } from "lucide-react";
import HeroIsometric3D from "./HeroIsometric3D";
import { downloadFullConferenceICS } from "../utils/icsGenerator";

export default function Hero({ onExploreSchedule, onOpenPocketSchedule }) {
  // Target Conference Date: September 19, 2026 08:00 AM IST
  const targetDate = new Date("2026-09-19T08:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const institutions = [
    { name: "JIPMER Puducherry", badge: "Academic Faculty" },
    { name: "KAPV Govt Medical College", badge: "Specialist Faculty" },
    { name: "RH Perambur (PER)", badge: "Apex Centre" },
    { name: "Golden Rock Hospital (GOC)", badge: "Host Division" },
    { name: "Novartis", badge: "Symposium" },
    { name: "Cipla", badge: "Symposium" },
    { name: "GSK", badge: "Symposium" },
    { name: "Novo Nordisk", badge: "Symposium" },
    { name: "Eli Lilly", badge: "Symposium" },
  ];

  return (
    <section id="overview" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Eyebrow Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 mb-6 shadow-2xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-xs font-semibold text-blue-700 tracking-tight">
            Indian Railway Medical Service Association (Southern Railway)
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-5 font-sans">
          RAILMED TPJ <span className="text-blue-600">CME 2026</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          The Annual Continuing Medical Education Conference uniting clinical specialists, surgeons, and railway medical leaders.
        </p>

        {/* Meta badges: Date, Venue, Location */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 mb-8">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-2xs backdrop-blur-xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800">19th & 20th September 2026</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-2xs backdrop-blur-xs">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800">Tiruchirappalli (TPJ), Tamil Nadu</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-2xs backdrop-blur-xs">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-800">Divisional Railway Hospital Campus, GOC</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-6 w-full max-w-lg sm:max-w-none mx-auto">
          <button
            onClick={onExploreSchedule}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/15 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore 2-Day Schedule</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <a
            href="#orations"
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Memorial Orations</span>
          </a>

          <button
            onClick={onOpenPocketSchedule}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Pocket Timetable</span>
          </button>
        </div>

        {/* 3D Isometric Connected Platform Component */}
        <HeroIsometric3D />

        {/* Countdown Timer Strip */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Conference Commences In</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-medium mt-0.5">Days</div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-medium mt-0.5">Hours</div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-medium mt-0.5">Minutes</div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-medium mt-0.5">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Institution & Therapeutic Partner Logos */}
        <div className="pt-6 border-t border-slate-200/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            In academic collaboration with premier faculties & therapeutic partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {institutions.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200 text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span className="font-semibold text-slate-800">{item.name}</span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">({item.badge})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
