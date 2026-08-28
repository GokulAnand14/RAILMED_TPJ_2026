import React, { useState, useEffect } from "react";
import { 
  Calendar, Building2, ArrowRight, Download, Clock, 
  Award, Sparkles, ShieldCheck, Users, MapPin, FileText, Maximize2, X, ExternalLink
} from "lucide-react";
import { openGoogleCalendar } from "../utils/googleCalendar";
import { playChime } from "../utils/soundEffects";

export default function Hero({ onNavigate, onOpenPocketSchedule }) {
  // Target Conference Date: September 19, 2026 08:00 AM IST
  const targetDate = new Date("2026-09-19T08:00:00+05:30").getTime();
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [currentIST, setCurrentIST] = useState("");

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

      // Update IST Time Display
      const istString = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setCurrentIST(istString);

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

  const pageCards = [
    {
      id: "schedule",
      title: "Scientific Schedule",
      desc: "22 Sessions across 2 days with track filters, live search & Google Calendar sync",
      icon: Calendar,
      badge: "2-Day Agenda",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/40"
    },
    {
      id: "orations",
      title: "Memorial Orations & Panels",
      desc: "Dr. Sai Dhandapani & Dr. Rahulan Memorials + Multidisciplinary Panels",
      icon: Award,
      badge: "Flagship Keynotes",
      color: "from-amber-500/20 to-amber-600/20",
      borderColor: "border-amber-500/40"
    },
    {
      id: "faculty",
      title: "Faculty & Symposia",
      desc: "30+ Specialist Doctors (JIPMER, RH Perambur) & 5 Pharmaceutical Tracks",
      icon: Users,
      badge: "30+ Doctors",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/40"
    },
    {
      id: "venue",
      title: "Venue & Trichy Guide",
      desc: "Cauvery Meeting Hall transit hubs & Srirangam / Rockfort heritage tours",
      icon: MapPin,
      badge: "Travel & Tours",
      color: "from-teal-500/20 to-emerald-500/20",
      borderColor: "border-teal-500/40"
    },
    {
      id: "invitation",
      title: "Official Invitation Card",
      desc: "Digital 3D replica & high-resolution scan of official Conclave letter",
      icon: FileText,
      badge: "Executive Notice",
      color: "from-amber-400/20 to-yellow-500/20",
      borderColor: "border-amber-400/50"
    }
  ];

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top Centered Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          
          {/* Official Royal Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-600/20 border border-amber-400/40 mb-6 shadow-lg shadow-amber-500/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-amber-300 font-cinzel tracking-wider uppercase">
              Southern Railway • Tiruchchirappalli Division Medical Department
            </span>
          </div>

          {/* Main Ornate Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinzel tracking-tight text-white mb-4 drop-shadow-md">
            RAILMED TPJ <span className="text-gold-gradient">CME 2026</span>
          </h1>

          {/* Subheading from Ground Truth */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
            Annual Continuing Medical Education Conclave covering various topics of interest on Non-Communicable Diseases (NCD) including <strong className="text-amber-300">Cancer, Diabetes and Hypertension</strong> to keep abreast with modern clinical updates and elevate patient care.
          </p>

          {/* Date, Location & Accreditation Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-200 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1838]/80 border border-amber-500/30 shadow-md backdrop-blur-md">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-amber-200 font-cinzel">19th & 20th September 2026</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1838]/80 border border-amber-500/30 shadow-md backdrop-blur-md">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-200">Cauvery Meeting Hall, DRM Office Campus, TPJ</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/40 shadow-md text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">TNMC 4 Credit Hours Accredited</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => {
                playChime();
                onNavigate("schedule");
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
            >
              <span>Explore 2-Day Agenda</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                playChime();
                onNavigate("invitation");
              }}
              className="px-5 py-3 rounded-xl bg-[#0a193d]/90 hover:bg-[#0f2352] border border-amber-400/40 text-amber-200 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Official Invitation Card</span>
            </button>

            <button
              onClick={onOpenPocketSchedule}
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Pocket Timetable</span>
            </button>
          </div>
        </div>

        {/* Grand Poster Visual & Live Countdown Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto mb-16">
          
          {/* Left Column: Official Poster Spotlight Card */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-teal-500 to-amber-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <div 
              onClick={() => setShowPosterModal(true)}
              className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-[#040e24] shadow-2xl cursor-zoom-in group"
              title="Click to zoom full artwork"
            >
              <img
                src="/assets/poster_hero.jpg"
                alt="RAILMED TPJ CME 2026 Official Theme Artwork - Golden Gopuram & Peacock"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition duration-700 max-h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030917] via-transparent to-transparent opacity-80 pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#040d21]/90 backdrop-blur-md border border-amber-500/30 text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-200 font-cinzel">Heritage Theme Artwork</span>
                </div>
                <div className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Zoom Artwork</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Countdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#081533]/90 border border-amber-500/30 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider font-cinzel">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Conclave Commences In</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                  IST {currentIST || "Live"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 text-center">
                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-3 shadow-inner">
                  <div className="text-2xl sm:text-3xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Days</div>
                </div>

                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-3 shadow-inner">
                  <div className="text-2xl sm:text-3xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Hours</div>
                </div>

                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-3 shadow-inner">
                  <div className="text-2xl sm:text-3xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Mins</div>
                </div>

                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-3 shadow-inner">
                  <div className="text-2xl sm:text-3xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Secs</div>
                </div>
              </div>

              {/* Direct Add to Google Calendar Button */}
              <button
                onClick={() => openGoogleCalendar(null)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group"
              >
                <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Add Conclave to Google Calendar</span>
                <ExternalLink className="w-3 h-3 text-amber-400/80" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Page Directory Hub */}
        <div className="mt-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel">
              Conclave Portal Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white mt-1">
              Select a Dedicated Section to Explore
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    playChime();
                    onNavigate(card.id);
                  }}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} shadow-lg text-left hover:scale-[1.02] hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#030917] text-amber-300 border border-amber-500/30 font-cinzel">
                        {card.badge}
                      </span>
                      <Icon className="w-5 h-5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <h4 className="text-base font-bold font-cinzel text-white group-hover:text-amber-300 transition-colors mb-1">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-xs font-bold text-amber-400 font-cinzel">
                    <span>Open Section</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Poster Zoom Lightbox Modal */}
      {showPosterModal && (
        <div
          onClick={() => setShowPosterModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-[#040d21] border-2 border-amber-500/40 rounded-3xl p-3 shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 border-b border-amber-500/20 mb-2">
              <span className="text-xs font-bold font-cinzel text-amber-300">
                Official Conclave Artwork • Golden Gopuram & Peacock Heritage
              </span>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src="/assets/poster_hero.jpg"
              alt="Official Conclave Artwork High-Res"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
