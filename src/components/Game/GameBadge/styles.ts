import type {CSSProperties} from "react";

export const S = {
    badge: {
        position: "absolute", top: 10, right: 10,
        fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
        textTransform: "uppercase", letterSpacing: 0.5,
        display: "inline-flex", alignItems: "center", gap: 5, zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
    } satisfies CSSProperties,

    hot: {
        background: "linear-gradient(135deg,#ff3333,#cc0000)", color: "#fff",
    } satisfies CSSProperties,

    new: {
        background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff",
    } satisfies CSSProperties,

    gold: {
        background: "linear-gradient(135deg,#ffce00,#b59200)", color: "#050508",
    } satisfies CSSProperties,
};
