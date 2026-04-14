import {collection, writeBatch, doc, getDocs} from "firebase/firestore";
import {db} from "./firebase";
import {Tournament, TOURNAMENTS_DATA} from "../interfaces/tournament";
import {GAMES_DB} from "../interfaces/game";

export async function seedDatabase(): Promise<{ games: number; tournaments: number }> {
    const existingSnap = await getDocs(collection(db, "games"));
    if (!existingSnap.empty) {
        return {games: existingSnap.size, tournaments: 0};
    }

    const batch = writeBatch(db);
    let gameCount = 0;
    let tournamentCount = 0;

    for (const game of GAMES_DB) {
        const ref = doc(collection(db, "games"));
        batch.set(ref, {...game, id: game.GameName});
        gameCount++;
    }

    for (const tournament of TOURNAMENTS_DATA) {
        const ref = doc(db, "tournaments", tournament.id);
        batch.set(ref, tournament);
        tournamentCount++;
    }

    await batch.commit();
    return {games: gameCount, tournaments: tournamentCount};
}

export async function fetchTournamentsFromDB() {
    const snap = await getDocs(collection(db, "tournaments"));
    return snap.docs.map((d) => ({id: d.id, ...d.data()})) as Tournament[];
}
