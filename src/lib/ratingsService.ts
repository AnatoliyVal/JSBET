import {
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// The Express server base URL (set via VITE_API_URL env var)
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

/**
 * Get the rating a specific user gave to a specific game.
 * Reads directly from Firestore (simple single-doc read, no need for a server route).
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
 * Calls the Express POST /api/ratings/:gameId endpoint.
 */
export async function setUserRating(
    userId: string,
    gameId: string,
    rating: number
): Promise<void> {
    const res = await fetch(`${API_URL}/api/ratings/${encodeURIComponent(gameId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rating }),
    });
    if (!res.ok) {
        const status = res.status;
        const err = await res.json().catch(() => ({}));
        const msg = err.error ?? `Failed to save rating (Status: ${status})`;
        console.error(`❌ Rating save failed for game ${gameId}:`, msg);
        throw new Error(msg);
    }
}

/**
 * Calculate the average rating and total count for a game.
 * Calls the Express GET /api/ratings/:gameId endpoint.
 */
export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    const res = await fetch(`${API_URL}/api/ratings/${encodeURIComponent(gameId)}`);
    if (!res.ok) {
        console.warn(`⚠️  Failed to fetch average rating for game ${gameId} (Status: ${res.status})`);
        return { avg: 0, count: 0 };
    }
    return res.json() as Promise<{ avg: number; count: number }>;
}
