import type { CSSProperties } from "react";

const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 30,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.2,
    minHeight: 44,
    padding: "0 20px",
    border: "1px solid transparent",
    whiteSpace: "nowrap",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
};

export const btnPrimary = (hover: boolean): CSSProperties => ({
    ...base,
    background: hover ? "#f7d958" : "var(--color-gold)",
    color: "var(--color-text-dark)",
});

export const btnGhost = (hover: boolean): CSSProperties => ({
    ...base,
    background: "transparent",
    color: hover ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    borderColor: hover ? "rgba(255,255,255,0.18)" : "var(--color-border)",
});

export const btnGhostSm = (hover: boolean): CSSProperties => ({
    ...base,
    background: "transparent",
    color: hover ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    borderColor: hover ? "rgba(255,255,255,0.18)" : "var(--color-border)",
    minHeight: 32,
    padding: "0 12px",
    fontSize: 13,
});

export const btnSm: CSSProperties = { minHeight: 36, padding: "0 16px", fontSize: 13 };
