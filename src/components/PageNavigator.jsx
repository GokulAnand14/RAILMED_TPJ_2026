import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PageNavigator({ prevPage, prevLabel, nextPage, nextLabel, onNavigate }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevPage ? (
          <button
            onClick={() => onNavigate(prevPage)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#040e24] border border-amber-500/30 hover:border-amber-400 text-slate-300 hover:text-white text-xs sm:text-sm font-bold font-cinzel transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>← {prevLabel}</span>
          </button>
        ) : <div />}

        {nextPage && (
          <button
            onClick={() => onNavigate(nextPage)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-bold font-cinzel transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <span>{nextLabel} →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
