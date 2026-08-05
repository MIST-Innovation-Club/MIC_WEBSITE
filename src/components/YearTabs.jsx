export default function YearTabs({ years, active, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto mb-14 w-fit rounded-full border border-ink-400/15 bg-ink-900/60 backdrop-blur-sm p-1.5">
      {years.map((y) => (
        <button
          key={y}
          onClick={() => onChange(y)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            active === y ? "bg-circuit text-ink-950" : "text-ink-400 hover:text-ink-100"
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}
