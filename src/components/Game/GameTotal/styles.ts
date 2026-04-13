import type {CSSProperties} from "react";

export const S = {
    card: {
        background: "var(--color-bg-card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--color-border)",
        transition: "transform var(--transition-med), box-shadow var(--transition-med)",
        position: "relative",
    } satisfies CSSProperties,

    thumb: {
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        background: "#0c1015",
    } satisfies CSSProperties,

    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        transition: "transform 0.4s ease",
    } satisfies CSSProperties,

    overlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity var(--transition-med)",
    } satisfies CSSProperties,

    playBtn: {
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--color-gold)",
        color: "var(--color-text-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 700,
    } satisfies CSSProperties,

    info: {
        padding: "8px 10px 10px",
    } satisfies CSSProperties,

    name: {
        fontSize: 13,
        fontWeight: 600,
        color: "var(--color-text-primary)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        margin: 0,
    } satisfies CSSProperties,

    provider: {
        fontSize: 11,
        color: "var(--color-text-muted)",
        marginTop: 2,
        textTransform: "uppercase",
        letterSpacing: 0.3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    } satisfies CSSProperties,
};
