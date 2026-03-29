import Button from "../components/AllButtons/Button/Button";

const TournamentsPage = () => {
    return (
        <main>
            <div className="page-section active" id="page-turniry">
                <section className="section" aria-labelledby="turniry-heading">
                    <div className="container">
                        <div className="section-header">
                            <h2 id="turniry-heading" className="section-title">
                                Турніри
                                <span className="section-count">· 4 активних</span>
                            </h2>
                        </div>

                        <div className="tournaments-grid">
                            <article className="tournament-card">
                                <div className="tournament-card-header tournament-card-header--gold">
                                    <div className="tournament-status tournament-status--live">LIVE</div>
                                    <h3 className="tournament-name">Golden Slots Championship</h3>
                                    <p className="tournament-prize">
                                        <i className="fa-solid fa-coins"></i> Призовий фонд:
                                        <strong>₴500 000</strong>
                                    </p>
                                </div>
                                <div className="tournament-card-body">
                                    <div className="tournament-info-row">
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-calendar"></i> Дата
                                            </span>
                                            <span className="tournament-info-value">04.03 – 10.03.2026</span>
                                        </div>
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-users"></i> Учасники
                                            </span>
                                            <span className="tournament-info-value">1 248 / 2 000</span>
                                        </div>
                                    </div>
                                    <div className="tournament-conditions">
                                        <p className="tournament-conditions-title">Умови участі:</p>
                                        <ul className="tournament-conditions-list">
                                            <li>Мінімальна ставка: ₴10</li>
                                            <li>Ігри: Sweet Bonanza, Gates of Olympus</li>
                                            <li>Мінімум 50 спінів для кваліфікації</li>
                                        </ul>
                                    </div>
                                    <Button variant="primary" className="tournament-btn">
                                        Зареєструватись
                                    </Button>
                                </div>
                            </article>

                            <article className="tournament-card">
                                <div className="tournament-card-header tournament-card-header--blue">
                                    <div className="tournament-status tournament-status--upcoming">Незабаром</div>
                                    <h3 className="tournament-name">Fishing Frenzy Cup</h3>
                                    <p className="tournament-prize">
                                        <i className="fa-solid fa-coins"></i> Призовий фонд:
                                        <strong>₴200 000</strong>
                                    </p>
                                </div>
                                <div className="tournament-card-body">
                                    <div className="tournament-info-row">
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-calendar"></i> Дата
                                            </span>
                                            <span className="tournament-info-value">12.03 – 14.03.2026</span>
                                        </div>
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-users"></i> Учасники
                                            </span>
                                            <span className="tournament-info-value">384 / 1 000</span>
                                        </div>
                                    </div>
                                    <div className="tournament-conditions">
                                        <p className="tournament-conditions-title">Умови участі:</p>
                                        <ul className="tournament-conditions-list">
                                            <li>Мінімальна ставка: ₴5</li>
                                            <li>Ігри: Big Bass Bonanza, Fishing Club</li>
                                            <li>Рейтинг за загальну суму виграшів</li>
                                        </ul>
                                    </div>
                                    <Button variant="ghost" className="tournament-btn">
                                        Нагадати мені
                                    </Button>
                                </div>
                            </article>

                            <article className="tournament-card">
                                <div className="tournament-card-header tournament-card-header--purple">
                                    <div className="tournament-status tournament-status--live">LIVE</div>
                                    <h3 className="tournament-name">Jackpot Hunter Series</h3>
                                    <p className="tournament-prize">
                                        <i className="fa-solid fa-coins"></i> Призовий фонд:{" "}
                                        <strong>₴1 000 000</strong>
                                    </p>
                                </div>
                                <div className="tournament-card-body">
                                    <div className="tournament-info-row">
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-calendar"></i> Дата
                                            </span>
                                            <span className="tournament-info-value">01.03 – 15.03.2026</span>
                                        </div>
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-users"></i> Учасники
                                            </span>
                                            <span className="tournament-info-value">8 942 / 10 000</span>
                                        </div>
                                    </div>
                                    <div className="tournament-conditions">
                                        <p className="tournament-conditions-title">Умови участі:</p>
                                        <ul className="tournament-conditions-list">
                                            <li>Мінімальна ставка: ₴20</li>
                                            <li>Ігри: Всі ігри з джекпотами</li>
                                            <li>Рейтинг за максимальний множник виграшу</li>
                                        </ul>
                                    </div>
                                    <Button variant="primary" className="tournament-btn">
                                        Зареєструватись
                                    </Button>
                                </div>
                            </article>

                            <article className="tournament-card">
                                <div className="tournament-card-header tournament-card-header--green">
                                    <div className="tournament-status tournament-status--finished">Завершено</div>
                                    <h3 className="tournament-name">Weekend Clash</h3>
                                    <p className="tournament-prize">
                                        <i className="fa-solid fa-coins"></i> Призовий фонд:
                                        <strong>₴150 000</strong>
                                    </p>
                                </div>
                                <div className="tournament-card-body">
                                    <div className="tournament-info-row">
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-calendar"></i> Дата
                                            </span>
                                            <span className="tournament-info-value">28.02 – 01.03.2026</span>
                                        </div>
                                        <div className="tournament-info-item">
                                            <span className="tournament-info-label">
                                                <i className="fa-solid fa-trophy"></i> Переможець
                                            </span>
                                            <span className="tournament-info-value">OlegK***</span>
                                        </div>
                                    </div>
                                    <div className="tournament-conditions">
                                        <p className="tournament-conditions-title">Топ 3 переможці:</p>
                                        <ul className="tournament-conditions-list">
                                            <li>1. OlegK*** - ₴50 000</li>
                                            <li>2. Anna99 - ₴30 000</li>
                                            <li>3. MaxBet - ₴15 000</li>
                                        </ul>
                                    </div>
                                    <Button variant="ghost" className="tournament-btn">
                                        Результати
                                    </Button>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default TournamentsPage;
