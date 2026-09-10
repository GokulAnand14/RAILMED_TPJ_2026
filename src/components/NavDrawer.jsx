import React, { useEffect } from "react";
import { 
  X, Home, Calendar, Award, Users, MapPin, 
  FileText, Camera, QrCode, BookOpen, BookmarkCheck,
  Download, Stethoscope, ChevronRight, ShieldCheck
} from "lucide-react";

export default function NavDrawer({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  savedCount = 0,
  onSelectSavedTab,
  onOpenPocketSchedule
}) {
  // Lock body scroll and handle Escape key when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navCategories = [
    {
      title: "Conference Program",
      items: [
        { id: "overview", label: "Overview & Leadership", icon: Home, desc: "Patrons, themes & milestones" },
        { id: "schedule", label: "Scientific Schedule", icon: Calendar, desc: "2-Day agenda • 21 clinical sessions", badge: savedCount > 0 ? `${savedCount} saved` : null },
        { id: "orations", label: "Memorial Orations", icon: Award, desc: "Dr. Rahulan & Dr. Sai Dhandapani" },
        { id: "faculty", label: "Faculty Directory", icon: Users, desc: "JIPMER & Railway specialists" },
      ],
    },
    {
      title: "Resources & Essentials",
      items: [
        { id: "certificate", label: "TNMC Certificate", icon: ShieldCheck, desc: "4 Credit Hours • Cert C11181666", highlight: true },
        { id: "resources", label: "Learning Resources", icon: BookOpen, desc: "35+ slide decks & clinical PPTs" },
        { id: "timetable", label: "Pocket Timetable", icon: QrCode, desc: "Print-ready schedule & QR code" },
        { id: "venue", label: "Venue & Travel Guide", icon: MapPin, desc: "Cauvery Hall, DRM Campus, Trichy" },
        { id: "invitation", label: "Official Invitation", icon: FileText, desc: "Executive conclave invitation card" },
        { id: "gallery", label: "Photo Gallery", icon: Camera, desc: "300+ Conclave photographs" },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-up Sheet Panel */}
      <div className="relative z-10 w-full max-h-[88vh] bg-[#030917]/98 backdrop-blur-2xl border-t border-amber-500/40 rounded-t-3xl shadow-2xl overflow-y-auto flex flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300">
        
        {/* Top Handle & Header */}
        <div className="sticky top-0 bg-[#030917]/95 backdrop-blur-xl border-b border-amber-500/20 px-5 pt-3 pb-3 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#030917] flex items-center justify-center text-amber-400">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-extrabold text-sm text-white font-cinzel">
                RAILMED <span className="text-gold-gradient font-black">TPJ 2026</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                Conclave Navigation Menu
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved sessions quick notification bar if any */}
        {savedCount > 0 && (
          <div className="mx-4 mt-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 font-cinzel">
                {savedCount} Session{savedCount > 1 ? "s" : ""} Bookmarked
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onSelectSavedTab();
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-extrabold cursor-pointer active:scale-95 transition-transform"
            >
              View Schedule
            </button>
          </div>
        )}

        {/* Navigation Categories */}
        <div className="px-4 py-3 space-y-4">
          {navCategories.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest font-cinzel mb-2 px-1">
                {group.title}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onNavigate(item.id);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all active:scale-[0.99] cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/25 to-amber-600/15 border border-amber-500/60 shadow-md shadow-amber-500/10"
                          : "hover:bg-slate-800/50 bg-[#081229]/60 border border-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-xl flex-shrink-0 ${
                            isActive
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm"
                              : "bg-slate-800/90 text-amber-400 border border-slate-700/60"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold font-cinzel truncate ${
                                isActive ? "text-amber-300 font-black" : "text-slate-100"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 text-slate-950">
                                {item.badge}
                              </span>
                            )}
                            {item.highlight && !isActive && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? "text-amber-400" : "text-slate-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quick Actions */}
        <div className="px-4 pt-2 pb-1 border-t border-slate-800/80 mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenPocketSchedule();
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold font-cinzel shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Pocket Timetable</span>
          </button>
          
          <button
            onClick={() => {
              onClose();
              onNavigate("venue");
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#081229] border border-amber-500/30 text-amber-300 text-xs font-bold font-cinzel hover:bg-[#0a1835] active:scale-95 transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Venue Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}
