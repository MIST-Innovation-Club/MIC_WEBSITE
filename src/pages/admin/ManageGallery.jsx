import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollection } from "../../hooks/useCollection";
import ImageUploader from "../../components/ImageUploader";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { Plus, Pencil, Trash2, X, Save, ImageOff } from "lucide-react";

const empty = { imageUrl: "", caption: "", category: "" };

export default function ManageGallery() {
  const { data, loading } = useCollection("gallery");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...payload } = form;
      if (id) {
        await updateDoc(doc(db, "gallery", id), payload);
      } else {
        await addDoc(collection(db, "gallery"), { ...payload, createdAt: serverTimestamp() });
      }
      setForm(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save image.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, "gallery", toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-display font-semibold text-3xl text-ink-100">Gallery</h1>
        </div>
        <button onClick={() => setForm({ ...empty })} className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus className="h-4 w-4" /> Add image
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState title="No images yet" text="Upload your first photo to populate the gallery." />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((img) => (
            <div key={img.id} className="card overflow-hidden group relative">
              <div className="aspect-square bg-ink-900 flex items-center justify-center">
                {img.imageUrl ? (
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageOff className="h-6 w-6 text-ink-400/40" />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-ink-100 truncate">{img.caption || "Untitled"}</p>
                {img.category && <p className="text-[10px] text-circuit font-mono mt-0.5">{img.category}</p>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setForm({ ...img })} className="p-1.5 rounded-lg bg-ink-950/90 text-ink-400 hover:text-circuit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setToDelete(img)} className="p-1.5 rounded-lg bg-ink-950/90 text-ink-400 hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 z-[90] bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setForm(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="card p-6 md:p-8 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-lg text-ink-100">{form.id ? "Edit image" : "Add image"}</p>
              <button type="button" onClick={() => setForm(null)} className="text-ink-400 hover:text-circuit"><X className="h-5 w-5" /></button>
            </div>
            <ImageUploader folder="gallery" value={form.imageUrl} onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))} />
            <div>
              <label className="label-field">Caption</label>
              <input className="input-field" value={form.caption} onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Category</label>
              <input placeholder="Events, Workshops…" className="input-field" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </div>
            <button disabled={saving} type="submit" className="btn-primary w-full mt-2">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save image"}
            </button>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this image?"
        text="This will remove it from the gallery permanently."
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
