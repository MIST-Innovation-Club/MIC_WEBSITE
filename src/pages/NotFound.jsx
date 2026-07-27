import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section-pad flex flex-col items-center justify-center text-center min-h-[60vh]">
      <p className="font-mono text-circuit text-sm mb-4">ERR_404 — SIGNAL LOST</p>
      <h1 className="font-display font-semibold text-4xl text-ink-100 mb-4">Page not found</h1>
      <p className="text-ink-400 mb-8 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}
