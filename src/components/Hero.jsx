import React, { useState, useEffect, useCallback } from "react";
import { 
  Calendar, Building2, ArrowRight, Download, Clock, 
  ShieldCheck, Maximize2, X, ExternalLink, Camera,
  ChevronLeft, ChevronRight, Heart, Sparkles
} from "lucide-react";
import { openGoogleCalendar } from "../utils/googleCalendar";
import { playChime } from "../utils/soundEffects";

export default function Hero({ onNavigate, onOpenPocketSchedule, onOpenCertificateModal }) {
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

  const currentSlide = heroSlides[activeSlideIndex];

  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Central Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          {/* Top Division Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 mb-3.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold text-amber-300 font-cinzel tracking-wider uppercase">
              Southern Railway • Tiruchchirappalli Division
            </span>
          </div>

          {/* Main Conclave Name */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cinzel tracking-tight text-white mb-3 drop-shadow-md">
            RAILMED TPJ <span className="text-gold-gradient">CME 2026</span>
          </h1>

          {/* Concise Theme Description */}
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
            Annual Continuing Medical Education Conclave focusing on Non-Communicable Diseases (NCDs) — <strong className="text-amber-300">Cancer, Diabetes & Hypertension</strong> to advance clinical practice and patient care.
          </p>

          {/* Clean Unified Event Meta Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-200 mb-6 p-1.5 sm:p-2 rounded-2xl bg-[#0a1838]/70 border border-amber-500/25 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-200 font-cinzel font-bold">
              <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>19th & 20th Sept 2026</span>
            </div>

            <div className="hidden sm:block text-slate-600">•</div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-300 font-medium">
              <Building2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Cauvery Meeting Hall, DRM Campus, TPJ</span>
            </div>

            <div className="hidden sm:block text-slate-600">•</div>

            <button
              onClick={() => {
                playChime();
                if (onOpenCertificateModal) onOpenCertificateModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-bold transition-all cursor-pointer group shadow-sm"
              title="Click to inspect & download official TNMC Certificate (C11181666)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>TNMC 4 Credit Hours</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-1.5 py-0.2 rounded font-mono font-bold">PDF ↓</span>
            </button>
          </div>

          {/* Focused Action CTAs (2 Primary Buttons + 1 Subtle Quick-Link) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <button
              onClick={() => {
                playChime();
                onNavigate("schedule");
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group cursor-pointer active:scale-95 font-cinzel"
            >
              <span>Explore 2-Day Agenda</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                playChime();
                onOpenPocketSchedule();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0a193d]/90 hover:bg-[#0f2352] border border-amber-400/40 text-amber-200 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group active:scale-95 font-cinzel"
            >
              <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Pocket Timetable & QR</span>
            </button>
          </div>

          {/* Quick jump to photo gallery */}
          <button
            onClick={() => {
              playChime();
              onNavigate("gallery");
            }}
            className="text-[11px] sm:text-xs text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400/80" />
            <span>View 300+ Photo Gallery Archive ↓</span>
          </button>
        </div>

        {/* Grand Showcase: Artwork Carousel + Live Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Interactive Artwork Slideshow */}
          <div 
            className="lg:col-span-7 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Glowing Amber Atmosphere Halo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-600/30 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500" />
            
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 bg-[#040e24] shadow-2xl flex flex-col">
              
              {/* Slide Image Frame */}
              <div 
                onClick={() => {
                  playChime();
                  setShowPosterModal(true);
                }}
                className="relative w-full aspect-4/3 sm:aspect-16/10 bg-[#020713] overflow-hidden cursor-zoom-in group/slide flex items-center justify-center"
                title="Click to view full image in lightbox"
              >
                <img
                  key={currentSlide.id}
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  className="w-full h-full object-contain bg-[#020713] transform group-hover/slide:scale-[1.02] transition duration-500 animate-in fade-in"
                />

                {/* Subtle bottom vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030917]/90 via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/90 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-md font-cinzel">
                    {currentSlide.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-lg cursor-pointer active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playChime();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-lg cursor-pointer active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Bottom Bar Info Caption */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#040d21]/95 backdrop-blur-md border border-amber-500/30 text-xs shadow-lg">
                  <div className="overflow-hidden pr-2">
                    <div className="font-bold text-amber-200 font-cinzel text-xs truncate">
                      {currentSlide.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {currentSlide.subtitle}
                    </div>
                  </div>
                  <div className="text-amber-400 font-bold flex items-center gap-1 flex-shrink-0 text-[11px]">
                    <Maximize2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Zoom</span>
                  </div>
                </div>
              </div>

              {/* Bottom Carousel Selector Bar */}
              <div className="px-3 py-2 bg-[#030917] border-t border-amber-500/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-1">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        playChime();
                        setActiveSlideIndex(idx);
                      }}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-semibold font-cinzel transition-all cursor-pointer truncate ${
                        activeSlideIndex === idx
                          ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {slide.tag}
                    </button>
                  ))}
                </div>

                {/* Progress bar dots */}
                <div className="flex items-center gap-1">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSlideIndex === idx ? "w-6 bg-amber-400" : "w-1.5 bg-slate-700"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Countdown Card & CMS Tribute */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* Live Conclave Countdown */}
            <div className="p-5 rounded-2xl bg-[#081533]/85 border border-amber-500/30 shadow-xl backdrop-blur-xl space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider font-cinzel">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Commences In</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  IST {currentIST || "Live"}
                </span>
              </div>

              {/* 4-digit countdown counter */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-2.5 shadow-inner">
                  <div className="text-xl sm:text-2xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold mt-0.5">Days</div>
                </div>

                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-2.5 shadow-inner">
                  <div className="text-xl sm:text-2xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold mt-0.5">Hours</div>
                </div>

                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-2.5 shadow-inner">
                  <div className="text-xl sm:text-2xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold mt-0.5">Mins</div>
                </div>

                <div className="bg-[#030917]/90 border border-amber-500/20 rounded-xl p-2.5 shadow-inner">
                  <div className="text-xl sm:text-2xl font-black text-gold-gradient font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold mt-0.5">Secs</div>
                </div>
              </div>

              {/* Google Calendar Sync Button */}
              <button
                onClick={() => openGoogleCalendar(null)}
                className="w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3 h-3 text-amber-400/70" />
              </button>
            </div>

            {/* Leadership Tribute Highlight Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-amber-600/10 border border-amber-500/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Heart className="w-4 h-4 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-amber-200 font-cinzel truncate">
                  34 Years of Exemplary Service
                </div>
                <div className="text-[10px] text-slate-300 line-clamp-1">
                  Heartfelt tribute celebrating Dr. Vijayalakshmi R. Natarajan (CMS/TPJ)
                </div>
              </div>
            </div>

            {/* Quick Conclave Invitation Teaser */}
            <div className="p-3 rounded-2xl bg-[#040e24]/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] text-slate-300 font-cinzel">Official Conclave Notice</span>
              </div>
              <button
                onClick={() => onNavigate("invitation")}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-bold font-cinzel cursor-pointer"
              >
                View Invitation →
              </button>
            </div>

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
