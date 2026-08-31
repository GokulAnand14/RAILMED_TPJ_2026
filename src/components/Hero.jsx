import React, { useState, useEffect, useCallback } from "react";
import { 
  Calendar, Building2, ArrowRight, Download, Clock, 
  Award, Sparkles, ShieldCheck, Users, MapPin, FileText, Maximize2, X, ExternalLink, Camera, BookOpen,
  ChevronLeft, ChevronRight, Heart
} from "lucide-react";
import { openGoogleCalendar } from "../utils/googleCalendar";
import { playChime } from "../utils/soundEffects";

export default function Hero({ onNavigate, onOpenPocketSchedule }) {
  // Target Conference Date: September 19, 2026 08:00 AM IST
  const targetDate = new Date("2026-09-19T08:00:00+05:30").getTime();
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [currentIST, setCurrentIST] = useState("");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      id: "poster",
      src: "/assets/hero_slide_1_poster.jpg",
      title: "RAILMED TPJ CME 2026 Official Theme",
      subtitle: "Srirangam Temple & Royal Peacock Heritage Artwork • Southern Railway",
      badge: "Official Emblem",
      tag: "Heritage Poster"
    },
    {
      id: "cms-tribute",
      src: "/assets/hero_slide_2_cms_tribute.jpg",
      title: "Honouring 34 Years of Exemplary Leadership",
      subtitle: "A Heartfelt Tribute to Dr. Vijayalakshmi Ramaswamy Natarajan (CMS / TPJ)",
      badge: "Leadership Tribute",
      tag: "CMS 34 Yrs Tribute"
    },
    {
      id: "invitation",
      src: "/assets/hero_slide_3_invitation.png",
      title: "Official Conclave Executive Invitation",
      subtitle: "Chief Guest Dr. S. Kalyani (PCMD / SR) • Guests of Honour Dr. U.K. Perumal & Shri Balak Ram Negi",
      badge: "Executive Notice",
      tag: "Official Invitation"
    }
  ];

  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Automatic slideshow timer with hover pause
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation for zoom modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showPosterModal) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setShowPosterModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPosterModal, nextSlide, prevSlide]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // Update live IST string
      const nowIST = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setCurrentIST(nowIST);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pageCards = [
    {
      id: "gallery",
      title: "Conclave Photo Archive",
      desc: "300+ High-resolution photo moments, clinical proceedings & leadership archive",
      icon: Camera,
      badge: "300+ Photos",
      color: "from-amber-500/20 to-rose-500/20",
      borderColor: "border-amber-500/40"
    },
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
      desc: "Digital replica & high-resolution scan of official Conclave letter with QR Code",
      icon: FileText,
      badge: "Executive Notice",
      color: "from-amber-400/20 to-yellow-500/20",
      borderColor: "border-amber-400/50"
    },
    {
      id: "resources",
      title: "Learning Resources",
      desc: "35 Official PPT slide decks from CNE presentations, viewable & downloadable",
      icon: BookOpen,
      badge: "35+ PPTs",
      color: "from-amber-500/20 to-emerald-500/20",
      borderColor: "border-amber-500/40"
    },
    {
      id: "timetable",
      title: "Pocket Timetable & QR",
      desc: "Instant printable 2-day timetable URL, mobile QR code & PDF download",
      icon: Download,
      badge: "Print & QR",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/40"
    }
  ];

  const currentSlide = heroSlides[activeSlideIndex];

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Central Hero Title & Badges */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Royal Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-600/20 border border-amber-400/50 mb-4 shadow-lg shadow-amber-500/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold text-amber-300 font-cinzel tracking-wider uppercase">
              Southern Railway • Tiruchchirappalli Division
            </span>
          </div>

          {/* Main Conclave Name */}
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
                onNavigate("gallery");
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-400/35 border border-amber-400/60 text-amber-200 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>300+ Photo Gallery</span>
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
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Pocket Timetable & QR</span>
            </button>
          </div>
        </div>

        {/* Grand Interactive Slideshow Showcase & Live Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto mb-16">
          
          {/* Left Column: Interactive Hero Artwork Slideshow */}
          <div 
            className="lg:col-span-7 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Glowing Amber Atmosphere Halo */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl blur-md opacity-35 group-hover:opacity-65 transition duration-500" />
            
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-[#040e24] shadow-2xl flex flex-col">
              
              {/* Slide Image Frame with Smooth Crossfade */}
              <div 
                onClick={() => {
                  playChime();
                  setShowPosterModal(true);
                }}
                className="relative w-full aspect-4/3 sm:aspect-16/10 bg-[#020713] overflow-hidden cursor-zoom-in group/slide flex items-center justify-center"
                title="Click to view full high-resolution image in lightbox"
              >
                <img
                  key={currentSlide.id}
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  className="w-full h-full object-contain bg-[#020713] transform group-hover/slide:scale-[1.02] transition duration-500 animate-in fade-in"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030917] via-transparent to-transparent opacity-75 pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/90 text-amber-300 border border-amber-400/50 backdrop-blur-md shadow-lg font-cinzel">
                    {currentSlide.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow">
                    {activeSlideIndex + 1} / {heroSlides.length}
                  </span>
                </div>

                {/* Left / Right Carousel Arrow Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playChime();
                    prevSlide();
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-xl cursor-pointer active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playChime();
                    nextSlide();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-xl cursor-pointer active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Bar Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#040d21]/95 backdrop-blur-md border border-amber-500/40 text-xs shadow-lg">
                  <div className="overflow-hidden pr-2">
                    <div className="font-bold text-amber-200 font-cinzel text-xs sm:text-sm truncate">
                      {currentSlide.title}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                      {currentSlide.subtitle}
                    </div>
                  </div>
                  <div className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 flex-shrink-0 text-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Zoom</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Slide Navigation Tabs */}
              <div className="p-2.5 bg-[#030917] border-t border-amber-500/20 flex items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        playChime();
                        setActiveSlideIndex(idx);
                      }}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] sm:text-xs font-semibold font-cinzel transition-all cursor-pointer truncate ${
                        activeSlideIndex === idx
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20"
                          : "bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                      }`}
                    >
                      {slide.tag}
                    </button>
                  ))}
                </div>

                {/* Indicator Dots with Animated Progress */}
                <div className="flex items-center gap-1.5 px-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                        activeSlideIndex === idx
                          ? "w-10 bg-slate-700"
                          : "w-2 bg-slate-700 hover:bg-slate-500"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {activeSlideIndex === idx && (
                        <div 
                          className={`absolute top-0 left-0 h-full bg-amber-400 ${isPaused ? "w-full transition-all" : ""}`}
                          style={!isPaused ? {
                            animation: "slideshowProgress 5s linear forwards"
                          } : {}}
                        />
                      )}
                    </button>
                  ))}
                  <style>{`
                    @keyframes slideshowProgress {
                      0% { width: 0%; }
                      100% { width: 100%; }
                    }
                  `}</style>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Live Countdown & Conclave Status */}
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

            {/* Quick Conclave Highlight Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-amber-600/10 border border-amber-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Heart className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200 font-cinzel">34 Years of Exemplary Service</div>
                <div className="text-[11px] text-slate-300">Heartfelt tribute celebrating Dr. Vijayalakshmi R. Natarajan (CMS/TPJ)</div>
              </div>
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

      {/* Poster Zoom Lightbox Modal with Slideshow Switcher */}
      {showPosterModal && (
        <div
          onClick={() => setShowPosterModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[95vh] bg-[#040d21] border-2 border-amber-500/50 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-2 py-1.5 border-b border-amber-500/30 mb-2 gap-3 flex-shrink-0">
              <div className="overflow-hidden">
                <span className="text-xs sm:text-sm font-bold font-cinzel text-amber-300 truncate block">
                  {currentSlide.title}
                </span>
                <span className="text-[10px] text-slate-300 truncate block">
                  {currentSlide.subtitle}
                </span>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                  {activeSlideIndex + 1} / {heroSlides.length}
                </span>
                <button
                  onClick={() => setShowPosterModal(false)}
                  className="p-1.5 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Main Image with Arrows */}
            <div className="relative flex-1 bg-[#020713] rounded-2xl overflow-hidden flex items-center justify-center p-2 min-h-[50vh]">
              <img
                src={currentSlide.src}
                alt={currentSlide.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playChime();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 flex items-center justify-center transition-all cursor-pointer shadow-2xl active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playChime();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 flex items-center justify-center transition-all cursor-pointer shadow-2xl active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Bottom Switcher Tabs */}
            <div className="pt-3 flex items-center justify-between gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      playChime();
                      setActiveSlideIndex(idx);
                    }}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer truncate ${
                      activeSlideIndex === idx
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md"
                        : "bg-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {slide.tag}
                  </button>
                ))}
              </div>

              <a
                href={currentSlide.src}
                download
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-amber-500/30 transition-colors"
                title="Download high-resolution image"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save Image</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
