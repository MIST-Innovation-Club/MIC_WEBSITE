import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";
import { ImagePlus, X, Loader2 } from "lucide-react";

/**
 * Uploads an image to Firebase Storage under `folder/` and reports the
 * resulting public URL back to the parent via onUploaded(url).
 */
export default function ImageUploader({ folder, value, onUploaded, label = "Image" }) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError("");
    const path = `${folder}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    setProgress(0);
    task.on(
      "state_changed",
      (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => {
        console.error(err);
        setError("Upload failed. Check Firebase Storage rules / connection.");
        setProgress(null);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onUploaded(url);
        setProgress(null);
      }
    );
  };

  const handleRemove = async () => {
    onUploaded("");
    // Best-effort delete; ignore failures (e.g. external URL, already gone).
    try {
      if (value && value.includes("firebasestorage")) {
        await deleteObject(ref(storage, value));
      }
    } catch {
      /* noop */
    }
  };

  return (
    <div>
      <label className="label-field">{label}</label>
      {value ? (
        <div className="relative w-full max-w-xs">
          <img src={value} alt="" className="w-full aspect-video object-cover rounded-lg border border-ink-400/20" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-ink-950 border border-ink-400/30 rounded-full p-1.5 text-ink-400 hover:text-circuit"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full max-w-xs aspect-video rounded-lg border-2 border-dashed border-ink-400/25 flex flex-col items-center justify-center gap-2 text-ink-400 hover:border-circuit hover:text-circuit transition-colors"
        >
          {progress !== null ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-xs font-mono">{progress}%</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">Click to upload</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
