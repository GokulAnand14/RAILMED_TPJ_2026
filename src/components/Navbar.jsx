import React, { useState, useEffect } from "react";
import { 
  Stethoscope, Download, Menu, X, BookmarkCheck, Calendar, 
  Award, Users, MapPin, Home, FileText, Camera, QrCode, BookOpen 
} from "lucide-react";

export default function Navbar({
  currentPage,
  onNavigate,
  onOpenPocketSchedule,
  savedCount = 0,
  onSelectSavedTab
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navPages = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "resources", label: "Learning", icon: BookOpen },
    { id: "timetable", label: "Timetable", icon: QrCode },
    { id: "orations", label: "Orations", icon: Award },
    { id: "faculty", label: "Faculty", icon: Users },
    { id: "venue", label: "Venue", icon: MapPin },
    { id: "invitation", label: "Invitation", icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-4 px-2 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? "bg-[#040d21]/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-black/80"
              : "bg-[#040d21]/85 backdrop-blur-md border border-amber-500/20 shadow-lg shadow-black/40"
          }`}
        >
          {/* Logo & Emblems */}
          <button
            onClick={() => onNavigate("overview")}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer"
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

          {/* Desktop Page Tabs */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#020713]/70 border border-slate-800/80">
            {navPages.map((page) => {
              const Icon = page.icon;
              const isActive = currentPage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold font-cinzel transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Saved bookmarks badge */}
            {savedCount > 0 && (
              <button
                onClick={onSelectSavedTab}
                className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 transition-colors cursor-pointer"
                title="View your saved sessions"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{savedCount}</span>
              </button>
            )}

            {/* Pocket Timetable Modal Button */}
            <button
              onClick={onOpenPocketSchedule}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Timetable & QR</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl lg:hidden text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 border border-slate-700/50 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 bg-[#040d21]/95 backdrop-blur-2xl rounded-2xl border border-amber-500/30 shadow-2xl animate-in fade-in duration-200">
            <div className="flex flex-col space-y-1.5 text-sm font-medium text-slate-200">
              {navPages.map((page) => {
                const Icon = page.icon;
                const isActive = currentPage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(page.id);
                    }}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold font-cinzel transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-slate-950 shadow-md font-black"
                        : "hover:bg-amber-500/15 hover:text-amber-300 text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{page.label}</span>
                    </span>
                    <span className="text-xs">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
