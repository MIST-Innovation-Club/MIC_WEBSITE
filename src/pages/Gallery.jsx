import { useMemo, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { dummyGallery, galleryYears } from "../data/dummy";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";
import YearTabs from "../components/YearTabs";
import GalleryCarousel from "../components/GalleryCarousel";

const CURRENT_YEAR = String(new Date().getFullYear());

export default function Gallery() {
  const { data, loading } = useCollection("gallery", "order", "asc");
  const items = data.length ? data : dummyGallery;

  const years = useMemo(() => {
    const set = new Set([...galleryYears, ...items.map((i) => String(i.year || CURRENT_YEAR))]);
    return [...set].sort((a, b) => b - a);
  }, [items]);

  const [year, setYear] = useState(years[0]);
  const groups = useMemo(() => {
    const inYear = items.filter((i) => String(i.year || CURRENT_YEAR) === year);
    const byEvent = {};
    inYear.forEach((img) => {
      const key = img.eventTitle || "Gallery";
      byEvent[key] = byEvent[key] || [];
      byEvent[key].push(img);
    });
    return Object.entries(byEvent);
  }, [items, year]);

  return (
    <div className="py-20 md:py-28">
      <div className="px-6 sm:px-10 lg:px-20">
        <SectionTag label="Gallery" />
        <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100 mb-3">Gallery</h1>
        <p className="text-ink-400 max-w-lg mb-10">Moments from workshops, competitions, and club life.</p>
      </div>

      <YearTabs years={years} active={year} onChange={setYear} />

      {loading ? (
        <LoadingSpinner />
      ) : groups.length === 0 ? (
        <div className="px-6 sm:px-10 lg:px-20">
          <EmptyState title={`No photos for ${year} yet`} text="Coming soon — check back after the next event, or pick another year." />
        </div>
      ) : (
        groups.map(([eventTitle, images]) => (
          <GalleryCarousel key={eventTitle} title={eventTitle} images={images} />
        ))
      )}
    </div>
  );
}
