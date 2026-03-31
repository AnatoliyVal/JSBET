import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import Button from "../AllButtons/Button/Button";

// Helper to format remaining time
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

const Timer = ({ targetDate }: { targetDate: number }) => {
    const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = targetDate - Date.now();
            setTimeLeft(remaining);
            if (remaining <= 0) clearInterval(interval);
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return <div className="bonus-timer">{formatTime(timeLeft)}</div>;
};

const MOCK_BONUSES = [
    {
        id: 1,
        icon: "🍀",
        badge: "FS",
        tag: "Доступний",
        title: "Фартова Конюшина: до 125 ФС у Supercharged Clovers",
        depositMin: "від 500 ₴",
        // Target is ~1 day 18 hours from now
        expiresAt: Date.now() + (1 * 24 * 60 * 60 + 18 * 3600 + 44 * 60 + 57) * 1000,
        options: [
            { label: "75 ФС, Ставка: 2", sub: "від 500 ₴" },
            { label: "75 ФС, Ставка: 5", sub: "від 1 000 ₴", highlight: true },
            { label: "100 ФС, Ставка: 8", sub: "від 2 000 ₴" },
            { label: "125 ФС, Ставка: 20", sub: "від 5 000 ₴" },
        ],
    },
    {
        id: 2,
        icon: "🌟",
        badge: "FS",
        tag: "Доступний",
        title: "Фартові Монети: до 125 ФС у 9 Coins Stack",
        depositMin: "від 500 ₴",
        // Target is ~1 day 18 hours from now
        expiresAt: Date.now() + (1 * 24 * 60 * 60 + 18 * 3600 + 34 * 60 + 57) * 1000,
        options: [
            { label: "75 ФС, Ставка: 2", sub: "від 500 ₴" },
            { label: "95 ФС, Ставка: 4", sub: "від 1 000 ₴", highlight: true },
            { label: "100 ФС, Ставка: 8", sub: "від 2 000 ₴" },
            { label: "125 ФС, Ставка: 20", sub: "від 5 000 ₴" },
        ],
    },
];

const BonusesTab = () => {
    const activateVip = useAuthStore((s) => s.activateVip);
    const activateNewBadge = useAuthStore((s) => s.activateNewBadge);
    const isVip       = useAuthStore((s) => s.user?.isVip ?? false);

    const [activeTab, setActiveTab] = useState<"active" | "available">("available");
    const [selectedOpts, setSelectedOpts] = useState<Record<number, number>>({ 1: 1, 2: 1 });
    const [promo, setPromo]               = useState("");
    const [promoMsg, setPromoMsg]         = useState<{ type: "ok" | "err"; text: string } | null>(null);

    const handlePromo = () => {
        const code = promo.trim().toUpperCase();
        if (!code) return;

        if (code === "JSBET") {
            activateVip();
            setPromoMsg({ type: "ok", text: "🎉 Вітаємо! Тебе підвищено до статусу VIP! Значок VIP тепер видно у твоїх відгуках." });
        } else if (code === "NEW") {
            activateNewBadge();
            setPromoMsg({ type: "ok", text: "🔥 Промокод активовано! Ти отримав статус NEW на 2 дні!" });
        } else if (code === "WELCOME" || code === "BONUS") {
            setPromoMsg({ type: "ok", text: `✅ Промокод "${promo.trim()}" активовано! Бонус нараховано.` });
        } else {
            setPromoMsg({ type: "err", text: "❌ Невірний промокод або термін його дії минув." });
        }
        setPromo("");
    };

    return (
        <div className="bonuses-tab">
            <h3 className="bonuses-title">Твої бонуси</h3>

            <div className="bonuses-tabs">
                <button
                    className={`bonuses-tab-btn${activeTab === "active" ? " active" : ""}`}
                    onClick={() => setActiveTab("active")}
                >
                    Активовані
                </button>
                <button
                    className={`bonuses-tab-btn${activeTab === "available" ? " active" : ""}`}
                    onClick={() => setActiveTab("available")}
                >
                    Доступні <span className="bonuses-tab-count">2</span>
                </button>
            </div>

            {activeTab === "active" ? (
                <p className="bonuses-empty">
                    <i className="fa-solid fa-inbox"></i><br />
                    У тебе немає активованих бонусів
                </p>
            ) : (
                <>
                    <p className="bonuses-hint">Бонуси, які ти можеш активувати та накопичувати прогрес</p>
                    <div className="bonuses-list">
                        {MOCK_BONUSES.map((b) => (
                            <div key={b.id} className="bonus-card">
                                <Timer targetDate={b.expiresAt} />

                                <div className="bonus-card-inner">
                                    <div className="bonus-icon-wrap">
                                        <span className="bonus-icon">{b.icon}</span>
                                        <span className="bonus-badge-fs">{b.badge}</span>
                                    </div>

                                    <div className="bonus-body">
                                        <div className="bonus-body-top">
                                            <span className="bonus-tag">{b.tag}</span>
                                            <span className="bonus-deposit">{b.depositMin}</span>
                                        </div>
                                        <h4 className="bonus-name">{b.title}</h4>

                                        <div className="bonus-options">
                                            {b.options.map((opt, i) => (
                                                <label
                                                    key={i}
                                                    className={`bonus-option${selectedOpts[b.id] === i ? " selected" : ""}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`bonus-${b.id}`}
                                                        checked={selectedOpts[b.id] === i}
                                                        onChange={() =>
                                                            setSelectedOpts((prev) => ({ ...prev, [b.id]: i }))
                                                        }
                                                    />
                                                    <span className="bonus-option-label">{opt.label}</span>
                                                    <span className="bonus-option-sub">{opt.sub}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bonus-actions">
                                        <Button variant="primary" small>Активувати</Button>
                                        <button className="bonus-info-btn">
                                            <i className="fa-solid fa-circle-info"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Promo code section */}
            <div className="promo-row">
                <span className="promo-label">
                    <i className="fa-solid fa-ticket"></i> Маєш промокод?
                </span>
                <div className="promo-input-wrap">
                    <input
                        type="text"
                        className="promo-input"
                        placeholder="Введи промокод"
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                    />
                    <Button variant="primary" small onClick={handlePromo}>
                        Застосувати
                    </Button>
                </div>
                {promoMsg && (
                    <p className={`promo-msg${promoMsg.type === "ok" ? " ok" : " err"}`}>
                        {promoMsg.text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BonusesTab;
