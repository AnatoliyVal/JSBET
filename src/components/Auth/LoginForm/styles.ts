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
};
