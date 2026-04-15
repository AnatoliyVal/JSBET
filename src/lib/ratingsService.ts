const API_BASE = import.meta.env.DEV ? "http://localhost:3001" : "";

export async function getUserRating(userId: string, gameId: string): Promise<number | null> {
    try {
        const res = await fetch(`${API_BASE}/api/ratings/${encodeURIComponent(gameId)}/user/${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error("Failed to fetch user rating");
        const data = await res.json();
        return data.rating ?? null;
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
    try {
        const res = await fetch(`${API_BASE}/api/ratings/${encodeURIComponent(gameId)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, rating }),
        });
        if (!res.ok) throw new Error("Failed to set user rating");
    } catch (e) {
        console.error("Error setting user rating:", e);
        throw e;
    }
}

export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    try {
        const res = await fetch(`${API_BASE}/api/ratings/${encodeURIComponent(gameId)}`);
        if (!res.ok) throw new Error("Failed to fetch average rating");
        const data = await res.json();
        return { avg: data.avg || 0, count: data.count || 0 };
    } catch (e) {
        console.error("Error fetching average rating:", e);
        return { avg: 0, count: 0 };
    }
}
