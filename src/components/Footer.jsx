import React from "react";
import { Stethoscope, Calendar, MapPin, Mail, Phone, ArrowUp, Download } from "lucide-react";
import { downloadFullConferenceICS } from "../utils/icsGenerator";

export default function Footer({ onOpenPocketSchedule }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs relative z-10">
      {/* Callout Pre-Footer Banner (Inspired by Latch reference bottom banner) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-12 text-white shadow-xl shadow-blue-500/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle decorative background pattern */}
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold tracking-wide uppercase mb-3 backdrop-blur-xs">
              <Calendar className="w-3.5 h-3.5" />
              19th & 20th September 2026 • Tiruchirappalli
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-white mb-2">
              Ready for RAILMED TPJ CME 2026?
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Join senior railway medical officers, specialists, and academic professors at Golden Rock, Trichy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 flex-shrink-0">
            <button
              onClick={onOpenPocketSchedule}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Pocket Timetable</span>
            </button>

            <button
              onClick={() => downloadFullConferenceICS()}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-700/80 hover:bg-blue-800 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar (.ics)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight font-sans">
                RAILMED TPJ <span className="text-blue-600">2026</span>
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-xs">
              Annual Continuing Medical Education Conclave under the aegis of <strong className="text-slate-700 font-semibold">Indian Railway Medical Service Association (Southern Railway)</strong>.
            </p>
          </div>

          {/* Col 2: Scientific Sections */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-mono mb-3.5">
              Scientific Program
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="#schedule" className="hover:text-blue-600 transition-colors">
                  2-Day Program Agenda
                </a>
              </li>
              <li>
                <a href="#orations" className="hover:text-blue-600 transition-colors">
                  Memorial Orations (Sai Dhandapani & Rahulan)
                </a>
              </li>
              <li>
                <a href="#panels" className="hover:text-blue-600 transition-colors">
                  Cancer & Diabetes Panels
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-blue-600 transition-colors">
                  Faculty & Chairpersons
                </a>
              </li>
              <li>
                <a href="#symposia" className="hover:text-blue-600 transition-colors">
                  Industry Symposia
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Host Venue */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-mono mb-3.5">
              Conference Venue
            </h4>
            <div className="space-y-2.5 text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  Cauvery Meeting Hall, Divisional Railway Hospital, Golden Rock (GOC), Tiruchirappalli, Tamil Nadu - 620004
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>railmed.tpj2026@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Helpline */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs font-mono mb-3.5">
              Delegates Helpdesk
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">+91 94868 00000</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Hospital Reception: 0431-2460555
              </p>
              <p className="text-slate-500 text-[11px]">
                Transit & Accommodation support available at TPJ Junction.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 RAILMED TPJ CME • Southern Railway Health Services. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
