import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocument } from "../../hooks/useDocument";
import { stats as defaultStats } from "../../data/dummy";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Save, Check } from "lucide-react";

export default function ManageStats() {
  const { data, loading } = useDocument("settings", "stats");
  const [items, setItems] = useState(defaultStats);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Once the live doc loads, prefer it over the defaults
  useEffect(() => {
    if (data?.items?.length) setItems(data.items);
  }, [data]);

  const updateItem = (i, field, value) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "stats"), {
        items: items.map((it) => ({ ...it, value: Number(it.value) || 0 })),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save stats.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="font-display font-semibold text-3xl text-ink-100">Homepage Stats</h1>
        <p className="text-ink-400 text-sm mt-2">
          These 3 numbers count up from 0 on the homepage hero. Update the numbers as your club grows.
        </p>
      </div>

      <form onSubmit={save} className="card p-6 md:p-8 space-y-6 max-w-2xl">
        {items.map((s, i) => (
          <div key={i} className="grid sm:grid-cols-3 gap-4 pb-6 border-b border-ink-400/10 last:border-0 last:pb-0">
            <div>
              <label className="label-field">Label</label>
              <input
                className="input-field"
                value={s.label}
                onChange={(e) => updateItem(i, "label", e.target.value)}
                placeholder="e.g. Active Members"
              />
            </div>
            <div>
              <label className="label-field">Number</label>
              <input
                type="number"
                className="input-field"
                value={s.value}
                onChange={(e) => updateItem(i, "value", e.target.value)}
              />
            </div>
            <div>
              <label className="label-field">Suffix (optional)</label>
              <input
                className="input-field"
                placeholder="e.g. +"
                value={s.suffix || ""}
                onChange={(e) => updateItem(i, "suffix", e.target.value)}
              />
            </div>
          </div>
        ))}

        <button disabled={saving} type="submit" className="btn-primary w-full">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : saved ? "Saved" : "Save stats"}
        </button>
      </form>
    </div>
  );
}
