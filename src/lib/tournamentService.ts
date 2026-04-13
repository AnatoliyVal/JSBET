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
import {db} from "./firebase";


export async function registerForTournament(userId: string, tournamentId: string): Promise<void> {
    const id = `${userId}_${tournamentId}`;
    await setDoc(doc(db, "tournament_registrations", id), {
        userId,
        tournamentId,
        registeredAt: serverTimestamp(),
    });
}


export async function unregisterFromTournament(userId: string, tournamentId: string): Promise<void> {
    const id = `${userId}_${tournamentId}`;
    await deleteDoc(doc(db, "tournament_registrations", id));
}


export async function isUserRegistered(userId: string, tournamentId: string): Promise<boolean> {
    const id = `${userId}_${tournamentId}`;
    const snap = await getDoc(doc(db, "tournament_registrations", id));
    return snap.exists();
}


export async function getUserRegistrations(userId: string): Promise<string[]> {
    const q = query(collection(db, "tournament_registrations"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data().tournamentId as string);
}
