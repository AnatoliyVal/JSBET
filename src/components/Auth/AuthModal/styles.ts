import type {CSSProperties} from "react";

export const S = {
    backdrop: {
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(5,5,8,0.8)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
    } satisfies CSSProperties,

    modal: {
        background: "var(--color-bg-card)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)", width: "100%", maxWidth: 440,
        padding: "56px 32px 40px", position: "relative",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        maxHeight: "90vh", overflowY: "auto",
        display: "flex", flexDirection: "column",
    } satisfies CSSProperties,

    closeBtn: {
        position: "absolute", top: 16, right: 16, zIndex: 10,
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.06)", border: "1px solid transparent",
        color: "var(--color-text-secondary)", fontSize: 13,
        cursor: "pointer", transition: "color 0.18s, background 0.18s",
    } satisfies CSSProperties,

    tabs: {
        display: "flex", background: "rgba(255,255,255,0.04)",
        borderRadius: "var(--radius-lg)", padding: 4, marginBottom: 32,
    } satisfies CSSProperties,

    tab: (active: boolean): CSSProperties => ({
        flex: 1, padding: "10px 0", borderRadius: "10px",
        fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
        background: active ? "var(--color-gold)" : "transparent",
        color: active ? "var(--color-text-dark)" : "var(--color-text-secondary)",
        boxShadow: active ? "0 4px 12px rgba(255,206,0,0.3)" : "none",
        transition: "all 0.2s ease", fontFamily: "inherit",
    }),

    title: {
        fontSize: 22, fontWeight: 800, textAlign: "center",
        color: "var(--color-text-primary)", marginBottom: 24, letterSpacing: -0.5,
    } satisfies CSSProperties,
};
