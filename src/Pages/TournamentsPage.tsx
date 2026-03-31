import { useEffect, useState } from "react";
import { fetchTournamentsFromDB } from "../lib/seedService";
import Button from "../components/AllButtons/Button/Button";
import { useAuthStore } from "../store/authStore";
import { registerForTournament, getUserRegistrations } from "../lib/tournamentService";
import { sendTournamentReminder } from "../lib/emailService";
import TournamentRegistrationModal from "../components/Tournaments/TournamentRegistrationModal";

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
    const user = useAuthStore((s) => s.user);
    const openAuthModal = useAuthStore((s) => s.openAuthModal);
    
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState<string[]>([]);
    const [regId, setRegId] = useState<string | null>(null);
    const [sendingEmail, setSendingEmail] = useState(false);

    useEffect(() => {
        fetchTournamentsFromDB()
            .then((data) => setTournaments(data as Tournament[]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (user) {
            getUserRegistrations(user.email).then(setRegistrations);
        }
    }, [user]);

    const handleRegister = async (t: Tournament, emailReminder: boolean) => {
        if (!user) {
            openAuthModal("login");
            return;
        }

        try {
            setSendingEmail(true);
            await registerForTournament(user.email, t.id);
            setRegistrations(prev => [...prev, t.id]);
            
            if (emailReminder) {
                await sendTournamentReminder(user.email, user.displayName, t.name, t.dateRange);
                alert("Ви успішно зареєстровані! Нагадування надіслано на пошту.");
            } else {
                alert("Ви успішно зареєстровані!");
            }
            setRegId(null);
        } catch (err) {
            console.error(err);
            alert("Помилка при реєстрації.");
        } finally {
            setSendingEmail(false);
        }
    };

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
                            {tournaments.map((t) => {
                                const isRegistered = registrations.includes(t.id);
                                return (
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
                                                variant={t.status === "finished" ? "ghost" : isRegistered ? "ghost" : "primary"}
                                                className="tournament-btn"
                                                disabled={isRegistered || (t.status === "finished" && false)}
                                                onClick={() => {
                                                    if (t.status === "finished") return;
                                                    setRegId(t.id);
                                                }}
                                            >
                                                {t.status === "finished" ? "Результати" : isRegistered ? "Ви зареєстровані ✓" : t.status === "upcoming" ? "Нагадати мені" : "Зареєструватись"}
                                            </Button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {/* Registration Confirmation Modal */}
            {regId && (
                <TournamentRegistrationModal 
                    tournamentName={tournaments.find(t => t.id === regId)?.name || ""}
                    onClose={() => setRegId(null)}
                    isSubmitting={sendingEmail}
                    onConfirm={(emailReminder) => {
                        const t = tournaments.find(x => x.id === regId);
                        if (t) handleRegister(t, emailReminder);
                    }}
                />
            )}
        </main>
    );
};

export default TournamentsPage;
