import type { CSSProperties } from "react";

/** Дублікат палітри з :root — для інлайн-стилів, якщо коли знадобиться поза класами .btn */
export const btnPrimaryStyle: CSSProperties = {
    background: "var(--color-gold)",
    color: "var(--color-text-dark)",
};

export const btnGhostStyle: CSSProperties = {
    background: "transparent",
    color: "var(--color-text-secondary)",
    border: "1px solid var(--color-border)",
};
