import React, { useState, useMemo } from "react";
import { Search, Calendar, Layers, X, BookOpen, Download, BookmarkCheck, Sparkles, ExternalLink } from "lucide-react";
import { day1Schedule, day2Schedule, tracks } from "../data/scheduleData";
import { openGoogleCalendar } from "../utils/googleCalendar";
import SessionCard from "./SessionCard";

export default function ScheduleExplorer({
  activeDayTab,
  setActiveDayTab,
  bookmarkedIds,
  onToggleBookmark,
  onOpenPocketSchedule,
}) {
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allSessions = useMemo(() => {
    return [...day1Schedule, ...day2Schedule];
  }, []);

  const baseSessions = useMemo(() => {
    if (activeDayTab === "day1") return day1Schedule;
    if (activeDayTab === "day2") return day2Schedule;
    if (activeDayTab === "saved") return allSessions.filter((s) => bookmarkedIds.includes(s.id));
    return allSessions;
  }, [activeDayTab, allSessions, bookmarkedIds]);

  const filteredSessions = useMemo(() => {
    return baseSessions.filter((session) => {
      if (selectedTrack !== "all") {
        if (selectedTrack === "oration" && session.category !== "oration") return false;
        if (selectedTrack === "panel" && session.category !== "panel") return false;
        if (selectedTrack === "symposium" && session.category !== "symposium") return false;
        if (selectedTrack === "oncology" && session.category !== "oncology") return false;
        if (selectedTrack === "diabetes" && session.category !== "diabetes") return false;
        if (selectedTrack === "cardiology" && session.category !== "cardiology") return false;
        if (selectedTrack === "pulmonology_ent" && session.category !== "ent" && session.category !== "pulmonology") return false;
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();

      const matchTopic = session.topic?.toLowerCase().includes(q);
      const matchSpeaker = session.speaker?.name?.toLowerCase().includes(q);
      const matchSpeakerInst = session.speaker?.institution?.toLowerCase().includes(q);
      const matchModerator = session.moderator?.name?.toLowerCase().includes(q);
      const matchSponsor = session.sponsor?.toLowerCase().includes(q);
      const matchChair = session.chairpersons?.some((c) =>
        c.name?.toLowerCase().includes(q) || c.designation?.toLowerCase().includes(q)
      );
      const matchPanelist = session.panelists?.some((p) =>
        p.name?.toLowerCase().includes(q) || p.designation?.toLowerCase().includes(q)
      );
      const matchTime = session.timeDisplay?.toLowerCase().includes(q);

      return matchTopic || matchSpeaker || matchSpeakerInst || matchModerator || matchSponsor || matchChair || matchPanelist || matchTime;
    });
  }, [baseSessions, selectedTrack, searchQuery]);

  return (
    <section id="schedule" className="pt-6 pb-12 bg-[#030917] border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5 font-cinzel">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Scientific Program & Timetable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            Scientific <span className="text-gold-gradient">Schedule</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl mx-auto leading-relaxed">
            Explore 22 clinical sessions on Non-Communicable Diseases (Cancer, Diabetes, Hypertension, Cardiology & Surgical Care).
          </p>
        </div>

        {/* Top Controls & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Segmented Day Tabs */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#040e24] border border-amber-500/30 shadow-lg">
            <button
              onClick={() => setActiveDayTab("all")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-cinzel transition-all cursor-pointer ${
                activeDayTab === "all"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Agenda</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "all" ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-300"}`}>
                22
              </span>
            </button>

            <button
              onClick={() => setActiveDayTab("day1")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-cinzel transition-all cursor-pointer ${
                activeDayTab === "day1"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>Day 1 (19 Sept)</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "day1" ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-300"}`}>
                {day1Schedule.length}
              </span>
            </button>

            <button
              onClick={() => setActiveDayTab("day2")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-cinzel transition-all cursor-pointer ${
                activeDayTab === "day2"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span>Day 2 (20 Sept)</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "day2" ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-300"}`}>
                {day2Schedule.length}
              </span>
            </button>

            <button
              onClick={() => setActiveDayTab("saved")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-cinzel transition-all cursor-pointer ${
                activeDayTab === "saved"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>My Saved</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "saved" ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-300"}`}>
                {bookmarkedIds.length}
              </span>
            </button>
          </div>

          {/* Right Action: Add Full Conclave to Google Calendar or Open Pocket Modal */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openGoogleCalendar(null)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-amber-400/80" />
            </button>

            <button
              onClick={onOpenPocketSchedule}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Pocket Timetable</span>
            </button>
          </div>
        </div>

        {/* Live CME Credit Tracker Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0a1f42] via-[#081733] to-[#0a1f42] border border-amber-500/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              <strong>CME Credit Attendance:</strong> TNMC 4 Credit Hours Accredited for Southern Railway Medical Conclave 2026.
            </span>
          </div>
          <div className="flex items-center gap-2 text-amber-300 font-mono font-bold text-xs bg-[#030917] px-3 py-1 rounded-lg border border-amber-500/30">
            <span>{bookmarkedIds.length} Sessions In Your Personal Itinerary</span>
          </div>
        </div>

        {/* Search & Track Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Live Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topic, speaker, chair, hospital, or time..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#040e24] border border-slate-700 focus:border-amber-400 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Track Filter Pills */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-1.5">
            {tracks.map((tr) => (
              <button
                key={tr.id}
                onClick={() => setSelectedTrack(tr.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedTrack === tr.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold"
                    : "bg-[#040e24] text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                {tr.label || tr.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions Render List */}
        {filteredSessions.length === 0 ? (
          <div className="royal-card p-12 text-center text-slate-400">
            <BookOpen className="w-10 h-10 text-amber-400/50 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-cinzel text-white mb-1">
              No Sessions Match Your Criteria
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {activeDayTab === "saved"
                ? "You haven't bookmarked any sessions yet. Click the bookmark icon on any session to add it to your itinerary."
                : "Try adjusting your track filter or search keywords."}
            </p>
            <button
              onClick={() => {
                setSelectedTrack("all");
                setSearchQuery("");
                setActiveDayTab("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 font-medium pb-1 flex items-center justify-between">
              <span>Showing {filteredSessions.length} scientific session{filteredSessions.length > 1 ? "s" : ""}</span>
              {searchQuery && (
                <span className="text-amber-400">Matching "{searchQuery}"</span>
              )}
            </div>

            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                isBookmarked={bookmarkedIds.includes(session.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
