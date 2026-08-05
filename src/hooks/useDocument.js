import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Subscribes in realtime to a single Firestore document.
 * @param {string} collectionName
 * @param {string} docId
 */
export function useDocument(collectionName, docId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const ref = doc(db, collectionName, docId);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setData(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`useDocument(${collectionName}/${docId}) error:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, docId]);

  return { data, loading, error };
}
