import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type Review = {
    id: string;
    gameId: string;
    userId: string;
    displayName: string;
    text: string;
    timestamp: Date;
    badges?: string[];
    avatar?: string;
    rainbowActive?: boolean;
};

/**
 * Fetch all reviews for a game, sorted by newest first.
 */
export async function getReviews(gameId: string): Promise<Review[]> {
    const q = query(
        collection(db, "reviews"),
        where("gameId", "==", gameId)
    );
    const snap = await getDocs(q);
    const reviews = snap.docs.map((d) => {
        const data = d.data();
        return {
            id: d.id,
            gameId: data.gameId as string,
            userId: data.userId as string,
            displayName: data.displayName as string,
            text: data.text as string,
            timestamp: (data.timestamp as Timestamp)?.toDate?.() ?? new Date(),
            badges: data.badges ?? [
                ...(data.isVip ? ["VIP"] : []),
                ...(data.isClown ? ["CLOWN"] : [])
            ],
            avatar: (data.avatar as string) ?? "",
            rainbowActive: !!data.rainbowActive,
        };
    });
    // Sort oldest first (top to bottom chronological)
    return reviews.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

/**
 * Submit a new review for a game.
 */
export async function addReview(
    gameId: string,
    userId: string,
    displayName: string,
    text: string,
    badges: string[] = [],
    avatar = "",
    rainbowActive = false
): Promise<void> {
    await addDoc(collection(db, "reviews"), {
        gameId,
        userId,
        displayName,
        text: text.trim(),
        badges,
        avatar,
        rainbowActive,
        timestamp: serverTimestamp(),
    });
}

