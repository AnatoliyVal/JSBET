import {useState, useEffect, type CSSProperties} from "react";
import {useAuthStore} from "../../../store/authStore.ts";
import Button from "../../AllButtons/Button";
import {S} from "./styles.ts";

const formatTime = (ms: number) => {
    if (ms <= 0) return "Термін вийшов";
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d}д ${pad(h)}:${pad(m)}:${pad(s)}`;
};

const Timer = ({targetDate}: { targetDate: number }) => {
    const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = targetDate - Date.now();
            setTimeLeft(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);
    return <div style={S.timer}>{formatTime(timeLeft)}</div>;
};

const ALL_BONUSES = [
    {
        id: 1,
        title: "Фартова Конюшина: до 125 ФС у Supercharged Clovers",
        depositMin: "від 500 ₴",
        expiresAt: Date.now() + (1 * 24 * 60 * 60 + 18 * 3600 + 44 * 60 + 57) * 1000,
        options: [
            {label: "75 ФС, Ставка: 2", sub: "від 500 ₴"},
            {label: "75 ФС, Ставка: 5", sub: "від 1 000 ₴"},
            {label: "100 ФС, Ставка: 8", sub: "від 2 000 ₴"},
            {label: "125 ФС, Ставка: 20", sub: "від 5 000 ₴"},
        ],
    },
    {
        id: 2,
        title: "Фартові Монети: до 125 ФС у 9 Coins Stack",
        depositMin: "від 500 ₴",
        expiresAt: Date.now() + (1 * 24 * 60 * 60 + 18 * 3600 + 34 * 60 + 57) * 1000,
        options: [
            {label: "75 ФС, Ставка: 2", sub: "від 500 ₴"},
            {label: "95 ФС, Ставка: 4", sub: "від 1 000 ₴"},
            {label: "100 ФС, Ставка: 8", sub: "від 2 000 ₴"},
            {label: "125 ФС, Ставка: 20", sub: "від 5 000 ₴"},
        ],
    },
    {
        id: 3,
        title: "Скарб Єгипту: до 200 ФС у Book of Ra",
        depositMin: "від 300 ₴",
        expiresAt: Date.now() + (2 * 24 * 60 * 60 + 5 * 3600 + 10 * 60 + 20) * 1000,
        options: [
            {label: "50 ФС, Ставка: 1", sub: "від 300 ₴"},
            {label: "100 ФС, Ставка: 3", sub: "від 700 ₴"},
            {label: "150 ФС, Ставка: 6", sub: "від 1 500 ₴"},
            {label: "200 ФС, Ставка: 15", sub: "від 4 000 ₴"},
        ],
    },
    {
        id: 4,
        title: "Вітальний бонус: +100% до першого депозиту",
        depositMin: "від 200 ₴",
        expiresAt: Date.now() + (3 * 24 * 60 * 60 + 0 * 3600 + 0 * 60 + 0) * 1000,
        options: [
            {label: "+50%, до 1 000 ₴", sub: "від 200 ₴"},
            {label: "+75%, до 3 000 ₴", sub: "від 500 ₴"},
            {label: "+100%, до 5 000 ₴", sub: "від 1 000 ₴"},
            {label: "+100% + 50 ФС", sub: "від 2 000 ₴"},
        ],
    },
];

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return width;
};

const BonusesTab = () => {
    const activateVip = useAuthStore((s) => s.activateVip);
    const activateNewBadge = useAuthStore((s) => s.activateNewBadge);
    const width = useWindowWidth();
    const isMobile = width < 550;

    const [activeTab, setActiveTab] = useState<"active" | "available">("available");
    const [selectedOpts, setSelectedOpts] = useState<Record<number, number>>({1: 1, 2: 1, 3: 1, 4: 1});
    const [activatedIds, setActivatedIds] = useState<number[]>([]);
    const [promo, setPromo] = useState("");
    const [promoMsg, setPromoMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

    const availableBonuses = ALL_BONUSES.filter((b) => !activatedIds.includes(b.id));
    const activatedBonuses = ALL_BONUSES.filter((b) => activatedIds.includes(b.id));

    const handleActivate = (id: number) => {
        setActivatedIds((prev) => [...prev, id]);
        setActiveTab("active");
    };

    const handlePromo = () => {
        const code = promo.trim().toUpperCase();
        if (!code) return;
        if (code === "JSBET") {
            activateVip();
            setPromoMsg({type: "ok", text: "🎉 Вітаємо! Тебе підвищено до статусу VIP!"});
        } else if (code === "RAINBOW") {
            useAuthStore.getState().activateRainbow();
            setPromoMsg({type: "ok", text: "🌈 Магія! Твій нік тепер переливається всіма кольорами веселки!"});
        } else if (code === "NEW") {
            activateNewBadge();
            setPromoMsg({type: "ok", text: "🔥 Промокод активовано! Ти отримав статус NEW на 2 дні!"});
        } else if (code === "WELCOME" || code === "BONUS") {
            setPromoMsg({type: "ok", text: `✅ Промокод "${promo.trim()}" активовано! Бонус нараховано.`});
        } else {
            setPromoMsg({type: "err", text: "❌ Невірний промокод або термін його дії минув."});
        }
        setPromo("");
    };

    const cardInnerStyle: CSSProperties = isMobile
        ? {padding: 16, paddingTop: 48, display: "flex", flexDirection: "column", gap: 16}
        : {padding: 24, paddingTop: 48, display: "flex", gap: 24};

    const actionsStyle: CSSProperties = isMobile
        ? {display: "flex", flexDirection: "row", gap: 10, alignItems: "center"}
        : {display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", flexShrink: 0};

    const tabWrapStyle: CSSProperties = isMobile
        ? {
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "20px 16px",
        }
        : {
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "32px 40px",
        };

    const optionsStyle: CSSProperties = isMobile
        ? {display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6}
        : {display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8};

    const renderBonusCard = (b: typeof ALL_BONUSES[0], isActivated = false) => (
        <div key={b.id} style={S.card}>
            <Timer targetDate={b.expiresAt}/>
            <div style={cardInnerStyle}>
                {!isMobile && (
                    <div style={S.iconWrap}>
                        <span style={S.icon}>🎁</span>
                        <span style={S.badgeFs}>FS</span>
                    </div>
                )}
                <div style={S.body}>
                    <div style={S.bodyTop}>
                        {isMobile && <span style={S.icon}>🎁</span>}
                        <span style={isActivated ? S.tagActive : S.tag}>
                            {isActivated ? "Активовано" : "Доступний"}
                        </span>
                        <span style={S.deposit}>{b.depositMin}</span>
                    </div>
                    <h4 style={isMobile ? {...S.name, fontSize: 15} : S.name}>{b.title}</h4>
                    <div style={optionsStyle}>
                        {b.options.map((opt, i) => (
                            <label key={i} style={S.option(selectedOpts[b.id] === i)}>
                                <input type="radio" onChange={() => setSelectedOpts((prev) => ({
                                    ...prev,
                                    [b.id]: i,
                                }))} checked={selectedOpts[b.id] === i} style={{display: "none"}}/>
                                <span style={isMobile ? {...S.optionLabel, fontSize: 12} : S.optionLabel}>{opt.label}</span>
                                <span style={S.optionSub}>{opt.sub}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {!isActivated && (
                    <div style={actionsStyle}>
                        <Button variant="primary" small onClick={() => handleActivate(b.id)}>Активувати</Button>
                        <button style={S.infoBtn}><i className="fa-solid fa-circle-info"/></button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div style={tabWrapStyle}>
            <h3 style={isMobile ? {...S.title, fontSize: 18} : S.title}>Твої бонуси</h3>

            <div style={S.tabs}>
                <button style={S.tabBtn(activeTab === "active")} onClick={() => setActiveTab("active")}>
                    Активовані{activatedIds.length > 0 && <span style={S.tabCount}>{activatedIds.length}</span>}
                </button>
                <button style={S.tabBtn(activeTab === "available")} onClick={() => setActiveTab("available")}>
                    Доступні <span style={S.tabCount}>{availableBonuses.length}</span>
                </button>
            </div>

            {activeTab === "active" ? (
                activatedBonuses.length === 0 ? (
                    <p style={S.empty}><i className="fa-solid fa-inbox"/><br/>У тебе немає активованих бонусів</p>
                ) : (
                    <>
                        <p style={S.hint}>Твої активовані бонуси</p>
                        <div style={S.list}>
                            {activatedBonuses.map((b) => renderBonusCard(b, true))}
                        </div>
                    </>
                )
            ) : (
                availableBonuses.length === 0 ? (
                    <p style={S.empty}><i className="fa-solid fa-check-circle"/><br/>Усі бонуси вже активовано!</p>
                ) : (
                    <>
                        <p style={S.hint}>Бонуси, які ти можеш активувати та накопичувати прогрес</p>
                        <div style={S.list}>
                            {availableBonuses.map((b) => renderBonusCard(b, false))}
                        </div>
                    </>
                )
            )}

            <div style={isMobile ? {...S.promoRow, padding: 16, flexDirection: "column", alignItems: "stretch"} : S.promoRow}>
                <span style={S.promoLabel}><i className="fa-solid fa-ticket"/> Маєш промокод?</span>
                <div style={isMobile ? {...S.promoWrap, maxWidth: "100%"} : S.promoWrap}>
                    <input type="text" style={S.promoInput} placeholder="Введи промокод" value={promo}
                           onChange={(e) => setPromo(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && handlePromo()}/>
                    <Button variant="primary" small onClick={handlePromo}>Застосувати</Button>
                </div>
                {promoMsg && <p style={S.promoMsg(promoMsg.type === "ok")}>{promoMsg.text}</p>}
            </div>
        </div>
    );
};

export default BonusesTab;
