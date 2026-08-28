import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickStats from "./components/QuickStats";
import DignitariesShowcase from "./components/DignitariesShowcase";
import OrationsSpotlight from "./components/OrationsSpotlight";
import PanelSpotlight from "./components/PanelSpotlight";
import ScheduleExplorer from "./components/ScheduleExplorer";
import FacultyDirectory from "./components/FacultyDirectory";
import IndustrySymposia from "./components/IndustrySymposia";
import VenueGuide from "./components/VenueGuide";
import InvitationCard from "./components/InvitationCard";
import PocketScheduleModal from "./components/PocketScheduleModal";
import PageNavigator from "./components/PageNavigator";
import Footer from "./components/Footer";
import BackgroundOrbs from "./components/BackgroundOrbs";

export default function App() {
  // Page Router: "overview", "schedule", "orations", "faculty", "venue", "invitation"
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (["overview", "schedule", "orations", "faculty", "venue", "invitation"].includes(hash)) {
      return hash;
    }
    return "overview";
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
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (["overview", "schedule", "orations", "faculty", "venue", "invitation"].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("railmed_saved_sessions", JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
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
        onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
        savedCount={bookmarkedIds.length}
        onSelectSavedTab={handleSelectSavedTab}
      />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        {/* PAGE 1: OVERVIEW & LEADERSHIP */}
        {currentPage === "overview" && (
          <div className="animate-in fade-in duration-300">
            <Hero
              onNavigate={navigateTo}
              onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
            />
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
              onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
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
              <InvitationCard />
            </div>
            <PageNavigator
              prevPage="venue"
              prevLabel="Venue & Travel"
              nextPage="overview"
              nextLabel="Return to Overview"
              onNavigate={navigateTo}
            />
          </div>
        )}
      </main>

      {/* Royal Footer with Multi-Page Navigation */}
      <Footer
        onNavigate={navigateTo}
        onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
      />

      {/* High-Res Printable Pocket Timetable Modal */}
      <PocketScheduleModal
        isOpen={isPocketModalOpen}
        onClose={() => setIsPocketModalOpen(false)}
      />
    </div>
  );
}
