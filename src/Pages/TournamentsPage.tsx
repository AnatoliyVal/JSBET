import { useEffect, useState } from "react";
import { fetchTournamentsFromDB } from "../lib/seedService";
import Button from "../components/AllButtons/Button/Button";

type Tournament = {
    id: string;
    name: string;
    prize: string;
    status: string;
    theme: string;
    dateRange: string;
    participants: string;
    maxParticipants: string;
    minBet: string;
    games: string;
    condition: string;
};

const statusLabel: Record<string, string> = {
    live: "LIVE",
    upcoming: "Незабаром",
    finished: "Завершено",
};

const statusClass: Record<string, string> = {
    live: "tournament-status--live",
    upcoming: "tournament-status--upcoming",
    finished: "tournament-status--finished",
};

const TournamentsPage = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTournamentsFromDB()
            .then((data) => setTournaments(data as Tournament[]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <main>
                <div className="page-section active">
                    <div className="container" style={{ padding: "60px 0", textAlign: "center", color: "var(--color-text-muted)" }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32 }}></i>
                        <p style={{ marginTop: 16 }}>Завантаження турнірів…</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="page-section active" id="page-turniry">
                <section className="section" aria-labelledby="turniry-heading">
                    <div className="container">
                        <div className="section-header">
                            <h2 id="turniry-heading" className="section-title">
                                Турніри
                                <span className="section-count">· {tournaments.filter(t => t.status === "live").length} активних</span>
                            </h2>
                        </div>

                        <div className="tournaments-grid">
                            {tournaments.map((t) => (
                                <article className="tournament-card" key={t.id}>
                                    <div className={`tournament-card-header tournament-card-header--${t.theme}`}>
                                        <div className={`tournament-status ${statusClass[t.status] ?? ""}`}>
                                            {statusLabel[t.status] ?? t.status}
                                        </div>
                                        <h3 className="tournament-name">{t.name}</h3>
                                        <p className="tournament-prize">
                                            <i className="fa-solid fa-coins"></i> Призовий фонд: <strong>{t.prize}</strong>
                                        </p>
                                    </div>
                                    <div className="tournament-card-body">
                                        <div className="tournament-info-row">
                                            <div className="tournament-info-item">
                                                <span className="tournament-info-label">
                                                    <i className="fa-solid fa-calendar"></i> Дата
                                                </span>
                                                <span className="tournament-info-value">{t.dateRange}</span>
                                            </div>
                                            <div className="tournament-info-item">
                                                <span className="tournament-info-label">
                                                    <i className="fa-solid fa-users"></i> Учасники
                                                </span>
                                                <span className="tournament-info-value">{t.participants} / {t.maxParticipants}</span>
                                            </div>
                                        </div>
                                        <div className="tournament-conditions">
                                            <p className="tournament-conditions-title">Умови участі:</p>
                                            <ul className="tournament-conditions-list">
                                                <li>Мінімальна ставка: {t.minBet}</li>
                                                <li>Ігри: {t.games}</li>
                                                <li>{t.condition}</li>
                                            </ul>
                                        </div>
                                        <Button
                                            variant={t.status === "finished" ? "ghost" : "primary"}
                                            className="tournament-btn"
                                        >
                                            {t.status === "finished" ? "Результати" : t.status === "upcoming" ? "Нагадати мені" : "Зареєструватись"}
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default TournamentsPage;
