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
        dateRange: "01.04 – 07.04.2026",
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
        dateRange: "05.04 – 07.04.2026",
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
        dateRange: "01.03 – 15.04.2026",
        participants: "8 942",
        maxParticipants: "15 000",
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
        dateRange: "28.03 – 30.03.2026",
        participants: "2 450",
        maxParticipants: "3 000",
        minBet: "₴5",
        games: "Будь-які слоти",
        condition: "Рейтинг за кількістю виграшних спінів",
    },
    {
        id: "neon-night",
        name: "Neon Night Race",
        prize: "₴300 000",
        status: "live",
        theme: "cyan",
        dateRange: "01.04 – 04.04.2026",
        participants: "567",
        maxParticipants: "1 200",
        minBet: "₴15",
        games: "Vegas Slots, Neon Joker",
        condition: "Максимальний виграш за один спін",
    },
    {
        id: "egypt-treasures",
        name: "Treasures of Egypt",
        prize: "₴400 000",
        status: "upcoming",
        theme: "orange",
        dateRange: "08.04 – 12.04.2026",
        participants: "0",
        maxParticipants: "2 500",
        minBet: "₴10",
        games: "Sun of Egypt 3, Book of Ra",
        condition: "Сума всіх множників виграшу",
    },
    {
        id: "fruit-party",
        name: "Fruit Party Tournament",
        prize: "₴100 000",
        status: "upcoming",
        theme: "yellow",
        dateRange: "10.04 – 11.04.2026",
        participants: "12",
        maxParticipants: "500",
        minBet: "₴2",
        games: "Всі фруктові слоти",
        condition: "Кількість виграних бонусних руундів",
    },
    {
        id: "high-roller-elite",
        name: "High Roller Elite",
        prize: "₴2 500 000",
        status: "live",
        theme: "red",
        dateRange: "01.04 – 30.04.2026",
        participants: "156",
        maxParticipants: "500",
        minBet: "₴100",
        games: "VIP Слоти & Live Games",
        condition: "Загальний обіг ставок",
    },
    {
        id: "viking-glory",
        name: "Viking Glory",
        prize: "₴250 000",
        status: "finished",
        theme: "brown",
        dateRange: "20.03 – 25.03.2026",
        participants: "1 890",
        maxParticipants: "2 000",
        minBet: "₴10",
        games: "Viking ігри",
        condition: "Рейтинг за найбільшою серією перемог",
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
