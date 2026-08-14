import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, ImageOff, GraduationCap } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { dummyEvents, dummyPastEvents, dummyWorkshops } from "../data/dummy";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function isPast(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (isNaN(d)) return false;
  return d < new Date(new Date().toDateString());
}

export default function Events() {
  const { data, loading } = useCollection("events", "date", "desc");

  let ongoing, past, workshops;
  if (data.length) {
    workshops = data.filter((e) => e.category === "Workshop");
    ongoing = data.filter((e) => e.category !== "Workshop" && !isPast(e.date));
    past = data.filter((e) => e.category !== "Workshop" && isPast(e.date));
  } else {
    ongoing = dummyEvents;
    past = dummyPastEvents;
    workshops = dummyWorkshops;
  }

  return (
    <div className="section-pad">
      <SectionTag label="Events" />
      <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100 mb-3">Events</h1>
      <p className="text-ink-400 max-w-lg mb-14">
        Workshops, talks, and competitions run by the club — ongoing, upcoming, and past.
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* ONGOING EVENTS */}
          <section className="mb-20">
            <h2 className="font-display font-semibold text-2xl text-ink-100 mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-circuit" /> Ongoing Events
            </h2>
            {ongoing.length === 0 ? (
              <EmptyState title="Nothing ongoing right now" text="Check back soon, or browse past events below." />
            ) : (
              <div className="flex flex-col gap-6">
                {ongoing.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="card overflow-hidden flex flex-col md:flex-row hover:border-circuit/40 transition-colors"
                  >
                    <div className="md:w-[38%] aspect-video md:aspect-auto bg-ink-900 flex items-center justify-center shrink-0">
                      {e.imageUrl ? (
                        <img src={e.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Calendar className="h-8 w-8 text-ink-400/40" />
                      )}
                    </div>
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-3">
                      {e.category && <span className="eyebrow">{e.category}</span>}
                      <h3 className="font-display font-semibold text-xl md:text-2xl text-ink-100">{e.title}</h3>
                      <p className="text-sm text-ink-400 leading-relaxed line-clamp-3">{e.description}</p>
                      <div className="flex flex-wrap gap-5 text-xs text-ink-400 mt-1">
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
                      <Link
                        to={e.id?.startsWith?.("dummy") ? "#" : `/events/${e.id}`}
                        className="btn-primary self-start mt-2 !py-2.5 !px-5 text-sm"
                      >
                        Go to event page <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* PAST EVENTS */}
          <section className="mb-20">
            <h2 className="font-display font-semibold text-2xl text-ink-100 mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-circuit" /> Past Events
            </h2>
            {past.length === 0 ? (
              <EmptyState title="No past events yet" text="Once events wrap up, they'll be archived here." />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {past.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  >
                    <Link
                      to={e.id?.startsWith?.("dp-") || e.id?.startsWith?.("dummy") ? "#" : `/events/${e.id}`}
                      className="group block aspect-[4/3] rounded-xl overflow-hidden border border-ink-400/15 bg-ink-900 relative hover:-translate-y-1 transition-transform"
                    >
                      {e.imageUrl ? (
                        <img src={e.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff className="h-6 w-6 text-ink-400/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent flex items-end p-3">
                        <p className="text-xs font-medium text-ink-100 line-clamp-2">{e.title}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* WORKSHOPS */}
          <section>
            <h2 className="font-display font-semibold text-2xl text-ink-100 mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-circuit" /> Workshops
            </h2>
            {workshops.length === 0 ? (
              <EmptyState title="No workshops posted yet" text="Tag an event as “Workshop” from the admin dashboard to have it show up here." />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.map((w, i) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                    className="card overflow-hidden hover:border-circuit/40 transition-colors"
                  >
                    <div className="aspect-video bg-ink-900 flex items-center justify-center">
                      {w.imageUrl ? (
                        <img src={w.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <GraduationCap className="h-7 w-7 text-ink-400/40" />
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="font-display font-semibold text-ink-100 mb-2">{w.title}</h4>
                      <p className="text-sm text-ink-400 mb-4 line-clamp-3">{w.description}</p>
                      <Link
                        to={w.id?.startsWith?.("dw-") ? "#" : `/events/${w.id}`}
                        className="btn-secondary !py-2 !px-4 text-sm"
                      >
                        View Course
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
