import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollection } from "../../hooks/useCollection";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

const empty = { title: "", summary: "", date: "", link: "" };

export default function ManageNews() {
  const { data, loading } = useCollection("news");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...payload } = form;
      if (id) {
        await updateDoc(doc(db, "news", id), payload);
      } else {
        await addDoc(collection(db, "news"), { ...payload, createdAt: serverTimestamp() });
      }
      setForm(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, "news", toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-display font-semibold text-3xl text-ink-100">News</h1>
        </div>
        <button onClick={() => setForm({ ...empty })} className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState title="No news posts yet" text="Post an update to fill the homepage news feed." />
      ) : (
        <div className="card divide-y divide-ink-400/10">
          {data.map((n) => (
            <div key={n.id} className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink-100 truncate">{n.title}</p>
                <p className="text-xs text-ink-400">{n.date}</p>
                {n.link && <p className="text-[10px] text-circuit truncate mt-0.5">{n.link}</p>}
              </div>
              <button onClick={() => setForm({ ...n })} className="p-2 text-ink-400 hover:text-circuit"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToDelete(n)} className="p-2 text-ink-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 z-[90] bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setForm(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="card p-6 md:p-8 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-lg text-ink-100">{form.id ? "Edit post" : "New post"}</p>
              <button type="button" onClick={() => setForm(null)} className="text-ink-400 hover:text-circuit"><X className="h-5 w-5" /></button>
            </div>
            <div>
              <label className="label-field">Title</label>
              <input required className="input-field" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Summary</label>
              <textarea rows={3} className="input-field" value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Date</label>
              <input type="date" className="input-field" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Facebook Post Link (URL)</label>
              <input className="input-field" placeholder="https://facebook.com/..." value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} />
            </div>
            <button disabled={saving} type="submit" className="btn-primary w-full mt-2">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save post"}
            </button>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this post?"
        text={`"${toDelete?.title}" will be permanently removed.`}
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
