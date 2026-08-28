import React from "react";
import { Stethoscope, Calendar, MapPin, Mail, Phone, ArrowUp, Download, Sparkles, ShieldCheck } from "lucide-react";

export default function Footer({ onNavigate, onOpenPocketSchedule }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contacts" className="bg-[#020713] border-t border-amber-500/30 text-slate-300 text-xs relative z-10">
      
      {/* Callout Pre-Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a1f4a] via-[#102c6b] to-[#0a1f4a] border-2 border-amber-500/50 p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-3 font-cinzel border border-amber-500/30">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              19th & 20th September 2026 • Tiruchirappalli
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white mb-2 tracking-tight text-gold-light">
              Join Us at RAILMED TPJ CME 2026
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Connect with senior railway medical officers, specialist faculty from JIPMER, and premier healthcare researchers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 flex-shrink-0">
            <button
              onClick={() => onNavigate("invitation")}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Official Invitation</span>
            </button>

            <button
              onClick={onOpenPocketSchedule}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Pocket Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Ground Truth */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#030917] flex items-center justify-center text-amber-400">
                  <Stethoscope className="w-4 h-4" />
                </div>
              </div>
              <span className="font-black text-base text-white tracking-wide font-cinzel">
                RAILMED <span className="text-gold-gradient font-black">TPJ 2026</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Annual Continuing Medical Education Conclave under the aegis of <strong className="text-amber-200">Southern Railway Medical Department</strong> and Indian Railway Medical Service Association.
            </p>

            <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>TNMC 4 Credit Hours Accredited</span>
            </div>
          </div>

          {/* Col 2: Multi-Page Links */}
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs font-cinzel mb-3.5">
              Conclave Pages
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => onNavigate("overview")} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Overview & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("schedule")} className="hover:text-amber-300 transition-colors cursor-pointer">
                  2-Day Scientific Schedule (22 Sessions)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("orations")} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Memorial Orations & Clinical Panels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("faculty")} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Faculty Directory & Symposia
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("venue")} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Venue & Trichy Travel Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("invitation")} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Official Invitation Card
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Leadership Roster */}
          <div>
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs font-cinzel mb-3.5">
              Organising Leadership
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div>
                <div className="font-bold text-white font-cinzel">Dr. S. Kalyani</div>
                <div className="text-[11px] text-amber-400">Principal Chief Medical Director / SR (Patron)</div>
              </div>
              <div>
                <div className="font-bold text-white font-cinzel">Dr. Vijayalakshmi R. Natarajan</div>
                <div className="text-[11px] text-slate-400">CMS / TPJ (Organising Chairman)</div>
              </div>
              <div>
                <div className="font-bold text-white font-cinzel">Shri K M Sathiyia Rathan</div>
                <div className="text-[11px] text-slate-400">ADRM / TPJ (Organising Vice Chairman)</div>
              </div>
            </div>
          </div>

          {/* Col 4: Official Helpdesk & Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs font-cinzel mb-3.5">
              Secretariat & Helpdesk
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Cauvery Meeting Hall, DRM Campus, Golden Rock, Tiruchirappalli – 620004</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:railmed.tpj2026@gmail.com" className="hover:text-amber-300 text-white font-medium">
                  railmed.tpj2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+91 94868 00000 | 0431-2460555</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            © 2026 Southern Railway Medical Department. All Rights Reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
}
