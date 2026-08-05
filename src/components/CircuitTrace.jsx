import { motion } from "framer-motion";

/**
 * A vertical PCB-trace line with glowing nodes, echoing the circuit motif
 * already present in the club's logo. Used down the spine of the homepage
 * to visually connect sections, like a live signal running through a board.
 */
export default function CircuitTrace({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-y-0 left-6 md:left-10 w-px ${className}`} aria-hidden="true">
      <svg width="2" height="100%" className="h-full w-full overflow-visible">
        <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(139,153,191,0.15)" strokeWidth="2" />
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke="#E8A33D"
          strokeWidth="2"
          strokeDasharray="6 10"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -160 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          opacity={0.7}
        />
      </svg>
    </div>
  );
}

export function CircuitNode({ label }) {
  return (
    <div className="relative flex items-center gap-3 -ml-[5px] md:-ml-[9px] mb-3" aria-hidden="true">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-circuit opacity-40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-circuit shadow-glow" />
      </span>
      {label && <span className="eyebrow">{label}</span>}
    </div>
  );
}
