import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, LayoutDashboard, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/regulatory-body", label: "Regulatory Body" },
  { to: "/people", label: "People" },
  { to: "/contributors", label: "Contributors" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink-950/90 backdrop-blur-md border-b border-ink-400/10" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 h-20">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
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
          <span className="font-display font-semibold text-lg tracking-tight text-ink-100">
            MIST <span className="text-circuit">Innovation</span> Club
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? "text-circuit bg-circuit/10" : "text-ink-400 hover:text-ink-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            <Link to="/admin" className="btn-primary !py-2 !px-5 text-sm">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn-primary !py-2 !px-5 text-sm">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-ink-100 p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-ink-400/10 bg-ink-950"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? "text-circuit bg-circuit/10" : "text-ink-400"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              {isAdmin ? (
                <Link to="/admin" onClick={() => setOpen(false)} className="btn-primary mt-2 text-sm">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="btn-primary mt-2 text-sm">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
