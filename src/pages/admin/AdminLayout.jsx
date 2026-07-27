import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Images, Users, Newspaper, LogOut, Cpu, ExternalLink } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/people", label: "People", icon: Users },
  { to: "/admin/news", label: "News", icon: Newspaper },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-ink-950 bg-grid flex">
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-ink-400/10 bg-ink-950/80 backdrop-blur-sm p-5">
        <Link to="/" className="flex items-center gap-2.5 mb-10 px-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 border border-brand/30 text-brand-light">
            <Cpu className="h-4 w-4" />
          </span>
          <span className="font-display font-semibold text-sm text-ink-100">MIC Admin</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-circuit/10 text-circuit" : "text-ink-400 hover:text-ink-100 hover:bg-ink-900"
                }`
              }
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-ink-400/10 pt-4 mt-4">
          <p className="text-xs text-ink-400 truncate mb-3 px-1">{user?.email}</p>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-ink-100 hover:bg-ink-900">
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-red-400 hover:bg-ink-900 w-full"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-ink-400/10">
          <span className="font-display font-semibold text-ink-100 text-sm">MIC Admin</span>
          <button onClick={logout} className="text-ink-400 text-sm flex items-center gap-1">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
        <div className="md:hidden flex gap-1 overflow-x-auto px-5 py-3 border-b border-ink-400/10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isActive ? "bg-circuit/10 text-circuit" : "text-ink-400"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
