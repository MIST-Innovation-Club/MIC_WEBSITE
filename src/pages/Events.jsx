import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { dummyEvents } from "../data/dummy";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function Events() {
  const { data, loading } = useCollection("events", "date", "asc");
  const events = data.length ? data : dummyEvents;
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category).filter(Boolean));
    return ["All", ...set];
  }, [events]);

  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="section-pad">
      <SectionTag label="Events" />
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100">Events</h1>
          <p className="text-ink-400 mt-3 max-w-lg">
            Workshops, talks, and competitions run by the club — past, present, and upcoming.
          </p>
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
        <EmptyState title="No events in this category" text="Check back soon, or explore another filter." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            >
              <Link
                to={e.id?.startsWith?.("dummy") ? "#" : `/events/${e.id}`}
                className="card flex flex-col h-full overflow-hidden group hover:border-circuit/40 transition-colors"
              >
                <div className="aspect-video bg-ink-900 flex items-center justify-center overflow-hidden">
                  {e.imageUrl ? (
                    <img src={e.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Calendar className="h-8 w-8 text-ink-400/40" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {e.category && <span className="eyebrow mb-2">{e.category}</span>}
                  <p className="font-display font-semibold text-lg text-ink-100 mb-3 group-hover:text-circuit transition-colors">
                    {e.title}
                  </p>
                  <p className="text-sm text-ink-400 mb-4 line-clamp-3 flex-1">{e.description}</p>
                  <div className="flex flex-col gap-1.5 text-xs text-ink-400 border-t border-ink-400/10 pt-4">
                    {e.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-circuit" /> {formatDate(e.date)}
                        {e.time ? ` · ${e.time}` : ""}
                      </span>
                    )}
                    {e.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-circuit" /> {e.location}
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-light group-hover:gap-2 transition-all">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
