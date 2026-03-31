import {
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Get the rating a specific user gave to a specific game.
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
 */
export async function setUserRating(
    userId: string,
    gameId: string,
    rating: number
): Promise<void> {
    const id = `${userId}_${gameId}`;
    await setDoc(doc(db, "ratings", id), {
        userId,
        gameId,
        rating,
        timestamp: serverTimestamp(),
    });
}

/**
 * Calculate the average rating and total count for a game.
 */
export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    const q = query(collection(db, "ratings"), where("gameId", "==", gameId));
    const snap = await getDocs(q);
    if (snap.empty) return { avg: 0, count: 0 };
    let total = 0;
    snap.forEach((d) => {
        total += d.data().rating as number;
    });
    return {
        avg: Math.round((total / snap.size) * 10) / 10,
        count: snap.size,
    };
}
