import type {CSSProperties} from "react";

export const S = {
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
};
