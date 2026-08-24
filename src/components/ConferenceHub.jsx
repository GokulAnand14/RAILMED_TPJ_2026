import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Calendar, Award, Users, MessageSquare, Building2, MapPin, Search, 
  Filter, Bookmark, Layers, X, Download, Clock, ShieldCheck, ChevronDown, 
  ChevronUp, ArrowRight, ExternalLink, CloudSun, Train, Plane, Car, Landmark, 
  CheckCircle2, User, PhoneCall, Sparkles, Play, Pause
} from "lucide-react";
import { day1Schedule, day2Schedule, tracks } from "../data/scheduleData";
import { orationsList } from "../data/orationsData";
import { facultyMembers } from "../data/speakersData";
import { sponsorsList } from "../data/sponsorsData";
import { venueData } from "../data/venueData";
import { downloadSessionICS, downloadFullConferenceICS } from "../utils/icsGenerator";

export default function ConferenceHub({ 
  activeTab, 
  setActiveTab, 
  bookmarkedIds, 
  onToggleBookmark, 
  onOpenPocketSchedule 
}) {
  // Auto-cycle / Auto-tour state
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Schedule state
  const [activeDay, setActiveDay] = useState("day1");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSessionId, setExpandedSessionId] = useState(null);

  // Faculty filter state
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [facultySearch, setFacultySearch] = useState("");

  // Oration expanded drawer
  const [expandedOrationId, setExpandedOrationId] = useState("oration-dhandapani");

  // Panel active tab
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  const hubTabs = useMemo(() => [
    { id: "schedule", label: "Schedule", fullLabel: "Program Schedule", icon: Calendar, badge: "22 Slots" },
    { id: "orations", label: "Orations", fullLabel: "Memorial Orations", icon: Award, badge: "2 Flagships" },
    { id: "panels", label: "Panels", fullLabel: "Clinical Panels", icon: MessageSquare, badge: "2 Conclaves" },
    { id: "faculty", label: "Faculty", fullLabel: "Faculty & Chairs", icon: Users, badge: "30+ Doctors" },
    { id: "symposia", label: "Symposia", fullLabel: "Industry Symposia", icon: Building2, badge: "5 Partners" },
    { id: "venue", label: "Venue & Travel", fullLabel: "Venue & Travel", icon: MapPin, badge: "TPJ Guide" },
  ], []);

  // Auto-cycle effect: 6 seconds per tab
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = 50; // update progress every 50ms
    const totalDuration = 6000; // 6 seconds per slide
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Switch to next tab
          setActiveTab((currentTab) => {
            const currentIndex = hubTabs.findIndex((t) => t.id === currentTab);
            const nextIndex = (currentIndex + 1) % hubTabs.length;
            return hubTabs[nextIndex].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, hubTabs, setActiveTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setProgress(0);
    setIsAutoPlaying(false); // Pause auto-cycle on manual user click
  };

  // Schedule filtering
  const allSessions = useMemo(() => [...day1Schedule, ...day2Schedule], []);

  const baseSessions = useMemo(() => {
    if (activeDay === "day1") return day1Schedule;
    if (activeDay === "day2") return day2Schedule;
    if (activeDay === "saved") return allSessions.filter((s) => bookmarkedIds.includes(s.id));
    return allSessions;
  }, [activeDay, allSessions, bookmarkedIds]);

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

  // Faculty filtering
  const filteredFaculty = useMemo(() => {
    return facultyMembers.filter((faculty) => {
      if (facultyFilter === "railway") {
        const isRailway =
          faculty.category.includes("Railway") ||
          faculty.institution.includes("Railway") ||
          faculty.institution.includes("PER") ||
          faculty.institution.includes("GOC") ||
          faculty.institution.includes("ICF");
        if (!isRailway) return false;
      } else if (facultyFilter === "academic") {
        const isAcademic =
          faculty.category.includes("Academic") ||
          faculty.institution.includes("JIPMER") ||
          faculty.institution.includes("KAPV");
        if (!isAcademic) return false;
      } else if (facultyFilter === "specialist") {
        const isSpecialist =
          faculty.category.includes("Specialist") ||
          faculty.category.includes("Industry") ||
          faculty.institution.includes("Hospital") ||
          faculty.institution.includes("Cipla");
        if (!isSpecialist) return false;
      }

      if (!facultySearch.trim()) return true;
      const q = facultySearch.toLowerCase();
      return (
        faculty.name.toLowerCase().includes(q) ||
        faculty.designation.toLowerCase().includes(q) ||
        faculty.institution.toLowerCase().includes(q) ||
        faculty.specialty.toLowerCase().includes(q)
      );
    });
  }, [facultyFilter, facultySearch]);

  const panels = [
    {
      id: "panel-cancer",
      day: 1,
      date: "Saturday, 19th September 2026",
      time: "11:30 - 12:30 hrs",
      title: "Panel discussions on Cancer management",
      theme: "Multimodal Oncology Protocols, Early Detection in Health Units, and Streamlined Referral Networks",
      moderator: {
        name: "Dr C. Santhosh",
        designation: "ACMS / MDU",
        institution: "Southern Railway, Madurai Division",
      },
      panelists: [
        { name: "Dr V. V. Ajithkumar", designation: "CMS / TVC", institution: "Southern Railway, TVC", focus: "Divisional Triage" },
        { name: "Dr Vijayabaskar", designation: "ACHD / S / PER", institution: "Railway Hospital, Perambur", focus: "Surgical Protocols" },
        { name: "Dr Prasanth Ganesan", designation: "Prof of Medical Oncology", institution: "JIPMER", focus: "Immunotherapy" },
        { name: "Dr A. Veeramani", designation: "ACMS / A / GOC", institution: "Railway Hospital, Golden Rock", focus: "Onco-Anesthesia" },
        { name: "Dr Minolin Dhas", designation: "DMO / RT / GOC", institution: "Railway Hospital, Golden Rock", focus: "Radiation Oncology" },
      ],
      points: [
        "Overcoming diagnostic delays for solid tumors in primary clinics",
        "Protocols for fast-tracking biopsy results & specialized referrals",
        "Palliative care & symptom control in advanced cases"
      ]
    },
    {
      id: "panel-diabetes",
      day: 2,
      date: "Sunday, 20th September 2026",
      time: "15:30 - 16:15 hrs",
      title: "Panel discussion on \"Diabetes and early detection of complications\"",
      theme: "Target Organ Surveillance: Retinopathy, Nephropathy, Diabetic Foot & Neuropathy",
      moderator: {
        name: "Dr Arun",
        designation: "Sr DMO / PER",
        institution: "Railway Hospital, Perambur",
      },
      panelists: [
        { name: "Dr P. Muralikrishna", designation: "ACMS / PGT", institution: "Southern Railway, Palakkad", focus: "Cardiorenal Risk" },
        { name: "Dr Vijayabaskar", designation: "ACHD / S / PER", institution: "Railway Hospital, Perambur", focus: "Diabetic Foot Salvage" },
        { name: "Dr Saravanan", designation: "ACHD / Eye / PER", institution: "Railway Hospital, Perambur", focus: "Retinopathy Screening" },
      ],
      points: [
        "Routine periodic fundus exam guidelines for railway employees",
        "Early microalbuminuria detection & renin-angiotensin blockade",
        "Multidisciplinary diabetic foot clinic workflow preventing amputations"
      ]
    }
  ];

  return (
    <section 
      id="conference-hub" 
      className="py-12 sm:py-16 relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Section Heading & Auto-tour Status */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Conference Modules</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Explore Conference Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any section below to view schedules, orations, panels, faculty, or transit guides.
            </p>
          </div>

          {/* Auto-tour / Manual Mode Controller Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                isAutoPlaying
                  ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              }`}
              title={isAutoPlaying ? "Pause Auto-Tour" : "Resume Auto-Tour"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-blue-600" />
                  <span>Auto-Tour Active {isHovered ? "(Paused on Hover)" : ""}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-slate-600" />
                  <span>Manual Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sticky Compact 6-Column Responsive Switcher Grid */}
        <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-1.5 sm:p-2 shadow-md shadow-slate-900/5 mb-6 transition-all">
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
            {hubTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative flex flex-col items-center justify-center py-2 sm:py-2.5 px-2 sm:px-2.5 rounded-xl transition-all cursor-pointer text-center group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "bg-slate-50/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-blue-600"}`} />
                    <span className="font-bold text-xs tracking-tight truncate">
                      {tab.label}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-blue-700 text-blue-100" : "bg-white text-slate-500 border border-slate-200/80"
                    }`}
                  >
                    {tab.badge}
                  </span>

                  {/* Animated Progress Line for Active Tab in Auto-Tour Mode */}
                  {isActive && isAutoPlaying && !isHovered && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-300 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: PROGRAM SCHEDULE (Compact, Expandable Rows) */}
        {/* ======================================================== */}
        {activeTab === "schedule" && (
          <div className="animate-in fade-in duration-200">
            {/* Header Controls: Day Switcher, Search, Quick Tools */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                {/* Day Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
                  <button
                    onClick={() => setActiveDay("day1")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeDay === "day1" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Day 1 (19th Sept) • 12 Slots
                  </button>
                  <button
                    onClick={() => setActiveDay("day2")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeDay === "day2" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Day 2 (20th Sept) • 10 Slots
                  </button>
                  <button
                    onClick={() => setActiveDay("all")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeDay === "all" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All (22)
                  </button>
                  <button
                    onClick={() => setActiveDay("saved")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeDay === "saved" ? "bg-amber-500 text-white shadow-2xs font-bold" : "text-slate-600 hover:text-amber-700"
                    }`}
                  >
                    Saved ({bookmarkedIds.length})
                  </button>
                </div>

                {/* Pocket Timetable Trigger */}
                <button
                  onClick={onOpenPocketSchedule}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer self-start lg:self-auto"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Printable Timetable</span>
                </button>
              </div>

              {/* Search & Track Filter */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, doctor, hospital, or time..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Track Selector Dropdown / Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  {tracks.slice(0, 5).map((track) => (
                    <button
                      key={track.id}
                      onClick={() => setSelectedTrack(track.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                        selectedTrack === track.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Scannable Schedule Rows */}
            <div className="space-y-2.5">
              {filteredSessions.map((session) => {
                const isExpanded = expandedSessionId === session.id;
                const isBookmarked = bookmarkedIds.includes(session.id);

                return (
                  <div
                    key={session.id}
                    className={`rounded-xl border transition-all duration-200 ${
                      session.category === "oration"
                        ? "bg-amber-50/40 border-amber-200 hover:border-amber-300"
                        : session.category === "panel"
                        ? "bg-purple-50/30 border-purple-200 hover:border-purple-300"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    } shadow-2xs hover:shadow-xs`}
                  >
                    {/* Collapsed Row Header */}
                    <div
                      onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                      className="p-3.5 sm:p-4 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        {/* Time & Slot */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {session.timeDisplay}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                            Day {session.day}
                          </span>
                        </div>

                        {/* Title & Category */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-slate-900 truncate">
                              {session.topic}
                            </span>
                            {session.category === "oration" && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200 uppercase">
                                ★ Oration
                              </span>
                            )}
                            {session.sponsor && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {session.sponsor}
                              </span>
                            )}
                          </div>

                          {/* Quick speaker subtitle */}
                          {session.speaker && (
                            <div className="text-xs text-slate-500 truncate mt-0.5">
                              <span className="font-semibold text-slate-700">{session.speaker.name}</span>
                              {session.speaker.designation && ` • ${session.speaker.designation}`}
                            </div>
                          )}
                          {session.moderator && (
                            <div className="text-xs text-purple-700 truncate mt-0.5">
                              Moderator: <span className="font-semibold">{session.moderator.name}</span> ({session.moderator.designation})
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Quick Controls */}
                      <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleBookmark(session.id)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            isBookmarked
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : "bg-white text-slate-400 border-slate-200 hover:text-slate-700"
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => downloadSessionICS(session)}
                          className="p-1.5 rounded-lg bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                          title="Add to Calendar"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                          className="p-1.5 rounded-lg bg-white text-slate-400 border border-slate-200 hover:text-slate-800 text-xs cursor-pointer"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-100 text-xs text-slate-600 bg-slate-50/50 rounded-b-xl space-y-3 animate-in fade-in duration-150">
                        {session.description && (
                          <p className="leading-relaxed text-slate-700">{session.description}</p>
                        )}

                        {/* Speaker Full Card */}
                        {session.speaker && (
                          <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
                              {session.speaker.avatarText || <User className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{session.speaker.name}</div>
                              <div className="text-blue-700 font-medium">{session.speaker.designation}</div>
                              {session.speaker.institution && (
                                <div className="text-slate-500">{session.speaker.institution}</div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Chairpersons & Panelists */}
                        {session.chairpersons && session.chairpersons.length > 0 && (
                          <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                            <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-slate-700">Chairpersons: </span>
                              {session.chairpersons.map((c, i) => (
                                <span key={i} className="text-slate-800 font-medium">
                                  {c.name} ({c.designation})
                                  {i < session.chairpersons.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {session.panelists && (
                          <div className="bg-purple-50/80 p-3 rounded-lg border border-purple-100">
                            <div className="font-bold text-purple-900 mb-1.5">Panelists:</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-800">
                              {session.panelists.map((p, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                  <span className="font-semibold">{p.name}</span>
                                  <span className="text-slate-500">({p.designation})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredSessions.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No sessions match your search or filter</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTrack("all");
                      if (activeDay === "saved") setActiveDay("day1");
                    }}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: MEMORIAL ORATIONS SPOTLIGHT */}
        {/* ======================================================== */}
        {activeTab === "orations" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Oration Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs max-w-md">
              {orationsList.map((oration, idx) => (
                <button
                  key={oration.id}
                  onClick={() => setExpandedOrationId(oration.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    expandedOrationId === oration.id
                      ? "bg-amber-500 text-white shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Oration {idx + 1}: {oration.title.split(" ")[1]}
                </button>
              ))}
            </div>

            {/* Active Oration Card */}
            {orationsList
              .filter((o) => o.id === expandedOrationId)
              .map((oration) => (
                <div
                  key={oration.id}
                  className="rounded-2xl bg-white border border-amber-200 p-6 sm:p-8 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
                      ★ {oration.title}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{oration.time} • {oration.day}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 font-sans">
                    "{oration.topic}"
                  </h3>

                  {/* Orator & Chairperson */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono mb-1">
                        Distinguished Orator
                      </div>
                      <div className="text-base font-bold text-slate-900">{oration.orator.name}</div>
                      <div className="text-xs font-semibold text-blue-700">{oration.orator.designation}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{oration.orator.hospital}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-1">
                          Session Chairperson
                        </div>
                        <div className="text-sm font-bold text-slate-900">{oration.chairperson.name}</div>
                        <div className="text-xs text-slate-600">{oration.chairperson.designation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Abstract & Takeaways */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-1.5">
                        Clinical Abstract
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{oration.abstract}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                        Key Highlights:
                      </h4>
                      <div className="space-y-1.5">
                        {oration.keyTakeaways.map((point, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Cauvery Meeting Hall, GOC</span>
                    <button
                      onClick={() => {
                        const mockSession = {
                          id: oration.id,
                          day: oration.day.includes("Day 1") ? 1 : 2,
                          topic: `${oration.title}: "${oration.topic}"`,
                          startTime: oration.time.split(" - ")[0].replace(".", ":"),
                          endTime: oration.time.split(" - ")[1].replace(" hrs", "").replace(".", ":"),
                          speaker: { name: oration.orator.name, designation: oration.orator.designation, institution: oration.orator.hospital },
                          chairpersons: [oration.chairperson],
                          location: "Cauvery Meeting Hall, Divisional Railway Hospital, Golden Rock / TPJ",
                          description: oration.abstract,
                        };
                        downloadSessionICS(mockSession);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>Add to Calendar (.ics)</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: CLINICAL PANELS */}
        {/* ======================================================== */}
        {activeTab === "panels" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Panel Selector Tabs */}
            <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs max-w-md">
              <button
                onClick={() => setActivePanelIdx(0)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePanelIdx === 0 ? "bg-purple-600 text-white font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Panel 1: Cancer Care
              </button>
              <button
                onClick={() => setActivePanelIdx(1)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePanelIdx === 1 ? "bg-purple-600 text-white font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Panel 2: Diabetes Complications
              </button>
            </div>

            {/* Active Panel Card */}
            {(() => {
              const panel = panels[activePanelIdx];
              return (
                <div className="rounded-2xl bg-white border border-purple-200 p-6 sm:p-8 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      Day {panel.day} Conclave • {panel.time}
                    </span>
                    <span className="text-xs text-slate-500">{panel.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{panel.title}</h3>
                  <p className="text-xs font-medium text-purple-700 mb-5">{panel.theme}</p>

                  {/* Moderator Box */}
                  <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 mb-5">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 mb-0.5">
                      Panel Moderator
                    </div>
                    <div className="text-base font-bold text-slate-900">{panel.moderator.name}</div>
                    <div className="text-xs text-purple-700">{panel.moderator.designation} • {panel.moderator.institution}</div>
                  </div>

                  {/* Panelist Grid */}
                  <div className="mb-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Expert Panelists ({panel.panelists.length}):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {panel.panelists.map((p, i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-slate-900">{p.name}</div>
                            <div className="text-[11px] text-blue-700 font-medium">{p.designation} • {p.institution}</div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                            {p.focus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key points */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-1">
                      Core Discussion Themes:
                    </div>
                    {panel.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Cauvery Meeting Hall, GOC</span>
                    <button
                      onClick={() => {
                        const mockSession = {
                          id: panel.id,
                          day: panel.day,
                          topic: panel.title,
                          startTime: panel.time.split(" - ")[0].replace(".", ":"),
                          endTime: panel.time.split(" - ")[1].replace(" hrs", "").replace(".", ":"),
                          moderator: panel.moderator,
                          panelists: panel.panelists,
                          location: "Cauvery Meeting Hall, Divisional Railway Hospital, Golden Rock / TPJ",
                          description: panel.theme,
                        };
                        downloadSessionICS(mockSession);
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>Add to Calendar</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: FACULTY & CHAIRPERSONS DIRECTORY */}
        {/* ======================================================== */}
        {activeTab === "faculty" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {[
                  { id: "all", label: "All Faculty" },
                  { id: "railway", label: "Railway Officers" },
                  { id: "academic", label: "JIPMER & Medical Colleges" },
                  { id: "specialist", label: "Consultants" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFacultyFilter(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      facultyFilter === c.id
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  placeholder="Search doctor or specialty..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Compact Faculty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredFaculty.map((f) => (
                <div
                  key={f.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs font-mono flex-shrink-0">
                    {f.avatarText || <User className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-bold text-xs text-slate-900 truncate">{f.name}</div>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-slate-100 text-slate-600 flex-shrink-0">
                        {f.role.includes("Orator") ? "Orator" : f.role.includes("Chair") ? "Chair" : "Faculty"}
                      </span>
                    </div>
                    <div className="text-[11px] text-blue-700 font-medium truncate">{f.designation}</div>
                    <div className="text-[10px] text-slate-500 truncate">{f.institution}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{f.sessionDay}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: INDUSTRY SYMPOSIA */}
        {/* ======================================================== */}
        {activeTab === "symposia" && (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsorsList.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="rounded-xl bg-white border border-slate-200 p-5 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono">{sponsor.badge}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">{sponsor.tier}</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{sponsor.name}</h4>
                    <div className="text-xs font-semibold text-slate-800 mb-2">{sponsor.sessionTitle}</div>
                    {sponsor.speaker && (
                      <div className="text-[11px] text-blue-700 mb-2 font-medium">Faculty: {sponsor.speaker}</div>
                    )}
                    <div className="text-xs text-slate-500 leading-relaxed mb-3">{sponsor.focus}</div>
                  </div>
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-600" /> {sponsor.schedule}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 6: VENUE & TRAVEL GUIDE */}
        {/* ======================================================== */}
        {activeTab === "venue" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Campus & Map highlight */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-700">Hospital Campus</span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">{venueData.venueName}</h4>
                <p className="text-xs text-slate-600 mt-1">{venueData.address}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1"><CloudSun className="w-3.5 h-3.5 text-amber-500" /> {venueData.weatherInfo.avgTemp}</span>
                  <span>• Fully Air-Conditioned Convention Facility</span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Divisional+Railway+Hospital+Golden+Rock+Tiruchirappalli"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Connectivity 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {venueData.connectivity.map((item, i) => {
                const Icon = i === 0 ? Train : i === 1 ? Plane : Car;
                return (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">{item.mode}</div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.details}</p>
                    <div className="text-[10px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded mt-2.5 inline-block">{item.distance}</div>
                  </div>
                );
              })}
            </div>

            {/* Sights */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
                Local Trichy Heritage:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {venueData.localAttractions.map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-700 font-semibold mb-1">
                      <span>{s.tag}</span>
                      <span>{s.distance}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{s.name}</div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
