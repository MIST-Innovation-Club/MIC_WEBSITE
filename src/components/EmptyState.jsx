import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", text, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-ink-400 card px-8">
      <Icon className="h-8 w-8 text-ink-400/60" />
      <p className="font-display text-lg text-ink-100">{title}</p>
      {text && <p className="max-w-sm text-sm">{text}</p>}
    </div>
  );
}
