import {collection, doc, getDoc, setDoc, query, where, getDocs, serverTimestamp} from "firebase/firestore";
import {db} from "./firebase";

// API_BASE will be relative on same-origin host, or specific for local test.
const API_BASE = import.meta.env.DEV ? "http://localhost:5173" : (window.location.hostname === "anatoliyval.github.io" ? "https://jsbet.onrender.com" : "");

export async function getUserRating(userId: string, gameId: string): Promise<number | null> {
    try {
        const res = await fetch(`${API_BASE}/api/ratings/${encodeURIComponent(gameId)}/user/${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error("Failed to fetch user rating from API");
        const data = await res.json();
        return data.rating ?? null;
    } catch (e) {
        console.warn("API unavailable, falling back to Firebase directly:", e);
        // Fallback
        const docId = `${userId}_${gameId}`;
        const snap = await getDoc(doc(db, "ratings", docId));
        if (!snap.exists()) return null;
        return snap.data().rating ?? null;
    }
}

export async function setUserRating(
    userId: string,
    gameId: string,
    rating: number
): Promise<void> {
    if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");
    try {
        const res = await fetch(`${API_BASE}/api/ratings/${encodeURIComponent(gameId)}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId, rating }),
        });
        if (!res.ok) throw new Error("Failed to set user rating via API");
    } catch (e) {
        console.warn("API unavailable, falling back to Firebase directly:", e);
        // Fallback
        const docId = `${userId}_${gameId}`;
        await setDoc(doc(db, "ratings", docId), {
            userId,
            gameId,
            rating,
            timestamp: serverTimestamp(),
        });
    }
}

export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    try {
        const res = await fetch(`${API_BASE}/api/ratings/${encodeURIComponent(gameId)}`);
        if (!res.ok) throw new Error("Failed to fetch average rating from API");
        const data = await res.json();
        return { avg: data.avg || 0, count: data.count || 0 };
    } catch (e) {
        console.warn("API unavailable, falling back to Firebase directly:", e);
        // Fallback
        const q = query(collection(db, "ratings"), where("gameId", "==", gameId));
        const snap = await getDocs(q);
        if (snap.empty) return {avg: 0, count: 0};
        let total = 0;
        snap.forEach((d) => { total += d.data().rating || 0; });
        return { avg: Math.round((total / snap.size) * 10) / 10, count: snap.size };
    }
}
