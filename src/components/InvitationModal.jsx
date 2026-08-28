import React, { useEffect } from "react";
import { X, Printer, Sparkles } from "lucide-react";
import InvitationCard from "./InvitationCard";

export default function InvitationModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8">
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-[#040d21]/90 border border-amber-500/30 p-2.5 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 pl-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-cinzel text-amber-300">
              Official Invitation • RAILMED TPJ CME 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Render Card */}
        <div className="max-h-[85vh] overflow-y-auto rounded-3xl custom-scrollbar">
          <InvitationCard />
        </div>
      </div>
    </div>
  );
}
