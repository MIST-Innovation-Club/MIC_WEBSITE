import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Mail, Globe, Cpu } from "lucide-react";

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="border-t border-ink-400/10 bg-ink-950">
      <div className="section-pad !py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Column 1 — Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 group mb-4">
            {logoFailed ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 border border-brand/30 text-brand-light group-hover:border-circuit group-hover:text-circuit transition-colors">
                <Cpu className="h-5 w-5" />
              </span>
            ) : (
              <img
                src="/mic-logo.png"
                alt="MIC Logo"
                className="h-9 w-9 object-contain"
                onError={() => setLogoFailed(true)}
              />
            )}
            <span className="font-display font-semibold text-lg text-ink-100">MIST Innovation Club</span>
          </Link>
          <p className="text-ink-400 text-sm mb-6">
            Innovate To Serve — a community of builders, thinkers, and problem solvers at MIST.
          </p>
          <div className="flex gap-3">
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
        </div>

        {/* Column 2 — Quick links */}
        <div>
          <p className="eyebrow mb-4">Quick Links</p>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm text-ink-400 hover:text-circuit transition-colors">About</Link>
            <Link to="/events" className="text-sm text-ink-400 hover:text-circuit transition-colors">Become a Member</Link>
            <Link to="/gallery" className="text-sm text-ink-400 hover:text-circuit transition-colors">Gallery</Link>
            <Link to="/people" className="text-sm text-ink-400 hover:text-circuit transition-colors">People</Link>
          </div>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <div className="space-y-3 text-sm text-ink-400">
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-circuit shrink-0 mt-0.5" /> MIST, Mirpur Cantonment, Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-circuit shrink-0" /> mist.innovation.club@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-circuit shrink-0" /> mic.mist.edu (placeholder)
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-400/10 px-6 sm:px-10 lg:px-20 py-6 text-xs text-ink-400 font-mono">
        © {new Date().getFullYear()} MIST Innovation Club. All rights reserved.
      </div>
    </footer>
  );
}
