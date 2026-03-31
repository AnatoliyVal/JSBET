import React from "react";

type UserBadgeProps = {
    badges?: string[];
    isNewUntil?: number;
    className?: string;  // additional classes for positioning
};

/**
 * Reusable component for displaying VIP and NEW status badges.
 */
const UserBadge: React.FC<UserBadgeProps> = ({ badges = [], isNewUntil, className = "" }) => {
    const isNew = isNewUntil && Date.now() < isNewUntil;

    if (badges.length === 0 && !isNew) return null;

    return (
        <div className={`user-badges-group ${className}`} style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
            {/* Dynamic badges from array */}
            {badges.map((b) => {
                const badge = b.toUpperCase();
                if (badge === "VIP") {
                    return <span key={b} className="vip-badge" aria-label="VIP статус">VIP</span>;
                }
                if (badge === "CLOWN") {
                    return (
                        <span key={b} className="clown-badge" aria-label="CLOWN статус">
                            <span style={{ marginRight: "4px" }}>🤡</span> CLOWN
                        </span>
                    );
                }
                if (badge === "NEW") {
                    return <span key={b} className="new-badge" aria-label="NEW статус">NEW</span>;
                }
                // Fallback for unknown badges
                return (
                    <span key={b} className="new-badge" style={{ background: "var(--border-color)", color: "var(--text-secondary)" }}>
                        {badge}
                    </span>
                );
            })}

            {/* Timed badges like NEW (only if not already in dynamic badges) */}
            {isNew && !badges.map(b => b.toUpperCase()).includes("NEW") && (
                <span className="new-badge" aria-label="NEW статус">NEW</span>
            )}
        </div>
    );
};

export default UserBadge;
