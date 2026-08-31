import React from "react";
import { Award, Users, BookOpen, ShieldCheck, Building2 } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: ShieldCheck,
      value: "4 Hours",
      label: "TNMC Accredited",
      subtext: "Tamil Nadu Medical Council",
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: Award,
      value: "2",
      label: "Memorial Orations",
      subtext: "Dr. Sai Dhandapani & Dr. Rahulan",
      color: "from-amber-500/20 to-amber-600/20",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/30",
    },
    {
      icon: BookOpen,
      value: "22",
      label: "Scientific Sessions",
      subtext: "Across 2 High-Yield Days",
      color: "from-blue-500/20 to-indigo-500/20",
      textColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Users,
      value: "30+",
      label: "Expert Faculty",
      subtext: "JIPMER, PER, GOC & Apex Institutes",
      color: "from-purple-500/20 to-pink-500/20",
      textColor: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Building2,
      value: "7",
      label: "Industry Symposia",
      subtext: "Novartis, GSK, Novo, Cipla, Lilly, Sanofi",
      color: "from-amber-600/20 to-yellow-500/20",
      textColor: "text-amber-300",
      borderColor: "border-amber-500/30",
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 border-y border-amber-500/20 bg-[#040e24]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-gradient-to-b ${item.color} border ${item.borderColor} shadow-lg flex flex-col items-center text-center group hover:scale-[1.03] transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#030917] border border-amber-500/30 flex items-center justify-center mb-2.5 shadow-inner group-hover:border-amber-400">
                  <Icon className={`w-5 h-5 ${item.textColor}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-cinzel text-white mb-0.5">
                  {item.value}
                </div>
                <div className="text-xs font-bold font-cinzel text-amber-300">
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-medium leading-tight">
                  {item.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
