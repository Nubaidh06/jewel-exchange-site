"use client";
import { useState, useEffect, useMemo } from "react";
import ShowroomNav from "./components/ShowroomNav";
import ShowroomFilters from "./components/ShowroomFilters";
import ShowroomGrid from "./components/ShowroomGrid";
import SwipeGallery from "./components/SwipeGallery";
import ShowroomTray from "./components/ShowroomTray";
import "./showroom.css";

export default function ShowroomClient({ initialItems = [] }) {
  // View Modes
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "gallery"
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [gridDensity, setGridDensity] = useState("standard"); // "standard" | "compact"
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filters
  const [activeCollectionTab, setActiveCollectionTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStone, setActiveStone] = useState("all");
  const [activeMetal, setActiveMetal] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Tray
  const [trayItems, setTrayItems] = useState([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Lock showroom handler: destroys server session cookie and reloads to lock screen
  const handleLock = async () => {
    try {
      await fetch("/api/showroom/auth", { method: "DELETE" });
    } catch (e) {
      console.warn("Error locking showroom session:", e);
    }
    window.location.reload();
  };

  // Load tray from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jewel_exchange_showroom_tray");
      if (saved) setTrayItems(JSON.parse(saved));
    } catch (e) {
      console.warn("Could not load showroom tray:", e);
    }
    setIsMounted(true);
  }, []);

  // Sync tray to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("jewel_exchange_showroom_tray", JSON.stringify(trayItems));
    } catch (e) {
      console.warn("Could not save showroom tray:", e);
    }
  }, [trayItems, isMounted]);

  // Handle Tray Toggle
  const handleToggleTray = (item) => {
    setTrayItems((prev) => {
      const exists = prev.some((t) => t.id === item.id);
      if (exists) {
        return prev.filter((t) => t.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveFromTray = (id) => {
    setTrayItems((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  const isItemInTray = (id) => trayItems.some((t) => t.id === id);

  // Fullscreen Tablet Mode Toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Filter Items
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // 1. Showroom vs Archive Tab
      if (activeCollectionTab === "showroom" && item.isArchive) return false;
      if (activeCollectionTab === "archive" && !item.isArchive) return false;

      // 2. Category
      if (activeCategory !== "all" && item.category !== activeCategory) return false;

      // 3. Gemstone
      if (activeStone !== "all" && item.stone !== activeStone) return false;

      // 4. Metal
      if (activeMetal !== "all" && item.metal !== activeMetal) return false;

      // 5. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const corpus = item.searchCorpus || "";
        if (!corpus.includes(q)) return false;
      }

      return true;
    });
  }, [initialItems, activeCollectionTab, activeCategory, activeStone, activeMetal, searchQuery]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: initialItems.length,
      showroom: initialItems.filter((i) => !i.isArchive).length,
      archive: initialItems.filter((i) => i.isArchive).length,
    };
  }, [initialItems]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeStone !== "all" ||
    activeMetal !== "all" ||
    searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveStone("all");
    setActiveMetal("all");
    setSearchQuery("");
  };

  // Open Gallery at specific item
  const handleOpenGalleryAt = (index) => {
    setActiveGalleryIndex(index);
    setViewMode("gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select item from tray and jump to gallery
  const handleSelectPieceFromTray = (item) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      setActiveGalleryIndex(idx);
    } else {
      // If filtered out, reset category/filters to reveal item
      handleResetFilters();
      const rawIdx = initialItems.findIndex((i) => i.id === item.id);
      setActiveGalleryIndex(rawIdx !== -1 ? rawIdx : 0);
    }
    setViewMode("gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`showroom-shell ${isFullscreen ? "showroom-shell--fullscreen" : ""}`}>
      {/* ── Standalone Showroom Top Bar ── */}
      <ShowroomNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        trayCount={trayItems.length}
        onOpenTray={() => setIsTrayOpen(true)}
        totalItems={initialItems.length}
        filteredItemsCount={filteredItems.length}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
        onLock={handleLock}
      />

      {/* ── VIEW MODE 1: Swipe Gallery (Apple Photos Style) ── */}
      {viewMode === "gallery" ? (
        <SwipeGallery
          items={filteredItems.length > 0 ? filteredItems : initialItems}
          currentIndex={activeGalleryIndex}
          onIndexChange={(idx) => setActiveGalleryIndex(idx)}
          onCloseToGrid={() => setViewMode("grid")}
          isItemInTray={isItemInTray}
          onToggleTray={handleToggleTray}
        />
      ) : (
        /* ── VIEW MODE 2: Grid Overview ── */
        <main className="showroom-main-canvas">
          <ShowroomFilters
            activeCollectionTab={activeCollectionTab}
            setActiveCollectionTab={setActiveCollectionTab}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeStone={activeStone}
            setActiveStone={setActiveStone}
            activeMetal={activeMetal}
            setActiveMetal={setActiveMetal}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            counts={counts}
          />

          <ShowroomGrid
            items={filteredItems}
            gridDensity={gridDensity}
            setGridDensity={setGridDensity}
            onOpenGalleryAt={handleOpenGalleryAt}
            isItemInTray={isItemInTray}
            onToggleTray={handleToggleTray}
          />
        </main>
      )}

      {/* ── Shortlist Tray Modal ── */}
      <ShowroomTray
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        trayItems={trayItems}
        onRemoveFromTray={handleRemoveFromTray}
        onClearTray={handleClearTray}
        onSelectPiece={handleSelectPieceFromTray}
      />
    </div>
  );
}
