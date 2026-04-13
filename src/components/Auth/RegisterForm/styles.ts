import type {CSSProperties} from "react";

export const S = {
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
