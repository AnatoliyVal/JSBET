import type {CSSProperties} from "react";

const container: CSSProperties = {
    width: "100%",
    maxWidth: "var(--container-max)",
    marginInline: "auto",
    paddingInline: "max(12px, 3vw)",
};

const section: CSSProperties = {padding: "40px 0"};

const sectionHeader: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
};

const sectionTitle: CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 10,
};

const sectionCount: CSSProperties = {
    fontSize: 13,
    fontWeight: 400,
    color: "var(--color-text-muted)",
    marginLeft: 4,
};

const sectionLink: CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-gold)",
    whiteSpace: "nowrap",
    flexShrink: 0,
    textDecoration: "none",
};

const gamesGrid = (isMobile?: boolean): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(160px, 1fr))",
    gap: isMobile ? 12 : 16,
});

const hero: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    padding: "64px 0 48px",
};

const heroInner: CSSProperties = {
    position: "relative",
    textAlign: "center",
};

const heroEyebrow: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "var(--color-gold-dim)",
    border: "1px solid var(--color-border-gold)",
    borderRadius: "var(--radius-pill)",
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "var(--color-gold)",
    marginBottom: 20,
};

const heroTitle: CSSProperties = {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 800,
    letterSpacing: -1.5,
    lineHeight: 1.1,
    marginBottom: 16,
};

const heroAccent: CSSProperties = {
    background: "linear-gradient(90deg, #ffce00, #ffd833)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
};

const heroSubtitle: CSSProperties = {
    fontSize: 17,
    color: "var(--color-text-secondary)",
    maxWidth: 520,
    margin: "0 auto 32px",
    lineHeight: 1.6,
};

const heroActions: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
};

const statsBar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: "24px 0 0",
    flexWrap: "wrap",
};

const statsBarItem: CSSProperties = {textAlign: "center"};

const statsBarValue: CSSProperties = {
    fontSize: 24,
    fontWeight: 800,
    color: "var(--color-gold)",
    lineHeight: 1,
    marginBottom: 4,
};

const statsBarLabel: CSSProperties = {
    fontSize: 12,
    color: "var(--color-text-muted)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
};

const categoryRow: CSSProperties = {
    padding: "20px 0 0",
    overflowX: "auto",
    scrollbarWidth: "none",
};

const categoryList: CSSProperties = {
    display: "flex",
    gap: 8,
    width: "max-content",
};

const categoryChip = (active: boolean): CSSProperties => ({
    height: "100%",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    borderRadius: "var(--radius-pill)",
    background: active ? "var(--color-gold-dim)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${active ? "var(--color-border-gold)" : "var(--color-border)"}`,
    fontSize: 13,
    fontWeight: active ? 600 : 500,
    color: active ? "var(--color-gold)" : "var(--color-text-secondary)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background var(--transition-fast), color var(--transition-fast)",
});

export const S = {
    container, section, sectionHeader, sectionTitle, sectionCount,
    sectionLink, gamesGrid, hero, heroInner, heroEyebrow, heroTitle,
    heroAccent, heroSubtitle, heroActions, statsBar, statsBarItem,
    statsBarValue, statsBarLabel, categoryRow, categoryList, categoryChip,
};
