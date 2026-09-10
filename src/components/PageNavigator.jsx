import React from "react";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";

export default function PageNavigator({
  currentPage = "overview",
  prevPage,
  prevLabel,
  nextPage,
  nextLabel,
  onNavigate
}) {
  const steps = [
    { id: "overview", label: "Overview", short: "Overview" },
    { id: "schedule", label: "Schedule", short: "Schedule" },
    { id: "orations", label: "Orations", short: "Orations" },
    { id: "faculty", label: "Faculty", short: "Faculty" },
    { id: "venue", label: "Venue", short: "Venue" },
    { id: "invitation", label: "Invitation", short: "Invite" },
    { id: "resources", label: "Resources", short: "Resources" },
    { id: "timetable", label: "Timetable", short: "Timetable" },
  ];

  const currentIndex = steps.findIndex((s) => s.id === currentPage);
  const activeStepNum = currentIndex >= 0 ? currentIndex + 1 : 1;
  const currentStep = steps[currentIndex] || steps[0];

  return (
    <nav
      aria-label="Conclave Journey Stepper"
      className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/20"
    >
      {/* Visual Stepper & Section Indicator */}
      <div className="mb-6 bg-[#040d21]/70 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold font-cinzel text-amber-300 uppercase tracking-wider">
              Conference Guide • Section {activeStepNum} of {steps.length}
            </span>
          </div>
          <span className="text-xs sm:text-sm font-black font-cinzel text-white">
            {currentStep.label}
          </span>
        </div>

        {/* Step Dots & Progress Bar */}
        <div className="relative flex items-center justify-between gap-1 sm:gap-2">
          {/* Background Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 rounded-full z-0" />
          {/* Active Filled Line */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full z-0 transition-all duration-300"
            style={{
              width: `${((activeStepNum - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={step.id}
                onClick={() => onNavigate(step.id)}
                className={`relative z-10 flex flex-col items-center group cursor-pointer focus-visible:outline-none`}
                title={`Go to ${step.label}`}
                aria-label={`Step ${idx + 1}: ${step.label}`}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black transition-all ${
                    isCurrent
                      ? "bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 ring-4 ring-amber-500/30 scale-110 shadow-md shadow-amber-500/50"
                      : isCompleted
                      ? "bg-amber-500/30 text-amber-300 border border-amber-500/50 hover:bg-amber-500/50"
                      : "bg-[#040d21] text-slate-500 border border-slate-700/80 hover:border-amber-500/40"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`hidden md:block text-[9px] font-cinzel font-bold mt-1 tracking-tight truncate max-w-[60px] text-center transition-colors ${
                    isCurrent
                      ? "text-amber-300 font-extrabold"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {step.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prev / Next Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {prevPage ? (
          <button
            onClick={() => onNavigate(prevPage)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#040e24] border border-amber-500/30 hover:border-amber-400 text-slate-200 hover:text-white text-xs sm:text-sm font-bold font-cinzel transition-all active:scale-98 cursor-pointer shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>← {prevLabel || "Previous Section"}</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPage && (
          <button
            onClick={() => onNavigate(nextPage)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-black font-cinzel transition-all shadow-md shadow-amber-500/20 active:scale-98 cursor-pointer group"
          >
            <span>{nextLabel || "Next Section"} →</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </nav>
  );
}
