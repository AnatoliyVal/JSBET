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

    form: {
        display: "flex", flexDirection: "column", gap: 16, flex: 1,
    } satisfies CSSProperties,

    field: {
        display: "flex", flexDirection: "column", gap: 6,
    } satisfies CSSProperties,

    label: {
        fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)",
    } satisfies CSSProperties,

    input: {
        height: 48, background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)",
        padding: "0 16px", color: "var(--color-text-primary)",
        fontSize: 15, transition: "border-color 0.18s, box-shadow 0.18s",
        outline: "none", fontFamily: "inherit",
    } satisfies CSSProperties,

    error: {
        fontSize: 12, color: "var(--color-red)", marginTop: 2,
    } satisfies CSSProperties,

    errorRoot: {
        fontSize: 13, color: "var(--color-red)", textAlign: "center",
        background: "rgba(255,51,51,0.1)", padding: "10px 12px",
        borderRadius: "var(--radius-sm)", border: "1px solid rgba(255,51,51,0.2)",
        marginTop: 8,
    } satisfies CSSProperties,

    submitBtn: {
        marginTop: 8, height: 48, fontSize: 15,
    } satisfies CSSProperties,

    // Verify Step
    verifyStep: {
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
    } satisfies CSSProperties,

    verifyIcon: {
        width: 64, height: 64, borderRadius: "50%",
        background: "var(--color-gold-dim)", color: "var(--color-gold)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 20, boxShadow: "0 0 0 8px rgba(255,206,0,0.05)",
    } satisfies CSSProperties,

    verifyTitle: {
        fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)",
        marginBottom: 12, letterSpacing: -0.5,
    } satisfies CSSProperties,

    verifyDesc: {
        fontSize: 14, color: "var(--color-text-secondary)",
        lineHeight: 1.5, marginBottom: 32, maxWidth: 300,
    } satisfies CSSProperties,

    verifyInputs: {
        display: "flex", gap: 12, justifyContent: "center", marginBottom: 32,
    } satisfies CSSProperties,

    verifyBox: (filled: boolean): CSSProperties => ({
        width: 48, height: 56, background: "rgba(255,255,255,0.04)",
        border: `1px solid ${filled ? "var(--color-gold)" : "var(--color-border)"}`,
        borderRadius: "var(--radius-lg)", fontSize: 24, fontWeight: 700,
        color: filled ? "var(--color-gold)" : "var(--color-text-primary)",
        textAlign: "center", outline: "none", transition: "all 0.1s", fontFamily: "inherit",
    }),

    verifyFooter: {
        display: "flex", flexDirection: "column", gap: 16, width: "100%",
    } satisfies CSSProperties,

    verifyCountdown: {
        fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500,
    } satisfies CSSProperties,

    verifyResendBtn: {
        background: "none", border: "none", padding: 0,
        fontSize: 13, color: "var(--color-gold)", fontWeight: 600,
        cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s",
    } satisfies CSSProperties,

    verifyBackBtn: {
        background: "none", border: "none", padding: 0,
        fontSize: 13, color: "var(--color-text-muted)",
        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
        alignSelf: "center", textDecoration: "none", fontFamily: "inherit",
        transition: "color 0.2s",
    } satisfies CSSProperties,
};
