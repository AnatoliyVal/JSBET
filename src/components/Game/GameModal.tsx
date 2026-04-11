import { useEffect, useState, useRef } from "react";
import type { GameData } from "../Game/RandomGame/RandomGame";
import { getUserRating, setUserRating, getAverageRating } from "../../lib/ratingsService";
import { getReviews, addReview, type Review } from "../../lib/reviewsService";
import { useAuthStore } from "../../store/authStore";
import UserDisplay from "../User/UserDisplay";
import SlotGame from "./Slots/SlotGame";
import { S } from "./GameModalStyle";

const CATEGORY_INFO: Record<string, { description: string; rules: string }> = {
    "Фрукти": { description: "Яскравий слот з класичними фруктовими символами.", rules: "Збери 3+ однакових символів на лінії. Scatter запускає фріспіни з множниками." },
    "Рибалка": { description: "Морський слот про рибалку та великі улови.", rules: "Рибальський символ — Wild. Гачок запускає бонусний раунд 'Big Catch'." },
    "Тварини": { description: "Слот у світі дикої природи.", rules: "Wild розширюється на весь барабан. 10+ Scatter — 15 фріспінів." },
    "Єгипет": { description: "Таємниці стародавнього Єгипту та фараонів.", rules: "Книга — Wild і Scatter. 3+ книги дають 10 фріспінів з розширюваним символом." },
    "Боги": { description: "Слот між богами Олімпу.", rules: "Cascading перемоги підвищують множник. Блискавка Zeus — Wild." },
    "Класика": { description: "Ретро-слот в стилі класичних автоматів.", rules: "3 барабани, 5 ліній. 7 — найцінніший символ." },
    "Монети": { description: "Слот про золото та скарби.", rules: "Збери 6+ монет у Hold & Win. 3 Full — Grand Jackpot!" },
    "Магія": { description: "Казковий слот з принцесами.", rules: "Princess Wild розширюється. Starfall Feature після кожних 50 спінів." },
    "Містика": { description: "Слот з картами Таро.", rules: "Megaways: до 117 649 способів виграти. Cascades при кожній перемозі." },
    "Ацтеки": { description: "Скарби стародавніх ацтеків.", rules: "Маска Wild з ×2. 3+ піраміди — бонусний вибір скарбів." },
    "Джекпот": { description: "Прогресивні та фіксовані джекпоти.", rules: "6 горщиків золота — Grand. 3 повні рядки монет — Mega Jackpot." },
    "Хіп-хоп": { description: "Слот у стилі хіп-хоп культури.", rules: "DJ Wild замінює все. 5 SNOOP — ×1000 від ставки." },
    "Антик": { description: "Стародавня Греція та Рим.", rules: "Богиня Wild на барабанах 2–4. 3+ сонця — Free Games." },
    "Воїни": { description: "Епічний слот про бойових воїнів.", rules: "Меч — Wild. Щит — Scatter: 3+ дають 12 фріспінів." },
    "Природа": { description: "Тихоокеанський острів та корали.", rules: "Черепаха — Wild. 3+ квіток активують Reef Bonus." },
    "Конюшина": { description: "Ірландська удача та конюшина.", rules: "Лепрекон Wild з множником. 6+ конюшин — Hold & Win." },
    "Ягоди": { description: "Соковиті ягоди та літній настрій.", rules: "Суниця — ×500. Wild дає re-spin при появі." },
    "Азія": { description: "Китайська удача з драконами.", rules: "Дракон Wild замінює все. 3+ монети — 8 спінів з ×3." },
    "Mythologie": { description: "Слот між легендарними богами.", rules: "Divine Wild з ×2. Clash Feature — бонусний поєдинок богів." },
};
const DEFAULT_INFO = {
    description: "Захоплюючий слот з яскравою графікою.",
    rules: "Wild замінює більшість символів. Scatter активує фріспіни з множниками.",
};

type Props = { game: GameData; onClose: () => void };

const GameModal = ({ game, onClose }: Props) => {
    const user = useAuthStore((s) => s.user);
    const openAuthModal = useAuthStore((s) => s.openAuthModal);
    const [hover, setHover] = useState(0);
    const [userRating, setUserRatingState] = useState<number | null>(null);
    const [avg, setAvg] = useState<{ avg: number; count: number } | null>(null);
    const [saving, setSaving] = useState(false);
    const [slotOpen, setSlotOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const overlayRef = useRef<HTMLDivElement>(null);
    const info = CATEGORY_INFO[game.CategoryName] ?? DEFAULT_INFO;

    useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose]);
    useEffect(() => { getAverageRating(game.GameName).then(setAvg); }, [game.GameName]);
    useEffect(() => { if (!user) return; getUserRating(user.email, game.GameName).then(setUserRatingState); }, [user, game.GameName]);
    useEffect(() => {
        setReviewsLoading(true);
        getReviews(game.GameName).then(setReviews).finally(() => setReviewsLoading(false));
    }, [game.GameName]);

    const handleStar = async (star: number) => {
        if (!user || saving) return;
        setSaving(true);
        await setUserRating(user.email, game.GameName, star);
        setUserRatingState(star);
        setAvg(await getAverageRating(game.GameName));
        setSaving(false);
    };

    const handleSubmitReview = async () => {
        if (!user) { openAuthModal("login"); return; }
        const text = reviewText.trim();
        if (!text || submitting) return;
        setSubmitting(true);
        try {
            await addReview(game.GameName, user.email, user.displayName, text, user.badges || [], user.avatar || "", !!user.rainbowActive);
            setReviewText("");
            setReviews(await getReviews(game.GameName));
        } catch (err) {
            console.error("Помилка при додаванні відгуку:", err);
            alert("Не вдалося надіслати відгук.");
        } finally {
            setSubmitting(false);
        }
    };

    const displayStars = hover || userRating || 0;
    const fmt = (d: Date) => d.toLocaleDateString("uk-UA", { day: "2-digit", month: "short", year: "numeric" });

    return (
        <div style={S.overlay} ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
            role="dialog" aria-modal="true" aria-label={game.GameName}>
            <div style={S.modal(isMobile)}>
                <button style={S.closeBtn} onClick={onClose} aria-label="Закрити">
                    <i className="fa-solid fa-xmark" />
                </button>

                {/* Left column */}
                <div style={S.left(isMobile)}>
                    <div style={S.top}>
                        <img style={S.thumb} src={`index-files/games/${game.GameName}.webp`} alt={game.GameName} />
                        <div style={S.playArea}>
                            <h2 style={S.title}>{game.GameName}</h2>
                            <p style={S.provider}><i className="fa-solid fa-building" /> {game.GameOwner}</p>
                            <div style={S.metaRow}>
                                <span style={S.chip}><i className="fa-solid fa-tag" /> {game.CategoryName}</span>
                                <span style={S.chipGold}><i className="fa-solid fa-star" /> {game.rating}</span>
                                <span style={S.chip}><i className="fa-solid fa-users" /> {game.PlayerNow}</span>
                                {game.badge && <span style={S.chip}>{game.badge}</span>}
                            </div>
                            <button style={S.playBtn} onClick={() => setSlotOpen(true)}>
                                <i className="fa-solid fa-play" /> Почати грати
                            </button>
                        </div>
                    </div>

                    <div style={S.infoSection}>
                        <div style={S.infoBlock}>
                            <h3 style={S.infoTitle}><i className="fa-solid fa-circle-info" /> Про гру</h3>
                            <p style={S.infoText}>{info.description}</p>
                        </div>
                        <div style={S.infoBlock}>
                            <h3 style={S.infoTitle}><i className="fa-solid fa-scroll" /> Правила</h3>
                            <p style={S.infoText}>{info.rules}</p>
                        </div>
                        <div style={S.infoBlock}>
                            <h3 style={S.infoTitle}><i className="fa-solid fa-star" /> Оцінити</h3>
                            <div style={S.ratingRow}>
                                <div style={S.stars}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            style={S.star(displayStars >= s, !user || saving)}
                                            onClick={() => handleStar(s)}
                                            onMouseEnter={() => user && setHover(s)}
                                            onMouseLeave={() => setHover(0)}
                                            disabled={!user || saving}
                                            className={!user ? "gm-star readonly" : "gm-star"}
                                        >★</button>
                                    ))}
                                </div>
                                {avg && avg.count > 0
                                    ? <span style={S.avgLabel}>{avg.avg.toFixed(1)} <span style={S.avgCount}>({avg.count})</span></span>
                                    : <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Ще немає оцінок</span>
                                }
                            </div>
                            {!user && (
                                <button style={S.loginHint} className="gm-login-hint" onClick={() => openAuthModal("login")}>
                                    Увійдіть, щоб оцінити →
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right column — reviews */}
                <div style={S.reviewsCol(isMobile)}>
                    <h3 style={S.reviewsHeading}><i className="fa-solid fa-comments" /> Відгуки</h3>
                    <div style={S.reviewForm}>
                        <textarea
                            style={S.reviewInput}
                            placeholder={user ? "Напиши свій відгук…" : "Увійдіть, щоб залишити відгук"}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            disabled={!user || submitting}
                            rows={3}
                        />
                        <button
                            style={S.reviewSubmit(!user || submitting || !reviewText.trim())}
                            onClick={handleSubmitReview}
                            disabled={!user || submitting || !reviewText.trim()}
                        >
                            {submitting ? "Надсилання…" : "Надіслати"}
                        </button>
                    </div>
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {reviewsLoading ? (
                            <p style={S.reviewsEmpty}><i className="fa-solid fa-spinner fa-spin" /> Завантаження…</p>
                        ) : reviews.length === 0 ? (
                            <p style={S.reviewsEmpty}>Поки що немає відгуків. Будь першим!</p>
                        ) : (
                            <ul style={S.reviewsList}>
                                {reviews.map((r) => (
                                    <li key={r.id} style={S.reviewItem}>
                                        <div style={S.reviewHeader}>
                                            <UserDisplay email={r.userId} displayName={r.displayName} avatar={r.avatar}
                                                badges={r.badges} rainbowActive={r.rainbowActive} size="sm" />
                                            <span style={S.reviewDate}>{fmt(r.timestamp)}</span>
                                        </div>
                                        <p style={S.reviewText}>{r.text}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {slotOpen && <SlotGame game={game} onClose={() => setSlotOpen(false)} />}
        </div>
    );
};

export default GameModal;
