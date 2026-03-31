import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthModalTab } from "../components/Auth/AuthModal";
import { getProfile, saveProfile } from "../lib/profilesService";

export type AuthUser = {
    email: string;
    displayName: string;
    // Extended profile fields
    phone: string;
    dob: string;
    country: string;
    avatar: string; // base64 data URL
    balance: number;
    badges: string[];    // e.g. ["VIP", "CLOWN"]
    isNewUntil?: number; // timestamp until which the user is considered "NEW"
    lastSeen?: number;   // timestamp of last activity
    rainbowActive?: boolean;
    hiddenBadges?: string[];
};

type DemoUserRecord = {
    password: string;
    displayName: string;
};

const makeToken = (email: string) =>
    `jsbet-${encodeURIComponent(email)}-${Date.now()}`;

const defaultProfile = {
    phone: "",
    dob: "",
    country: "ua",
    avatar: "",
    balance: 0,
    badges: [],
    isNewUntil: 0,
    rainbowActive: false,
    hiddenBadges: [],
};

export type AuthStore = {
    user: AuthUser | null;
    token: string | null;
    demoUsers: Record<string, DemoUserRecord>;
    login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
    register: (
        email: string,
        password: string,
        displayName: string
    ) => Promise<{ ok: true } | { ok: false; message: string }>;
    logout: () => void;
    /** Update editable profile fields and sync to Cloud */
    updateProfile: (fields: Partial<Pick<AuthUser, "phone" | "dob" | "country" | "avatar" | "displayName" | "balance" | "rainbowActive" | "hiddenBadges">>) => void;
    /** Silently update local store from cloud updates */
    syncFromCloud: (profile: AuthUser) => void;
    /** Activate VIP status */
    activateVip: () => void;
    /** Activate NEW badge for 2 days */
    activateNewBadge: () => void;
    /** Rainbow nickname effect */
    activateRainbow: () => void;
    deactivateRainbow: () => void;
    toggleBadgeVisibility: (badgeName: string) => void;
    // UI state for auth modal
    authModalOpen: boolean;
    authModalTab: AuthModalTab;
    openAuthModal: (tab?: AuthModalTab) => void;
    closeAuthModal: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            demoUsers: {},

            authModalOpen: false,
            authModalTab: "login",

            openAuthModal: (tab = "login") => set({ authModalOpen: true, authModalTab: tab }),
            closeAuthModal: () => set({ authModalOpen: false }),

            login: async (email, password) => {
                const normalized = email.trim().toLowerCase();
                const record = get().demoUsers[normalized];
                
                // Check cloud first if local is missing or just to get the profile data
                const cloudResult = await getProfile(normalized);
                const cloudProfile = cloudResult?.user;
                const cloudPassword = cloudResult?.password;

                if (record) {
                    // Local check
                    if (record.password !== password) {
                        return { ok: false, message: "Невірний email або пароль" };
                    }
                } else if (cloudPassword) {
                    // Cloud check
                    if (cloudPassword !== password) {
                        return { ok: false, message: "Невірний email або пароль" };
                    }
                    // Restore to local storage
                    set(state => ({
                        demoUsers: {
                            ...state.demoUsers,
                            [normalized]: { password, displayName: cloudProfile?.displayName || normalized.split("@")[0] }
                        }
                    }));
                } else {
                    return { ok: false, message: "Невірний email або пароль" };
                }
                
                const token = makeToken(normalized);
                set({
                    user: cloudProfile ? cloudProfile : {
                        email: normalized,
                        displayName: record?.displayName || normalized.split("@")[0],
                        ...defaultProfile,
                    },
                    token,
                });
                return { ok: true };
            },

            register: async (email, password, displayName) => {
                const normalized = email.trim().toLowerCase();
                if (get().demoUsers[normalized]) {
                    return { ok: false, message: "Користувач з таким email уже зареєстрований" };
                }
                const token = makeToken(normalized);
                
                const newUser = {
                    email: normalized,
                    displayName: displayName.trim() || normalized.split("@")[0],
                    ...defaultProfile,
                    isNewUntil: Date.now() + 2 * 24 * 60 * 60 * 1000, // +2 days
                };

                // Sync to cloud WITH password
                await saveProfile(normalized, newUser, password);

                set((state) => ({
                    demoUsers: {
                        ...state.demoUsers,
                        [normalized]: {
                            password,
                            displayName: newUser.displayName,
                        },
                    },
                    user: newUser,
                    token,
                }));
                return { ok: true };
            },

            logout: () => set({ user: null, token: null }),

            syncFromCloud: (profile) => {
                set(state => ({
                    user: state.user 
                        ? { ...state.user, ...profile, badges: profile.badges || state.user.badges || [] } 
                        : { ...profile, badges: profile.badges || [] }
                }));
            },

            updateProfile: (fields) => {
                const state = get();
                if (!state.user) return;
                const newUser = { ...state.user, ...fields };
                set({ user: newUser });
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            activateVip: () => {
                const state = get();
                if (!state.user) return;
                const currentBadges = state.user.badges || [];
                const newBadges = currentBadges.includes("VIP") 
                    ? currentBadges 
                    : [...currentBadges, "VIP"];
                const newUser = { ...state.user, badges: newBadges };
                set({ user: newUser });
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            activateNewBadge: () => {
                const state = get();
                if (!state.user) return;
                const newUser = { ...state.user, isNewUntil: Date.now() + 2 * 24 * 60 * 60 * 1000 };
                set({ user: newUser });
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            activateRainbow: () => {
                const state = get();
                if (!state.user) return;
                const newUser = { ...state.user, rainbowActive: true };
                set({ user: newUser });
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            deactivateRainbow: () => {
                const state = get();
                if (!state.user) return;
                const newUser = { ...state.user, rainbowActive: false };
                set({ user: newUser });
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            toggleBadgeVisibility: (badgeName: string) => {
                const state = get();
                if (!state.user) return;
                const normalized = badgeName.toUpperCase();
                const currentHidden = state.user.hiddenBadges || [];
                const newHidden = currentHidden.includes(normalized)
                    ? currentHidden.filter(b => b !== normalized)
                    : [...currentHidden, normalized];
                const newUser = { ...state.user, hiddenBadges: newHidden };
                set({ user: newUser });
                saveProfile(newUser.email, newUser).catch(console.error);
            },
        }),
        {
            name: "jsbet-auth",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                demoUsers: state.demoUsers,
            }),
        }
    )
);
