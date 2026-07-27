import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Globe, Cpu } from "lucide-react";

function MiniCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="card p-5 w-full max-w-xs">
      <p className="font-display font-semibold text-ink-100 mb-3">
        {monthName} <span className="text-circuit">{year}</span>
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-ink-400 font-mono py-1">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span
            key={i}
            className={`py-1 rounded ${
              d === today.getDate()
                ? "bg-circuit text-ink-950 font-semibold"
                : d
                ? "text-ink-100/80"
                : ""
            }`}
          >
            {d || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ink-400/10 bg-ink-950">
      <div className="section-pad !py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 border border-brand/30 text-brand-light">
              <Cpu className="h-5 w-5" />
            </span>
            <span className="font-display font-semibold text-lg text-ink-100">MIST Innovation Club</span>
          </Link>
          <p className="text-ink-400 text-sm max-w-sm mb-6">
            Innovate To Serve — a community of builders, thinkers, and problem solvers at MIST.
          </p>
          <div className="flex flex-wrap gap-6 mb-6">
            <Link to="/" className="text-sm text-ink-400 hover:text-circuit transition-colors">About</Link>
            <Link to="/events" className="text-sm text-ink-400 hover:text-circuit transition-colors">Become a Member</Link>
            <Link to="/gallery" className="text-sm text-ink-400 hover:text-circuit transition-colors">Gallery</Link>
            <Link to="/people" className="text-sm text-ink-400 hover:text-circuit transition-colors">People</Link>
          </div>
          <div className="flex gap-3 mb-8">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-400/20 text-ink-400 hover:text-circuit hover:border-circuit transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="space-y-2 text-sm text-ink-400">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-circuit shrink-0" /> MIST, Mirpur Cantonment, Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-circuit shrink-0" /> mist.innovation.club@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-circuit shrink-0" /> mic.mist.edu (placeholder)
            </p>
          </div>
        </div>

        <div className="flex lg:justify-end">
          <MiniCalendar />
        </div>
      </div>
      <div className="border-t border-ink-400/10 px-6 sm:px-10 lg:px-20 py-6 text-xs text-ink-400 font-mono">
        © {new Date().getFullYear()} MIST Innovation Club. All rights reserved.
      </div>
    </footer>
  );
}
