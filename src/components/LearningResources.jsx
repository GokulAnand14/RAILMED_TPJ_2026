import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Download, ExternalLink, Eye, BookOpen, FileText, 
  X, Check, Copy, ArrowUpRight, FolderOpen, Presentation,
  Stethoscope
} from "lucide-react";
import { 
  learningResourcesData, 
  resourceCategories, 
  googleDriveFolderUrl 
} from "../data/learningResourcesData";
import { playChime } from "../utils/soundEffects";

// Presentation Card Component
function ResourceCard({ item, onPreview, onCopy, isCopied }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl flex flex-col overflow-hidden">
      {/* 16:9 Slide Thumbnail Container */}
      <div 
        onClick={() => onPreview(item)}
        className="relative w-full pt-[56.25%] bg-black overflow-hidden cursor-pointer border-b border-amber-500/25 group"
        title="Click to preview slides in interactive lightbox"
      >
        {!imgError ? (
          <img
            src={item.thumbnailUrl}
            alt={`${item.title} slide`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-contain bg-black group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 bg-slate-800 text-center">
            <Presentation className="w-8 h-8 text-amber-400 mb-2" />
            <span className="text-xs font-bold text-amber-200 line-clamp-2 px-2">{item.title}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>Preview Slides</span>
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/80 text-amber-300 border border-amber-500/50">
            {item.format}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-amber-200 border border-amber-500/50 truncate max-w-[150px]">
            {item.category}
          </span>
        </div>
      </div>

      {/* Card Body - Guaranteed visible with fixed background and padding */}
      <div className="p-4 bg-slate-900 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase truncate pr-2">
            {item.session}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            {item.fileSize}
          </span>
        </div>

        <h3 
          onClick={() => onPreview(item)}
          className="text-sm font-bold text-white hover:text-amber-300 transition-colors mb-2 cursor-pointer line-clamp-2"
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="mt-auto pt-3 border-t border-slate-700">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-0.5">
            <Stethoscope className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">{item.speaker}</span>
          </div>
          <div className="text-[11px] text-slate-400 pl-5 truncate">
            {item.division}
          </div>
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="px-4 pb-4 bg-slate-900">
        <div className="pt-3 flex items-center justify-between gap-2">
          <button
            onClick={() => onPreview(item)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <a
            href={item.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>

          <button
            onClick={() => onCopy(item)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Copy Link"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LearningResources() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Auto-scroll to top when page is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredResources = useMemo(() => {
    return learningResourcesData.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.speaker.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.session.toLowerCase().includes(q) ||
        item.division.toLowerCase().includes(q) ||
        item.filename.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyLink = (item) => {
    navigator.clipboard.writeText(item.viewUrl);
    setCopiedId(item.id);
    playChime();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreview = (item) => {
    playChime();
    setPreviewDoc(item);
  };

  return (
    <section id="learning-resources" className="pt-20 sm:pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Streamlined Header */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
              CNE Knowledge Repository • 35 Presentations
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learning <span className="text-gold-gradient font-black">Resources</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
            All 35 official presentation slide decks (PPT/PPTX) delivered during Southern Railway CME conclaves. All files are clickable, previewable, and downloadable.
          </p>

          <div className="mt-3 flex items-center justify-center gap-2">
            <a
              href={googleDriveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Open Google Drive Folder</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-4">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by topic, speaker, category, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
          {resourceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-300 border border-slate-700 hover:border-amber-500/40 hover:text-amber-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-4 px-2">
          <span>
            Showing <strong className="text-amber-400">{filteredResources.length}</strong> presentations
          </span>
          {searchQuery && (
            <span>Matching: <strong className="text-white">"{searchQuery}"</strong></span>
          )}
        </div>

        {/* Presentations Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900 border border-amber-500/30 text-center text-slate-400 space-y-3">
            <BookOpen className="w-12 h-12 text-amber-400/40 mx-auto" />
            <h3 className="text-base font-bold text-white">No Presentations Match Your Search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try adjusting your search query or reset the track filter to see all 35 slide decks.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer hover:bg-amber-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => (
              <ResourceCard
                key={item.id}
                item={item}
                onPreview={handlePreview}
                onCopy={handleCopyLink}
                isCopied={copiedId === item.id}
              />
            ))}
          </div>
        )}

      </div>

      {/* In-App Slide Viewer Lightbox Modal */}
      {previewDoc && (
        <div
          onClick={() => setPreviewDoc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-amber-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Modal Header */}
            <div className="p-3 sm:p-4 border-b border-slate-700 flex items-center justify-between bg-slate-950 gap-3 flex-shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {previewDoc.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-amber-300 truncate">
                    {previewDoc.speaker} • {previewDoc.session} ({previewDoc.fileSize || "PPTX"})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <a
                  href={previewDoc.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition-all cursor-pointer"
                  title="Download PPTX File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <a
                  href={previewDoc.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-colors cursor-pointer"
                  title="Open in Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Drive</span>
                </a>

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Google Drive Iframe Embed */}
            <div className="flex-1 bg-[#0f111a] w-full relative">
              <iframe
                src={previewDoc.previewUrl}
                title={`Preview of ${previewDoc.title}`}
                className="w-full h-full border-none absolute inset-0"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
