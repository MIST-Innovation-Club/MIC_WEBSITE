import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocument } from "../../hooks/useDocument";
import ImageUploader from "../../components/ImageUploader";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Save } from "lucide-react";
import { founderQuote } from "../../data/dummy";

const DOC_PATH = ["settings", "founderQuote"];

export default function ManageMessage() {
  const { data, loading } = useDocument(...DOC_PATH);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Seed the form once the doc has loaded (or fall back to the dummy copy
  // the first time this is edited, so the fields aren't blank).
  useEffect(() => {
    if (!loading && form === null) {
      setForm(data || { ...founderQuote });
    }
  }, [loading, data, form]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const { id, ...payload } = form;
      await setDoc(doc(db, ...DOC_PATH), { ...payload, updatedAt: serverTimestamp() }, { merge: true });
      setSaved(true);
    } catch (err) {
      console.error(err);
      alert("Failed to save message.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || form === null) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow mb-2">Admin</p>
        <h1 className="font-display font-semibold text-3xl text-ink-100">Commandant&rsquo;s Message</h1>
        <p className="text-ink-400 text-sm mt-1">
          Edits the quote and photo shown at the top of the People page.
        </p>
      </div>

      <form onSubmit={save} className="card p-6 md:p-8 max-w-xl space-y-4">
        <ImageUploader
          folder="settings"
          value={form.imageUrl}
          onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
        />
        <div>
          <label className="label-field">Quote</label>
          <textarea
            required
            rows={5}
            className="input-field"
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
          />
        </div>
        <div>
          <label className="label-field">Attribution</label>
          <input
            required
            placeholder="— Founder, MIST Innovation Club"
            className="input-field"
            value={form.cite}
            onChange={(e) => setForm((f) => ({ ...f, cite: e.target.value }))}
          />
        </div>
        <button disabled={saving} type="submit" className="btn-primary w-full mt-2">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save message"}
        </button>
        {saved && <p className="text-xs text-circuit text-center">Saved.</p>}
      </form>
    </div>
  );
}
