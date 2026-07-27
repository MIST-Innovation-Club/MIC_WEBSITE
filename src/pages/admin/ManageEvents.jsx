import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollection } from "../../hooks/useCollection";
import ImageUploader from "../../components/ImageUploader";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

const empty = { title: "", description: "", date: "", time: "", location: "", category: "", imageUrl: "" };

export default function ManageEvents() {
  const { data, loading } = useCollection("events", "date", "asc");
  const [form, setForm] = useState(null); // null = closed, object = editing/creating
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const openNew = () => setForm({ ...empty });
  const openEdit = (item) => setForm({ ...item });
  const close = () => setForm(null);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...payload } = form;
      if (id) {
        await updateDoc(doc(db, "events", id), payload);
      } else {
        await addDoc(collection(db, "events"), { ...payload, createdAt: serverTimestamp() });
      }
      close();
    } catch (err) {
      console.error(err);
      alert("Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, "events", toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-display font-semibold text-3xl text-ink-100">Events</h1>
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus className="h-4 w-4" /> New event
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState title="No events yet" text="Create your first event to have it appear on the site." />
      ) : (
        <div className="card divide-y divide-ink-400/10">
          {data.map((e) => (
            <div key={e.id} className="flex items-center gap-4 p-4">
              <div className="h-14 w-20 rounded-lg bg-ink-900 shrink-0 overflow-hidden">
                {e.imageUrl && <img src={e.imageUrl} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink-100 truncate">{e.title}</p>
                <p className="text-xs text-ink-400">{e.date} {e.location ? `· ${e.location}` : ""}</p>
              </div>
              <button onClick={() => openEdit(e)} className="p-2 text-ink-400 hover:text-circuit"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToDelete(e)} className="p-2 text-ink-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 z-[90] bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={close}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={save}
            className="card p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-lg text-ink-100">{form.id ? "Edit event" : "New event"}</p>
              <button type="button" onClick={close} className="text-ink-400 hover:text-circuit"><X className="h-5 w-5" /></button>
            </div>

            <ImageUploader folder="events" value={form.imageUrl} onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))} />

            <div>
              <label className="label-field">Title</label>
              <input required className="input-field" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Description</label>
              <textarea rows={4} className="input-field" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Date</label>
                <input type="date" className="input-field" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="label-field">Time</label>
                <input type="text" placeholder="e.g. 5:00 PM" className="input-field" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Location</label>
                <input className="input-field" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
              </div>
              <div>
                <label className="label-field">Category</label>
                <input placeholder="Workshop, Talk…" className="input-field" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
              </div>
            </div>

            <button disabled={saving} type="submit" className="btn-primary w-full mt-2">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save event"}
            </button>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this event?"
        text={`"${toDelete?.title}" will be permanently removed.`}
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
