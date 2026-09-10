import React, { useState } from "react";
import { 
  Download, ExternalLink, ShieldCheck, Check, Copy, 
  FileText, Calendar, Building2, MapPin, CheckCircle2, ArrowLeft 
} from "lucide-react";
import { dignitariesData } from "../data/dignitariesData";

export default function CertificatePage({ onNavigate }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const { accreditation } = dignitariesData;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accreditation.certificateNo || "C11181666");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb / Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate && onNavigate("overview")}
          className="inline-flex items-center gap-2 text-xs font-bold font-cinzel text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Officially Accredited & Awarded</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider font-cinzel">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tamil Nadu Medical Council (TNMC)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
          CME Accreditation <span className="text-gold-gradient">Certificate</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Official Continuing Medical Education Certificate awarded by the Tamil Nadu Medical Council to <strong className="text-white">RAILMED TPJ 2026</strong>.
        </p>
      </div>

      {/* Main Download & Action Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#06241d] via-[#041d24] to-[#041624] border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-cinzel">
              Certificate Number:
            </span>
            <span className="font-mono font-black text-amber-300 text-base bg-slate-900/90 px-3 py-0.5 rounded-lg border border-amber-500/40 shadow-inner">
              {accreditation.certificateNo}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
              title="Copy Certificate Code"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
            4 TNMC Credit Hours Awarded
          </h2>
          
          <p className="text-xs text-slate-300">
            {accreditation.speakerBonus}
          </p>
          <p className="text-xs text-emerald-400/90 font-medium">
            Awarded on {accreditation.awardedDate} • Issued by {accreditation.registrar}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* PRIMARY DOWNLOAD BUTTON */}
          <a
            href={accreditation.pdfUrl}
            download="TNMC_CME_Certificate_RAILMED_TPJ_2026.pdf"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 font-cinzel"
          >
            <Download className="w-5 h-5 text-slate-950" />
            <span>Download Official PDF</span>
          </a>

          {/* VERIFICATION PORTAL LINK */}
          <a
            href={accreditation.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#040e24] hover:bg-slate-800 text-amber-300 border border-amber-500/50 text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-cinzel"
          >
            <span>Verify on TNMC Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Metadata Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#040e24] border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 font-cinzel uppercase">Event</div>
          <div className="text-sm font-bold text-white mt-1 font-cinzel">RAILMED TPJ 2026</div>
          <div className="text-[11px] text-slate-400 mt-0.5">19 & 20 September 2026</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#040e24] border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 font-cinzel uppercase">Award Date</div>
          <div className="text-sm font-bold text-amber-300 mt-1 font-mono">{accreditation.awardedDate}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Accreditation Conferred</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#040e24] border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 font-cinzel uppercase">Conducted By</div>
          <div className="text-sm font-bold text-emerald-300 mt-1 truncate">Southern Railway</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Railway Hospitals</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#040e24] border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 font-cinzel uppercase">Registrar</div>
          <div className="text-sm font-bold text-white mt-1 truncate">Dr. A. Senthil Vadivu</div>
          <div className="text-[11px] text-slate-400 mt-0.5">REGISTRAR, TNMC</div>
        </div>
      </div>

      {/* High-Res Certificate Visual */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Official Certificate Document (High Resolution)</span>
          </span>
          <a
            href={accreditation.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <span>Open PDF in Full Screen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 p-3 sm:p-6 shadow-2xl flex flex-col items-center">
          <img
            src={accreditation.previewUrl}
            alt="Official Tamil Nadu Medical Council Continuing Medical Education Certificate - RAILMED TPJ 2026"
            className="w-full max-w-3xl h-auto rounded-xl shadow-2xl border border-slate-800"
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={accreditation.pdfUrl}
              download="TNMC_CME_Certificate_RAILMED_TPJ_2026.pdf"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer font-cinzel"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Certificate</span>
            </a>

            <a
              href={accreditation.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-amber-300 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer font-cinzel"
            >
              <span>Verify Online via QR Code / URL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Official TNMC Statutory Notice */}
      <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold font-cinzel">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Tamil Nadu Medical Council Regulatory Compliance</span>
        </div>
        <p className="leading-relaxed">
          {accreditation.complianceNote}
        </p>
        <div className="pt-2 border-t border-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400">
          <span>{accreditation.councilAddress}</span>
          <a href={accreditation.councilWebsite} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            {accreditation.councilWebsite}
          </a>
        </div>
      </div>

    </div>
  );
}
