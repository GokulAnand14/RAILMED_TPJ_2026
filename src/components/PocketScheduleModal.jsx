import React, { useState, useEffect } from "react";
import { X, Printer, Calendar, Stethoscope, Download, FileText, CheckCircle2 } from "lucide-react";
import { day1Schedule, day2Schedule } from "../data/scheduleData";
import { downloadFullConferenceICS } from "../utils/icsGenerator";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="pocket-schedule-print-area"
        className="relative w-full max-w-5xl my-auto bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 no-print flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans leading-tight">
                RAILMED TPJ CME 2026 • Official Pocket Schedule
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                19th & 20th September 2026 • Southern Railway Health Services
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-2xs cursor-pointer"
              title="Print Schedule / Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs text-slate-500 font-mono">View:</span>
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedDay === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Both Days (22 Slots)
            </button>
            <button
              onClick={() => setSelectedDay("day1")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedDay === "day1" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Day 1 (19th Sept)
            </button>
            <button
              onClick={() => setSelectedDay("day2")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedDay === "day2" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Day 2 (20th Sept)
            </button>
          </div>

          <button
            onClick={() => downloadFullConferenceICS()}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Download .ICS Calendar</span>
          </button>
        </div>

        {/* Scrollable Printable Timetable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 bg-white">
          {/* Print-only Header Banner */}
          <div className="hidden print:block mb-6 border-b-2 border-slate-900 pb-3">
            <h1 className="text-xl font-bold text-black">RAILMED TPJ CME 2026</h1>
            <p className="text-xs text-black">
              Indian Railway Medical Service Association (Southern Railway) • 19th & 20th September 2026 • Tiruchirappalli (TPJ)
            </p>
          </div>

          {/* Day 1 Section */}
          {(selectedDay === "all" || selectedDay === "day1") && (
            <div>
              <div className="mb-3 pb-2 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Day 1: 19th September 2026 (Saturday)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dr Sai Dhandapani Oration • Cancer Management Panel • Scientific Symposia • IRHSA GBM
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md no-print">
                  12 Program Slots
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="p-2 font-semibold font-mono w-10 text-center border-r border-slate-200">Sl</th>
                      <th className="p-2 font-semibold font-mono w-28 border-r border-slate-200">Time</th>
                      <th className="p-2 font-semibold border-r border-slate-200">Topic / Scientific Session</th>
                      <th className="p-2 font-semibold border-r border-slate-200">Speaker / Faculty</th>
                      <th className="p-2 font-semibold">Chairpersons / Panelists</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {day1Schedule.map((s, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-50 transition-colors ${
                          s.category === "oration" ? "bg-amber-50/70 font-medium" : ""
                        }`}
                      >
                        <td className="p-2 font-mono text-center text-slate-500 border-r border-slate-200">
                          {s.slNo || "-"}
                        </td>
                        <td className="p-2 font-mono text-blue-700 whitespace-nowrap font-semibold border-r border-slate-200">
                          {s.timeDisplay}
                        </td>
                        <td className="p-2 border-r border-slate-200">
                          <div className="font-bold text-slate-900">{s.topic}</div>
                          {s.category === "oration" && (
                            <span className="text-[10px] text-amber-800 font-bold uppercase block mt-0.5">
                              ★ Memorial Oration
                            </span>
                          )}
                        </td>
                        <td className="p-2 border-r border-slate-200">
                          {s.speaker ? (
                            <div>
                              <div className="font-semibold text-slate-900">{s.speaker.name}</div>
                              <div className="text-[11px] text-slate-600">{s.speaker.designation}</div>
                              {s.speaker.institution && (
                                <div className="text-[10px] text-slate-500">{s.speaker.institution}</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-2">
                          {s.moderator && (
                            <div className="mb-1 text-purple-900 font-semibold">
                              Moderator: {s.moderator.name} ({s.moderator.designation})
                            </div>
                          )}
                          {s.panelists && (
                            <div className="text-[11px] text-slate-700 space-y-0.5">
                              {s.panelists.map((p, pI) => (
                                <div key={pI}>• {p.name}, {p.designation}</div>
                              ))}
                            </div>
                          )}
                          {s.chairpersons && s.chairpersons.length > 0 && (
                            <div className="text-[11px] text-slate-700 space-y-0.5">
                              {s.chairpersons.map((c, cI) => (
                                <div key={cI}>
                                  {cI + 1}. {c.name} ({c.designation})
                                </div>
                              ))}
                            </div>
                          )}
                          {!s.moderator && !s.panelists && (!s.chairpersons || s.chairpersons.length === 0) && (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Day 2 Section */}
          {(selectedDay === "all" || selectedDay === "day2") && (
            <div className="pt-2">
              <div className="mb-3 pb-2 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Day 2: 20th September 2026 (Sunday)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Dr Rahulan Oration • Diabetology & Cardiology Masterclasses • Diabetes Complications Panel • Valedictory
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md no-print">
                  10 Program Slots
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="p-2 font-semibold font-mono w-10 text-center border-r border-slate-200">Sl</th>
                      <th className="p-2 font-semibold font-mono w-28 border-r border-slate-200">Time</th>
                      <th className="p-2 font-semibold border-r border-slate-200">Topic / Scientific Session</th>
                      <th className="p-2 font-semibold border-r border-slate-200">Speaker / Faculty</th>
                      <th className="p-2 font-semibold">Chairpersons / Panelists</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {day2Schedule.map((s, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-50 transition-colors ${
                          s.category === "oration" ? "bg-amber-50/70 font-medium" : ""
                        }`}
                      >
                        <td className="p-2 font-mono text-center text-slate-500 border-r border-slate-200">
                          {s.slNo || "-"}
                        </td>
                        <td className="p-2 font-mono text-blue-700 whitespace-nowrap font-semibold border-r border-slate-200">
                          {s.timeDisplay}
                        </td>
                        <td className="p-2 border-r border-slate-200">
                          <div className="font-bold text-slate-900">{s.topic}</div>
                          {s.category === "oration" && (
                            <span className="text-[10px] text-amber-800 font-bold uppercase block mt-0.5">
                              ★ Memorial Oration
                            </span>
                          )}
                        </td>
                        <td className="p-2 border-r border-slate-200">
                          {s.speaker ? (
                            <div>
                              <div className="font-semibold text-slate-900">{s.speaker.name}</div>
                              <div className="text-[11px] text-slate-600">{s.speaker.designation}</div>
                              {s.speaker.institution && (
                                <div className="text-[10px] text-slate-500">{s.speaker.institution}</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-2">
                          {s.moderator && (
                            <div className="mb-1 text-purple-900 font-semibold">
                              Moderator: {s.moderator.name} ({s.moderator.designation})
                            </div>
                          )}
                          {s.panelists && (
                            <div className="text-[11px] text-slate-700 space-y-0.5">
                              {s.panelists.map((p, pI) => (
                                <div key={pI}>• {p.name}, {p.designation}</div>
                              ))}
                            </div>
                          )}
                          {s.chairpersons && s.chairpersons.length > 0 && (
                            <div className="text-[11px] text-slate-700 space-y-0.5">
                              {s.chairpersons.map((c, cI) => (
                                <div key={cI}>
                                  {cI + 1}. {c.name} ({c.designation})
                                </div>
                              ))}
                            </div>
                          )}
                          {!s.moderator && !s.panelists && (!s.chairpersons || s.chairpersons.length === 0) && (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between no-print px-4 sm:px-6 flex-shrink-0">
          <span className="text-xs text-slate-500">
            Divisional Railway Hospital Auditorium • Golden Rock (GOC), Tiruchirappalli
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
