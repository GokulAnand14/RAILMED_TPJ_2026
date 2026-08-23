import React from "react";
import { CalendarDays, BookOpenCheck, Award, Users2, MessageSquare, Building2 } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      targetId: "schedule",
      icon: CalendarDays,
      value: "2",
      label: "Scientific Days",
      subtext: "19th & 20th Sept",
      color: "text-blue-600",
      bg: "bg-blue-50/60 border-blue-100",
    },
    {
      targetId: "schedule",
      icon: BookOpenCheck,
      value: "22",
      label: "CME Sessions",
      subtext: "Clinical Evidence",
      color: "text-indigo-600",
      bg: "bg-indigo-50/60 border-indigo-100",
    },
    {
      targetId: "orations",
      icon: Award,
      value: "2",
      label: "Memorial Orations",
      subtext: "Dhandapani & Rahulan",
      color: "text-amber-600",
      bg: "bg-amber-50/60 border-amber-100",
    },
    {
      targetId: "faculty",
      icon: Users2,
      value: "30+",
      label: "Faculty & Chairs",
      subtext: "JIPMER & Southern Rly",
      color: "text-teal-600",
      bg: "bg-teal-50/60 border-teal-100",
    },
    {
      targetId: "panels",
      icon: MessageSquare,
      value: "2",
      label: "Expert Panels",
      subtext: "Oncology & Diabetes",
      color: "text-purple-600",
      bg: "bg-purple-50/60 border-purple-100",
    },
    {
      targetId: "symposia",
      icon: Building2,
      value: "5",
      label: "Symposia",
      subtext: "Pharma Partners",
      color: "text-rose-600",
      bg: "bg-rose-50/60 border-rose-100",
    },
  ];

  return (
    <section className="py-6 bg-slate-50/40 border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <a
                key={i}
                href={`#${stat.targetId}`}
                className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className={`p-1 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                  {stat.subtext}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
