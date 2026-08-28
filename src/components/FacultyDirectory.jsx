import React, { useState, useMemo } from "react";
import { Users, Search, Building, X } from "lucide-react";
import { facultyMembers } from "../data/speakersData";

export default function FacultyDirectory() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Faculty & Chairs" },
    { id: "railway", label: "Southern Railway Doctors" },
    { id: "academic", label: "JIPMER & Govt Colleges" },
    { id: "specialist", label: "Consultants & Industry" },
  ];

  const filteredFaculty = useMemo(() => {
    return facultyMembers.filter((faculty) => {
      if (filterCategory === "railway") {
        const isRailway =
          faculty.category.includes("Railway") ||
          faculty.institution.includes("Railway") ||
          faculty.institution.includes("PER") ||
          faculty.institution.includes("GOC") ||
          faculty.institution.includes("ICF");
        if (!isRailway) return false;
      } else if (filterCategory === "academic") {
        const isAcademic =
          faculty.category.includes("Academic") ||
          faculty.institution.includes("JIPMER") ||
          faculty.institution.includes("KAPV");
        if (!isAcademic) return false;
      } else if (filterCategory === "specialist") {
        const isSpecialist =
          faculty.category.includes("Specialist") ||
          faculty.category.includes("Industry") ||
          faculty.institution.includes("Hospital") ||
          faculty.institution.includes("Cipla");
        if (!isSpecialist) return false;
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        faculty.name.toLowerCase().includes(q) ||
        faculty.designation.toLowerCase().includes(q) ||
        faculty.institution.toLowerCase().includes(q) ||
        faculty.specialty.toLowerCase().includes(q) ||
        faculty.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filterCategory, searchQuery]);

  return (
    <section id="faculty" className="pt-6 pb-12 bg-[#030917] border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2.5 font-cinzel">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Academic Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            Speakers, Orators & <span className="text-gold-gradient">Chairpersons</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-2 leading-relaxed">
            Distinguished clinicians and professors from JIPMER Puducherry, KAPV Govt Medical College, and Southern Railway health divisions.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-cinzel transition-all whitespace-nowrap cursor-pointer ${
                  filterCategory === cat.id
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-[#040e24] text-slate-300 hover:text-white border border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty by name, specialty, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#040e24] border border-slate-700 focus:border-amber-400 text-xs text-white placeholder-slate-400 focus:outline-none"
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
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFaculty.map((faculty, idx) => (
            <div
              key={idx}
              className="royal-card p-5 flex flex-col justify-between hover:border-amber-400/80 transition-all duration-300"
            >
              <div>
                {/* Avatar & Role Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex-shrink-0">
                    <div className="w-full h-full rounded-xl bg-[#030917] flex items-center justify-center font-bold text-amber-300 font-mono text-sm">
                      {faculty.avatarText || faculty.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 font-cinzel">
                    {faculty.role}
                  </span>
                </div>

                {/* Name & Designation */}
                <h4 className="text-base font-bold font-cinzel text-white group-hover:text-amber-300 transition-colors">
                  {faculty.name}
                </h4>
                <div className="text-xs font-semibold text-amber-400/90 mt-0.5">
                  {faculty.designation}
                </div>
                <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{faculty.institution}</span>
                </div>

                {/* Specialty Pill */}
                <div className="mb-3">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#030917] text-teal-300 border border-teal-500/30">
                    {faculty.specialty}
                  </span>
                </div>
              </div>

              {/* Topics / Slots */}
              {faculty.topics && faculty.topics.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-cinzel">
                    Conclave Topic / Session:
                  </div>
                  {faculty.topics.map((t, tIdx) => (
                    <div key={tIdx} className="text-xs text-slate-200 line-clamp-2">
                      • {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
