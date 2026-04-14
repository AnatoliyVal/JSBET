import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {AuthModalTab} from "../components/Auth/AuthModal";
import {getProfile, saveProfile} from "../lib/profilesService";
import type {TransactionRecord, GameHistoryRecord} from "../interfaces/records";

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
    gameHistory?: GameHistoryRecord[];
    transactions?: TransactionRecord[];
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
    topUpBalance: (amount: number) => void;
    withdrawBalance: (amount: number) => { ok: boolean; message?: string };
    activateVip: () => void;
    activateNewBadge: () => void;
    activateRainbow: () => void;
    deactivateRainbow: () => void;
    logGameHistory: (gameName: string, betAmount: number, winAmount: number) => void;
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

            openAuthModal: (tab = "login") => set({authModalOpen: true, authModalTab: tab}),
            closeAuthModal: () => set({authModalOpen: false}),

            login: async (email, password) => {
                const normalized = email.trim().toLowerCase();
                const record = get().demoUsers[normalized];

                const cloudResult = await getProfile(normalized);
                const cloudProfile = cloudResult?.user;
                const cloudPassword = cloudResult?.password;

                if (record) {
                    if (record.password !== password) {
                        return {ok: false, message: "Невірний email або пароль"};
                    }
                } else if (cloudPassword) {
                    if (cloudPassword !== password) {
                        return {ok: false, message: "Невірний email або пароль"};
                    }
                    set(state => ({
                        demoUsers: {
                            ...state.demoUsers,
                            [normalized]: {password, displayName: cloudProfile?.displayName || normalized.split("@")[0]}
                        }
                    }));
                } else {
                    return {ok: false, message: "Невірний email або пароль"};
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
                return {ok: true};
            },

            register: async (email, password, displayName) => {
                const normalized = email.trim().toLowerCase();
                if (get().demoUsers[normalized]) {
                    return {ok: false, message: "Користувач з таким email уже зареєстрований"};
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
                return {ok: true};
            },

            logout: () => set({user: null, token: null}),

            syncFromCloud: (profile) => {
                set(state => ({
                    user: state.user
                        ? {...state.user, ...profile, badges: profile.badges || state.user.badges || []}
                        : {...profile, badges: profile.badges || []}
                }));
            },

            updateProfile: (fields) => {
                const state = get();
                if (!state.user) return;
                const newUser = {...state.user, ...fields};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            topUpBalance: (amount: number) => {
                const state = get();
                if (!state.user) return;
                const tx: TransactionRecord = { id: Date.now().toString(), type: "topup", amount, date: Date.now(), status: "success" };
                const newTxs = [tx, ...(state.user.transactions || [])];
                const newUser = {...state.user, balance: (state.user.balance ?? 0) + amount, transactions: newTxs};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            withdrawBalance: (amount: number) => {
                const state = get();
                if (!state.user) return {ok: false, message: "Не авторизовано"};
                if ((state.user.balance ?? 0) < amount) return {ok: false, message: "Недостатньо коштів"};
                const tx: TransactionRecord = { id: Date.now().toString(), type: "withdraw", amount, date: Date.now(), status: "success" };
                const newTxs = [tx, ...(state.user.transactions || [])];
                const newUser = {...state.user, balance: (state.user.balance ?? 0) - amount, transactions: newTxs};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
                return {ok: true};
            },

            activateVip: () => {
                const state = get();
                if (!state.user) return;
                const currentBadges = state.user.badges || [];
                const newBadges = currentBadges.includes("VIP")
                    ? currentBadges
                    : [...currentBadges, "VIP"];
                const newUser = {...state.user, badges: newBadges};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            activateNewBadge: () => {
                const state = get();
                if (!state.user) return;
                const newUser = {...state.user, isNewUntil: Date.now() + 2 * 24 * 60 * 60 * 1000};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            activateRainbow: () => {
                const state = get();
                if (!state.user) return;
                const newUser = {...state.user, rainbowActive: true};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            deactivateRainbow: () => {
                const state = get();
                if (!state.user) return;
                const newUser = {...state.user, rainbowActive: false};
                set({user: newUser});
                saveProfile(newUser.email, newUser).catch(console.error);
            },

            logGameHistory: (gameName, betAmount, winAmount) => {
                const state = get();
                if (!state.user) return;
                const record: GameHistoryRecord = { id: Date.now().toString() + Math.random(), gameName, betAmount, winAmount, date: Date.now() };
                const newHistory = [record, ...(state.user.gameHistory || [])].slice(0, 100); 
                const newUser = {...state.user, gameHistory: newHistory};
                set({user: newUser});
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
                const newUser = {...state.user, hiddenBadges: newHidden};
                set({user: newUser});
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
