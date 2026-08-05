import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Subscribes in realtime to a Firestore collection.
 * @param {string} collectionName
 * @param {string} orderField - field to sort by (defaults to "createdAt")
 * @param {"asc"|"desc"} direction
 */
export function useCollection(collectionName, orderField = "createdAt", direction = "desc") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let q;
    try {
      q = orderField
        ? query(collection(db, collectionName), orderBy(orderField, direction))
        : collection(db, collectionName);
    } catch (err) {
      q = collection(db, collectionName);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`useCollection(${collectionName}) error:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, orderField, direction]);

  return { data, loading, error };
}
