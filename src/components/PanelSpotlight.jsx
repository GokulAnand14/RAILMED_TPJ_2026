import React, { useState } from "react";
import { MessageSquare, Users, Clock, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import { openGoogleCalendar } from "../utils/googleCalendar";

export default function PanelSpotlight() {
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  const panels = [
    {
      id: "panel-cancer",
      day: 1,
      date: "Saturday, 19th September 2026",
      time: "11:30 - 12:30 hrs",
      startTime: "11:30",
      endTime: "12:30",
      topic: "Panel Discussions on Cancer Management",
      title: "Panel Discussions on Cancer Management",
      theme: "Multimodal Oncology Protocols, Early Detection in Health Units, and Streamlined Referral Networks",
      moderator: {
        name: "Dr C. Santhosh",
        designation: "ACMS / MDU",
        institution: "Southern Railway, Madurai Division",
      },
      panelists: [
        {
          name: "Dr V. V. Ajithkumar",
          designation: "CMS / TVC",
          institution: "Southern Railway, Thiruvananthapuram",
          focus: "Administrative & Clinical Triage in Divisional Hospitals",
        },
        {
          name: "Dr Vijayabaskar",
          designation: "ACHD / S / PER",
          institution: "Railway Hospital, Perambur",
          focus: "Surgical Oncology & Diagnostic Biopsy Protocols",
        },
        {
          name: "Dr Prasanth Ganesan",
          designation: "Prof of Medical Oncology",
          institution: "JIPMER Puducherry",
          focus: "Systemic Chemotherapy & Immunotherapy Integration",
        },
        {
          name: "Dr A. Veeramani",
          designation: "ACMS / A / GOC",
          institution: "Railway Hospital, Golden Rock",
          focus: "Onco-Anesthesia, Perioperative Care & Pain Palliative",
        },
        {
          name: "Dr Minolin Dhas",
          designation: "DMO / RT / GOC",
          institution: "Railway Hospital, Golden Rock",
          focus: "Radiation Oncology & Local Disease Control",
        },
      ],
      points: [
        "Overcoming diagnostic delays for solid organ tumors in primary railway clinics",
        "Protocols for fast-tracking biopsy results and specialized cancer referrals",
        "Palliative care and symptom control in advanced malignant cases",
      ],
    },
    {
      id: "panel-diabetes",
      day: 2,
      date: "Sunday, 20th September 2026",
      time: "15:30 - 16:15 hrs",
      startTime: "15:30",
      endTime: "16:15",
      topic: "Panel Discussion on Diabetes and Early Detection of Complications",
      title: "Panel Discussion on \"Diabetes and Early Detection of Complications\"",
      theme: "Target Organ Surveillance: Diabetic Retinopathy, Nephropathy, Diabetic Foot, and Peripheral Neuropathy",
      moderator: {
        name: "Dr Arun",
        designation: "Sr DMO / PER",
        institution: "Railway Hospital, Perambur",
      },
      panelists: [
        {
          name: "Dr P. Muralikrishna",
          designation: "ACMS / PGT",
          institution: "Southern Railway, Palakkad",
          focus: "Cardiorenal Risk Stratification & Diabetic Nephropathy",
        },
        {
          name: "Dr Vijayabaskar",
          designation: "ACHD / S / PER",
          institution: "Railway Hospital, Perambur",
          focus: "Diabetic Foot Salvage, Debridement & Vascular Preservation",
        },
        {
          name: "Dr Saravanan",
          designation: "ACHD / Eye / PER",
          institution: "Railway Hospital, Perambur",
          focus: "Diabetic Retinopathy Screening, Fundoscopy & Laser Photocoagulation",
        },
      ],
      points: [
        "Routine periodic fundus exam guidelines for all diabetic railway employees",
        "Early microalbuminuria detection and aggressive renin-angiotensin blockade",
        "Multidisciplinary diabetic foot clinic workflow preventing amputations",
      ],
    },
  ];

  const currentPanel = panels[activePanelIdx];

  return (
    <section id="panels" className="py-12 bg-[#040e24] border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 font-cinzel">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Multidisciplinary Clinical Conclaves</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            High-Impact <span className="text-gold-gradient">Panel Discussions</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-base mt-2 leading-relaxed">
            Multi-specialty consensus roundtables addressing pressing clinical challenges across Indian Railways healthcare delivery.
          </p>
        </div>

        {/* Panel Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#030917] border border-amber-500/30 shadow-lg">
            {panels.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePanelIdx(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-cinzel transition-all cursor-pointer ${
                  activePanelIdx === idx
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Panel {idx + 1}: {idx === 0 ? "Cancer Care" : "Diabetes Complications"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Panel Details Card */}
        <div className="royal-card p-6 sm:p-10 border-amber-500/40">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 font-cinzel">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentPanel.date}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 bg-[#020713] px-3 py-1 rounded-lg border border-amber-500/30">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentPanel.time}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-white text-gold-light mb-3">
            {currentPanel.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mb-8 font-medium">
            {currentPanel.theme}
          </p>

          {/* Moderator Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0a1e4a] to-[#040e24] border border-amber-500/40 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-amber-400 font-cinzel mb-1">
                Conclave Moderator
              </div>
              <div className="text-lg font-bold text-white font-cinzel">
                {currentPanel.moderator.name}
              </div>
              <div className="text-xs text-amber-300 font-semibold">
                {currentPanel.moderator.designation} • {currentPanel.moderator.institution}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 self-start sm:self-auto font-cinzel">
              Session Chair & Moderator
            </span>
          </div>

          {/* Panelists Grid */}
          <div className="mb-8">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-4 font-cinzel flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Specialist Panelists</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPanel.panelists.map((panelist, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-xl bg-[#030917]/80 border border-slate-700/70 hover:border-amber-400/50 transition-colors"
                >
                  <div className="font-bold text-sm text-white font-cinzel">
                    {panelist.name}
                  </div>
                  <div className="text-xs font-semibold text-amber-300 mt-0.5">
                    {panelist.designation}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {panelist.institution}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300 italic">
                    Focus: {panelist.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Agenda Points */}
          <div className="p-4 rounded-xl bg-[#030917]/60 border border-slate-700/60 mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 font-cinzel">
              Core Clinical Discussion Threads:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentPanel.points.map((pt, ptIdx) => (
                <div key={ptIdx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action: Add to Google Calendar */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={() => openGoogleCalendar(currentPanel)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold transition-all cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Add Panel to Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-amber-400/80" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
