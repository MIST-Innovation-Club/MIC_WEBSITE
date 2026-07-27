import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageOff } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { dummyGallery } from "../data/dummy";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";

export default function Gallery() {
  const { data, loading } = useCollection("gallery");
  const items = data.length ? data : dummyGallery;
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ["All", ...set];
  }, [items]);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="section-pad">
      <SectionTag label="Gallery" />
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100">Gallery</h1>
          <p className="text-ink-400 mt-3 max-w-lg">Moments from workshops, competitions, and club life.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
                filter === c
                  ? "bg-circuit text-ink-950 border-circuit"
                  : "border-ink-400/25 text-ink-400 hover:border-circuit hover:text-circuit"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <EmptyState title="No images yet" text="Photos added from the dashboard will appear here." />
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              onClick={() => img.imageUrl && setLightbox(img)}
              className="block w-full break-inside-avoid rounded-xl overflow-hidden border border-ink-400/15 bg-ink-900 text-left"
            >
              {img.imageUrl ? (
                <img src={img.imageUrl} alt={img.caption || ""} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="aspect-[4/3] flex flex-col items-center justify-center gap-2 text-ink-400/50">
                  <ImageOff className="h-6 w-6" />
                  <span className="text-xs font-mono">{img.caption || "No image"}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-950/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-ink-100 hover:text-circuit" aria-label="Close">
              <X className="h-7 w-7" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={lightbox.imageUrl}
              alt={lightbox.caption || ""}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {lightbox.caption && (
              <p className="absolute bottom-8 text-ink-100 text-sm font-mono">{lightbox.caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
