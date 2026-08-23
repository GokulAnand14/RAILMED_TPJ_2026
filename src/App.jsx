import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuickStats from "./components/QuickStats";
import OrationsSpotlight from "./components/OrationsSpotlight";
import ScheduleExplorer from "./components/ScheduleExplorer";
import FacultyDirectory from "./components/FacultyDirectory";
import PanelSpotlight from "./components/PanelSpotlight";
import IndustrySymposia from "./components/IndustrySymposia";
import VenueGuide from "./components/VenueGuide";
import PocketScheduleModal from "./components/PocketScheduleModal";
import Footer from "./components/Footer";
import BackgroundOrbs from "./components/BackgroundOrbs";

export default function App() {
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

  useEffect(() => {
    try {
      localStorage.setItem("railmed_saved_sessions", JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExploreSchedule = () => {
    const el = document.getElementById("schedule");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectSavedTab = () => {
    setActiveDayTab("saved");
    handleExploreSchedule();
  };

  return (
    <div className="relative min-h-screen bg-slate-50/40 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col overflow-x-hidden">
      {/* Subtle Background Orbs & Dots */}
      <BackgroundOrbs />

      {/* Floating Minimal Pill Navbar */}
      <Navbar
        onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
        savedCount={bookmarkedIds.length}
        onSelectSavedTab={handleSelectSavedTab}
      />

      {/* Sequential Clean Scrolling Sections */}
      <main className="flex-grow">
        <Hero
          onExploreSchedule={handleExploreSchedule}
          onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
        />

        <QuickStats />

        <OrationsSpotlight />

        <ScheduleExplorer
          activeDayTab={activeDayTab}
          setActiveDayTab={setActiveDayTab}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onOpenPocketSchedule={() => setIsPocketModalOpen(true)}
        />

        <PanelSpotlight />

        <FacultyDirectory />

        <IndustrySymposia />

        <VenueGuide />
      </main>

      {/* Clean White Footer with Pre-Footer Banner */}
      <Footer onOpenPocketSchedule={() => setIsPocketModalOpen(true)} />

      {/* Printable Pocket Schedule Modal */}
      <PocketScheduleModal
        isOpen={isPocketModalOpen}
        onClose={() => setIsPocketModalOpen(false)}
      />
    </div>
  );
}
