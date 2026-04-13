import {useState, useEffect} from "react";
import Game from "../components/Game/GameTotal";
import CategoryButton from "../components/AllButtons/CategoryButton";
import Button from "../components/AllButtons/Button";
import {RandomGameList, GAMES_DB} from "../components/Game/RandomGame";
import {Link} from "react-router-dom";
import {useAuthStore} from "../store/authStore";
import {S} from "./MainStyle";

const Section = ({id, heading, count, link, linkText, children, isMobile}: {
    id?: string;
    heading: string;
    count: string;
    link?: string;
    linkText?: string;
    children: React.ReactNode;
    isMobile?: boolean;
}) => (
    <section style={S.section} aria-labelledby={id}>
        <div style={S.container}>
            <div style={S.sectionHeader}>
                <h2 id={id} style={S.sectionTitle}>
                    {heading}<span style={S.sectionCount}>· {count}</span>
                </h2>
                {link && <a href={link} style={S.sectionLink}>{linkText} →</a>}
            </div>
            <div style={S.gamesGrid(isMobile)} role="list">{children}</div>
        </div>
    </section>
);

const GamesPage = () => {
    const openAuthModal = useAuthStore((s) => s.openAuthModal);
    const user = useAuthStore((s) => s.user);
    const [selectedCategory, setSelectedCategory] = useState<string>("Всі");
    const categories = ["Фрукти", "Книги", "Монети", "Скарби", "Єгипет", "Кристали", "Тварини", "Рибалка", "Вегас", "Вікінги", "Ретро", "Солодощі", "Класика"];
    const [isMobile, setIsMobile] = useState(window.innerWidth < 570);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 570);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <main>
            <div style={{display: "block"}} id="page-igri">
                {!user && (
                    <section style={S.hero} aria-label="Вітальний банер">
                        <div style={S.container}>
                            <div style={S.heroInner}>
                                <p style={S.heroEyebrow}>Понад 3000 ігор</p>
                                <h1 style={S.heroTitle}>
                                    Грай. Вигравай.<br/>
                                    <span style={S.heroAccent}>Відчувай азарт.</span>
                                </h1>
                                <p style={S.heroSubtitle}>
                                    Найкращі слоти, Live games та джекпоти від провідних провайдерів. Реєструйся та
                                    отримуй бонуси прямо зараз!
                                </p>
                                <div style={S.heroActions}>
                                    <Button variant="primary" onClick={() => openAuthModal("register")}>Почати
                                        грати</Button>
                                    <Link to="/about"><Button variant="ghost">Дізнатись більше</Button></Link>
                                </div>
                                <div style={S.statsBar} aria-label="Статистика ігор">
                                    {[
                                        {v: "3 000+", l: "ігор"},
                                        {v: "50+", l: "провайдерів"},
                                        {v: "24/7", l: "підтримка"},
                                        {v: "₴1 000 000", l: "виплачено сьогодні"},
                                    ].map(({v, l}) => (
                                        <div key={l} style={S.statsBarItem}>
                                            <div style={S.statsBarValue}>{v}</div>
                                            <div style={S.statsBarLabel}>{l}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <div style={S.container}>
                    <div style={S.categoryRow} aria-label="Фільтр за тематикою">
                        <ul style={S.categoryList} role="list">
                            <li>
                                <button style={S.categoryChip(selectedCategory === "Всі")} type="button"
                                        onClick={() => setSelectedCategory("Всі")}>
                                    Всі
                                </button>
                            </li>
                            {categories.map(cat => (
                                <CategoryButton key={cat} CategoryName={cat} isActive={selectedCategory === cat}
                                                onClick={() => setSelectedCategory(cat)}/>
                            ))}
                        </ul>
                    </div>
                </div>

                {selectedCategory === "Всі" ? (
                    <>
                        <Section id="recommended-heading" heading="Рекомендовані для вас" count="6 ігор"
                                 isMobile={isMobile}>
                            <RandomGameList count={6}/>
                        </Section>
                        <Section id="popular-heading" heading="Популярні" count="18 ігор" link="#" linkText="Всі ігри"
                                 isMobile={isMobile}>
                            <Game GameName="Sweet Bonanza" GameOwner="Pragmatic Play" CategoryName="Фрукти" rating="4.9"
                                  PlayerNow="3 241" badge="Хіт"/>
                            <Game GameName="Big Bass Bonanza" GameOwner="Pragmatic Play" CategoryName="Рибалка"
                                  rating="4.8" PlayerNow="2 187" badge="Джекпот"/>
                            <Game GameName="The Dog House" GameOwner="Pragmatic Play" CategoryName="Тварини"
                                  rating="4.7" PlayerNow="1 854" badge="Новинка"/>
                            <Game GameName="Starlight Princess 1000" GameOwner="Pragmatic Play" CategoryName="Магія"
                                  rating="4.9" PlayerNow="4 012"/>
                            <Game GameName="Madame Destiny Megaways" GameOwner="Pragmatic Play" CategoryName="Містика"
                                  rating="4.6" PlayerNow="987"/>
                            <Game GameName="Zeus vs Hades" GameOwner="Pragmatic Play" CategoryName="Mythologie"
                                  rating="4.8" PlayerNow="2 650"/>
                            <Game GameName="Gates of Olympus SS" GameOwner="Pragmatic Play" CategoryName="Боги"
                                  rating="4.7" PlayerNow="3 108"/>
                            <Game GameName="Snoop Dogg Dollars" GameOwner="Pragmatic Play" CategoryName="Хіп-хоп"
                                  rating="4.5" PlayerNow="742"/>
                            <Game GameName="Aztec Magic Bonanza" GameOwner="BGaming" CategoryName="Ацтеки" rating="4.6"
                                  PlayerNow="1 230" badge="Новинка"/>
                            <Game GameName="Sun of Egypt 3" GameOwner="Booongo" CategoryName="Єгипет" rating="4.5"
                                  PlayerNow="895"/>
                            <Game GameName="Wild Cash x9990" GameOwner="Endorphina" CategoryName="Класика" rating="4.4"
                                  PlayerNow="611"/>
                            <Game GameName="Rainbow Reels" GameOwner="Playson" CategoryName="Класика" rating="4.3"
                                  PlayerNow="528"/>
                        </Section>
                        <Section id="new-heading" heading="Нові ігри" count="12 ігор" link="#" linkText="Всі нові"
                                 isMobile={isMobile}>
                            <Game GameName="Big Bass Splash" GameOwner="Pragmatic Play" CategoryName="Рибалка"
                                  rating="4.7" PlayerNow="1 543"/>
                            <Game GameName="Coral Island" GameOwner="Playson" CategoryName="Природа" rating="4.5"
                                  PlayerNow="876"/>
                            <Game GameName="Army of Ares" GameOwner="Relax Gaming" CategoryName="Воїни" rating="4.6"
                                  PlayerNow="1 102"/>
                            <Game GameName="Fire Coins Hold and Win" GameOwner="Playson" CategoryName="Монети"
                                  rating="4.8" PlayerNow="2 310"/>
                            <Game GameName="Joker Blaze" GameOwner="Playson" CategoryName="Класика" rating="4.4"
                                  PlayerNow="684"/>
                            <Game GameName="Coin Spin Fever" GameOwner="3 Oaks" CategoryName="Монети" rating="4.3"
                                  PlayerNow="449"/>
                            <Game GameName="Queen of Greece" GameOwner="Amatic" CategoryName="Антик" rating="4.5"
                                  PlayerNow="731"/>
                            <Game GameName="Solar Queen" GameOwner="Playson" CategoryName="Єгипет" rating="4.6"
                                  PlayerNow="918"/>
                            <Game GameName="Poseidon Wild Wrath" GameOwner="Playson" CategoryName="Боги" rating="4.6"
                                  PlayerNow="1 057"/>
                            <Game GameName="Supercharged Clovers Hold and Win" GameOwner="Playson"
                                  CategoryName="Конюшина" rating="4.4" PlayerNow="592"/>
                            <Game GameName="Glowberry Blast" GameOwner="Booming" CategoryName="Ягоди" rating="4.5"
                                  PlayerNow="803"/>
                            <Game GameName="Serengeti Sunrise" GameOwner="Spribe" CategoryName="Тварини" rating="4.3"
                                  PlayerNow="367"/>
                        </Section>
                        <Section id="jackpot-heading" heading="Джекпоти" count="8 ігор" link="#" linkText="Всі джекпоти"
                                 isMobile={isMobile}>
                            <Game GameName="3 Pots Riches Hold and Win" GameOwner="Playson" CategoryName="Джекпот"
                                  rating="4.7" PlayerNow="1 891"/>
                            <Game GameName="Thunder Coins Hold and Win" GameOwner="Playson" CategoryName="Джекпот"
                                  rating="4.6" PlayerNow="1 340"/>
                            <Game GameName="Book of Egyptian Marvel" GameOwner="Playson" CategoryName="Єгипет"
                                  rating="4.5" PlayerNow="1 024"/>
                            <Game GameName="Sweet Bonanza 1000" GameOwner="Pragmatic Play" CategoryName="Фрукти"
                                  rating="4.8" PlayerNow="2 743"/>
                            <Game GameName="Amazing Diamonds" GameOwner="Amatic" CategoryName="Класика" rating="4.4"
                                  PlayerNow="816"/>
                            <Game GameName="Good Luck Good Fortune" GameOwner="Pragmatic Play" CategoryName="Азія"
                                  rating="4.5" PlayerNow="1 178"/>
                        </Section>
                        <Section id="fishing-heading" heading="Рибалка" count="8 ігор" link="#" linkText="Всі"
                                 isMobile={isMobile}>
                            <Game GameName="Fishing Club" GameOwner="Playson" CategoryName="Рибалка" rating="4.7"
                                  PlayerNow="1 629" badge="Джекпот"/>
                            <Game GameName="Fishin Reels" GameOwner="Iron Dog" CategoryName="Рибалка" rating="4.4"
                                  PlayerNow="723"/>
                            <Game GameName="Marlin Masters The Big Haul" GameOwner="Playson" CategoryName="Рибалка"
                                  rating="4.5" PlayerNow="547"/>
                            <Game GameName="Fishin Bear" GameOwner="Playson" CategoryName="Рибалка" rating="4.3"
                                  PlayerNow="412"/>
                            <Game GameName="Trouts Treasure Payday" GameOwner="Playson" CategoryName="Рибалка"
                                  rating="4.4" PlayerNow="389"/>
                            <Game GameName="Fish Day" GameOwner="3 Oaks" CategoryName="Рибалка" rating="4.2"
                                  PlayerNow="298"/>
                        </Section>
                    </>
                ) : (
                    <section style={S.section} aria-labelledby="filtered-heading">
                        <div style={S.container}>
                            <div style={S.sectionHeader}>
                                <h2 id="filtered-heading" style={S.sectionTitle}>
                                    Ігри у категорії: {selectedCategory}
                                    <span
                                        style={S.sectionCount}>· {GAMES_DB.filter(g => g.CategoryName === selectedCategory).length} ігор</span>
                                </h2>
                            </div>
                            <div style={S.gamesGrid(isMobile)} role="list">
                                {GAMES_DB.filter(g => g.CategoryName === selectedCategory).map(game => (
                                    <Game key={game.GameName} {...game} />
                                ))}
                            </div>
                            {GAMES_DB.filter(g => g.CategoryName === selectedCategory).length === 0 && (
                                <p style={{color: "#a0a0a0", paddingTop: 20}}>На жаль, у цій категорії поки немає
                                    ігор.</p>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default GamesPage;
