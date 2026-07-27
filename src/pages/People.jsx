import { motion } from "framer-motion";
import { UserRound, Linkedin, Mail } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import { dummyPeople } from "../data/dummy";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";

export default function People() {
  const { data, loading } = useCollection("people", "order", "asc");
  const people = data.length ? data : dummyPeople;

  const groups = people.reduce((acc, p) => {
    const key = p.category || "Members";
    acc[key] = acc[key] || [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <div className="section-pad">
      <SectionTag label="People" />
      <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100 mb-3">People</h1>
      <p className="text-ink-400 max-w-lg mb-12">
        The students who plan, build, and run everything MIC does.
      </p>

      {loading ? (
        <LoadingSpinner />
      ) : people.length === 0 ? (
        <EmptyState title="No members listed yet" text="Add panel members from the dashboard." />
      ) : (
        Object.entries(groups).map(([category, members]) => (
          <div key={category} className="mb-14">
            <h2 className="font-display font-semibold text-xl text-ink-100 mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-circuit" /> {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {members.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
                  className="card overflow-hidden group hover:border-circuit/40 transition-colors"
                >
                  <div className="aspect-square bg-ink-900 flex items-center justify-center overflow-hidden">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <UserRound className="h-10 w-10 text-ink-400/40" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-ink-100">{p.name}</p>
                    <p className="text-xs text-circuit font-mono mt-0.5">{p.role}</p>
                    {p.bio && <p className="text-xs text-ink-400 mt-2 line-clamp-2">{p.bio}</p>}
                    <div className="flex gap-3 mt-3">
                      <a href="#" className="text-ink-400 hover:text-circuit"><Linkedin className="h-3.5 w-3.5" /></a>
                      <a href="#" className="text-ink-400 hover:text-circuit"><Mail className="h-3.5 w-3.5" /></a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
