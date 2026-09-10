import React, { useState, useEffect, useRef } from "react";
import { 
  Stethoscope, Download, Menu, X, BookmarkCheck, Calendar, 
  Award, Users, MapPin, Home, FileText, Camera, QrCode, BookOpen,
  ChevronDown, ShieldCheck
} from "lucide-react";

export default function Navbar({
  currentPage,
  onNavigate,
  onOpenPocketSchedule,
  savedCount = 0,
  onSelectSavedTab,
  onToggleMobileMenu,
  isMobileMenuOpen = false
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close "More" dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMoreDropdownOpen(false);
      }
    };
    if (moreDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moreDropdownOpen]);

  // Primary desktop navigation tabs
  const primaryPages = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "schedule", label: "Schedule", icon: Calendar, badge: savedCount > 0 ? `${savedCount}` : null },
    { id: "orations", label: "Orations", icon: Award },
    { id: "faculty", label: "Faculty", icon: Users },
    { id: "resources", label: "Resources", icon: BookOpen },
  ];

  // Secondary pages tucked into the "More" dropdown on desktop
  const secondaryPages = [
    { id: "certificate", label: "TNMC Certificate", icon: ShieldCheck, desc: "4 Credit Hours • Cert C11181666" },
    { id: "timetable", label: "Pocket Timetable", icon: QrCode, desc: "Printable 2-day guide & QR" },
    { id: "venue", label: "Venue & Travel", icon: MapPin, desc: "Cauvery Hall, Trichy" },
    { id: "invitation", label: "Official Invitation", icon: FileText, desc: "Patron & conclave notice" },
    { id: "gallery", label: "Photo Gallery", icon: Camera, desc: "300+ Conclave photographs" },
  ];

  const isSecondaryActive = secondaryPages.some((p) => p.id === currentPage);

  return (
    <>
      {/* Skip to Main Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-2xl border border-amber-300 outline-none"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-40 pt-2 sm:pt-4 px-2 sm:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl transition-all duration-300 ${
              isScrolled
                ? "bg-[#040d21]/95 backdrop-blur-xl border border-amber-500/35 shadow-2xl shadow-black/80"
                : "bg-[#040d21]/85 backdrop-blur-md border border-amber-500/20 shadow-lg shadow-black/40"
            }`}
          >
            {/* Logo & Emblems */}
            <button
              onClick={() => onNavigate("overview")}
              className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl py-0.5"
              aria-label="RAILMED TPJ 2026 Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#040d21] flex items-center justify-center text-amber-400">
                  <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs sm:text-base tracking-wide text-white font-cinzel truncate">
                    RAILMED <span className="text-gold-gradient font-black">TPJ 2026</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    CME
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block tracking-tight">
                  Southern Railway • Tiruchchirappalli
                </span>
              </div>
            </button>

            {/* Desktop Page Navigation (Compact & Responsive) */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#020713]/80 border border-slate-800/90 shadow-inner"
            >
              {primaryPages.map((page) => {
                const Icon = page.icon;
                const isActive = currentPage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => onNavigate(page.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-cinzel transition-all cursor-pointer select-none ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                    <span>{page.label}</span>
                    {page.badge && (
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded-full font-black ${
                          isActive
                            ? "bg-slate-950 text-amber-300"
                            : "bg-amber-500/30 text-amber-300 border border-amber-500/50"
                        }`}
                      >
                        {page.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Desktop "More" Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold font-cinzel transition-all cursor-pointer select-none ${
                    isSecondaryActive
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreDropdownOpen ? "rotate-180 text-amber-400" : "text-slate-400"
                    }`}
                  />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl bg-[#040d21]/95 backdrop-blur-2xl border border-amber-500/30 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="text-[10px] font-bold text-amber-400/80 uppercase px-2.5 py-1 tracking-wider font-cinzel">
                      Conference Info & Tools
                    </div>
                    <div className="space-y-1">
                      {secondaryPages.map((page) => {
                        const Icon = page.icon;
                        const isActive = currentPage === page.id;
                        return (
                          <button
                            key={page.id}
                            onClick={() => {
                              setMoreDropdownOpen(false);
                              onNavigate(page.id);
                            }}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                              isActive
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "text-slate-200 hover:bg-slate-800/60 hover:text-white"
                            }`}
                          >
                            <div
                              className={`p-1.5 rounded-lg mt-0.5 ${
                                isActive
                                  ? "bg-amber-500 text-slate-950"
                                  : "bg-slate-800 text-amber-400"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold font-cinzel truncate">
                                {page.label}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {page.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Saved bookmarks badge */}
              {savedCount > 0 && (
                <button
                  onClick={onSelectSavedTab}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm"
                  title="View your saved sessions"
                  aria-label={`${savedCount} saved sessions`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold">{savedCount}</span>
                </button>
              )}

              {/* Pocket Timetable Modal / Page CTA */}
              <button
                onClick={onOpenPocketSchedule}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer font-cinzel"
                title="Open Printable Pocket Timetable"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Timetable & QR</span>
                <span className="sm:hidden text-[11px]">Timetable</span>
              </button>

              {/* Mobile menu hamburger button */}
              <button
                onClick={onToggleMobileMenu}
                className="p-1.5 sm:p-2 rounded-xl lg:hidden text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 border border-slate-700/50 active:scale-95 transition-all cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
