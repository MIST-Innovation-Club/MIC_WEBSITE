import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserRound, Linkedin, Mail } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { useDocument } from "../hooks/useDocument";
import { dummyPeople, founderQuote, galleryYears } from "../data/dummy";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";
import YearTabs from "../components/YearTabs";

const CURRENT_YEAR = String(new Date().getFullYear());

export default function People() {
  const { data, loading } = useCollection("people", "order", "asc");
  const people = data.length ? data : dummyPeople;

  const { data: messageDoc } = useDocument("settings", "founderQuote");
  const message = messageDoc || founderQuote;

  // Only the *actual people* determine which year we should default to.
  // `galleryYears` is a static list (used just to render extra empty tabs)
  // and always contains "2025", so it must never be allowed to win the
  // "latest year" calculation.
  const peopleYears = useMemo(
    () => [...new Set(people.map((p) => String(p.year || CURRENT_YEAR)))].sort((a, b) => b - a),
    [people]
  );

  const years = useMemo(() => {
    const set = new Set([...galleryYears, ...peopleYears]);
    return [...set].sort((a, b) => b - a);
  }, [peopleYears]);

  const [year, setYear] = useState(peopleYears[0]);
  const userChangedYear = useRef(false);

  // The first render uses dummy data (year 2025) while Firestore is still
  // loading. Once the real data comes in, snap to its latest year — unless
  // the visitor has already picked a tab themselves.
  useEffect(() => {
    if (!loading && !userChangedYear.current && peopleYears.length) {
      setYear(peopleYears[0]);
    }
  }, [loading, peopleYears]);

  const handleYearChange = (y) => {
    userChangedYear.current = true;
    setYear(y);
  };

  const inYear = people.filter((p) => String(p.year || CURRENT_YEAR) === year);
  const presidential = inYear.filter((p) => (p.panelType || "Presidential") === "Presidential");
  const executive = inYear.filter((p) => p.panelType === "Executive");

  // Separate top leadership (President & General Secretary) from other presidential members
  const topPresidents = presidential.filter((p) => 
    p.role?.toLowerCase().includes("president") && !p.role?.toLowerCase().includes("vice") ||
    p.role?.toLowerCase().includes("general secretary")
  );
  const otherPresidents = presidential.filter((p) => !topPresidents.includes(p));

  return (
    <div className="section-pad">
      <SectionTag label="People" />
      <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100 mb-3">People</h1>
      <p className="text-ink-400 max-w-lg mb-12">The students who plan, build, and run everything MIC does.</p>

      {/* Founder quote */}
<div className="card max-w-5xl mx-auto p-8 md:p-12 mb-16">
  <div className="grid md:grid-cols-2 gap-10 items-center">
    {/* LEFT: Text */}
    <div className="text-center md:text-left order-2 md:order-1">
      <p className="eyebrow mb-3">Founder&rsquo;s Message</p>
      <p className="text-ink-100/90 leading-relaxed mb-3">
        &ldquo;{message.quote}&rdquo;
      </p>
      <p className="text-sm text-circuit font-mono mb-6">{message.cite}</p>
     
    </div>

    {/* RIGHT: Image */}
    <div className="order-1 md:order-2 flex justify-center md:justify-end">
      <div className="w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-ink-400/20 bg-ink-900 shrink-0">
        {message.imageUrl ? (
          <img
            src={message.imageUrl}
            alt={message.cite || "Founder"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UserRound className="h-10 w-10 text-ink-400/40" />
          </div>
        )}
      </div>
    </div>
  </div>
</div>

      {/* Two-tone headline */}
      <div className="text-center py-10 md:py-16">
        <p className="font-display font-semibold text-3xl sm:text-4xl md:text-6xl leading-tight">
          <span className="text-ink-100/90">Meet the</span>{" "}
          <span className="text-circuit">minds</span>
          <br />
          <span className="text-ink-100/90">behind the</span>{" "}
          <span className="text-brand-light">matter</span>
        </p>
      </div>

      <YearTabs years={years} active={year} onChange={handleYearChange} />

      {loading ? (
        <LoadingSpinner />
      ) : inYear.length === 0 ? (
        <EmptyState title={`No panel listed for ${year} yet`} text="Member list coming soon." />
      ) : (
        <>
          {presidential.length > 0 && (
  <div className="mb-16 max-w-6xl mx-auto px-4">
    <h2 className="font-display font-semibold text-2xl text-center text-ink-100 mb-8">
      Presidential Panel
    </h2>

    {/* Top Row: President & General Secretary */}
    <div className="flex flex-wrap justify-center gap-6 mb-6">
      {topPresidents.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="card overflow-hidden group hover:border-circuit/40 transition-colors w-full sm:w-[calc(50%-12px)] md:w-64"
        >
          <div className="aspect-square bg-ink-900 flex items-center justify-center overflow-hidden">
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <UserRound className="h-8 w-8 text-ink-400/40" />
            )}
          </div>
          <div className="p-3.5 text-center">
            <p className="font-semibold text-ink-100 text-sm">{p.name}</p>
            <p className="text-xs text-circuit font-mono mt-0.5">{p.role}</p>
            {p.department && (
              <p className="text-[11px] text-ink-400 italic mt-0.5">{p.department}</p>
            )}
            <div className="flex justify-center gap-3 mt-2.5">
              <a href="#" className="text-ink-400 hover:text-circuit">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="text-ink-400 hover:text-circuit">
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Remaining Presidential Panel Members (Centered Row) */}
    {otherPresidents.length > 0 && (
      <div className="flex flex-wrap justify-center gap-6">
        {otherPresidents.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card overflow-hidden group hover:border-circuit/40 transition-colors w-full sm:w-[calc(50%-12px)] md:w-64"
          >
            <div className="aspect-square bg-ink-900 flex items-center justify-center overflow-hidden">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <UserRound className="h-8 w-8 text-ink-400/40" />
              )}
            </div>
            <div className="p-3.5 text-center">
              <p className="font-semibold text-ink-100 text-sm">{p.name}</p>
              <p className="text-xs text-circuit font-mono mt-0.5">{p.role}</p>
              {p.department && (
                <p className="text-[11px] text-ink-400 italic mt-0.5">{p.department}</p>
              )}
              <div className="flex justify-center gap-3 mt-2.5">
                <a href="#" className="text-ink-400 hover:text-circuit">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="text-ink-400 hover:text-circuit">
                  <Mail className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
)}

          {executive.length > 0 && (
            <div>
              <h2 className="font-display font-semibold text-2xl text-center text-ink-100 mb-8">Executive Member</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {executive.map((p, i) => (
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
