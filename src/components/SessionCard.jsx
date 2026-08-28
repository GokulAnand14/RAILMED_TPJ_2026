import React, { useState } from "react";
import { 
  Clock, User, ShieldCheck, Bookmark, BookmarkCheck, 
  Calendar, ChevronDown, ChevronUp, Building2, ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import { openGoogleCalendar } from "../utils/googleCalendar";
import { playBookmarkPop } from "../utils/soundEffects";

export default function SessionCard({ session, isBookmarked, onToggleBookmark }) {
  const [expanded, setExpanded] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    playBookmarkPop();
    if (!isBookmarked) {
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.7 },
          colors: ['#d4af37', '#0284c7', '#10b981', '#f59e0b', '#ffffff']
        });
      } catch (err) {
        console.error(err);
      }
    }
    onToggleBookmark(session.id);
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
    openGoogleCalendar(session);
  };

  const getCategoryBadge = () => {
    switch (session.category) {
      case "oration":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/25 text-amber-300 border border-amber-500/50 font-cinzel">★ Memorial Oration</span>;
      case "panel":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/25 text-purple-300 border border-purple-500/50 font-cinzel">Clinical Panel</span>;
      case "symposium":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/25 text-teal-300 border border-teal-500/50">Industry Symposium</span>;
      case "oncology":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">Oncology Track</span>;
      case "cardiology":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">Cardiology</span>;
      case "diabetes":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">Diabetes & Metabolism</span>;
      case "ent":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">ENT / Sleep Surgery</span>;
      case "pulmonology":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Pulmonology & OSA</span>;
      case "medicine":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">Psychiatry & Medicine</span>;
      case "ceremony":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400 text-slate-950 font-bold font-cinzel">Inaugural Plenary</span>;
      case "break":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300">Dining & Networking</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300">Session</span>;
    }
  };

  const isSpecial = session.category === "oration" || session.category === "panel" || session.category === "ceremony";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 group ${
        isSpecial
          ? "bg-gradient-to-br from-[#0c204c] to-[#040e24] border-amber-500/50 shadow-lg shadow-black/60 hover:border-amber-400"
          : "bg-[#06122c]/90 border-slate-700/60 hover:border-amber-500/40 shadow-md"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        
        {/* Left Column: Time & Slot Badge */}
        <div className="flex items-center md:flex-col md:items-start gap-2.5 md:w-44 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 bg-[#020713] px-3 py-1 rounded-lg border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{session.timeDisplay}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium font-cinzel">
            {session.slNo && <span>Slot #{session.slNo}</span>}
            <span>• Day {session.day}</span>
          </div>
        </div>

        {/* Center Column: Topic, Speakers & Chairs */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {getCategoryBadge()}
            {session.sponsor && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                <span>{session.sponsor}</span>
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold font-cinzel text-white leading-snug mb-3 group-hover:text-amber-300 transition-colors">
            {session.topic}
          </h4>

          {/* Speaker Info */}
          {session.speaker && (
            <div className="p-3 rounded-xl bg-[#030917]/90 border border-amber-500/20 mb-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 text-amber-200 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                <div className="w-full h-full rounded-md bg-[#030917] flex items-center justify-center">
                  {session.speaker.avatarText || <User className="w-4 h-4" />}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate font-cinzel">
                  {session.speaker.name}
                </div>
                <div className="text-[11px] text-amber-300 font-medium">
                  {session.speaker.designation}
                </div>
                {session.speaker.institution && (
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {session.speaker.institution}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Moderator Info (For Panels) */}
          {session.moderator && (
            <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-xs mb-3 text-purple-200">
              <strong className="text-purple-300 font-cinzel">Moderator:</strong> {session.moderator.name} ({session.moderator.designation}, {session.moderator.institution})
            </div>
          )}

          {/* Chairperson Info */}
          {session.chairpersons && session.chairpersons.length > 0 && (
            <div className="p-2.5 rounded-lg bg-[#040e24]/70 border border-slate-700/60 mb-2 flex items-start gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-slate-400">Chairperson(s): </span>
                <span className="font-semibold text-amber-200">
                  {session.chairpersons.map((c) => `${c.name} (${c.designation})`).join(" & ")}
                </span>
              </div>
            </div>
          )}

          {/* Expandable Details */}
          {expanded && (
            <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300 animate-in fade-in duration-200">
              {session.description && <p className="leading-relaxed">{session.description}</p>}
              {session.objectives && (
                <div className="bg-[#030917]/70 p-2.5 rounded-lg">
                  <div className="font-bold text-amber-300 mb-1 font-cinzel">Learning Objective:</div>
                  <p>{session.objectives}</p>
                </div>
              )}
            </div>
          )}

          {/* Expand Toggle */}
          {(session.description || session.objectives) && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>{expanded ? "Show Less" : "Session Objectives & Clinical Insights"}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Right Column: Actions (Bookmark & Add to Google Calendar) */}
        <div className="flex md:flex-col items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isBookmarked
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold scale-105"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
            }`}
            title={isBookmarked ? "Remove from my itinerary" : "Save to my itinerary"}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="md:hidden">{isBookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleCalendarClick}
            className="p-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            title="Add session to Google Calendar"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline md:hidden text-[11px]">Add to Google Calendar</span>
            <ExternalLink className="w-3 h-3 text-amber-400/70 hidden sm:inline md:hidden" />
          </button>
        </div>

      </div>
    </div>
  );
}
