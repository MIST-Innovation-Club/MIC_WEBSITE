import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import { contributors } from "../data/contributors";
import EmptyState from "../components/EmptyState";
import SectionTag from "../components/SectionTag";

export default function Contributors() {
  return (
    <div className="section-pad">
      <SectionTag label="Contributors" />
      <h1 className="font-display font-semibold text-4xl md:text-5xl text-ink-100 mb-3">Contributors</h1>
      <p className="text-ink-400 max-w-lg mb-12">People who helped bring MIC's projects and platforms to life.</p>

      {contributors.length === 0 ? (
        <EmptyState title="No contributors listed yet" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contributors.map((p, i) => (
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
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
