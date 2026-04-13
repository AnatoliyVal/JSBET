import {doc, getDoc, setDoc, collection, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "./firebase";
import type {AuthUser} from "../store/authStore";

export async function saveProfile(email: string, data: AuthUser, password?: string): Promise<void> {
    const docRef = doc(db, "profiles", email.toLowerCase());
    const payload: any = {
        ...data,
        updatedAt: new Date().toISOString(),
    };
    if (password) payload.password = password;
    await setDoc(docRef, payload, {merge: true});
}

export async function getProfile(email: string): Promise<{ user: AuthUser; password?: string } | null> {
    const docRef = doc(db, "profiles", email.toLowerCase());
    const snap = await getDoc(docRef);
    if (snap.exists()) {
        const data = snap.data();
        const {password, ...user} = data;
        return {user: {...user, badges: user.badges || []} as AuthUser, password};
    }
    return null;
}

export function subscribeToProfile(email: string, onUpdate: (data: AuthUser) => void): () => void {
    const docRef = doc(db, "profiles", email.toLowerCase());
    return onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
            const data = snap.data();
            onUpdate({...data, badges: data.badges || []} as AuthUser);
        }
    });
}

export async function getAllProfiles(): Promise<AuthUser[]> {
    const colRef = collection(db, "profiles");
    const snap = await getDocs(colRef);
    return snap.docs.map(doc => {
        const data = doc.data();
        return {...data, badges: data.badges || []} as AuthUser;
    });
}

export async function updateHeartbeat(email: string): Promise<void> {
    const docRef = doc(db, "profiles", email.toLowerCase());
    await setDoc(docRef, {lastSeen: Date.now()}, {merge: true});
}
