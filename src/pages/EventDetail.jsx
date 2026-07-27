import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getDoc(doc(db, "events", id))
      .then((snap) => {
        if (active) setEvent(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      })
      .catch(() => active && setEvent(null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!event) {
    return (
      <div className="section-pad">
        <EmptyState title="Event not found" text="It may have been removed, or the link is incorrect." />
        <div className="text-center mt-6">
          <Link to="/events" className="btn-secondary inline-flex">
            <ArrowLeft className="h-4 w-4" /> Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-pad max-w-3xl mx-auto">
      <Link to="/events" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-circuit mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to events
      </Link>

      {event.imageUrl && (
        <img src={event.imageUrl} alt="" className="w-full aspect-video object-cover rounded-2xl mb-8 border border-ink-400/15" />
      )}

      {event.category && <span className="eyebrow mb-3 block">{event.category}</span>}
      <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink-100 mb-6">{event.title}</h1>

      <div className="flex flex-wrap gap-6 text-sm text-ink-400 mb-8 border-y border-ink-400/10 py-5">
        {event.date && (
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-circuit" /> {formatDate(event.date)}
          </span>
        )}
        {event.time && (
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-circuit" /> {event.time}
          </span>
        )}
        {event.location && (
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-circuit" /> {event.location}
          </span>
        )}
      </div>

      <p className="text-ink-100/90 leading-relaxed whitespace-pre-line">{event.description}</p>
    </div>
  );
}
