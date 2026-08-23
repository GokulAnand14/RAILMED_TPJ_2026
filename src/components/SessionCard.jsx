import React, { useState } from "react";
import { Clock, User, Users, ShieldCheck, Bookmark, BookmarkCheck, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { downloadSessionICS } from "../utils/icsGenerator";

export default function SessionCard({ session, isBookmarked, onToggleBookmark }) {
  const [expanded, setExpanded] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleBookmark(session.id);
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
    downloadSessionICS(session);
  };

  const getCategoryBadge = () => {
    switch (session.category) {
      case "oration":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">★ Memorial Oration</span>;
      case "panel":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Panel Discussion</span>;
      case "symposium":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Industry Symposium</span>;
      case "oncology":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">Oncology</span>;
      case "cardiology":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">Cardiology</span>;
      case "diabetes":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">Diabetes & Metabolism</span>;
      case "ent":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">ENT / Sleep Surgery</span>;
      case "pulmonology":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">Pulmonology & OSA</span>;
      case "medicine":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">Psychiatry & Sleep</span>;
      case "ceremony":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">Plenary / Ceremony</span>;
      case "break":
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">Dining & Networking</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">Session</span>;
    }
  };

  const getCardBorder = () => {
    if (session.category === "oration") return "border-amber-300/80 bg-amber-50/20";
    if (session.category === "panel") return "border-purple-200/80 bg-purple-50/20";
    if (session.category === "symposium") return "border-emerald-200/80 bg-emerald-50/20";
    return "border-slate-200 bg-white";
  };

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 transition-all shadow-2xs hover:shadow-xs hover:border-slate-300 ${getCardBorder()}`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left Col: Time & Slot */}
        <div className="flex items-center md:flex-col md:items-start gap-2.5 md:w-44 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-100">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{session.timeDisplay}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            {session.slNo && <span>Slot #{session.slNo}</span>}
            <span>• Day {session.day}</span>
          </div>
        </div>

        {/* Center Col: Topic & Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {getCategoryBadge()}
            {session.sponsor && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Sponsor: {session.sponsor}
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3">
            {session.topic}
          </h4>

          {/* Speaker Box */}
          {session.speaker && (
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 mb-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                {session.speaker.avatarText || <User className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {session.speaker.name}
                </div>
                <div className="text-[11px] text-blue-700 font-medium">
                  {session.speaker.designation}
                </div>
                {session.speaker.institution && (
                  <div className="text-[11px] text-slate-500 truncate">
                    {session.speaker.institution}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Panel Moderator & Panelists */}
          {session.moderator && (
            <div className="p-3.5 rounded-lg bg-purple-50/70 border border-purple-100 mb-3">
              <div className="text-xs font-bold text-purple-900 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-700" />
                <span>Panel Moderator: {session.moderator.name} ({session.moderator.designation})</span>
              </div>
              {session.panelists && (
                <div className="mt-2 text-xs text-slate-700">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-700 mb-1">
                    Panelists ({session.panelists.length}):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {session.panelists.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                        <span className="font-semibold">{p.name}</span>
                        <span className="text-slate-500 text-[11px]">({p.designation})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chairpersons */}
          {session.chairpersons && session.chairpersons.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="font-semibold text-slate-500">Chairperson(s):</span>
              <div className="flex flex-wrap gap-1.5">
                {session.chairpersons.map((c, idx) => (
                  <span key={idx} className="inline-flex items-center text-slate-800">
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-slate-500 ml-1">({c.designation})</span>
                    {idx < session.chairpersons.length - 1 && <span className="text-slate-300 mx-1.5">•</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expanded description */}
          {expanded && session.description && (
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              <p>{session.description}</p>
            </div>
          )}
        </div>

        {/* Right Col: Actions */}
        <div className="flex md:flex-col items-center justify-end gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
              isBookmarked
                ? "bg-amber-50 text-amber-700 border-amber-300 shadow-2xs"
                : "bg-white text-slate-400 border-slate-200 hover:text-slate-700 hover:border-slate-300"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark session"}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCalendarClick}
            className="p-2 rounded-lg bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-xs"
            title="Download .ics for this session"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {session.description && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-lg bg-white text-slate-500 border border-slate-200 hover:text-slate-800 text-xs"
              title="Toggle details"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
