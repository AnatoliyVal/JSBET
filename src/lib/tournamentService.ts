import {
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Register a user for a tournament
 */
export async function registerForTournament(userId: string, tournamentId: string): Promise<void> {
    const id = `${userId}_${tournamentId}`;
    await setDoc(doc(db, "tournament_registrations", id), {
        userId,
        tournamentId,
        registeredAt: serverTimestamp(),
    });
}

/**
 * Unregister (cancel) from a tournament
 */
export async function unregisterFromTournament(userId: string, tournamentId: string): Promise<void> {
    const id = `${userId}_${tournamentId}`;
    await deleteDoc(doc(db, "tournament_registrations", id));
}

/**
 * Check if a user is registered for a specific tournament
 */
export async function isUserRegistered(userId: string, tournamentId: string): Promise<boolean> {
    const id = `${userId}_${tournamentId}`;
    const snap = await getDoc(doc(db, "tournament_registrations", id));
    return snap.exists();
}

/**
 * Get all registrations for a specific user
 */
export async function getUserRegistrations(userId: string): Promise<string[]> {
    const q = query(collection(db, "tournament_registrations"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data().tournamentId as string);
}
