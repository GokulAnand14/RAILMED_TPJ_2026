import React, { useState, useMemo } from "react";
import { Users, Search, Building, Clock, User } from "lucide-react";
import { facultyMembers } from "../data/speakersData";

export default function FacultyDirectory() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Faculty & Chairs" },
    { id: "railway", label: "Railway Medical Officers (SR & ICF)" },
    { id: "academic", label: "JIPMER & Medical Colleges" },
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

  const getBadgeStyle = (role) => {
    if (role.includes("Orator")) return "bg-amber-50 text-amber-800 border-amber-200";
    if (role.includes("Chair")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (role.includes("Moderator")) return "bg-purple-50 text-purple-700 border-purple-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <section id="faculty" className="py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Faculty & Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Speakers, Orators & Chairpersons
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Distinguished clinicians and professors from JIPMER, KAPV Govt Medical College, and Southern Railway healthcare divisions.
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap border ${
                  filterCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, hospital..."
              className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFaculty.map((faculty) => (
            <div
              key={faculty.id}
              className="rounded-xl bg-white border border-slate-200 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Avatar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold font-mono text-xs flex-shrink-0">
                    {faculty.avatarText || <User className="w-4 h-4" />}
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeStyle(faculty.role)}`}>
                    {faculty.role.includes("Orator")
                      ? "★ Orator"
                      : faculty.role.includes("Chair")
                      ? "Chair"
                      : faculty.role.includes("Moderator")
                      ? "Moderator"
                      : "Faculty"}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {faculty.name}
                </h3>

                {/* Designation */}
                <div className="text-xs font-semibold text-blue-700 mt-1">
                  {faculty.designation}
                </div>

                {/* Institution */}
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1 line-clamp-1">
                  <Building className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span>{faculty.institution}</span>
                </div>

                {/* Specialty */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                    Specialty:
                  </span>
                  <div className="text-xs font-medium text-slate-700 mt-0.5">
                    {faculty.specialty}
                  </div>
                </div>
              </div>

              {/* Session / Timing Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mb-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{faculty.sessionDay}</span>
                </div>
                <div className="text-[11px] font-medium text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                  {faculty.topics[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No faculty members found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}
