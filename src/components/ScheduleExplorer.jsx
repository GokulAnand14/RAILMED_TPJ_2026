import React, { useState, useMemo } from "react";
import { Search, Calendar, Filter, Bookmark, Layers, X, BookOpen, Download } from "lucide-react";
import { day1Schedule, day2Schedule, tracks } from "../data/scheduleData";
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
    <section id="schedule" className="py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Scientific Program</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Conference Agenda
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Explore various topics of interest on NCD including Cancer, Diabetes and Hypertension which will help us keep abreast with modern updates and thereby improve patient care.
            </p>
          </div>

          <button
            onClick={onOpenPocketSchedule}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-xs transition-all shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Printable Pocket Schedule</span>
          </button>
        </div>

        {/* Segmented Day Control */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-6 max-w-2xl">
          <button
            onClick={() => setActiveDayTab("all")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDayTab === "all"
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Full 2-Day Agenda</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "all" ? "bg-blue-700 text-white font-bold" : "bg-slate-100 text-slate-600"}`}>
              22
            </span>
          </button>

          <button
            onClick={() => setActiveDayTab("day1")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDayTab === "day1"
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Day 1 (19th Sept)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "day1" ? "bg-blue-700 text-white font-bold" : "bg-slate-100 text-slate-600"}`}>
              12
            </span>
          </button>

          <button
            onClick={() => setActiveDayTab("day2")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDayTab === "day2"
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Day 2 (20th Sept)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "day2" ? "bg-blue-700 text-white font-bold" : "bg-slate-100 text-slate-600"}`}>
              10
            </span>
          </button>

          <button
            onClick={() => setActiveDayTab("saved")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDayTab === "saved"
                ? "bg-amber-500 text-white shadow-xs font-bold"
                : "text-slate-600 hover:text-amber-700 hover:bg-amber-50"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeDayTab === "saved" ? "bg-amber-600 text-white font-bold" : "bg-slate-100 text-slate-600"}`}>
              {bookmarkedIds.length}
            </span>
          </button>
        </div>

        {/* Search & Track Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, speaker (e.g. Dr King Gandhi, Dr Prasanth Ganesh), chairperson, hospital, or time..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Specialty Track Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 flex-shrink-0 mr-1 font-mono">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  selectedTrack === track.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        {/* Count summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredSessions.length}</span> session
            {filteredSessions.length === 1 ? "" : "s"}
            {selectedTrack !== "all" && (
              <span className="ml-1 text-slate-600">
                in <span className="font-semibold text-slate-800">"{tracks.find((t) => t.id === selectedTrack)?.label}"</span>
              </span>
            )}
            {searchQuery && (
              <span className="ml-1 text-slate-600">
                matching <span className="font-semibold text-slate-800">"{searchQuery}"</span>
              </span>
            )}
          </div>

          {(selectedTrack !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTrack("all");
                setSearchQuery("");
              }}
              className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Reset filters
            </button>
          )}
        </div>

        {/* Session cards list */}
        {filteredSessions.length > 0 ? (
          <div className="space-y-3.5">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                isBookmarked={bookmarkedIds.includes(session.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-dashed border-slate-300">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 mb-1">No sessions found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {activeDayTab === "saved"
                ? "You haven't bookmarked any sessions yet. Click the bookmark icon on any session to pin it here."
                : "Try adjusting your search query or choosing another specialty track."}
            </p>
            <button
              onClick={() => {
                setSelectedTrack("all");
                setSearchQuery("");
                if (activeDayTab === "saved") setActiveDayTab("day1");
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Show All Sessions
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
