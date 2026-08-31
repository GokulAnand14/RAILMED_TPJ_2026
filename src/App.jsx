import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PhotoGallerySlider from "./components/PhotoGallerySlider";
import QuickStats from "./components/QuickStats";
import DignitariesShowcase from "./components/DignitariesShowcase";
import PageNavigator from "./components/PageNavigator";
import Footer from "./components/Footer";
import BackgroundOrbs from "./components/BackgroundOrbs";

const OrationsSpotlight = lazy(() => import("./components/OrationsSpotlight"));
const PanelSpotlight = lazy(() => import("./components/PanelSpotlight"));
const ScheduleExplorer = lazy(() => import("./components/ScheduleExplorer"));
const FacultyDirectory = lazy(() => import("./components/FacultyDirectory"));
const IndustrySymposia = lazy(() => import("./components/IndustrySymposia"));
const VenueGuide = lazy(() => import("./components/VenueGuide"));
const InvitationCard = lazy(() => import("./components/InvitationCard"));
const PocketScheduleModal = lazy(() => import("./components/PocketScheduleModal"));
const PocketSchedulePage = lazy(() => import("./components/PocketSchedulePage"));
const LearningResources = lazy(() => import("./components/LearningResources"));

// Loading fallback for lazy components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-32">
    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-400 rounded-full animate-spin"></div>
  </div>
);

const resolveRoute = (rawHash) => {
  const hash = rawHash.replace("#", "").toLowerCase().trim();
  if (hash === "gallery") return "overview";
  if (hash === "timetable" || hash === "pocket-schedule" || hash === "pocket-timetable") {
    return "timetable";
  }
  if (hash === "resources" || hash === "learning" || hash === "learning-resources" || hash === "ppts") {
    return "resources";
  }
  if (["overview", "schedule", "orations", "faculty", "venue", "invitation", "timetable", "resources"].includes(hash)) {
    return hash;
  }
  return "overview";
};

export default function App() {
  // Page Router: "overview", "schedule", "orations", "faculty", "venue", "invitation", "timetable", "resources"
  const [currentPage, setCurrentPage] = useState(() => {
    return resolveRoute(window.location.hash);
  });

  const [activeDayTab, setActiveDayTab] = useState("all");
  const [isPocketModalOpen, setIsPocketModalOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("railmed_saved_sessions");
      return saved ? JSON.parse(saved) : ["d1-s3", "d2-s7"];
    } catch {
      return ["d1-s3", "d2-s7"];
    }
  });

  // Sync hash with browser history
  useEffect(() => {
    const handleHashChange = () => {
      const resolved = resolveRoute(window.location.hash);
      setCurrentPage(resolved);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update document title based on route
  useEffect(() => {
    if (currentPage === "timetable") {
      document.title = "RAILMED TPJ CME 2026 • Pocket Timetable";
    } else if (currentPage === "invitation") {
      document.title = "RAILMED TPJ CME 2026 • Official Invitation";
    } else if (currentPage === "schedule") {
      document.title = "RAILMED TPJ CME 2026 • Scientific Schedule";
    } else if (currentPage === "resources") {
      document.title = "RAILMED TPJ CME 2026 • Learning Resources & PPTs";
    } else {
      document.title = "RAILMED TPJ CME 2026 • Southern Railway Medical Conclave";
    }
  }, [currentPage]);

  useEffect(() => {
    try {
      localStorage.setItem("railmed_saved_sessions", JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const navigateTo = (pageId) => {
    if (pageId === "gallery") {
      setCurrentPage("overview");
      window.location.hash = "gallery";
      setTimeout(() => {
        const el = document.getElementById("gallery-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    const target = resolveRoute(pageId);
    setCurrentPage(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectSavedTab = () => {
    setActiveDayTab("saved");
    navigateTo("schedule");
  };

  return (
    <div className="relative min-h-screen bg-[#030917] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col overflow-x-hidden">
      {/* Dynamic Golden Atmosphere Orbs */}
      <BackgroundOrbs />

      {/* Multi-Page Glassmorphic Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenPocketSchedule={() => navigateTo("timetable")}
        savedCount={bookmarkedIds.length}
        onSelectSavedTab={handleSelectSavedTab}
      />

      {/* Main Routed Page Content */}
      <main className="flex-grow relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          {/* PAGE 1: OVERVIEW & LEADERSHIP */}
          {currentPage === "overview" && (
            <div className="animate-in fade-in duration-300">
              <Hero
                onNavigate={navigateTo}
                onOpenPocketSchedule={() => navigateTo("timetable")}
              />
              <PhotoGallerySlider />
              <QuickStats />
              <DignitariesShowcase
                onOpenInvitationModal={() => navigateTo("invitation")}
              />
              <PageNavigator
                nextPage="schedule"
                nextLabel="View Scientific Schedule"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 2: 2-DAY SCIENTIFIC SCHEDULE */}
          {currentPage === "schedule" && (
            <div className="pt-20 sm:pt-24 animate-in fade-in duration-300">
              <ScheduleExplorer
                activeDayTab={activeDayTab}
                setActiveDayTab={setActiveDayTab}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                onOpenPocketSchedule={() => navigateTo("timetable")}
              />
              <PageNavigator
                prevPage="overview"
                prevLabel="Overview"
                nextPage="orations"
                nextLabel="Memorial Orations & Panels"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 3: MEMORIAL ORATIONS & PANELS */}
          {currentPage === "orations" && (
            <div className="pt-20 sm:pt-24 animate-in fade-in duration-300">
              <OrationsSpotlight />
              <PanelSpotlight />
              <PageNavigator
                prevPage="schedule"
                prevLabel="Scientific Schedule"
                nextPage="faculty"
                nextLabel="Faculty & Symposia"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 4: FACULTY & SYMPOSIA */}
          {currentPage === "faculty" && (
            <div className="pt-20 sm:pt-24 animate-in fade-in duration-300">
              <FacultyDirectory />
              <IndustrySymposia />
              <PageNavigator
                prevPage="orations"
                prevLabel="Orations & Panels"
                nextPage="venue"
                nextLabel="Venue & Travel Guide"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 5: VENUE & TRICHY HERITAGE */}
          {currentPage === "venue" && (
            <div className="pt-20 sm:pt-24 animate-in fade-in duration-300">
              <VenueGuide />
              <PageNavigator
                prevPage="faculty"
                prevLabel="Faculty & Symposia"
                nextPage="invitation"
                nextLabel="Official Invitation Card"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 6: OFFICIAL INVITATION */}
          {currentPage === "invitation" && (
            <div className="pt-20 sm:pt-24 animate-in fade-in duration-300">
              <div className="text-center max-w-2xl mx-auto mb-6 px-4">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-cinzel">
                  Official Conclave Invitation
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white mt-1">
                  Executive <span className="text-gold-gradient">Invitation Notice</span>
                </h2>
              </div>
              <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
                <InvitationCard onNavigate={navigateTo} />
              </div>
              <PageNavigator
                prevPage="venue"
                prevLabel="Venue & Travel"
                nextPage="resources"
                nextLabel="Learning Resources (PPTs)"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 7: LEARNING RESOURCES (2025 CNE PRESENTATIONS) */}
          {currentPage === "resources" && (
            <div className="animate-in fade-in duration-300">
              <LearningResources />
              <PageNavigator
                prevPage="invitation"
                prevLabel="Official Invitation"
                nextPage="timetable"
                nextLabel="Pocket Timetable & QR"
                onNavigate={navigateTo}
              />
            </div>
          )}

          {/* PAGE 8: STANDALONE POCKET TIMETABLE URL (#timetable) */}
          {currentPage === "timetable" && (
            <div className="animate-in fade-in duration-300">
              <PocketSchedulePage onNavigate={navigateTo} />
              <PageNavigator
                prevPage="resources"
                prevLabel="Learning Resources"
                nextPage="overview"
                nextLabel="Return to Overview"
                onNavigate={navigateTo}
              />
            </div>
          )}
        </Suspense>
      </main>

      {/* Royal Footer with Multi-Page Navigation */}
      <Footer
        onNavigate={navigateTo}
        onOpenPocketSchedule={() => navigateTo("timetable")}
      />

      {/* High-Res Printable Pocket Timetable Modal (Fallback / Direct opener) */}
      <PocketScheduleModal
        isOpen={isPocketModalOpen}
        onClose={() => setIsPocketModalOpen(false)}
        onOpenFullPage={() => navigateTo("timetable")}
      />
    </div>
  );
}
