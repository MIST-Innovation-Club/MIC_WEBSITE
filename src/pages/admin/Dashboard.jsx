import { Link } from "react-router-dom";
import { CalendarDays, Images, Users, Newspaper, ArrowRight } from "lucide-react";
import { useCollection } from "../../hooks/useCollection";

const cards = [
  { key: "events", label: "Events", icon: CalendarDays, to: "/admin/events" },
  { key: "gallery", label: "Gallery Images", icon: Images, to: "/admin/gallery" },
  { key: "people", label: "People", icon: Users, to: "/admin/people" },
  { key: "news", label: "News Posts", icon: Newspaper, to: "/admin/news" },
];

export default function Dashboard() {
  const events = useCollection("events");
  const gallery = useCollection("gallery");
  const people = useCollection("people");
  const news = useCollection("news");
  const counts = { events: events.data.length, gallery: gallery.data.length, people: people.data.length, news: news.data.length };

  return (
    <div>
      <p className="eyebrow mb-2">Admin</p>
      <h1 className="font-display font-semibold text-3xl text-ink-100 mb-8">Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((c) => (
          <Link key={c.key} to={c.to} className="card p-6 group hover:border-circuit/40 transition-colors">
            <c.icon className="h-5 w-5 text-circuit mb-4" />
            <p className="font-display text-3xl font-semibold text-ink-100">{counts[c.key]}</p>
            <p className="text-sm text-ink-400 mt-1 flex items-center gap-1">
              {c.label} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </Link>
        ))}
      </div>

      <div className="card p-6">
        <p className="font-display font-semibold text-ink-100 mb-2">Getting started</p>
        <ul className="text-sm text-ink-400 space-y-2 list-disc list-inside">
          <li>Add your first event under <span className="text-circuit font-mono">Events</span> — it will replace the placeholder on the homepage automatically.</li>
          <li>Upload photos under <span className="text-circuit font-mono">Gallery</span>; the first six show up in the homepage carousel.</li>
          <li>List panel members under <span className="text-circuit font-mono">People</span>, grouping them by category (e.g. "Executive Panel").</li>
          <li>Post updates under <span className="text-circuit font-mono">News</span> to fill the homepage news feed.</li>
        </ul>
      </div>
    </div>
  );
}
