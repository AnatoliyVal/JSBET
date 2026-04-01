import {
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Get the rating a specific user gave to a specific game.
 * Reads directly from Firestore.
 * Returns null if the user hasn't rated yet.
 */
export async function getUserRating(userId: string, gameId: string): Promise<number | null> {
    const id = `${userId}_${gameId}`;
    const snap = await getDoc(doc(db, "ratings", id));
    if (!snap.exists()) return null;
    return (snap.data().rating as number) ?? null;
}

/**
 * Save (or overwrite) the rating a user gave to a game.
 * Writes directly to Firestore, bypassing the need for an Express backend.
 */
export async function setUserRating(
    userId: string,
    gameId: string,
    rating: number
): Promise<void> {
    try {
        const id = `${userId}_${gameId}`;
        await setDoc(doc(db, "ratings", id), {
            userId,
            gameId,
            rating,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        console.error(`❌ Rating save failed for game ${gameId}:`, err);
        throw new Error("Failed to save rating to Firestore");
    }
}

/**
 * Calculate the average rating and total count for a game.
 * Reads directly from Firestore, bypassing the Express backend.
 */
export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    try {
        const q = query(collection(db, "ratings"), where("gameId", "==", gameId));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return { avg: 0, count: 0 };
        }
        
        let total = 0;
        querySnapshot.forEach((docSnap) => {
            total += docSnap.data().rating;
        });
        
        return {
            avg: Math.round((total / querySnapshot.size) * 10) / 10,
            count: querySnapshot.size,
        };
    } catch (err) {
        console.warn(`⚠️  Failed to fetch average rating for game ${gameId}`, err);
        return { avg: 0, count: 0 };
    }
}
