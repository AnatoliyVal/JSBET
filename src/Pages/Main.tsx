import Game from "../components/Game/Game";
import CategoryButton from "../components/AllButtons/CategoryButton/CategoryButton";
import Button from "../components/AllButtons/Button/Button";
import { RandomGameList } from "../components/Game/RandomGame/RandomGame.tsx";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const GamesPage = () => {
    const openAuthModal = useAuthStore((s) => s.openAuthModal);
    const user = useAuthStore((s) => s.user);

    return (
        <main>
                <div className="page-section active" id="page-igri">
                    <div id="time" className="time_now"></div>
                    <section className="hero" aria-label="Вітальний банер">
                        <div className="container">
                            <div className="hero-inner">

                                <p className="hero-eyebrow">
                                    <i className="fa-solid fa-fire"></i> Понад 3000 ігор
                                </p>

                                <h1 className="hero-title">
                                    Грай. Вигравай.<br />
                                    <span className="accent">Відчувай азарт.</span>
                                </h1>

                                <p className="hero-subtitle">
                                    Найкращі слоти, Live games та джекпоти від провідних провайдерів. Реєструйся та
                                    отримуй
                                    бонуси
                                    прямо зараз!
                                </p>

                                <div className="hero-actions">
                                    {!user ? (
                                        <Button variant="primary" onClick={() => openAuthModal("register")}>
                                            Почати грати
                                        </Button>
                                    ) : (
                                        <Link to="/tournaments">
                                            <Button variant="primary">Перейти до турнірів</Button>
                                        </Link>
                                    )}
                                    <Link to="/about">
                                        <Button variant="ghost">Дізнатись більше</Button>
                                    </Link>
                                </div>

                                <div className="stats-bar" aria-label="Статистика ігор">
                                    <div className="stats-bar-item">
                                        <div className="stats-bar-value">3 000+</div>
                                        <div className="stats-bar-label">ігор</div>
                                    </div>
                                    <div className="stats-bar-item">
                                        <div className="stats-bar-value">50+</div>
                                        <div className="stats-bar-label">провайдерів</div>
                                    </div>
                                    <div className="stats-bar-item">
                                        <div className="stats-bar-value">24/7</div>
                                        <div className="stats-bar-label">підтримка</div>
                                    </div>
                                    <div className="stats-bar-item">
                                        <div className="stats-bar-value">₴1 000 000</div>
                                        <div className="stats-bar-label">виплачено сьогодні</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    <div className="container">
                        <div className="category-row" aria-label="Фільтр за тематикою">
                            <ul className="category-row-list" role="list">
                                <li>
                                    <button className="category-chip active" type="button">Всі</button>
                                </li>
                                <CategoryButton CategoryName="Фрукти" />
                                <CategoryButton CategoryName="Книги" />
                                <CategoryButton CategoryName="Монети" />
                                <CategoryButton CategoryName="Скарби" />
                                <CategoryButton CategoryName="Єгипет" />
                                <CategoryButton CategoryName="Кристали" />
                                <CategoryButton CategoryName="Тварини" />
                                <CategoryButton CategoryName="Рибалка" />
                                <CategoryButton CategoryName="Вегас" />
                                <CategoryButton CategoryName="Вікінги" />
                                <CategoryButton CategoryName="Ретро" />
                                <CategoryButton CategoryName="Солодощі" />
                                <CategoryButton CategoryName="Класика" />
                            </ul>
                        </div>
                    </div>

                    <section className="section" id="recommended-section" aria-labelledby="recommended-heading">
                        <div className="container">
                            <div className="section-header">
                                <h2 id="recommended-heading" className="section-title">
                                    Рекомендовані для вас
                                    <span className="section-count" id="recommended-count">· 6 ігор</span>
                                </h2>
                            </div>
                            <div className="games-grid" role="list" id="recommended-grid">
                                <RandomGameList count={6} />
                            </div>
                        </div>
                    </section>
                    <section className="section" aria-labelledby="popular-heading">
                        <div className="container">

                            <div className="section-header">
                                <h2 id="popular-heading" className="section-title">
                                    Популярні
                                    <span className="section-count">· 18 ігор</span>
                                </h2>
                                <a href="#" className="section-link">Усі ігри →</a>
                            </div>

                            <div className="games-grid" role="list">
                                <Game GameName="Sweet Bonanza" GameOwner="Pragmatic Play" CategoryName="Фрукти" rating="4.9" PlayerNow="3 241" badge="Хіт" url="https://slotcity.ua/game/pragmaticplay-direct-sweet-bonanza"/>
                                <Game GameName="Big Bass Bonanza" GameOwner="Pragmatic Play" CategoryName="Рибалка" rating="4.8" PlayerNow="2 187" badge="Джекпот" />
                                <Game GameName="The Dog House" GameOwner="Pragmatic Play" CategoryName="Тварини" rating="4.7" PlayerNow="1 854" badge="Новинка" />
                                <Game GameName="Starlight Princess 1000" GameOwner="Pragmatic Play" CategoryName="Магія" rating="4.9" PlayerNow="4 012" />
                                <Game GameName="Madame Destiny Megaways" GameOwner="Pragmatic Play" CategoryName="Містика" rating="4.6" PlayerNow="987" />
                                <Game GameName="Zeus vs Hades" GameOwner="Pragmatic Play" CategoryName="Mythologie" rating="4.8" PlayerNow="2 650" />
                                <Game GameName="Gates of Olympus SS" GameOwner="Pragmatic Play" CategoryName="Боги" rating="4.7" PlayerNow="3 108" />
                                <Game GameName="Snoop Dogg Dollars" GameOwner="Pragmatic Play" CategoryName="Хіп-хоп" rating="4.5" PlayerNow="742" />
                                <Game GameName="Aztec Magic Bonanza" GameOwner="BGaming" CategoryName="Ацтеки" rating="4.6" PlayerNow="1 230" badge="Новинка" />
                                <Game GameName="Sun of Egypt 3" GameOwner="Booongo" CategoryName="Єгипет" rating="4.5" PlayerNow="895" />
                                <Game GameName="Wild Cash x9990" GameOwner="Endorphina" CategoryName="Класика" rating="4.4" PlayerNow="611" />
                                <Game GameName="Rainbow Reels" GameOwner="Playson" CategoryName="Класика" rating="4.3" PlayerNow="528" />

                            </div>
                        </div>
                    </section>

                    <section className="section" aria-labelledby="new-heading">
                        <div className="container">

                            <div className="section-header">
                                <h2 id="new-heading" className="section-title">
                                    Нові ігри
                                    <span className="section-count">· 12 ігор</span>
                                </h2>
                                <a href="#" className="section-link">Усі нові →</a>
                            </div>

                            <div className="games-grid" role="list">
                                <Game GameName="Big Bass Splash" GameOwner="Pragmatic Play" CategoryName="Рибалка" rating="4.7" PlayerNow="1 543" />
                                <Game GameName="Coral Island" GameOwner="Playson" CategoryName="Природа" rating="4.5" PlayerNow="876" />
                                <Game GameName="Army of Ares" GameOwner="Relax Gaming" CategoryName="Воїни" rating="4.6" PlayerNow="1 102" />
                                <Game GameName="Fire Coins Hold and Win" GameOwner="Playson" CategoryName="Монети" rating="4.8" PlayerNow="2 310" />
                                <Game GameName="Joker Blaze" GameOwner="Playson" CategoryName="Класика" rating="4.4" PlayerNow="684" />
                                <Game GameName="Coin Spin Fever" GameOwner="3 Oaks" CategoryName="Монети" rating="4.3" PlayerNow="449" />
                                <Game GameName="Queen of Greece" GameOwner="Amatic" CategoryName="Антик" rating="4.5" PlayerNow="731" />
                                <Game GameName="Solar Queen" GameOwner="Playson" CategoryName="Єгипет" rating="4.6" PlayerNow="918" />
                                <Game GameName="Poseidon Wild Wrath" GameOwner="Playson" CategoryName="Боги" rating="4.6" PlayerNow="1 057" />
                                <Game GameName="Supercharged Clovers Hold and Win" GameOwner="Playson" CategoryName="Конюшина" rating="4.4" PlayerNow="592" />
                                <Game GameName="Glowberry Blast" GameOwner="Booming" CategoryName="Ягоди" rating="4.5" PlayerNow="803" />
                                <Game GameName="Serengeti Sunrise" GameOwner="Spribe" CategoryName="Тварини" rating="4.3" PlayerNow="367" />
                            </div>
                        </div>
                    </section>

                    <section className="section" aria-labelledby="jackpot-heading">
                        <div className="container">

                            <div className="section-header">
                                <h2 id="jackpot-heading" className="section-title">
                                    Джекпоти
                                    <span className="section-count">· 8 ігор</span>
                                </h2>
                                <a href="#" className="section-link">Усі джекпоти →</a>
                            </div>

                            <div className="games-grid" role="list">
                                <Game GameName="3 Pots Riches Hold and Win" GameOwner="Playson" CategoryName="Джекпот" rating="4.7" PlayerNow="1 891" />
                                <Game GameName="Thunder Coins Hold and Win" GameOwner="Playson" CategoryName="Джекпот" rating="4.6" PlayerNow="1 340" />
                                <Game GameName="Book of Egyptian Marvel" GameOwner="Playson" CategoryName="Єгипет" rating="4.5" PlayerNow="1 024" />
                                <Game GameName="Sweet Bonanza 1000" GameOwner="Pragmatic Play" CategoryName="Фрукти" rating="4.8" PlayerNow="2 743" />
                                <Game GameName="Amazing Diamonds" GameOwner="Amatic" CategoryName="Класика" rating="4.4" PlayerNow="816" />
                                <Game GameName="Good Luck Good Fortune" GameOwner="Pragmatic Play" CategoryName="Азія" rating="4.5" PlayerNow="1 178" />
                            </div>
                        </div>
                    </section>

                    <section className="section" aria-labelledby="fishing-heading">
                        <div className="container">

                            <div className="section-header">
                                <h2 id="fishing-heading" className="section-title">
                                    Рибалка
                                    <span className="section-count">· 8 ігор</span>
                                </h2>
                                <a href="#" className="section-link">Усі →</a>
                            </div>

                            <div className="games-grid" role="list">
                                <Game GameName="Fishing Club" GameOwner="Playson" CategoryName="Рибалка" rating="4.7" PlayerNow="1 629" badge= "Джекпот"/>
                                <Game GameName="Fishin Reels" GameOwner="Iron Dog" CategoryName="Рибалка" rating="4.4" PlayerNow="723" />
                                <Game GameName="Marlin Masters The Big Haul" GameOwner="Playson" CategoryName="Рибалка" rating="4.5" PlayerNow="547" />
                                <Game GameName="Fishin Bear" GameOwner="Playson" CategoryName="Рибалка" rating="4.3" PlayerNow="412" />
                                <Game GameName="Trouts Treasure Payday" GameOwner="Playson" CategoryName="Рибалка" rating="4.4" PlayerNow="389" />
                                <Game GameName="Fish Day" GameOwner="3 Oaks" CategoryName="Рибалка" rating="4.2" PlayerNow="298" />
                            </div>
                        </div>
                    </section>

                </div>
            </main>
    );
};

export default GamesPage;
