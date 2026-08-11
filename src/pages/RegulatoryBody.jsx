import { motion } from "framer-motion";
import { UserRound, Linkedin, Mail } from "lucide-react";
import { useCollection } from "../hooks/useCollection";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";

export default function RegulatoryBody() {
  const { data, loading } = useCollection("regulatoryBody", "order", "asc");

  return (
    <div className="section-pad">
      <SectionTag label="Regulatory Body" />
      <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100 mb-3">Regulatory Body</h1>
      <p className="text-ink-400 max-w-lg mb-12">The members who oversee and guide MIC's governance.</p>

      {loading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState title="No members listed yet" text="Regulatory body members will appear here once added." />
      ) : (
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
  {data.map((p, i) => (
    <motion.div
      key={p.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
      className="card overflow-hidden group hover:border-circuit/40 transition-colors w-full sm:w-[calc(50%-12px)] md:w-64"
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
      )}
    </div>
  );
}
