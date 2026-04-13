import {useEffect, useState} from "react";
import {getAllProfiles} from "../../../lib/profilesService.ts";
import type {AuthUser} from "../../../store/authStore.ts";
import UserBadge from "../../User/UserBadge";

const UsersTab = () => {
    const [users, setUsers] = useState<AuthUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProfiles()
            .then( setUsers)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="profile-settings-block"><p className="bonuses-empty"><i
            className="fa-solid fa-spinner fa-spin"></i><br/>Завантаження...</p></div>;
    }

    if (users.length === 0) {
        return <div className="profile-settings-block"><p className="bonuses-empty"><i
            className="fa-solid fa-users-slash"></i><br/>Користувачів ще немає</p></div>;
    }

    return (
        <div className="profile-settings-block">
            <h3 className="profile-settings-title">Всі користувачі</h3>
            <p className="profile-settings-desc">Список зареєстрованих акаунтів на платформі (оновлюється в реальному
                часі).</p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem"
            }}>
                {users.map((u, i) => (
                    <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem",
                        background: "var(--bg-card)",
                        borderRadius: "16px",
                        border: "1px solid var(--border-color)",
                        transition: "transform 0.2s ease",
                        cursor: "default"
                    }}
                         onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                         onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        <img
                            src={u.avatar || "index-files/icons/free-icon-profile-711769.png"}
                            alt={u.displayName}
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "2px solid rgba(255,255,255,0.1)"
                            }}
                        />
                        <div style={{flex: 1, minWidth: 0}}>
                            <h4 style={{
                                margin: 0,
                                fontSize: "16px",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                {u.displayName}
                                <UserBadge badges={u.badges} isNewUntil={u.isNewUntil}/>
                            </h4>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: "4px",
                                gap: "8px"
                            }}>
                                <p style={{
                                    margin: 0,
                                    fontSize: "13px",
                                    color: "var(--text-secondary)",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                    {u.email}
                                </p>
                                <div style={{display: "flex", alignItems: "center", gap: "6px", flexShrink: 0}}>
                                    <div style={{
                                        width: "8px", height: "8px", borderRadius: "50%",
                                        background: u.lastSeen && (Date.now() - u.lastSeen < 120000) ? "#4caf50" : "#808080",
                                        boxShadow: u.lastSeen && (Date.now() - u.lastSeen < 120000) ? "0 0 8px rgba(76, 175, 80, 0.4)" : "none"
                                    }}/>
                                    <span style={{
                                        fontSize: "12px",
                                        color: u.lastSeen && (Date.now() - u.lastSeen < 120000) ? "#4caf50" : "#808080",
                                        fontWeight: 500
                                    }}>
                                        {u.lastSeen && (Date.now() - u.lastSeen < 120000) ? "В мережі" : "Офлайн"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersTab;
