import { useEffect, useState, useRef } from "react";
import type { GameData } from "../Game/RandomGame/RandomGame";
import { getUserRating, setUserRating, getAverageRating } from "../../lib/ratingsService";
import { getReviews, addReview, type Review } from "../../lib/reviewsService";
import { useAuthStore } from "../../store/authStore";
import UserBadge from "../User/UserBadge";

const CATEGORY_INFO: Record<string, { description: string; rules: string }> = {
    "Фрукти":   { description: "Яскравий слот з класичними фруктовими символами.", rules: "Збери 3+ однакових символів на лінії. Scatter запускає фріспіни з множниками." },
    "Рибалка":  { description: "Морський слот про рибалку та великі улови.", rules: "Рибальський символ — Wild. Гачок запускає бонусний раунд 'Big Catch'." },
    "Тварини":  { description: "Слот у світі дикої природи.", rules: "Wild розширюється на весь барабан. 10+ Scatter — 15 фріспінів." },
    "Єгипет":   { description: "Таємниці стародавнього Єгипту та фараонів.", rules: "Книга — Wild і Scatter. 3+ книги дають 10 фріспінів з розширюваним символом." },
    "Боги":     { description: "Слот між богами Олімпу.", rules: "Cascading перемоги підвищують множник. Блискавка Zeus — Wild." },
    "Класика":  { description: "Ретро-слот в стилі класичних автоматів.", rules: "3 барабани, 5 ліній. 7 — найцінніший символ." },
    "Монети":   { description: "Слот про золото та скарби.", rules: "Збери 6+ монет у Hold & Win. 3 Full — Grand Jackpot!" },
    "Магія":    { description: "Казковий слот з принцесами.", rules: "Princess Wild розширюється. Starfall Feature після кожних 50 спінів." },
    "Містика":  { description: "Слот з картами Таро.", rules: "Megaways: до 117 649 способів виграти. Cascades при кожній перемозі." },
    "Ацтеки":   { description: "Скарби стародавніх ацтеків.", rules: "Маска Wild з ×2. 3+ піраміди — бонусний вибір скарбів." },
    "Джекпот":  { description: "Прогресивні та фіксовані джекпоти.", rules: "6 горщиків золота — Grand. 3 повні рядки монет — Mega Jackpot." },
    "Хіп-хоп": { description: "Слот у стилі хіп-хоп культури.", rules: "DJ Wild замінює все. 5 SNOOP — ×1000 від ставки." },
    "Антик":    { description: "Стародавня Греція та Рим.", rules: "Богиня Wild на барабанах 2–4. 3+ сонця — Free Games." },
    "Воїни":    { description: "Епічний слот про бойових воїнів.", rules: "Меч — Wild. Щит — Scatter: 3+ дають 12 фріспінів." },
    "Природа":  { description: "Тихоокеанський острів та корали.", rules: "Черепаха — Wild. 3+ квіток активують Reef Bonus." },
    "Конюшина": { description: "Ірландська удача та конюшина.", rules: "Лепрекон Wild з множником. 6+ конюшин — Hold & Win." },
    "Ягоди":    { description: "Соковиті ягоди та літній настрій.", rules: "Суниця — ×500. Wild дає re-spin при появі." },
    "Азія":     { description: "Китайська удача з драконами.", rules: "Дракон Wild замінює все. 3+ монети — 8 спінів з ×3." },
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

    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    const overlayRef = useRef<HTMLDivElement>(null);
    const info = CATEGORY_INFO[game.CategoryName] ?? DEFAULT_INFO;

    useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
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
            await addReview(
                game.GameName, 
                user.email, 
                user.displayName, 
                text, 
                user.badges || [], 
                user.avatar || ""
            );
            setReviewText("");
            setReviews(await getReviews(game.GameName));
        } catch (err) {
            console.error("Помилка при додаванні відгуку:", err);
            alert("Не вдалося надіслати відгук. Перевірте консоль браузера.");
        } finally {
            setSubmitting(false);
        }
    };

    const displayStars = hover || userRating || 0;
    const fmt = (d: Date) => d.toLocaleDateString("uk-UA", { day: "2-digit", month: "short", year: "numeric" });

    return (
        <div
            className="gm-overlay"
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
            role="dialog"
            aria-modal="true"
            aria-label={game.GameName}
        >
            <div className="gm">

                {/* Close button */}
                <button className="gm-close" onClick={onClose} aria-label="Закрити">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* LEFT COLUMN */}
                <div className="gm-left">

                    {/* DIV 1 — Image + Play */}
                    <div className="gm-top">
                        <img
                            className="gm-thumb"
                            src={`index-files/games/${game.GameName}.webp`}
                            alt={game.GameName}
                        />
                        <div className="gm-play-area">
                            <h2 className="gm-title">{game.GameName}</h2>
                            <p className="gm-provider">
                                <i className="fa-solid fa-building"></i> {game.GameOwner}
                            </p>
                            <div className="gm-meta-row">
                                <span className="gm-meta-chip">
                                    <i className="fa-solid fa-tag"></i> {game.CategoryName}
                                </span>
                                <span className="gm-meta-chip gold">
                                    <i className="fa-solid fa-star"></i> {game.rating}
                                </span>
                                <span className="gm-meta-chip">
                                    <i className="fa-solid fa-users"></i> {game.PlayerNow}
                                </span>
                                {game.badge && <span className="gm-meta-chip badge">{game.badge}</span>}
                            </div>
                            <button className="gm-play-btn">
                                <i className="fa-solid fa-play"></i> Почати грати
                            </button>
                        </div>
                    </div>

                    {/* DIV 2 — Info + Rules + Rating */}
                    <div className="gm-info">
                        <div className="gm-info-block">
                            <h3 className="gm-info-title"><i className="fa-solid fa-circle-info"></i> Про гру</h3>
                            <p className="gm-info-text">{info.description}</p>
                        </div>
                        <div className="gm-info-block">
                            <h3 className="gm-info-title"><i className="fa-solid fa-scroll"></i> Правила</h3>
                            <p className="gm-info-text">{info.rules}</p>
                        </div>
                        <div className="gm-info-block">
                            <h3 className="gm-info-title"><i className="fa-solid fa-star"></i> Оцінити</h3>
                            <div className="gm-rating-row">
                                <div className="gm-stars">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            className={`gm-star${displayStars >= s ? " filled" : ""}${!user ? " readonly" : ""}`}
                                            onClick={() => handleStar(s)}
                                            onMouseEnter={() => user && setHover(s)}
                                            onMouseLeave={() => setHover(0)}
                                            disabled={!user || saving}
                                            title={!user ? "Увійдіть, щоб оцінити" : `${s} зірок`}
                                        >★</button>
                                    ))}
                                </div>
                                {avg && avg.count > 0
                                    ? <span className="gm-avg">{avg.avg.toFixed(1)} <span className="gm-avg-count">({avg.count})</span></span>
                                    : <span className="gm-avg-empty">Ще немає оцінок</span>
                                }
                            </div>
                            {!user && (
                                <button className="gm-login-hint" onClick={() => openAuthModal("login")}>
                                    Увійдіть, щоб оцінити →
                                </button>
                            )}
                        </div>
                    </div>

                </div>

                {/* DIV 3 — RIGHT COLUMN: Reviews */}
                <div className="gm-reviews-col">
                    <h3 className="gm-reviews-heading">
                        <i className="fa-solid fa-comments"></i> Відгуки
                    </h3>

                    <div className="gm-review-form">
                        <textarea
                            className="gm-review-input"
                            placeholder={user ? "Напиши свій відгук…" : "Увійдіть, щоб залишити відгук"}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            disabled={!user || submitting}
                            rows={3}
                        />
                        <button
                            className="gm-review-submit"
                            onClick={handleSubmitReview}
                            disabled={!user || submitting || !reviewText.trim()}
                        >
                            {submitting ? "Надсилання…" : "Надіслати"}
                        </button>
                    </div>

                    <div className="gm-reviews-list-wrap">
                        {reviewsLoading ? (
                            <p className="gm-reviews-empty"><i className="fa-solid fa-spinner fa-spin"></i> Завантаження…</p>
                        ) : reviews.length === 0 ? (
                            <p className="gm-reviews-empty">Поки що немає відгуків. Будь першим!</p>
                        ) : (
                            <ul className="gm-reviews-list">
                                {reviews.map((r) => {
                                    // Use stored badges, but for current user's own reviews, show their live badges
                                    const displayBadges = r.userId === user?.email ? (user?.badges || []) : (r.badges || []);
                                    // For reviews, we consider "NEW" if it was NEW at the time (stored in badges) 
                                    // or if the live user has it (for their own reviews)
                                    const isLiveNew = r.userId === user?.email && (user?.isNewUntil ? Date.now() < user.isNewUntil : false);

                                    // Avatar logic: Show live user avatar if it's their own review, else use stored avatar, else default
                                    const userAvatar = r.userId === user?.email ? user?.avatar : null;
                                    const avatarSrc = userAvatar || r.avatar || "index-files/icons/free-icon-profile-711769.png";

                                    return (
                                        <li key={r.id} className="gm-review-item">
                                            <div className="gm-review-header">
                                                <img
                                                    src={avatarSrc}
                                                    alt={r.displayName}
                                                    className="gm-review-avatar"
                                                />
                                                <span className="gm-review-author">
                                                    {r.displayName}
                                                    <UserBadge badges={displayBadges} isNewUntil={isLiveNew ? Date.now() + 1000 : 0} />
                                                </span>
                                                <span className="gm-review-date">{fmt(r.timestamp)}</span>
                                            </div>
                                            <p className="gm-review-text">{r.text}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GameModal;
