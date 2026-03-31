import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Button from "../components/AllButtons/Button/Button";
import { useAuthStore } from "../store/authStore";
import BonusesTab from "../components/Profile/BonusesTab";
import UsersTab from "../components/Profile/UsersTab";
import UserBadge from "../components/User/UserBadge";
import UserDisplay from "../components/User/UserDisplay";

type Tab = "settings" | "visuals" | "history" | "transactions" | "bonuses" | "users";

const ProfilePage = () => {
    const user          = useAuthStore((s) => s.user);
    const logout        = useAuthStore((s) => s.logout);
    const updateProfile = useAuthStore((s) => s.updateProfile);
    const navigate      = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>("settings");
    const [saved, setSaved]         = useState(false);

    // Controlled form state — start empty (user fills them in)
    const [displayName, setDisplayName] = useState(user?.displayName ?? "");
    const [phone, setPhone]             = useState(user?.phone ?? "");
    const [dob,   setDob]               = useState(user?.dob   ?? "");
    const [country, setCountry]         = useState(user?.country ?? "ua");

    const fileRef = useRef<HTMLInputElement>(null);

    if (!user) {
        return (
            <main>
                <div className="page-section active" id="page-profil">
                    <section className="section" aria-labelledby="profil-heading">
                        <div className="container">
                            <p className="profile-login-hint" id="profil-heading">
                                Увійдіть або зареєструйтесь, щоб переглядати профіль.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    // Avatar upload
    const handleAvatarClick = () => fileRef.current?.click();
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            updateProfile({ avatar: ev.target?.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ displayName, phone, dob, country });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const navItems: { id: Tab; icon: string; label: string }[] = [
        { id: "settings",     icon: "fa-gear",                 label: "Налаштування" },
        { id: "visuals",      icon: "fa-wand-magic-sparkles",  label: "Візуальні ефекти" },
        { id: "history",      icon: "fa-clock-rotate-left",    label: "Історія ігор" },
        { id: "transactions", icon: "fa-money-bill-transfer",  label: "Транзакції" },
        { id: "bonuses",      icon: "fa-gift",                 label: "Бонуси" },
        { id: "users",        icon: "fa-users",                label: "Користувачі" },
    ];

    return (
        <main>
            <div className="page-section active" id="page-profil">
                <section className="section" aria-labelledby="profil-heading">
                    <div className="container">
                        <div className="section-header">
                            <h2 id="profil-heading" className="section-title">Мій профіль</h2>
                        </div>

                        <div className="profile-layout">
                            {/* ── Sidebar ─────────────────────────────── */}
                            <aside className="profile-sidebar">
                                {/* User card */}
                                    <div className="profile-user-card" onClick={handleAvatarClick} title="Натисни, щоб змінити фото" style={{ cursor: "pointer" }}>
                                        <UserDisplay 
                                            email={user.email} 
                                            size="lg" 
                                            avatarClassName="profile-avatar--clickable"
                                        />
                                        <p className="profile-id">ID: {(user.email || "").length + 489000}</p>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleAvatarChange}
                                        />
                                    </div>

                                {/* Balance */}
                                <div className="profile-balance-card">
                                    <p className="profile-balance-label">Основний баланс</p>
                                    <p className="profile-balance-value">
                                        ₴{(user.balance ?? 0).toFixed(2)}
                                    </p>
                                    <div className="profile-balance-actions">
                                        <Button variant="primary" small>Поповнити</Button>
                                        <Button variant="ghost"   small>Вивести</Button>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="profile-progress-card">
                                    <p className="profile-progress-label">Прогрес до наступної цілі</p>
                                    <div className="profile-progress-bar">
                                        <div
                                            className="profile-progress-fill"
                                            style={{ width: "0%" }}
                                            id="progress-fill"
                                        >
                                            <span className="profile-progress-text" id="progress-text">0%</span>
                                        </div>
                                    </div>
                                    <p className="profile-progress-desc">Залишилося 350 ігор до бонусу</p>
                                </div>

                                {/* Nav */}
                                <nav className="profile-nav" aria-label="Меню профілю">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`profile-nav-link${activeTab === item.id ? " active" : ""}`}
                                            onClick={() => setActiveTab(item.id)}
                                        >
                                            <i className={`fa-solid ${item.icon}`}></i> {item.label}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        className="profile-nav-link profile-nav-link--danger"
                                        onClick={() => { logout(); navigate("/"); }}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i> Вийти
                                    </button>
                                </nav>
                            </aside>

                            {/* ── Main content ─────────────────────────── */}
                            <div className="profile-content">

                                {/* ── SETTINGS TAB ── */}
                                {activeTab === "settings" && (
                                    <>
                                        <div className="profile-settings-block">
                                            <h3 className="profile-settings-title">Особисті дані</h3>
                                            <p className="profile-settings-desc">
                                                Управляйте своєю особистою інформацією та налаштуваннями акаунта.
                                            </p>
                                            <form className="profile-form" id="personal-data-form" onSubmit={handleSave}>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label htmlFor="user-displayname" className="form-label">Нікнейм</label>
                                                        <input
                                                            type="text"
                                                            id="user-displayname"
                                                            className="form-input"
                                                            value={displayName}
                                                            onChange={(e) => setDisplayName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="user-email" className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            id="user-email"
                                                            className="form-input"
                                                            value={user.email}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label htmlFor="user-phone" className="form-label">Номер телефону</label>
                                                        <input
                                                            type="tel"
                                                            id="user-phone"
                                                            className="form-input"
                                                            placeholder="+380..."
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="user-dob" className="form-label">Дата народження</label>
                                                        <input
                                                            type="date"
                                                            id="user-dob"
                                                            className="form-input"
                                                            value={dob}
                                                            onChange={(e) => setDob(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label htmlFor="user-country" className="form-label">Країна</label>
                                                        <select
                                                            id="user-country"
                                                            className="form-select"
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                        >
                                                            <option value="ua">Україна</option>
                                                            <option value="pl">Польща</option>
                                                            <option value="uk">Велика Британія</option>
                                                            <option value="de">Німеччина</option>
                                                            <option value="other">Інша</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-actions">
                                                    <Button type="submit" variant="primary">
                                                        {saved ? "✓ Збережено!" : "Зберегти зміни"}
                                                    </Button>
                                                    <Button type="button" variant="ghost"
                                                        onClick={() => {
                                                            setDisplayName(user.displayName);
                                                            setPhone(user.phone);
                                                            setDob(user.dob);
                                                            setCountry(user.country);
                                                        }}
                                                    >
                                                        Скасувати
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Payment card form */}
                                        <div className="profile-settings-block">
                                            <h3 className="profile-settings-title">Додати метод оплати</h3>
                                            <p className="profile-settings-desc">
                                                Додайте нову банківську картку для поповнення рахунку та виведення коштів.
                                            </p>
                                            <form className="payment-form" action="#" method="POST" id="paymentForm">
                                                <div className="form-group">
                                                    <label htmlFor="cardName" className="payment-label">Ім&apos;я на карті</label>
                                                    <input type="text" id="cardName" className="payment-input" placeholder="IVAN IVANOV" required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cardNumber" className="payment-label">Номер карти</label>
                                                    <div className="card-input-wrapper">
                                                        <i className="fa-regular fa-credit-card card-icon"></i>
                                                        <input type="text" id="cardNumber" className="payment-input card-input" placeholder="0000 0000 0000 0000" maxLength={19} required />
                                                    </div>
                                                </div>
                                                <div className="form-row payment-details-row">
                                                    <div className="form-group">
                                                        <label htmlFor="expDate" className="payment-label">Термін дії</label>
                                                        <input type="text" id="expDate" className="payment-input" placeholder="MM/YY" maxLength={5} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="cvv" className="payment-label">CVV</label>
                                                        <input type="password" id="cvv" className="payment-input" placeholder="***" maxLength={3} required />
                                                    </div>
                                                </div>
                                                <button type="submit" className="payment-submit-btn">Додати карту</button>
                                            </form>
                                        </div>
                                    </>
                                )}

                                {/* ── VISUALS TAB ── */}
                                {activeTab === "visuals" && (
                                    <div className="profile-settings-block">
                                        <h3 className="profile-settings-title">Візуальні ефекти</h3>
                                        <p className="profile-settings-desc">Налаштуйте вигляд вашого профілю та нікнейму.</p>
                                        
                                        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
                                            <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                                                <h4 style={{ fontSize: "16px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <i className="fa-solid fa-palette" style={{ color: "var(--color-gold)" }}></i> Переливання ніка
                                                </h4>
                                                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginBottom: "16px" }}>
                                                    Активуйте магічний ефект веселки для вашого нікнейму. Це бачитимуть всі користувачі у ваших відгуках та профілі.
                                                </p>
                                                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", width: "fit-content" }}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={user.rainbowActive} 
                                                        onChange={(e) => e.target.checked ? useAuthStore.getState().activateRainbow() : useAuthStore.getState().deactivateRainbow()}
                                                        style={{ width: "18px", height: "18px" }}
                                                    />
                                                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Увімкнути ефект Rainbow</span>
                                                </label>
                                            </div>

                                            {((user.badges && user.badges.length > 0) || (user.isNewUntil && Date.now() < user.isNewUntil)) && (
                                                <div style={{ background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                                                    <h4 style={{ fontSize: "16px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                                                        <i className="fa-solid fa-eye" style={{ color: "var(--color-gold)" }}></i> Видимість плашок
                                                    </h4>
                                                    <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginBottom: "16px" }}>
                                                        Виберіть, які статуси та емблеми будуть відображатися поруч із вашим іменем.
                                                    </p>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                                        {user.badges?.map(b => (
                                                            <button 
                                                                key={b}
                                                                onClick={() => useAuthStore.getState().toggleBadgeVisibility(b)}
                                                                style={{ 
                                                                    padding: "8px 16px", 
                                                                    borderRadius: "8px", 
                                                                    fontSize: "13px",
                                                                    border: "1px solid var(--color-border)",
                                                                    background: user.hiddenBadges?.includes(b) ? "transparent" : "rgba(255,255,255,0.1)",
                                                                    color: user.hiddenBadges?.includes(b) ? "var(--color-text-muted)" : "white",
                                                                    cursor: "pointer",
                                                                    transition: "all 0.2s ease"
                                                                }}
                                                            >
                                                                {user.hiddenBadges?.includes(b) ? <i className="fa-solid fa-eye-slash" style={{ marginRight: "6px" }}></i> : <i className="fa-solid fa-eye" style={{ marginRight: "6px" }}></i>}
                                                                {b}
                                                            </button>
                                                        ))}
                                                        {user.isNewUntil && Date.now() < user.isNewUntil && (
                                                            <button 
                                                                onClick={() => useAuthStore.getState().toggleBadgeVisibility("NEW")}
                                                                style={{ 
                                                                    padding: "8px 16px", 
                                                                    borderRadius: "8px", 
                                                                    fontSize: "13px",
                                                                    border: "1px solid var(--color-border)",
                                                                    background: user.hiddenBadges?.includes("NEW") ? "transparent" : "rgba(255,255,255,0.1)",
                                                                    color: user.hiddenBadges?.includes("NEW") ? "var(--color-text-muted)" : "white",
                                                                    cursor: "pointer",
                                                                    transition: "all 0.2s ease"
                                                                }}
                                                            >
                                                                {user.hiddenBadges?.includes("NEW") ? <i className="fa-solid fa-eye-slash" style={{ marginRight: "6px" }}></i> : <i className="fa-solid fa-eye" style={{ marginRight: "6px" }}></i>}
                                                                NEW
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div className="profile-settings-block">
                                        <h3 className="profile-settings-title">Історія ігор</h3>
                                        <p className="profile-settings-desc">Тут відображатиметься твоя Ігрова активність.</p>
                                        <p className="bonuses-empty"><i className="fa-solid fa-gamepad"></i><br />Ігор ще немає</p>
                                    </div>
                                )}

                                {activeTab === "transactions" && (
                                    <div className="profile-settings-block">
                                        <h3 className="profile-settings-title">Транзакції</h3>
                                        <p className="profile-settings-desc">Тут відображатиметься Твоя фінансова активність.</p>
                                        <p className="bonuses-empty"><i className="fa-solid fa-receipt"></i><br />Транзакцій ще немає</p>
                                    </div>
                                )}

                                {activeTab === "bonuses" && <BonusesTab />}

                                {activeTab === "users" && <UsersTab />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProfilePage;
