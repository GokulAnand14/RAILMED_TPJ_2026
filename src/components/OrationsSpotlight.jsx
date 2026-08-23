import React from "react";
import { Award, Calendar, Clock, ShieldCheck, CheckCircle2, User } from "lucide-react";
import { orationsList } from "../data/orationsData";
import { downloadSessionICS } from "../utils/icsGenerator";

export default function OrationsSpotlight() {
  return (
    <section id="orations" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Honoring Medical Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Prestigious Memorial Orations
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            The flagship clinical lectures of RAILMED TPJ CME 2026, commemorating venerable medical leaders of Southern Railway.
          </p>
        </div>

        {/* Orations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orationsList.map((oration, idx) => (
            <div
              key={oration.id}
              className="rounded-2xl bg-white border border-amber-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Day/Time */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>Memorial Oration #{idx + 1}</span>
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{oration.time}</span>
                  </div>
                </div>

                {/* Oration Name */}
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono mb-1">
                  {oration.title}
                </div>

                {/* Topic Title */}
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  "{oration.topic}"
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-6">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{oration.day}</span>
                </div>

                {/* Orator Profile Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-800 font-mono text-sm flex-shrink-0">
                      {oration.orator.avatarText}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 font-mono">
                        Distinguished Orator
                      </div>
                      <div className="text-base font-bold text-slate-900 leading-snug">
                        {oration.orator.name}
                      </div>
                      <div className="text-xs font-semibold text-blue-700">
                        {oration.orator.designation}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {oration.orator.hospital}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chairperson Info */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 mb-5 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-500">Session Chair: </span>
                    <span className="font-bold text-slate-800">{oration.chairperson.name}</span>
                    <span className="text-slate-500"> ({oration.chairperson.designation})</span>
                  </div>
                </div>

                {/* Abstract */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {oration.abstract}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Key Clinical Highlights:
                  </div>
                  {oration.keyTakeaways.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">Main Auditorium, GOC</span>
                <button
                  onClick={() => {
                    const mockSession = {
                      id: oration.id,
                      day: oration.day.includes("Day 1") ? 1 : 2,
                      topic: `${oration.title}: "${oration.topic}"`,
                      startTime: oration.time.split(" - ")[0].replace(".", ":"),
                      endTime: oration.time.split(" - ")[1].replace(" hrs", "").replace(".", ":"),
                      speaker: {
                        name: oration.orator.name,
                        designation: oration.orator.designation,
                        institution: oration.orator.hospital,
                      },
                      chairpersons: [oration.chairperson],
                      location: "Main Auditorium, Railway Hospital, Golden Rock / TPJ",
                      description: oration.abstract,
                    };
                    downloadSessionICS(mockSession);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sync Oration (.ics)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
