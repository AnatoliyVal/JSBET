import {useState, useEffect} from "react";
import {useAuthStore} from "../../store/authStore";
import Button from "../AllButtons/Button/Button";
import {S} from "./BonusesStyle";

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

const MOCK_BONUSES = [
    {
        id: 1,
        title: "Фартова Конюшина: до 125 ФС у Supercharged Clovers",
        depositMin: "від 500 ₴",
        expiresAt: Date.now() + (1 * 24 * 60 * 60 + 18 * 3600 + 44 * 60 + 57) * 1000,
        options: [{label: "75 ФС, Ставка: 2", sub: "від 500 ₴"}, {
            label: "75 ФС, Ставка: 5",
            sub: "від 1 000 ₴"
        }, {label: "100 ФС, Ставка: 8", sub: "від 2 000 ₴"}, {label: "125 ФС, Ставка: 20", sub: "від 5 000 ₴"}]
    },
    {
        id: 2,
        title: "Фартові Монети: до 125 ФС у 9 Coins Stack",
        depositMin: "від 500 ₴",
        expiresAt: Date.now() + (1 * 24 * 60 * 60 + 18 * 3600 + 34 * 60 + 57) * 1000,
        options: [{label: "75 ФС, Ставка: 2", sub: "від 500 ₴"}, {
            label: "95 ФС, Ставка: 4",
            sub: "від 1 000 ₴"
        }, {label: "100 ФС, Ставка: 8", sub: "від 2 000 ₴"}, {label: "125 ФС, Ставка: 20", sub: "від 5 000 ₴"}]
    },
];

const BonusesTab = () => {
    const activateVip = useAuthStore((s) => s.activateVip);
    const activateNewBadge = useAuthStore((s) => s.activateNewBadge);

    const [activeTab, setActiveTab] = useState<"active" | "available">("available");
    const [selectedOpts, setSelectedOpts] = useState<Record<number, number>>({1: 1, 2: 1});
    const [promo, setPromo] = useState("");
    const [promoMsg, setPromoMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

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

    return (
        <div style={S.tabWrap}>
            <h3 style={S.title}>Твої бонуси</h3>

            <div style={S.tabs}>
                <button style={S.tabBtn(activeTab === "active")} onClick={() => setActiveTab("active")}>
                    Активовані
                </button>
                <button style={S.tabBtn(activeTab === "available")} onClick={() => setActiveTab("available")}>
                    Доступні <span style={S.tabCount}>2</span>
                </button>
            </div>

            {activeTab === "active" ? (
                <p style={S.empty}><i className="fa-solid fa-inbox"/><br/>У тебе немає активованих бонусів</p>
            ) : (
                <>
                    <p style={S.hint}>Бонуси, які ти можеш активувати та накопичувати прогрес</p>
                    <div style={S.list}>
                        {MOCK_BONUSES.map((b) => (
                            <div key={b.id} style={S.card}>
                                <Timer targetDate={b.expiresAt}/>
                                <div style={S.cardInner}>
                                    <div style={S.iconWrap}>
                                        <span style={S.icon}>🎁</span>
                                        <span style={S.badgeFs}>FS</span>
                                    </div>
                                    <div style={S.body}>
                                        <div style={S.bodyTop}>
                                            <span style={S.tag}>Доступний</span>
                                            <span style={S.deposit}>{b.depositMin}</span>
                                        </div>
                                        <h4 style={S.name}>{b.title}</h4>
                                        <div style={S.options}>
                                            {b.options.map((opt, i) => (
                                                <label key={i} style={S.option(selectedOpts[b.id] === i)}>
                                                    <input type="radio" onChange={() => setSelectedOpts((prev) => ({
                                                        ...prev,
                                                        [b.id]: i
                                                    }))} checked={selectedOpts[b.id] === i} style={{display: "none"}}/>
                                                    <span style={S.optionLabel}>{opt.label}</span>
                                                    <span style={S.optionSub}>{opt.sub}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={S.actions}>
                                        <Button variant="primary" small>Активувати</Button>
                                        <button style={S.infoBtn}><i className="fa-solid fa-circle-info"/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div style={S.promoRow}>
                <span style={S.promoLabel}><i className="fa-solid fa-ticket"/> Маєш промокод?</span>
                <div style={S.promoWrap}>
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
