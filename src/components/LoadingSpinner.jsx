import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-ink-400">
      <Loader2 className="h-6 w-6 animate-spin text-circuit" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
