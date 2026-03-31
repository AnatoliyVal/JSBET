import { collection, writeBatch, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { GAMES_DB } from "../components/Game/RandomGame/RandomGame";

const TOURNAMENTS_DATA = [
    {
        id: "golden-slots",
        name: "Golden Slots Championship",
        prize: "₴500 000",
        status: "live",
        theme: "gold",
        dateRange: "04.03 – 10.03.2026",
        participants: "1 248",
        maxParticipants: "2 000",
        minBet: "₴10",
        games: "Sweet Bonanza, Gates of Olympus",
        condition: "Мінімум 50 спінів для кваліфікації",
    },
    {
        id: "fishing-frenzy",
        name: "Fishing Frenzy Cup",
        prize: "₴200 000",
        status: "upcoming",
        theme: "blue",
        dateRange: "12.03 – 14.03.2026",
        participants: "384",
        maxParticipants: "1 000",
        minBet: "₴5",
        games: "Big Bass Bonanza, Fishing Club",
        condition: "Рейтинг за загальною сумою виграшів",
    },
    {
        id: "jackpot-hunter",
        name: "Jackpot Hunter Series",
        prize: "₴1 000 000",
        status: "live",
        theme: "purple",
        dateRange: "01.03 – 15.03.2026",
        participants: "8 942",
        maxParticipants: "10 000",
        minBet: "₴20",
        games: "Всі ігри з джекпотами",
        condition: "Рейтинг за максимальним множником виграшу",
    },
    {
        id: "weekend-clash",
        name: "Weekend Clash",
        prize: "₴150 000",
        status: "finished",
        theme: "green",
        dateRange: "28.02 – 01.03.2026",
        participants: "2 450",
        maxParticipants: "3 000",
        minBet: "₴5",
        games: "Будь-які слоти",
        condition: "Рейтинг за кількістю виграшних спінів",
    },
];

export async function seedDatabase(): Promise<{ games: number; tournaments: number }> {
    // Check if already seeded
    const existingSnap = await getDocs(collection(db, "games"));
    if (!existingSnap.empty) {
        return { games: existingSnap.size, tournaments: 0 };
    }

    const batch = writeBatch(db);
    let gameCount = 0;
    let tournamentCount = 0;

    // Seed games
    for (const game of GAMES_DB) {
        const ref = doc(collection(db, "games"));
        batch.set(ref, { ...game, id: game.GameName });
        gameCount++;
    }

    // Seed tournaments
    for (const tournament of TOURNAMENTS_DATA) {
        const ref = doc(db, "tournaments", tournament.id);
        batch.set(ref, tournament);
        tournamentCount++;
    }

    await batch.commit();
    return { games: gameCount, tournaments: tournamentCount };
}

export async function fetchTournamentsFromDB() {
    const snap = await getDocs(collection(db, "tournaments"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
