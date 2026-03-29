import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
    email: string;
    displayName: string;
};

type DemoUserRecord = {
    password: string;
    displayName: string;
};

const makeToken = (email: string) =>
    `jsbet-${encodeURIComponent(email)}-${Date.now()}`;

export type AuthStore = {
    user: AuthUser | null;
    token: string | null;
    /**
     * Демо-реєстрації (паролі в plain text — лише для навчального проєкту).
     * У продакшені дані мають бути на сервері.
     */
    demoUsers: Record<string, DemoUserRecord>;
    login: (email: string, password: string) => { ok: true } | { ok: false; message: string };
    register: (
        email: string,
        password: string,
        displayName: string
    ) => { ok: true } | { ok: false; message: string };
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            demoUsers: {},

            login: (email, password) => {
                const normalized = email.trim().toLowerCase();
                const record = get().demoUsers[normalized];
                if (!record || record.password !== password) {
                    return { ok: false, message: "Невірний email або пароль" };
                }
                const token = makeToken(normalized);
                set({
                    user: { email: normalized, displayName: record.displayName },
                    token,
                });
                return { ok: true };
            },

            register: (email, password, displayName) => {
                const normalized = email.trim().toLowerCase();
                if (get().demoUsers[normalized]) {
                    return { ok: false, message: "Користувач з таким email уже зареєстрований" };
                }
                const token = makeToken(normalized);
                set((state) => ({
                    demoUsers: {
                        ...state.demoUsers,
                        [normalized]: {
                            password,
                            displayName: displayName.trim() || normalized.split("@")[0],
                        },
                    },
                    user: {
                        email: normalized,
                        displayName: displayName.trim() || normalized.split("@")[0],
                    },
                    token,
                }));
                return { ok: true };
            },

            logout: () => set({ user: null, token: null }),
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
