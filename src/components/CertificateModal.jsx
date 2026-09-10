import React, { useEffect, useState } from "react";
import { 
  X, Download, ExternalLink, Check, Copy, ShieldCheck, 
  Award, Calendar, Building2, MapPin, CheckCircle2, FileText
} from "lucide-react";
import { dignitariesData } from "../data/dignitariesData";

export default function CertificateModal({ isOpen, onClose }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const { accreditation } = dignitariesData;

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accreditation.certificateNo || "C11181666");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#040e24] border border-amber-500/40 shadow-2xl shadow-black/90 overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#031525] via-[#052438] to-[#031525] border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="certificate-modal-title" className="font-bold text-sm sm:text-base font-cinzel text-white">
                  Tamil Nadu Medical Council (TNMC)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Accredited
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Official Continuing Medical Education Certificate • RAILMED TPJ 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Download & Verification Action Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#06241d] via-[#041d24] to-[#041624] border-2 border-emerald-500/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-cinzel">
                  Accreditation Code:
                </span>
                <span className="font-mono font-black text-amber-300 text-sm bg-slate-900/80 px-2 py-0.5 rounded border border-amber-500/30">
                  {accreditation.certificateNo}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 rounded text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  title="Copy Certificate Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white font-cinzel">
                4 TNMC Credit Hours Awarded
              </h4>
              <p className="text-xs text-slate-300">
                {accreditation.speakerBonus}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-center">
              {/* PRIMARY DOWNLOAD BUTTON */}
              <a
                href={accreditation.pdfUrl}
                download="TNMC_CME_Certificate_RAILMED_TPJ_2026.pdf"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 font-cinzel"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Download PDF Certificate</span>
              </a>

              {/* VERIFY LINK */}
              <a
                href={accreditation.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-cinzel"
              >
                <span>Verify on TNMC</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Certificate Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#020713]/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Awarded On</span>
              <span className="font-bold text-amber-300 font-mono mt-0.5 block">{accreditation.awardedDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#020713]/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Awarded To</span>
              <span className="font-bold text-white mt-0.5 block truncate">RAILMED TPJ 2026</span>
            </div>
            <div className="p-3 rounded-xl bg-[#020713]/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Issuing Authority</span>
              <span className="font-bold text-emerald-300 mt-0.5 block truncate">Dr. A. Senthil Vadivu</span>
              <span className="text-[9px] text-slate-400 block">REGISTRAR, TNMC</span>
            </div>
            <div className="p-3 rounded-xl bg-[#020713]/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">Conducted By</span>
              <span className="font-bold text-amber-200 mt-0.5 block truncate">Southern Railway</span>
              <span className="text-[9px] text-slate-400 block">Railway Hospitals</span>
            </div>
          </div>

          {/* Authentic Certificate Visual Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Certificate Document Preview</span>
              </span>
              <a
                href={accreditation.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold flex items-center gap-1"
              >
                <span>Open in Fullscreen PDF Viewer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-slate-950 shadow-inner flex items-center justify-center p-2 sm:p-4 group">
              <img
                src={accreditation.previewUrl}
                alt="Tamil Nadu Medical Council CME Certificate - RAILMED TPJ 2026"
                className="w-full max-w-2xl h-auto rounded-lg shadow-2xl border border-slate-800 group-hover:scale-[1.01] transition-transform"
                loading="lazy"
              />
            </div>
          </div>

          {/* Council Accreditation Note */}
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-slate-300 space-y-1">
            <div className="font-bold text-amber-300 font-cinzel">
              Tamil Nadu Medical Council Regulatory Note:
            </div>
            <p className="leading-relaxed">
              {accreditation.complianceNote}
            </p>
            <p className="text-[10px] text-slate-400 pt-1">
              Council Office: {accreditation.councilAddress} • Portal: <a href={accreditation.councilWebsite} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">{accreditation.councilWebsite}</a>
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#020713] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Government Recognized Medical Council Credit Certificate</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={accreditation.pdfUrl}
              download="TNMC_CME_Certificate_RAILMED_TPJ_2026.pdf"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer font-cinzel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
