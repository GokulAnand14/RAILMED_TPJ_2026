import React from "react";
import { MessageSquare, Users, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { downloadSessionICS } from "../utils/icsGenerator";

export default function PanelSpotlight() {
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
      title: "Panel discussion on \"Diabetes and early detection of complications\"",
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

  return (
    <section id="panels" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
            <span>Interactive Conclaves</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Clinical Panel Discussions
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Multi-specialty deliberations uniting oncologists, surgeons, diabetologists, and railway medical officers to discuss complex diagnostic workflows.
          </p>
        </div>

        {/* Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {panels.map((panel, idx) => (
            <div
              key={panel.id}
              className="rounded-2xl bg-white border border-purple-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase">
                    Panel Conclave #{idx + 1} • Day {panel.day}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    <span>{panel.time}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                  {panel.title}
                </h3>

                <div className="text-xs font-medium text-purple-700 mb-5">
                  {panel.theme}
                </div>

                {/* Moderator Box */}
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 mb-5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 mb-1">
                    Panel Moderator
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    {panel.moderator.name}
                  </div>
                  <div className="text-xs text-purple-700">
                    {panel.moderator.designation} • {panel.moderator.institution}
                  </div>
                </div>

                {/* Panelists */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
                    Expert Panelists:
                  </div>
                  <div className="space-y-2">
                    {panel.panelists.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-blue-700 font-medium">
                            {p.designation} • {p.institution}
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 self-start sm:self-auto font-medium">
                          {p.focus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Deliberations */}
                <div className="space-y-1.5 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Core Discussion Focus:
                  </div>
                  {panel.points.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Calendar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{panel.date}</span>
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
                      location: "Main Auditorium, Railway Hospital, Golden Rock / TPJ",
                      description: panel.theme,
                    };
                    downloadSessionICS(mockSession);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <span>Sync Panel (.ics)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
