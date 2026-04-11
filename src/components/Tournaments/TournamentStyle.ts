import type { CSSProperties } from "react";

export const S = {
    overlay: {
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(5,5,8,0.8)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
    } satisfies CSSProperties,

    modal: {
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        width: "100%", maxWidth: 440, padding: "56px 32px 40px",
        position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        maxHeight: "90vh", overflowY: "auto", display: "flex", flexDirection: "column",
    } satisfies CSSProperties,

    close: {
        position: "absolute", top: 16, right: 16, width: 32, height: 32, zIndex: 10,
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.06)", border: "1px solid transparent",
        color: "var(--color-text-secondary)", fontSize: 13, cursor: "pointer",
        transition: "color 0.18s, background 0.18s",
    } satisfies CSSProperties,

    header: {
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 16, marginBottom: 24, textAlign: "center",
    } satisfies CSSProperties,

    iconBox: {
        width: 64, height: 64, borderRadius: "50%", background: "var(--color-gold-dim)",
        color: "var(--color-gold)", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, boxShadow: "0 0 0 8px rgba(255,206,0,0.05)",
    } satisfies CSSProperties,

    title: {
        fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", margin: 0, letterSpacing: -0.5,
    } satisfies CSSProperties,

    content: {
        display: "flex", flexDirection: "column", gap: 24, marginBottom: 32,
    } satisfies CSSProperties,

    text: {
        fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.6, textAlign: "center", margin: 0,
    } satisfies CSSProperties,

    tourName: {
        color: "var(--color-gold)", fontWeight: 700,
    } satisfies CSSProperties,

    userSection: {
        background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)", padding: 16, display: "flex", flexDirection: "column",
        gap: 12, alignItems: "center",
    } satisfies CSSProperties,

    label: {
        fontSize: 13, color: "var(--color-text-muted)", textTransform: "uppercase",
        letterSpacing: 0.5, fontWeight: 600,
    } satisfies CSSProperties,

    reminderBox: (active: boolean): CSSProperties => ({
        display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
        borderRadius: "var(--radius-lg)", cursor: "pointer", transition: "all 0.2s ease",
        border: `1px solid ${active ? "var(--color-gold)" : "var(--color-border)"}`,
        background: active ? "rgba(255,206,0,0.05)" : "rgba(255,255,255,0.02)",
    }),

    checkbox: (active: boolean): CSSProperties => ({
        width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease", border: `2px solid ${active ? "var(--color-gold)" : "var(--color-text-muted)"}`,
        background: active ? "var(--color-gold)" : "transparent", color: "var(--color-text-dark)", fontSize: 13,
    }),

    reminderInfo: {
        display: "flex", flexDirection: "column", gap: 4, flex: 1,
    } satisfies CSSProperties,

    reminderTitle: {
        fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)",
    } satisfies CSSProperties,

    reminderDesc: {
        fontSize: 13, color: "var(--color-text-muted)",
    } satisfies CSSProperties,

    mailIcon: {
        color: "var(--color-text-muted)", fontSize: 20, opacity: 0.5,
    } satisfies CSSProperties,

    actions: {
        display: "flex", flexDirection: "column", gap: 12,
    } satisfies CSSProperties,
};
