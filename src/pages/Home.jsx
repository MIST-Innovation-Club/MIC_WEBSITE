import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowRight,
  Lightbulb,
  GraduationCap,
  Users,
  Wrench,
  Target,
  Heart,
  Users2,
  Calendar,
  Newspaper,
  MapPin,
  ImageOff,
  ExternalLink,
  UserRound,
  Linkedin,
  Mail,
} from "lucide-react";
import SectionTag from "../components/SectionTag";
import EmptyState from "../components/EmptyState";
import StatCounter from "../components/StatCounter";
import { useCollection } from "../hooks/useCollection";
import { pillars, activities, stats, dummyEvents, dummyNews } from "../data/dummy";

const CURRENT_YEAR = String(new Date().getFullYear());
const ICONS = { Lightbulb, GraduationCap, Users, Wrench, Target, Heart, Users2 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Helper function to extract clean URL if an iframe embed code was pasted
const getCleanUrl = (rawLink) => {
  if (!rawLink) return "";
  let link = rawLink.trim();
  
  if (link.includes("<iframe")) {
    const srcMatch = link.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      link = srcMatch[1];
    }
  }

  if (link.includes("facebook.com/plugins/post.php") && link.includes("href=")) {
    try {
      const urlObj = new URL(link);
      const targetHref = urlObj.searchParams.get("href");
      if (targetHref) {
        return decodeURIComponent(targetHref);
      }
    } catch (e) {
      console.error("URL Parsing Error", e);
    }
  }

  return link;
};

export default function Home() {
  const [logoFailed, setLogoFailed] = useState(false);
  const { data: liveEvents, loading: eventsLoading } = useCollection("events", "date", "asc");
  const { data: liveNews, loading: newsLoading } = useCollection("news");
  const { data: liveGallery, loading: galleryLoading } = useCollection("gallery");
  const { data: livePeople, loading: peopleLoading } = useCollection("people", "order", "asc");

  const events = liveEvents.length ? liveEvents.slice(0, 3) : dummyEvents;
  
  // Sort live news posts by date descending (latest first)
  const sortedLiveNews = [...liveNews].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const news = sortedLiveNews.length ? sortedLiveNews : dummyNews;
  
  const featured = liveGallery.length ? liveGallery.slice(0, 6) : [];
  const regulatoryBody = useMemo(() => {
    const all = livePeople.filter((p) => p.panelType === "Regulatory Body");
    if (!all.length) return [];
    const years = [...new Set(all.map((p) => String(p.year || CURRENT_YEAR)))].sort((a, b) => b - a);
    const latestYear = years[0];
    return all.filter((p) => String(p.year || CURRENT_YEAR) === latestYear);
  }, [livePeople]);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden section-pad !pt-16 !pb-24 md:!pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,99,232,0.18),transparent_60%)]" />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="order-2 lg:order-1">
            <motion.p variants={fadeUp} className="eyebrow mb-5">
              MIST // Established Club // Innovate To Serve
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-ink-100"
            >
              Where ideas get <span className="text-gradient">wired</span> into
              reality.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-ink-400 text-lg">
              MIST Innovation Club is a community of builders, thinkers, and problem solvers turning
              curiosity into working prototypes — one workshop, one pitch, one late night at a time.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <Link to="/events" className="btn-primary">
                Explore Events <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/people" className="btn-secondary">
                Meet the Panel
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
              {stats.map((s) => (
                <div key={s.label}>
                  <StatCounter
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-3xl md:text-4xl font-semibold text-ink-100"
                  />
                  <p className="text-xs text-ink-400 mt-1">{s.label}</p>
                </div>
              ))}     
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 relative aspect-square w-full max-w-[260px] sm:max-w-sm lg:max-w-lg mx-auto lg:mr-0 lg:ml-auto"
          >
            <div className="absolute -inset-6 rounded-full bg-brand/10 blur-3xl -z-10" />
            <div className="h-full w-full flex items-center justify-center overflow-hidden p-4">
              {logoFailed ? (
                <div className="flex flex-col items-center gap-2 text-ink-400 text-center">
                  <ImageOff className="h-8 w-8 text-ink-400/50" />
                  <span className="font-mono text-xs text-circuit">/public/mic-logo.png</span>
                  <span className="text-sm">Add your logo file here to replace this placeholder.</span>
                </div>
              ) : (
                <img
                  src="/mic-logo.png"
                  alt="MIST Innovation Club logo"
                  className="w-full h-full object-contain"
                  onError={() => setLogoFailed(true)}
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT / PILLARS */}
      <section id="about" className="section-pad !pt-0">
        <SectionTag label="About" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card p-8 md:p-10"
        >
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center">
            {/* LEFT: Quote */}
            <div>
              <p className="font-display text-2xl text-ink-100 leading-snug mb-4">
                "Innovation is seeing what everybody has seen and thinking what nobody has thought."
              </p>
              <p className="text-sm text-ink-400">— Dr. Albert Szent-Györgyi</p>
            </div>

            {/* RIGHT: Pillars */}
            <div className="grid sm:grid-cols-3 gap-5">
              {pillars.map((p, i) => {
                const Icon = ICONS[p.icon];
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-xl border border-ink-400/15 bg-ink-900/50 p-6 hover:border-circuit/40 transition-colors"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/15 text-brand-light mb-4">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-display font-semibold text-ink-100 mb-2">{p.title}</p>
                    <p className="text-sm text-ink-400 leading-relaxed">{p.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities" className="section-pad !pt-0">
        <SectionTag label="Activities" />
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center card p-8 md:p-12 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-circuit/10 blur-3xl" />
          <div>
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-100 mb-4">
              Our Activities
            </h2>
            <p className="text-ink-400 leading-relaxed">
              MIC offers a dynamic blend of activities designed to help people achieve hands-on
              experience with modern tech, development and research. We also offer a range of
              workshops, sessions, and competitions designed to prepare students for real-world
              innovation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {activities.map((a) => {
              const Icon = ICONS[a.icon] || Wrench;
              return (
                <div key={a.title} className="rounded-xl border border-ink-400/15 p-5 hover:border-circuit/40 transition-colors">
                  <Icon className="h-5 w-5 text-circuit mb-3" />
                  <p className="font-semibold text-ink-100 text-sm mb-1">{a.title}</p>
                  <p className="text-xs text-ink-400 leading-relaxed">{a.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED CAROUSEL */}
      {(featured.length > 0 || galleryLoading) && (
        <section id="featured" className="section-pad !pt-0">
          <SectionTag label="Featured" />
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-100 mb-8">Featured</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={featured.length > 1}
            className="mic-swiper max-w-2xl mx-auto rounded-2xl overflow-hidden border border-ink-400/15"
          >
            {featured.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="aspect-video w-full bg-ink-900 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.caption || ""} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-ink-400 text-sm font-mono">No image</span>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* EVENTS + NEWS */}
      <section id="events-news" className="section-pad !pt-0">
        <SectionTag label="Events & News" />
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* EVENTS SECTION */}
          <div className="card p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-circuit" />
              <h3 className="font-display font-semibold text-2xl text-ink-100">Events</h3>
            </div>

            <div className="flex-1 relative overflow-hidden h-80 group">
              {eventsLoading ? (
                <p className="text-ink-400 text-sm py-4">Loading…</p>
              ) : events.length ? (
                <div className="autoscroll-track divide-y divide-ink-400/10 group-hover:[animation-play-state:paused]">
                  {[...events, ...events].map((e, i) => (
                    <Link
                      to={e.id?.startsWith("dummy") ? "/events" : `/events/${e.id}`}
                      key={`${e.id}-${i}`}
                      className="flex gap-4 py-4 group/item"
                    >
                      <span className="font-mono text-circuit text-lg">{(i % events.length) + 1}</span>
                      <div>
                        <p className="font-medium text-ink-100 group-hover/item:text-circuit transition-colors">{e.title}</p>
                        {e.location && (
                          <p className="text-xs text-ink-400 mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {e.location}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState title="No events yet" text="Upcoming events will show up here." />
              )}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-ink-950 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink-950 to-transparent" />
            </div>

            <Link to="/events" className="btn-primary self-start mt-6 !py-2.5 !px-5 text-sm">
              View all
            </Link>
          </div>

          {/* NEWS SECTION (SORTED NEWEST FIRST) */}
          <div className="card p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="h-5 w-5 text-circuit" />
              <h3 className="font-display font-semibold text-2xl text-ink-100">News</h3>
            </div>

            <div className="flex-1 relative h-80 overflow-y-auto pr-1">
              {newsLoading ? (
                <p className="text-ink-400 text-sm py-4">Loading…</p>
              ) : news.length ? (
                <div className="divide-y divide-ink-400/10 space-y-2 pb-6">
                  {news.map((n, i) => {
                    const cleanLink = getCleanUrl(n.link);
                    const content = (
                      <>
                        <span className="font-mono text-circuit text-lg shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-ink-100 group-hover/news:text-circuit transition-colors flex items-center gap-1.5">
                            {n.title}
                            {cleanLink && <ExternalLink className="h-3.5 w-3.5 text-circuit opacity-70 group-hover/news:opacity-100 transition-opacity shrink-0" />}
                          </p>
                          {n.summary && (
                            <p className="text-xs text-ink-400 mt-1 leading-relaxed">
                              {n.summary}
                            </p>
                          )}
                          {n.date && (
                            <p className="text-[10px] text-ink-400/70 mt-1.5 font-mono">
                              {n.date}
                            </p>
                          )}
                        </div>
                      </>
                    );

                    return cleanLink ? (
                      <a
                        key={n.id || i}
                        href={cleanLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 py-3 group/news cursor-pointer hover:bg-ink-900/40 px-2 rounded-lg transition-colors block"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={n.id || i} className="flex gap-4 py-3 group/news px-2">
                        {content}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState title="No news yet" text="Posts added from the dashboard will show up here." />
              )}
            </div>

            <Link to="/" className="btn-primary self-start mt-6 !py-2.5 !px-5 text-sm">
              View all
            </Link>
          </div>
        </div>
      </section>

      {/* REGULATORY BODY */}
      {!peopleLoading && regulatoryBody.length > 0 && (
        <section id="regulatory-body" className="section-pad !pt-0">
          <SectionTag label="Regulatory Body" />
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-center text-ink-100 mb-8">
            Regulatory Body
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {regulatoryBody.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className="card overflow-hidden group hover:border-circuit/40 transition-colors"
              >
                <div className="aspect-square bg-ink-900 flex items-center justify-center overflow-hidden">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <UserRound className="h-8 w-8 text-ink-400/40" />
                  )}
                </div>
                <div className="p-3.5 text-center">
                  <p className="font-semibold text-ink-100 text-sm">{p.name}</p>
                  <p className="text-xs text-circuit font-mono mt-0.5">{p.role}</p>
                  {p.department && <p className="text-[11px] text-ink-400 italic mt-0.5">{p.department}</p>}
                  <div className="flex justify-center gap-3 mt-2.5">
                    <a href="#" className="text-ink-400 hover:text-circuit"><Linkedin className="h-3.5 w-3.5" /></a>
                    <a href="#" className="text-ink-400 hover:text-circuit"><Mail className="h-3.5 w-3.5" /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .autoscroll-track {
          animation: autoscroll-up linear infinite;
          animation-duration: 18s;
        }
        @keyframes autoscroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .autoscroll-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
