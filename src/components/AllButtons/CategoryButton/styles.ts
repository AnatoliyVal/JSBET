import type {CSSProperties} from "react";

export const chip = (active: boolean): CSSProperties => ({
    height: "100%",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    borderRadius: "9999px",
    background: active ? "rgba(255,206,0,0.15)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${active ? "rgba(255,206,0,0.35)" : "rgba(255,255,255,0.07)"}`,
    fontSize: 13,
    fontWeight: active ? 600 : 500,
    color: active ? "var(--color-gold)" : "var(--color-text-secondary)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.18s ease, color 0.18s ease",
    fontFamily: "inherit",
});

export const thumb: CSSProperties = {
    width: 32, height: 32,
    borderRadius: 8,
    objectFit: "cover",
    flexShrink: 0,
};
