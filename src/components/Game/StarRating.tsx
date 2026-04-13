import {useState, useEffect} from "react";
import {getUserRating, setUserRating, getAverageRating} from "../../lib/ratingsService";
import {useAuthStore} from "../../store/authStore";

type Props = {
    gameId: string;
};

const StarRating = ({gameId}: Props) => {
    const user = useAuthStore((s) => s.user);
    const [hover, setHover] = useState(0);
    const [userRating, setUserRatingState] = useState<number | null>(null);
    const [avg, setAvg] = useState<{ avg: number; count: number } | null>(null);
    const [saving, setSaving] = useState(false);

    // Load avg rating for everyone
    useEffect(() => {
        getAverageRating(gameId).then(setAvg);
    }, [gameId]);

    // Load this user's own rating if logged in
    useEffect(() => {
        if (!user) return;
        getUserRating(user.email, gameId).then(setUserRatingState);
    }, [user, gameId]);

    const handleClick = async (star: number) => {
        if (!user || saving) return;
        setSaving(true);
        await setUserRating(user.email, gameId, star);
        setUserRatingState(star);
        // Refresh avg
        const newAvg = await getAverageRating(gameId);
        setAvg(newAvg);
        setSaving(false);
    };

    const displayRating = hover || userRating || 0;

    return (
        <div className="star-rating">
            <div className="star-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`star-btn${displayRating >= star ? " filled" : ""}${!user ? " readonly" : ""}`}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => user && setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        disabled={!user || saving}
                        aria-label={`Оцінити ${star} з 5`}
                        title={!user ? "Увійдіть, щоб оцінити" : `${star} зірок`}
                    >
                        ★
                    </button>
                ))}
            </div>
            {avg && avg.count > 0 && (
                <span className="star-rating-avg">
                    {avg.avg.toFixed(1)} <span className="star-rating-count">({avg.count})</span>
                </span>
            )}
        </div>
    );
};

export default StarRating;
