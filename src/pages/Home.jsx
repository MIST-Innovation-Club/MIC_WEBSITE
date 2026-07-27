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
} from "lucide-react";
import SectionTag from "../components/SectionTag";
import EmptyState from "../components/EmptyState";
import { useCollection } from "../hooks/useCollection";
import { pillars, activities, stats, dummyEvents, dummyNews } from "../data/dummy";

const ICONS = { Lightbulb, GraduationCap, Users, Wrench, Target, Heart, Users2 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  const { data: liveEvents, loading: eventsLoading } = useCollection("events", "date", "asc");
  const { data: liveNews, loading: newsLoading } = useCollection("news");
  const { data: liveGallery, loading: galleryLoading } = useCollection("gallery");

  const events = liveEvents.length ? liveEvents.slice(0, 3) : dummyEvents;
  const news = liveNews.length ? liveNews.slice(0, 3) : dummyNews;
  const featured = liveGallery.length ? liveGallery.slice(0, 6) : [];

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden section-pad !pt-16 !pb-24 md:!pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,99,232,0.18),transparent_60%)]" />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
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
                  <p className="font-display text-3xl md:text-4xl font-semibold text-ink-100">{s.value}</p>
                  <p className="text-xs text-ink-400 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative aspect-square w-full max-w-lg xl:max-w-xl mx-auto flex items-center justify-center"
          >
            {/* Soft background glow to help the white logo pop over the grid lines */}
            <div className="absolute inset-0 rounded-full bg-brand/15 blur-3xl -z-10" />

            <img
              src={`${import.meta.env.BASE_URL}mic-logo.png`}
              alt="MIST Innovation Club logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ABOUT / PILLARS */}
      <section id="about" className="section-pad !pt-0">
        <SectionTag label="About" />
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <p className="font-display text-2xl text-ink-100 leading-snug mb-4">
              "Innovation is seeing what everybody has seen and thinking what nobody has thought."
            </p>
            <p className="text-sm text-ink-400">— Dr. Albert Szent-Györgyi</p>
          </motion.div>

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
                  className="card p-6 hover:border-circuit/40 transition-colors"
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
            className="mic-swiper rounded-2xl overflow-hidden border border-ink-400/15"
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
          <div className="card p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-circuit" />
              <h3 className="font-display font-semibold text-2xl text-ink-100">Events</h3>
            </div>
            <div className="flex-1 divide-y divide-ink-400/10">
              {eventsLoading ? (
                <p className="text-ink-400 text-sm py-4">Loading…</p>
              ) : (
                events.map((e, i) => (
                  <Link
                    to={e.id?.startsWith("dummy") ? "/events" : `/events/${e.id}`}
                    key={e.id}
                    className="flex gap-4 py-4 group"
                  >
                    <span className="font-mono text-circuit text-lg">{i + 1}</span>
                    <div>
                      <p className="font-medium text-ink-100 group-hover:text-circuit transition-colors">{e.title}</p>
                      {e.location && (
                        <p className="text-xs text-ink-400 mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {e.location}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
            <Link to="/events" className="btn-primary self-start mt-6 !py-2.5 !px-5 text-sm">
              View all
            </Link>
          </div>

          <div className="card p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="h-5 w-5 text-circuit" />
              <h3 className="font-display font-semibold text-2xl text-ink-100">News</h3>
            </div>
            <div className="flex-1 divide-y divide-ink-400/10">
              {newsLoading ? (
                <p className="text-ink-400 text-sm py-4">Loading…</p>
              ) : news.length ? (
                news.map((n, i) => (
                  <div key={n.id} className="flex gap-4 py-4">
                    <span className="font-mono text-circuit text-lg">{i + 1}</span>
                    <p className="font-medium text-ink-100">{n.title}</p>
                  </div>
                ))
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
    </div>
  );
}
