import React, { useState, useEffect } from "react";
import { 
  Printer, Calendar, Stethoscope, CheckCircle2, ExternalLink, 
  Download, ArrowLeft, QrCode, Copy, Check 
} from "lucide-react";
import { day1Schedule, day2Schedule } from "../data/scheduleData";
import { openGoogleCalendar } from "../utils/googleCalendar";
import { playChime } from "../utils/soundEffects";
import { getTimetableUrl, generateQRCodeDataURL, downloadQRCodeImage } from "../utils/qrCode";

export default function PocketSchedulePage({ onNavigate }) {
  const [selectedDay, setSelectedDay] = useState("all");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const timetableUrl = getTimetableUrl();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    generateQRCodeDataURL(timetableUrl).then((url) => {
      if (url) setQrCodeDataUrl(url);
    });
  }, [timetableUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    playChime();
    const { downloadTimetablePDF } = await import("../utils/pdfGenerator");
    downloadTimetablePDF(selectedDay);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(timetableUrl);
    setCopied(true);
    playChime();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 min-h-screen animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
          <button
            onClick={() => onNavigate("overview")}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-bold font-cinzel transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal Overview</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowQRModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0a1f42] hover:bg-[#0f2c61] text-amber-300 border border-amber-500/40 transition-all shadow-md cursor-pointer"
              title="Show QR Code for this Timetable"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Share & QR Code</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-md cursor-pointer active:scale-95"
              title="Download Timetable as PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              title="Print Schedule"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Standalone Printable Timetable Paper Card */}
        <div 
          id="pocket-schedule-print-area"
          className="relative bg-[#fffefb] border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden text-slate-900"
        >
          {/* Top Control Header Bar (Hidden in print) */}
          <div className="p-4 sm:p-5 border-b border-amber-500/30 flex items-center justify-between bg-[#040e24] text-white no-print gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center shadow-md flex-shrink-0">
                <div className="w-full h-full rounded-xl bg-[#030917] flex items-center justify-center text-amber-300">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-black font-cinzel text-white leading-tight">
                  RAILMED TPJ <span className="text-gold-gradient">CME 2026</span> • Timetable
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                  19th & 20th September 2026 • Cauvery Meeting Hall, DRM Campus, TPJ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>TNMC 4 Credit Hours</span>
              </span>
            </div>
          </div>

          {/* Filter Bar (Hidden in print) */}
          <div className="p-3.5 bg-amber-50/90 border-b border-amber-300 flex flex-wrap items-center justify-between gap-3 no-print px-4 sm:px-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-amber-900 font-bold font-cinzel">View:</span>
              <button
                onClick={() => setSelectedDay("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cinzel transition-colors cursor-pointer ${
                  selectedDay === "all" ? "bg-amber-600 text-white shadow-xs" : "text-amber-900 hover:bg-amber-200/60"
                }`}
              >
                Full 2-Day Agenda (22 Slots)
              </button>
              <button
                onClick={() => setSelectedDay("day1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cinzel transition-colors cursor-pointer ${
                  selectedDay === "day1" ? "bg-amber-600 text-white shadow-xs" : "text-amber-900 hover:bg-amber-200/60"
                }`}
              >
                Day 1 (19th Sept)
              </button>
              <button
                onClick={() => setSelectedDay("day2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cinzel transition-colors cursor-pointer ${
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

          {/* Printable Body Content */}
          <div className="p-4 sm:p-8 space-y-8 print:p-0 print:space-y-4">
            
            {/* Header Banner */}
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
                  <h3 className="font-bold text-sm font-cinzel flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>DAY 1: Saturday, 19th September 2026</span>
                  </h3>
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
                  <h3 className="font-bold text-sm font-cinzel flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>DAY 2: Sunday, 20th September 2026</span>
                  </h3>
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

            {/* QR Code & Share Card for Mobile Users */}
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs uppercase font-bold text-amber-900 font-cinzel">
                  Mobile QR Code Access
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Scan to view this Pocket Timetable anytime
                </h4>
                <p className="text-xs text-slate-600 max-w-md">
                  Keep this link bookmarked or scan with any mobile camera to view real-time session details.
                </p>
                <div className="pt-2 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Link Copied!" : "Copy Timetable URL"}</span>
                  </button>
                  <button
                    onClick={() => downloadQRCodeImage()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-xs cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download QR Image</span>
                  </button>
                </div>
              </div>

              {qrCodeDataUrl && (
                <div className="p-2 bg-white rounded-xl border border-amber-300 shadow-md flex flex-col items-center flex-shrink-0">
                  <img
                    src={qrCodeDataUrl}
                    alt="RAILMED TPJ 2026 Timetable QR Code"
                    className="w-28 h-28 object-contain"
                  />
                  <span className="text-[10px] font-bold text-amber-900 font-cinzel mt-1">
                    Scan for Timetable
                  </span>
                </div>
              )}
            </div>

            {/* Footer Sign-off in Pocket Schedule */}
            <div className="pt-4 border-t border-slate-300 text-center text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">
                Indian Railway Medical Service Association (Southern Railway)
              </p>
              <p>
                Dr. Vijayalakshmi R. Natarajan (CMS / TPJ - Organising Chairman) • Shri K M Sathiyia Rathan (ADRM / TPJ - Organising Vice Chairman)
              </p>
              <p className="text-[11px] text-slate-500">
                Cauvery Meeting Hall, DRM Campus, Tiruchchirappalli (TPJ) • TNMC 4 Credit Hours Accredited
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* QR Code Sharing Lightbox Modal */}
      {showQRModal && (
        <div
          onClick={() => setShowQRModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#040e24] border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl text-center text-white space-y-4"
          >
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400 font-cinzel">
                Instant Mobile Access
              </span>
              <h3 className="text-xl font-bold font-cinzel text-white">
                Pocket Timetable <span className="text-gold-gradient">QR Code</span>
              </h3>
              <p className="text-xs text-slate-300">
                Scan with any smartphone camera to open the 2-Day CME timetable directly on your mobile device.
              </p>
            </div>

            {qrCodeDataUrl ? (
              <div className="p-4 bg-white rounded-2xl border-2 border-amber-400 shadow-xl inline-block mx-auto">
                <img
                  src={qrCodeDataUrl}
                  alt="Timetable QR Code"
                  className="w-56 h-56 object-contain"
                />
              </div>
            ) : (
              <div className="w-56 h-56 bg-slate-900 animate-pulse rounded-2xl mx-auto flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-700" />
              </div>
            )}

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-amber-200 break-all select-all">
              {timetableUrl}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>

              <button
                onClick={() => downloadQRCodeImage()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR Image</span>
              </button>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="mt-2 text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
