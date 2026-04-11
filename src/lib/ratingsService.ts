const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function getUserRating(userId: string, gameId: string): Promise<number | null> {
    const res = await fetch(
        `${API_URL}/api/ratings/${encodeURIComponent(gameId)}/user/${encodeURIComponent(userId)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.rating ?? null;
}

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
        throw new Error(msg);
    }
}

export async function getAverageRating(
    gameId: string
): Promise<{ avg: number; count: number }> {
    const res = await fetch(`${API_URL}/api/ratings/${encodeURIComponent(gameId)}`);
    if (!res.ok) {
        return { avg: 0, count: 0 };
    }
    return res.json() as Promise<{ avg: number; count: number }>;
}
