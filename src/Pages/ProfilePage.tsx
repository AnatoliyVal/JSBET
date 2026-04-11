import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Button from "../components/AllButtons/Button/Button";
import { useAuthStore } from "../store/authStore";
import BonusesTab from "../components/Profile/BonusesTab";
import UsersTab from "../components/Profile/UsersTab";
import UserDisplay from "../components/User/UserDisplay";
import { S } from "./ProfileStyle";

type Tab = "settings" | "visuals" | "history" | "transactions" | "bonuses" | "users";

const ProfilePage = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const updateProfile = useAuthStore((s) => s.updateProfile);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>("settings");
    const [saved, setSaved] = useState(false);

    const [displayName, setDisplayName] = useState(user?.displayName ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [dob, setDob] = useState(user?.dob ?? "");
    const [country, setCountry] = useState(user?.country ?? "ua");

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 570);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 900);
            setIsMobile(window.innerWidth < 570);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fileRef = useRef<HTMLInputElement>(null);

    if (!user) {
        return (
            <main>
                <div style={{ display: "block" }}>
                    <div className="container">
                        <p style={S.loginHint}>Увійдіть або зареєструйтесь, щоб переглядати профіль.</p>
                    </div>
                </div>
            </main>
        );
    }

    const handleAvatarClick = () => fileRef.current?.click();
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => { updateProfile({ avatar: ev.target?.result as string }); };
        reader.readAsDataURL(file);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ displayName, phone, dob, country });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const navItems: { id: Tab; icon: string; label: string }[] = [
        { id: "settings", icon: "fa-gear", label: "Налаштування" },
        { id: "visuals", icon: "fa-wand-magic-sparkles", label: "Візуальні ефекти" },
        { id: "history", icon: "fa-clock-rotate-left", label: "Історія ігор" },
        { id: "transactions", icon: "fa-money-bill-transfer", label: "Транзакції" },
        { id: "bonuses", icon: "fa-gift", label: "Бонуси" },
        { id: "users", icon: "fa-users", label: "Користувачі" },
    ];

    return (
        <main>
            <div style={{ display: "block" }}>
                <section style={{ padding: "40px 0" }}>
                    <div className="container">
                        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 24 }}>
                            <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Мій профіль</h2>
                        </div>

                        <div style={S.layout(isDesktop)}>
                            <aside style={S.sidebar}>
                                <div style={S.userCard} onClick={handleAvatarClick} title="Натисни, щоб змінити фото">
                                    <UserDisplay email={user.email} size="lg" />
                                    <p style={S.userId}>ID: {(user.email || "").length + 489000}</p>
                                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                                </div>

                                <div style={S.balanceCard}>
                                    <p style={S.balanceLabel}>Основний баланс</p>
                                    <p style={S.balanceValue}>₴{(user.balance ?? 0).toFixed(2)}</p>
                                    <div style={S.balanceActions}>
                                        <Button variant="primary" small>Поповнити</Button>
                                        <Button variant="ghost" small>Вивести</Button>
                                    </div>
                                </div>

                                <div style={S.progressCard}>
                                    <p style={S.progressLabel}>Прогрес до наступної цілі</p>
                                    <div style={S.progressBar}>
                                        <div style={S.progressFill("0%")}>
                                            <span style={S.progressText}>0%</span>
                                        </div>
                                    </div>
                                    <p style={S.progressDesc}>Залишилося 350 ігор до бонусу</p>
                                </div>

                                <nav style={S.nav} aria-label="Меню профілю">
                                    {navItems.map((item) => (
                                        <button key={item.id} type="button" style={S.navLink(activeTab === item.id, false)} onClick={() => setActiveTab(item.id)}>
                                            <i className={`fa-solid ${item.icon}`} style={{ width: 20 }} /> {item.label}
                                        </button>
                                    ))}
                                    <button type="button" style={S.navLink(false, true)} onClick={() => { logout(); navigate("/"); }}>
                                        <i className="fa-solid fa-right-from-bracket" style={{ width: 20 }} /> Вийти
                                    </button>
                                </nav>
                            </aside>

                            <div style={S.content}>
                                {activeTab === "settings" && (
                                    <>
                                        <div style={S.block}>
                                            <h3 style={S.title}>Особисті дані</h3>
                                            <p style={S.desc}>Управляйте своєю особистою інформацією та налаштуваннями акаунта.</p>
                                            <form onSubmit={handleSave}>
                                                    <div style={S.formRow(isMobile)}>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="user-displayname">Нікнейм</label>
                                                        <input type="text" id="user-displayname" style={S.input} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                                                    </div>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="user-email">Email</label>
                                                        <input type="email" id="user-email" style={S.input} value={user.email} readOnly />
                                                    </div>
                                                </div>
                                                <div style={S.formRow(isMobile)}>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="user-phone">Номер телефону</label>
                                                        <input type="tel" id="user-phone" style={S.input} placeholder="+380..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                    </div>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="user-dob">Дата народження</label>
                                                        <input type="date" id="user-dob" style={S.input} value={dob} onChange={(e) => setDob(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div style={S.formRow(isMobile)}>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="user-country">Країна</label>
                                                        <select id="user-country" style={S.select} value={country} onChange={(e) => setCountry(e.target.value)}>
                                                            <option value="ua">Україна</option>
                                                            <option value="pl">Польща</option>
                                                            <option value="uk">Велика Британія</option>
                                                            <option value="de">Німеччина</option>
                                                            <option value="other">Інша</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div style={S.actions}>
                                                    <Button type="submit" variant="primary">{saved ? "✓ Збережено!" : "Зберегти зміни"}</Button>
                                                    <Button type="button" variant="ghost" onClick={() => { setDisplayName(user.displayName); setPhone(user.phone); setDob(user.dob); setCountry(user.country); }}>Скасувати</Button>
                                                </div>
                                            </form>
                                        </div>

                                        <div style={S.block}>
                                            <h3 style={S.title}>Додати метод оплати</h3>
                                            <p style={S.desc}>Додайте нову банківську картку для поповнення рахунку та виведення коштів.</p>
                                            <form action="#" method="POST">
                                                <div style={{...S.group, marginBottom: 24}}>
                                                    <label style={S.label} htmlFor="cardName">Ім&apos;я на карті</label>
                                                    <input type="text" id="cardName" style={S.input} placeholder="IVAN IVANOV" required />
                                                </div>
                                                <div style={{...S.group, marginBottom: 24}}>
                                                    <label style={S.label} htmlFor="cardNumber">Номер карти</label>
                                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                                        <i className="fa-regular fa-credit-card" style={{ position: "absolute", left: 16, color: "var(--color-text-muted)" }} />
                                                        <input type="text" id="cardNumber" style={{...S.input, width: "100%", paddingLeft: 44}} placeholder="0000 0000 0000 0000" maxLength={19} required />
                                                    </div>
                                                </div>
                                                <div style={S.formRow(isMobile)}>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="expDate">Термін дії</label>
                                                        <input type="text" id="expDate" style={S.input} placeholder="MM/YY" maxLength={5} required />
                                                    </div>
                                                    <div style={S.group}>
                                                        <label style={S.label} htmlFor="cvv">CVV</label>
                                                        <input type="password" id="cvv" style={S.input} placeholder="***" maxLength={3} required />
                                                    </div>
                                                </div>
                                                <button type="submit" style={S.paymentSubmit}>Додати карту</button>
                                            </form>
                                        </div>
                                    </>
                                )}

                                {activeTab === "visuals" && (
                                    <div style={S.block}>
                                        <h3 style={S.title}>Візуальні ефекти</h3>
                                        <p style={S.desc}>Налаштуйте вигляд вашого профілю та нікнейму.</p>

                                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                            <div style={S.visualBlock}>
                                                <h4 style={S.visualTitle}><i className="fa-solid fa-palette" style={{ color: "var(--color-gold)" }} /> Переливання ніка</h4>
                                                <p style={S.visualDesc}>Активуйте магічний ефект веселки для вашого нікнейму. Це бачитимуть всі користувачі.</p>
                                                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", width: "fit-content" }}>
                                                    <input type="checkbox" checked={user.rainbowActive} onChange={(e) => e.target.checked ? useAuthStore.getState().activateRainbow() : useAuthStore.getState().deactivateRainbow()} style={{ width: 18, height: 18 }} />
                                                    <span style={{ fontSize: 14, fontWeight: 500 }}>Увімкнути ефект Rainbow</span>
                                                </label>
                                            </div>

                                            {((user.badges && user.badges.length > 0) || (user.isNewUntil && Date.now() < user.isNewUntil)) && (
                                                <div style={S.visualBlock}>
                                                    <h4 style={S.visualTitle}><i className="fa-solid fa-eye" style={{ color: "var(--color-gold)" }} /> Видимість плашок</h4>
                                                    <p style={S.visualDesc}>Виберіть, які статуси та емблеми будуть відображатися поруч із вашим іменем.</p>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                                        {user.badges?.map(b => (
                                                            <button key={b} onClick={() => useAuthStore.getState().toggleBadgeVisibility(b)} style={S.visualBtn(user.hiddenBadges?.includes(b) ?? false)}>
                                                                <i className={user.hiddenBadges?.includes(b) ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} style={{ marginRight: 6 }} /> {b}
                                                            </button>
                                                        ))}
                                                        {user.isNewUntil && Date.now() < user.isNewUntil && (
                                                            <button onClick={() => useAuthStore.getState().toggleBadgeVisibility("NEW")} style={S.visualBtn(user.hiddenBadges?.includes("NEW") ?? false)}>
                                                                <i className={user.hiddenBadges?.includes("NEW") ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} style={{ marginRight: 6 }} /> NEW
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div style={S.block}>
                                        <h3 style={S.title}>Історія ігор</h3>
                                        <p style={S.desc}>Тут відображатиметься твоя Ігрова активність.</p>
                                        <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "40px 0" }}><i className="fa-solid fa-gamepad" style={{ fontSize: 40, marginBottom: 16 }} /><br />Ігор ще немає</p>
                                    </div>
                                )}

                                {activeTab === "transactions" && (
                                    <div style={S.block}>
                                        <h3 style={S.title}>Транзакції</h3>
                                        <p style={S.desc}>Тут відображатиметься Твоя фінансова активність.</p>
                                        <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "40px 0" }}><i className="fa-solid fa-receipt" style={{ fontSize: 40, marginBottom: 16 }} /><br />Транзакцій ще немає</p>
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
