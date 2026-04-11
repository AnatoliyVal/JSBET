import { collection, doc, getDoc, setDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserRating(userId: string, gameId: string): Promise<number | null> {
    try {
        const docId = `${userId}_${gameId}`;
        const snap = await getDoc(doc(db, "ratings", docId));
        if (!snap.exists()) return null;
        return snap.data().rating ?? null;
    } catch (e) {
        console.error("Error fetching user rating:", e);
        return null;
    }
}

export async function setUserRating(
    userId: string,
    gameId: string,
    rating: number
): Promise<void> {
    if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5");
    
    const docId = `${userId}_${gameId}`;
    await setDoc(doc(db, "ratings", docId), {
        userId,
        gameId,
        rating,
        timestamp: serverTimestamp(),
    });
}

export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    try {
        const q = query(collection(db, "ratings"), where("gameId", "==", gameId));
        const snap = await getDocs(q);
        
        if (snap.empty) return { avg: 0, count: 0 };
        
        let total = 0;
        snap.forEach((d) => {
            total += d.data().rating || 0;
        });
        
        return {
            avg: Math.round((total / snap.size) * 10) / 10,
            count: snap.size,
        };
    } catch (e) {
        console.error("Error fetching average rating:", e);
        return { avg: 0, count: 0 };
    }
}
