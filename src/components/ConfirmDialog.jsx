import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, title, text, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="card p-6 max-w-sm w-full"
          >
            <div className="flex items-center gap-3 mb-3 text-circuit">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-display font-semibold text-ink-100">{title}</p>
            </div>
            <p className="text-sm text-ink-400 mb-6">{text}</p>
            <div className="flex justify-end gap-3">
              <button onClick={onCancel} className="btn-secondary !py-2 !px-4 text-sm">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-full bg-red-500/90 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
