import React from "react";
import { Home, Calendar, QrCode, BookOpen, Menu } from "lucide-react";

export default function MobileBottomBar({
  currentPage,
  onNavigate,
  onOpenDrawer,
  savedCount = 0
}) {
  const navItems = [
    { id: "overview", label: "Home", icon: Home },
    { id: "schedule", label: "Schedule", icon: Calendar, badge: savedCount > 0 ? savedCount : null },
    { id: "timetable", label: "Timetable", icon: QrCode },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "menu", label: "Menu", icon: Menu, isMenuToggle: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-auto">
      <div className="bg-[#030a1b]/95 backdrop-blur-2xl border-t border-amber-500/30 px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
        <nav aria-label="Mobile Navigation Dock" className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isMenuToggle && currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isMenuToggle) {
                    onOpenDrawer();
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`relative flex flex-col items-center justify-center min-w-[56px] py-1 px-1.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
                  isActive
                    ? "text-amber-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active Pill Glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-amber-500/15 rounded-xl border border-amber-500/30 -z-10 animate-in fade-in zoom-in-95 duration-150" />
                )}

                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110 text-amber-400" : ""}`} />
                  
                  {/* Saved sessions count badge on Schedule */}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[10px] font-cinzel font-bold mt-1 tracking-tight truncate ${
                  isActive ? "text-amber-300 font-extrabold" : "text-slate-400"
                }`}>
                  {item.label}
                </span>

                {/* Micro active dot */}
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-amber-400 mt-0.5 shadow-sm shadow-amber-400/80" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
