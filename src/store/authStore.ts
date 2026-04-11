import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthModalTab } from "../components/Auth/AuthModal";
import { getProfile, saveProfile } from "../lib/profilesService";

export type AuthUser = {
    email: string;
    displayName: string;
    phone: string;
    dob: string;
    country: string;
    avatar: string;
    balance: number;
    badges: string[];
    isNewUntil?: number;
    lastSeen?: number;
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
    updateProfile: (fields: Partial<Pick<AuthUser, "phone" | "dob" | "country" | "avatar" | "displayName" | "balance" | "rainbowActive" | "hiddenBadges">>) => void;
    syncFromCloud: (profile: AuthUser) => void;
    activateVip: () => void;
    activateNewBadge: () => void;
    activateRainbow: () => void;
    deactivateRainbow: () => void;
    toggleBadgeVisibility: (badgeName: string) => void;
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
                
                const cloudResult = await getProfile(normalized);
                const cloudProfile = cloudResult?.user;
                const cloudPassword = cloudResult?.password;

                if (record) {
                    if (record.password !== password) {
                        return { ok: false, message: "Невірний email або пароль" };
                    }
                } else if (cloudPassword) {
                    if (cloudPassword !== password) {
                        return { ok: false, message: "Невірний email або пароль" };
                    }
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
                    isNewUntil: Date.now() + 2 * 24 * 60 * 60 * 1000,
                };

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
