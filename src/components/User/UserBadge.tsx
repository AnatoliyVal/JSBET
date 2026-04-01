import React from "react";
import {useAuthStore} from "../../store/authStore";

type UserBadgeProps = {
    badges?: string[];
    isNewUntil?: number;
    className?: string;  // additional classes for positioning
};

/**
 * Reusable component for displaying VIP and NEW status badges.
 * Now respects hiddenBadges settings from the auth store.
 */
const UserBadge: React.FC<UserBadgeProps> = ({badges = [], isNewUntil, className = ""}) => {
    const user = useAuthStore((s) => s.user);
    const hiddenBadges = user?.hiddenBadges || [];

    const isNew = isNewUntil && Date.now() < isNewUntil;
    const normalizedHidden = hiddenBadges.map(b => b.toUpperCase());

    const visibleBadges = badges.filter(b => !normalizedHidden.includes(b.toUpperCase()));
    const showNew = isNew && !normalizedHidden.includes("NEW");

    if (visibleBadges.length === 0 && !showNew) return null;

    return (
        <div className={`user-badges-group ${className}`}
             style={{display: "inline-flex", gap: "6px", alignItems: "center", marginLeft: "8px"}}>
            {/* Dynamic badges from array */}
            {visibleBadges.map((b) => {
                const badge = b.toUpperCase();
                if (badge === "VIP") {
                    return <span key={b} className="vip-badge" aria-label="VIP статус">VIP</span>;
                }
                if (badge === "CLOWN") {
                    return (
                        <span key={b} className="clown-badge" aria-label="CLOWN статус">
                            <span style={{marginRight: "4px"}}>🤡</span> CLOWN
                        </span>
                    );
                }
                if (badge === "NEW") {
                    return <span key={b} className="new-badge" aria-label="NEW статус">NEW</span>;
                }
                // Fallback for unknown badges
                return (
                    <span key={b} className="new-badge"
                          style={{background: "var(--border-color)", color: "var(--text-secondary)"}}>
                        {badge}
                    </span>
                );
            })}

            {/* Timed badges like NEW */}
            {showNew && !visibleBadges.map(b => b.toUpperCase()).includes("NEW") && (
                <span className="new-badge" aria-label="NEW статус">NEW</span>
            )}
        </div>
    );
};

export default UserBadge;
