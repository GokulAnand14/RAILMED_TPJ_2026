import React, { useState, useEffect } from "react";
import { X, Printer, Calendar, Stethoscope, CheckCircle2, ExternalLink } from "lucide-react";
import { day1Schedule, day2Schedule } from "../data/scheduleData";
import { openGoogleCalendar } from "../utils/googleCalendar";

export default function PocketScheduleModal({ isOpen, onClose }) {
  const [selectedDay, setSelectedDay] = useState("all");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="pocket-schedule-print-modal-container"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="pocket-schedule-print-area"
        className="relative w-full max-w-5xl my-auto bg-[#fffefb] border-2 border-amber-500/50 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-900"
      >
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="p-4 sm:p-5 border-b border-amber-500/30 flex items-center justify-between bg-[#040e24] text-white no-print flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center shadow-md flex-shrink-0">
              <div className="w-full h-full rounded-xl bg-[#030917] flex items-center justify-center text-amber-300">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-cinzel text-white leading-tight">
                RAILMED TPJ <span className="text-gold-gradient">CME 2026</span> • Official Pocket Timetable
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                19th & 20th September 2026 • Cauvery Meeting Hall, DRM Campus, TPJ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-md cursor-pointer"
              title="Print Schedule / Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar (Hidden on print) */}
        <div className="p-3 bg-amber-50/80 border-b border-amber-300 flex flex-wrap items-center justify-between gap-3 no-print px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-900 font-bold font-cinzel">View:</span>
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-cinzel transition-colors cursor-pointer ${
                selectedDay === "all" ? "bg-amber-600 text-white shadow-xs" : "text-amber-900 hover:bg-amber-200/60"
              }`}
            >
              Full 2-Day Agenda (22 Slots)
            </button>
            <button
              onClick={() => setSelectedDay("day1")}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-cinzel transition-colors cursor-pointer ${
                selectedDay === "day1" ? "bg-amber-600 text-white shadow-xs" : "text-amber-900 hover:bg-amber-200/60"
              }`}
            >
              Day 1 (19th Sept)
            </button>
            <button
              onClick={() => setSelectedDay("day2")}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-cinzel transition-colors cursor-pointer ${
                selectedDay === "day2" ? "bg-amber-600 text-white shadow-xs" : "text-amber-900 hover:bg-amber-200/60"
              }`}
            >
              Day 2 (20th Sept)
            </button>
          </div>

          <button
            onClick={() => openGoogleCalendar(null)}
            className="flex items-center gap-1.5 text-xs text-amber-900 hover:text-amber-700 font-bold transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Google Calendar</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Scrollable Printable Timetable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 print:p-0 print:space-y-4">
          
          {/* Official Printable Header Banner */}
          <div className="border-b-2 border-amber-600 pb-4 text-center space-y-1">
            <div className="text-[11px] uppercase font-bold tracking-widest text-amber-900 font-cinzel">
              Southern Railway • Tiruchchirappalli Division Medical Department
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900 tracking-tight">
              RAILMED TPJ CME 2026
            </h2>
            <p className="text-xs font-semibold text-slate-700">
              19th & 20th September 2026 • Cauvery Meeting Hall, DRM Office Campus, TPJ
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-400 text-[11px] font-bold mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>TNMC 4 Credit Hours Accredited</span>
            </div>
          </div>

          {/* DAY 1 TABLE */}
          {(selectedDay === "all" || selectedDay === "day1") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#0a193d] text-white p-2.5 rounded-xl print:bg-slate-900 print:text-white">
                <h4 className="font-bold text-sm font-cinzel flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>DAY 1: Saturday, 19th September 2026</span>
                </h4>
                <span className="text-xs font-bold text-amber-300">11 Scientific Sessions</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-amber-100/80 text-slate-900 font-bold border-b border-slate-300">
                      <th className="p-2 border border-slate-300 w-28">Time</th>
                      <th className="p-2 border border-slate-300">Topic / Session</th>
                      <th className="p-2 border border-slate-300 w-44">Speaker / Orator</th>
                      <th className="p-2 border border-slate-300 w-44">Chairperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day1Schedule.map((s, idx) => (
                      <tr
                        key={s.id}
                        className={`border-b border-slate-200 ${
                          s.category === "oration"
                            ? "bg-amber-50/70 font-semibold"
                            : s.category === "panel"
                            ? "bg-purple-50/50"
                            : idx % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/60"
                        }`}
                      >
                        <td className="p-2 border border-slate-300 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {s.timeDisplay}
                        </td>
                        <td className="p-2 border border-slate-300">
                          <div className="font-bold text-slate-900">{s.topic}</div>
                          {s.category === "oration" && (
                            <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                              ★ Dr. Sai Dhandapani Memorial Oration
                            </span>
                          )}
                          {s.category === "panel" && (
                            <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wider block">
                              ★ Multidisciplinary Panel Conclave
                            </span>
                          )}
                        </td>
                        <td className="p-2 border border-slate-300">
                          {s.speaker ? (
                            <div>
                              <div className="font-bold text-slate-900">{s.speaker.name}</div>
                              <div className="text-[10px] text-slate-600">{s.speaker.designation}, {s.speaker.institution}</div>
                            </div>
                          ) : s.moderator ? (
                            <div>
                              <div className="font-bold text-purple-900">Mod: {s.moderator.name}</div>
                              <div className="text-[10px] text-slate-600">{s.moderator.designation}</div>
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-2 border border-slate-300 text-[11px] text-slate-700">
                          {s.chairpersons && s.chairpersons.length > 0 ? (
                            s.chairpersons.map((c) => `${c.name} (${c.designation})`).join("; ")
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DAY 2 TABLE */}
          {(selectedDay === "all" || selectedDay === "day2") && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between bg-[#0a193d] text-white p-2.5 rounded-xl print:bg-slate-900 print:text-white">
                <h4 className="font-bold text-sm font-cinzel flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>DAY 2: Sunday, 20th September 2026</span>
                </h4>
                <span className="text-xs font-bold text-amber-300">11 Scientific Sessions</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-amber-100/80 text-slate-900 font-bold border-b border-slate-300">
                      <th className="p-2 border border-slate-300 w-28">Time</th>
                      <th className="p-2 border border-slate-300">Topic / Session</th>
                      <th className="p-2 border border-slate-300 w-44">Speaker / Orator</th>
                      <th className="p-2 border border-slate-300 w-44">Chairperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day2Schedule.map((s, idx) => (
                      <tr
                        key={s.id}
                        className={`border-b border-slate-200 ${
                          s.category === "oration"
                            ? "bg-amber-50/70 font-semibold"
                            : s.category === "panel"
                            ? "bg-purple-50/50"
                            : idx % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/60"
                        }`}
                      >
                        <td className="p-2 border border-slate-300 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {s.timeDisplay}
                        </td>
                        <td className="p-2 border border-slate-300">
                          <div className="font-bold text-slate-900">{s.topic}</div>
                          {s.category === "oration" && (
                            <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                              ★ Dr. Rahulan Memorial Oration
                            </span>
                          )}
                          {s.category === "panel" && (
                            <span className="text-[10px] text-purple-800 font-bold uppercase tracking-wider block">
                              ★ Multidisciplinary Panel Conclave
                            </span>
                          )}
                        </td>
                        <td className="p-2 border border-slate-300">
                          {s.speaker ? (
                            <div>
                              <div className="font-bold text-slate-900">{s.speaker.name}</div>
                              <div className="text-[10px] text-slate-600">{s.speaker.designation}, {s.speaker.institution}</div>
                            </div>
                          ) : s.moderator ? (
                            <div>
                              <div className="font-bold text-purple-900">Mod: {s.moderator.name}</div>
                              <div className="text-[10px] text-slate-600">{s.moderator.designation}</div>
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-2 border border-slate-300 text-[11px] text-slate-700">
                          {s.chairpersons && s.chairpersons.length > 0 ? (
                            s.chairpersons.map((c) => `${c.name} (${c.designation})`).join("; ")
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Sign-off in Pocket Schedule */}
          <div className="pt-4 border-t border-slate-300 text-center text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">
              Indian Railway Medical Service Association (Southern Railway)
            </p>
            <p>
              Dr. Vijayalakshmi R. Natarajan (CMS / TPJ - Organising Chairman) • Shri K M Sathiyia Rathan (ADRM / TPJ - Organising Vice Chairman)
            </p>
            <p className="text-[11px] text-slate-500">
              Helpdesk & Emergency: +91 94868 00000 | railmed.tpj2026@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
