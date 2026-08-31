import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Pause,
  Grid,
  ExternalLink,
  Download,
  X,
  Sparkles,
  Camera,
  Image as ImageIcon,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Search
} from "lucide-react";
import { galleryPhotos, GOOGLE_PHOTOS_ALBUM_URL } from "../data/galleryPhotos";
import { playChime, playBookmarkPop } from "../utils/soundEffects";

export default function PhotoGallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [gridSearch, setGridSearch] = useState("");
  const [gridPage, setGridPage] = useState(1);
  const photosPerPage = 36;

  const progressIntervalRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const activeThumbRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const totalPhotos = galleryPhotos.length;
  const currentPhoto = galleryPhotos[currentIndex] || galleryPhotos[0];

  // Helper for responsive Google Photos URLs with standard parameter
  const getSizedUrl = (baseUrl, size = "w1200") => {
    return `${baseUrl}=${size}`;
  };

  // Next / Previous Navigation with wraparound
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
    setProgress(0);
  }, [totalPhotos]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
    setProgress(0);
  }, [totalPhotos]);

  const selectPhoto = (index) => {
    if (index === currentIndex) return;
    playBookmarkPop();
    setCurrentIndex(index);
    setProgress(0);
  };

  // Preload adjacent images safely with no-referrer
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % totalPhotos;
    const prevIdx = (currentIndex - 1 + totalPhotos) % totalPhotos;

    [nextIdx, prevIdx].forEach((idx) => {
      if (galleryPhotos[idx]) {
        const img = new Image();
        img.referrerPolicy = "no-referrer";
        img.src = getSizedUrl(galleryPhotos[idx].baseUrl, "w1200");
      }
    });
  }, [currentIndex, totalPhotos]);

  // Autoplay timer effect
  useEffect(() => {
    if (isPlaying && !isLightboxOpen && !isGridOpen) {
      const stepTime = 50; // ms
      const totalDuration = 4500; // 4.5 seconds per slide
      const stepIncrement = (stepTime / totalDuration) * 100;

      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNext();
            return 0;
          }
          return prev + stepIncrement;
        });
      }, stepTime);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isLightboxOpen, isGridOpen, goToNext]);

  // ISOLATED HORIZONTAL SCROLL: Only scrolls the thumbnail strip container, NEVER the window/page
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    const thumb = activeThumbRef.current;
    if (container && thumb) {
      const scrollLeft = thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGridOpen) {
        if (e.key === "Escape") setIsGridOpen(false);
        return;
      }

      if (isLightboxOpen) {
        if (e.key === "Escape") {
          setIsLightboxOpen(false);
          setZoomLevel(1);
        } else if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "ArrowLeft") {
          goToPrev();
        } else if (e.key === "+" || e.key === "=") {
          setZoomLevel((z) => Math.min(z + 0.25, 3));
        } else if (e.key === "-") {
          setZoomLevel((z) => Math.max(z - 0.25, 1));
        } else if (e.key === "0") {
          setZoomLevel(1);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === " " && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, isGridOpen, goToNext, goToPrev]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Filtered photos for Grid View Modal
  const filteredGridPhotos = galleryPhotos.filter((_, idx) => {
    if (!gridSearch.trim()) return true;
    const num = parseInt(gridSearch.trim(), 10);
    if (!isNaN(num)) {
      return idx + 1 === num;
    }
    return true;
  });

  const totalGridPages = Math.ceil(filteredGridPhotos.length / photosPerPage);
  const currentGridPhotos = filteredGridPhotos.slice(
    (gridPage - 1) * photosPerPage,
    gridPage * photosPerPage
  );

  return (
    <section id="gallery-section" className="relative py-12 sm:py-20 lg:py-24 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-amber-600/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-600/20 border border-amber-400/30 mb-2.5 sm:mb-3 shadow-md">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 font-cinzel tracking-wider uppercase">
                Conclave Moments • Official Photo Archive
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight leading-tight">
              Moments & Conclave <span className="text-gold-gradient">Glimpses</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mt-1.5 font-medium leading-relaxed">
              Official photographic archive capturing the medical leadership, clinical deliberations, hospital legacy, and commemorative gatherings of RAILMED TPJ.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-2 sm:gap-3 self-start md:self-end flex-wrap">
            <button
              onClick={() => {
                playChime();
                setIsGridOpen(true);
              }}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0a1b3f] hover:bg-[#112a63] border border-amber-400/40 text-amber-200 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer group active:scale-95"
            >
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Browse All {totalPhotos} Photos</span>
            </button>

            <a
              href={GOOGLE_PHOTOS_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer group active:scale-95"
            >
              <span>Google Photos Album</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Master Photo Slider Main Showcase */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#06132e] to-[#030917] border border-amber-500/40 sm:border-2 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Main Stage Frame with Fixed Responsive Heights */}
          <div
            className="relative h-[280px] sm:h-[420px] md:h-[500px] lg:h-[560px] w-full overflow-hidden bg-[#020612] cursor-pointer group select-none flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              playChime();
              setIsLightboxOpen(true);
            }}
          >
            {/* Active Display Image */}
            <img
              key={currentPhoto.id}
              src={getSizedUrl(currentPhoto.baseUrl, "w1200")}
              alt={`RAILMED TPJ CME 2026 Conclave Moment ${currentIndex + 1}`}
              className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-500 ease-out transform group-hover:scale-[1.01]"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (!e.target.src.endsWith("=s0")) {
                  e.target.src = `${currentPhoto.baseUrl}=s0`;
                }
              }}
            />

            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030917] via-transparent to-black/30 pointer-events-none opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none opacity-60" />

            {/* Top Bar Floating Badges */}
            <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between pointer-events-auto">
              {/* Photo Index Counter */}
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#030917]/90 backdrop-blur-md border border-amber-500/40 shadow-lg text-[11px] sm:text-xs font-mono font-bold text-amber-300">
                <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                <span>Photo {currentIndex + 1} of {totalPhotos}</span>
              </div>

              {/* Controls: Autoplay Toggle & Zoom CTA */}
              <div className="flex items-center gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#030917]/90 hover:bg-[#091b40] backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md active:scale-95"
                  title={isPlaying ? "Pause Autoplay" : "Start Autoplay"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    playChime();
                    setIsLightboxOpen(true);
                  }}
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-lg shadow-amber-500/30 active:scale-95"
                  title="Expand to Fullscreen Lightbox"
                >
                  <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Bottom Floating Info Pill */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between pointer-events-auto gap-2">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#040d21]/90 backdrop-blur-md border border-amber-500/30 text-xs max-w-md shadow-xl">
                <div className="flex items-center gap-1.5 sm:gap-2 text-amber-300 font-cinzel font-bold text-[11px] sm:text-xs">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">Divisional Medical Conclave Gallery</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 hidden sm:block">
                  Swipe or click arrows to browse • Click on image to zoom full screen.
                </p>
              </div>

              {/* Quick Jump to Grid */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playChime();
                  setIsGridOpen(true);
                }}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#030917]/90 hover:bg-[#091b40] backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md active:scale-95 flex-shrink-0"
              >
                <Grid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>
            </div>

            {/* Stage Left / Right Navigation Overlay Buttons */}
            <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={goToPrev}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#030917]/85 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/40 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-90 cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="absolute inset-y-0 right-2 sm:right-3 flex items-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={goToNext}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#030917]/85 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/40 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-90 cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Autoplay Linear Progress Bar */}
          {isPlaying && (
            <div className="h-1 w-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Filmstrip Thumbnail Carousel */}
          <div className="p-2.5 sm:p-4 bg-[#030a1b]/95 border-t border-amber-500/20">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2 px-1 text-[10px] sm:text-[11px] text-slate-400">
              <span className="font-medium">Thumbnail Quick Filmstrip ({totalPhotos} Photos)</span>
              <span className="font-mono text-amber-400 hidden sm:inline">Use ← → arrow keys to browse</span>
            </div>

            <div
              ref={thumbnailContainerRef}
              className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-1.5 sm:py-2 px-1 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent select-none"
            >
              {galleryPhotos.map((photo, idx) => {
                const isActive = idx === currentIndex;
                const isNear = Math.abs(idx - currentIndex) <= 5;

                return (
                  <button
                    key={photo.id}
                    ref={isActive ? activeThumbRef : null}
                    onClick={() => selectPhoto(idx)}
                    className={`relative flex-shrink-0 w-16 sm:w-28 h-12 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-[#030917] scale-105 shadow-lg shadow-amber-500/30 z-10"
                        : "opacity-50 hover:opacity-100 bg-[#06122c]"
                    }`}
                  >
                    {isNear ? (
                      <img
                        src={getSizedUrl(photo.baseUrl, "w200-h140-c")}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#071536] text-[9px] sm:text-[10px] text-slate-400 font-mono">
                        #{idx + 1}
                      </div>
                    )}
                    <div className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/75 text-[8px] sm:text-[9px] font-mono font-bold text-amber-300">
                      {idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => {
            setIsLightboxOpen(false);
            setZoomLevel(1);
          }}
        >
          {/* Lightbox Top Control Bar */}
          <div
            className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-amber-500/30 bg-[#040d21]/90 backdrop-blur-xl z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-[11px] sm:text-xs font-bold">
                {currentIndex + 1}
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white font-cinzel block truncate max-w-[150px] sm:max-w-none">
                  RAILMED TPJ 2026 Archive
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                  Photo {currentIndex + 1} of {totalPhotos}
                </span>
              </div>
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
                disabled={zoomLevel <= 1}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <span className="text-[11px] sm:text-xs font-mono text-amber-400 font-bold px-1">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                disabled={zoomLevel >= 3}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <a
                href={getSizedUrl(currentPhoto.baseUrl, "d")}
                target="_blank"
                rel="noopener noreferrer"
                download={`RAILMED_TPJ_Photo_${currentIndex + 1}.jpg`}
                className="p-1.5 sm:p-2 rounded-xl bg-[#0a1f4d] border border-amber-500/40 text-amber-300 hover:text-white cursor-pointer"
                title="Download High-Resolution Image"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>

              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 hover:text-white cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Viewport */}
          <div
            className="relative flex-grow flex items-center justify-center p-2 sm:p-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={getSizedUrl(currentPhoto.baseUrl, "w1800")}
              alt={`RAILMED TPJ High-Res Photo ${currentIndex + 1}`}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[75vh] sm:max-h-[82vh] max-w-[95vw] object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-transform duration-200 select-none"
              referrerPolicy="no-referrer"
              decoding="async"
            />

            {/* Lightbox Floating Arrows */}
            <button
              onClick={goToPrev}
              className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#040d21]/80 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/40 backdrop-blur-md flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-90 cursor-pointer z-30"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#040d21]/80 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/40 backdrop-blur-md flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-90 cursor-pointer z-30"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Quick Filmstrip */}
          <div
            className="py-2 sm:py-3 px-3 sm:px-4 bg-[#030917]/90 border-t border-amber-500/20 flex items-center justify-center z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-4xl py-1 px-1 scrollbar-thin">
              {galleryPhotos.map((p, idx) => {
                const isNear = Math.abs(idx - currentIndex) <= 10;
                return (
                  <button
                    key={p.id}
                    onClick={() => selectPhoto(idx)}
                    className={`relative flex-shrink-0 w-10 sm:w-14 aspect-[4/3] rounded-md sm:rounded-lg overflow-hidden transition-all cursor-pointer ${
                      idx === currentIndex
                        ? "ring-2 ring-amber-400 scale-110 shadow-md shadow-amber-500/30"
                        : "opacity-40 hover:opacity-100 bg-[#071536]"
                    }`}
                  >
                    {isNear ? (
                      <img
                        src={getSizedUrl(p.baseUrl, "w120-h90-c")}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] text-slate-500 font-mono">
                        #{idx + 1}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE ALL 300 PHOTOS GRID MODAL */}
      {isGridOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setIsGridOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-[#040e24] border-2 border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-6 border-b border-amber-500/30 bg-[#061433] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <h3 className="text-lg sm:text-2xl font-black font-cinzel text-white">
                    Official Photo Gallery <span className="text-gold-gradient">({totalPhotos} Photos)</span>
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 sm:mt-1">
                  Click any photo to open in high-definition lightbox viewer.
                </p>
              </div>

              {/* Search / Jump to Photo # & Close */}
              <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max={totalPhotos}
                    placeholder="Jump to #..."
                    value={gridSearch}
                    onChange={(e) => {
                      setGridSearch(e.target.value);
                      setGridPage(1);
                    }}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 w-28 sm:w-32"
                  />
                </div>

                <button
                  onClick={() => setIsGridOpen(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Modal Photo Grid Body */}
            <div className="flex-grow overflow-y-auto p-3 sm:p-6 scrollbar-thin scrollbar-thumb-amber-500/30">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                {currentGridPhotos.map((photo, i) => {
                  const globalIdx = (gridPage - 1) * photosPerPage + i;
                  return (
                    <button
                      key={photo.id}
                      onClick={() => {
                        setCurrentIndex(globalIdx);
                        setIsGridOpen(false);
                        setIsLightboxOpen(true);
                      }}
                      className="group relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden border border-amber-500/20 hover:border-amber-400 bg-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 cursor-pointer text-left"
                    >
                      <img
                        src={getSizedUrl(photo.baseUrl, "w360-h270-c")}
                        alt={`Photo ${globalIdx + 1}`}
                        className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5 sm:p-2">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-300">
                          #{globalIdx + 1} • Click to Zoom
                        </span>
                      </div>
                      <div className="absolute top-1 left-1 px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded bg-black/70 text-[8px] sm:text-[9px] font-mono font-bold text-slate-200">
                        {globalIdx + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Pagination Footer */}
            {totalGridPages > 1 && (
              <div className="p-3 sm:p-4 border-t border-amber-500/30 bg-[#061433] flex items-center justify-between">
                <span className="text-[11px] sm:text-xs text-slate-300 font-mono">
                  Showing {(gridPage - 1) * photosPerPage + 1}–{Math.min(gridPage * photosPerPage, filteredGridPhotos.length)} of {filteredGridPhotos.length}
                </span>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={() => setGridPage((p) => Math.max(p - 1, 1))}
                    disabled={gridPage === 1}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] sm:text-xs font-bold text-slate-200 disabled:opacity-30 cursor-pointer"
                  >
                    Prev
                  </button>

                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono font-bold text-amber-400">
                    {gridPage} / {totalGridPages}
                  </span>

                  <button
                    onClick={() => setGridPage((p) => Math.min(p + 1, totalGridPages))}
                    disabled={gridPage === totalGridPages}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] sm:text-xs font-bold text-slate-200 disabled:opacity-30 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
