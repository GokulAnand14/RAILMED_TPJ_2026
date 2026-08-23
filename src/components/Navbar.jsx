import React, { useState, useEffect } from "react";
import { Stethoscope, Download, Menu, X, BookmarkCheck } from "lucide-react";

export default function Navbar({ onOpenPocketSchedule, savedCount = 0, onSelectSavedTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Schedule", href: "#schedule" },
    { name: "Orations", href: "#orations" },
    { name: "Panels", href: "#panels" },
    { name: "Faculty", href: "#faculty" },
    { name: "Symposia", href: "#symposia" },
    { name: "Venue", href: "#venue" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-md shadow-slate-900/5"
              : "bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xs"
          }`}
        >
          {/* Logo */}
          <a href="#overview" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                RAILMED <span className="text-blue-600">2026</span>
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                TPJ
              </span>
            </div>
          </a>

          {/* Minimal Clean Smooth Nav Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {savedCount > 0 && (
              <button
                onClick={onSelectSavedTab}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                title="View saved sessions"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{savedCount}</span>
              </button>
            )}

            <button
              onClick={onOpenPocketSchedule}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Timetable</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full md:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
