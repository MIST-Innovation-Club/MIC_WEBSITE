import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollection } from "../../hooks/useCollection";
import ImageUploader from "../../components/ImageUploader";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { Plus, Pencil, Trash2, X, Save, UserRound } from "lucide-react";

const CURRENT_YEAR = String(new Date().getFullYear());
const empty = { name: "", role: "", panelType: "Presidential", department: "", year: CURRENT_YEAR, bio: "", imageUrl: "", order: 0 };

export default function ManagePeople() {
  const { data, loading } = useCollection("people", "order", "asc");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { id, ...payload } = form;
      payload.order = Number(payload.order) || 0;
      if (id) {
        await updateDoc(doc(db, "people", id), payload);
      } else {
        await addDoc(collection(db, "people"), { ...payload, createdAt: serverTimestamp() });
      }
      setForm(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save member.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, "people", toDelete.id));
    setToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="font-display font-semibold text-3xl text-ink-100">People</h1>
        </div>
        <button onClick={() => setForm({ ...empty })} className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus className="h-4 w-4" /> Add member
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState title="No members yet" text="Add panel members so they show up on the People page." />
      ) : (
        <div className="card divide-y divide-ink-400/10">
          {data.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 rounded-full bg-ink-900 shrink-0 overflow-hidden flex items-center justify-center">
                {p.imageUrl ? <img src={p.imageUrl} alt="" className="w-full h-full object-cover" /> : <UserRound className="h-5 w-5 text-ink-400/40" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink-100 truncate">{p.name}</p>
                <p className="text-xs text-ink-400">
                  {p.role}
                  {p.department ? ` · ${p.department}` : ""} · {p.panelType || "Presidential"} · {p.year || CURRENT_YEAR}
                </p>
              </div>
              <button onClick={() => setForm({ ...empty, ...p })} className="p-2 text-ink-400 hover:text-circuit"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setToDelete(p)} className="p-2 text-ink-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

      {form && (
        <div className="fixed inset-0 z-[90] bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setForm(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="card p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-lg text-ink-100">{form.id ? "Edit member" : "Add member"}</p>
              <button type="button" onClick={() => setForm(null)} className="text-ink-400 hover:text-circuit"><X className="h-5 w-5" /></button>
            </div>
            <ImageUploader folder="people" value={form.imageUrl} onUploaded={(url) => setForm((f) => ({ ...f, imageUrl: url }))} />
            <div>
              <label className="label-field">Name</label>
              <input required className="input-field" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Role</label>
              <input required placeholder="President, Vice-President…" className="input-field" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Panel</label>
              <select
                className="input-field"
                value={form.panelType}
                onChange={(e) => setForm((f) => ({ ...f, panelType: e.target.value }))}
              >
                <option value="Presidential">Presidential Panel</option>
                <option value="Executive">Executive Member</option>
              </select>
            </div>
            {form.panelType === "Executive" && (
              <div>
                <label className="label-field">Department (optional)</label>
                <input placeholder="e.g. Marketing, Research & Development" className="input-field" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
              </div>
            )}
            <div>
              <label className="label-field">Year</label>
              <input placeholder="e.g. 2025" className="input-field" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Short bio (optional)</label>
              <textarea rows={3} className="input-field" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Sort order (lower shows first)</label>
              <input type="number" className="input-field" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))} />
            </div>
            <button disabled={saving} type="submit" className="btn-primary w-full mt-2">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save member"}
            </button>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Remove this member?"
        text={`"${toDelete?.name}" will be removed from the People page.`}
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
