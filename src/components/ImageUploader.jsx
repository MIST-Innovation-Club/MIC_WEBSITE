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
    setError("");
    // Best-effort delete; ignore failures (e.g. external URL, already gone).
    try {
      if (value && value.includes("firebasestorage")) {
        await deleteObject(ref(storage, value));
      }
    } catch {
      /* noop */
    }
  };

  const handlePastedUrl = (raw) => {
    // Trim whitespace/newlines — a common cause of "paste stops working":
    // type="url" inputs silently fail native validation (and therefore
    // block form submit) if the value has leading/trailing whitespace,
    // which easily sneaks in when copying a link from Cloudinary's media
    // library, Slack, etc.
    const url = raw.trim();
    setError("");
    onUploaded(url);
  };

  const handleImageError = () => {
    setError(
      "This URL didn't load as an image. Make sure it's a direct link to the image file (not a Cloudinary page/share link) and that it's publicly accessible."
    );
  };

  return (
    <div>
      <label className="label-field">{label}</label>
      {value ? (
        <div className="relative w-full max-w-xs">
          <img
            src={value}
            alt=""
            onError={handleImageError}
            onLoad={() => setError("")}
            className="w-full aspect-video object-cover rounded-lg border border-ink-400/20"
          />
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

      <div className="mt-3 max-w-xs">
        <label className="text-xs text-ink-400 mb-1 block">Or paste an image URL</label>
        <input
          type="text"
          inputMode="url"
          placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
          className="input-field text-sm"
          value={value && !value.includes("firebasestorage") ? value : ""}
          onChange={(e) => handlePastedUrl(e.target.value)}
          onBlur={(e) => handlePastedUrl(e.target.value)}
        />
      </div>
    </div>
  );
}
