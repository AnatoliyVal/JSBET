import { useEffect } from "react";
import Button from "../components/AllButtons/Button/Button";
import { Link } from "react-router-dom";

const AboutPage = () => {
    // Scroll to top when opening the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <div className="page-section active" id="page-about">
                <section className="hero" aria-label="Про проект JSBET">
                    <div className="container">
                        <div className="hero-inner" style={{ textAlign: "center" }}>
                            <p className="hero-eyebrow">
                                <i className="fa-solid fa-book-open"></i> Наша історія
                            </p>
                            <h1 className="hero-title">
                                Від мрії до <span className="accent">Імперії Азарту</span>
                            </h1>
                            <p className="hero-subtitle" style={{ maxWidth: "800px", margin: "0 auto 30px" }}>
                                Дізнайтесь, як створювався JSBET — проект, що назавжди змінив уявлення про онлайн-розваги та перетворився на цифровий аналог Лас-Вегаса.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section" aria-labelledby="history-heading">
                    <div className="container">
                        <div className="about-content" style={{ display: "flex", flexDirection: "column", gap: "40px", maxWidth: "900px", margin: "0 auto" }}>
                            
                            <div className="about-block">
                                <h2><i className="fa-solid fa-lightbulb" style={{ color: "var(--color-gold)", marginRight: "10px" }}></i> Народження ідеї (Початок ери)</h2>
                                <p>
                                    Історія JSBET нагадує становлення самого Лас-Вегаса. Усе почалося з амбітної ідеї групи ентузіастів-розробників, які хотіли створити платформу, де б поєднувалися передові веб-технології, естетика справжнього казино та абсолютна чесність для гравців. 
                                </p>
                                <p>
                                    Подібно до того, як 1905 року посеред пустелі Мохаве з'явилося перше невелике поселення, що згодом стало світовою столицею азарту, розробка JSBET стартувала з простого "пет-проекту". Це було невеличке середовище для тестування JavaScript-алгоритмів генерації випадкових чисел та плавних анімацій.
                                </p>
                            </div>

                            <div className="about-block">
                                <h2><i className="fa-solid fa-city" style={{ color: "var(--color-gold)", marginRight: "10px" }}></i> Будівництво цифрового Стрипу</h2>
                                <p>
                                    Справжній прорив стався, коли проект перейшов на архітектуру React + Vite. Це був наш власний "бум будівництва мега-курортів" зразка 1980-х у Вегасі. Монолітний код був розбитий на модулі, додано динамічний роутинг, а інтерфейс став блискавично швидким.
                                </p>
                                <p>
                                    Ми інтегрували сотні ігор від провідних провайдерів (Pragmatic Play, Playson, Endorphina), створили унікальну систему випадкових рекомендацій на основі алгоритму Фішера-Єйтса та реалізували живий пошук. Кожен рядок коду писався з думкою про те, щоб гравець відчував себе ніби у VIP-залі казино "Белладжіо".
                                </p>
                            </div>

                            <div className="about-block">
                                <h2><i className="fa-solid fa-trophy" style={{ color: "var(--color-gold)", marginRight: "10px" }}></i> JSBET сьогодні</h2>
                                <p>
                                    Сьогодні JSBET — це більше ніж просто онлайн-ігри. Це високотехнологічна екосистема з турнірами, живою статистикою, безпечною авторизацією та миттєвими виплатами. Подібно до сучасного Лас-Вегаса, який зберіг свій класичний шарм, але інтегрував найновіші технології (світлодіодні екрани, шоу-руми), JSBET поєднує класичну механіку слотів з ультрасучасним UI/UX дизайном.
                                </p>
                                <p>
                                    Наша місія залишається незмінною: дарувати найяскравіші емоції, чесну гру та бездоганний сервіс 24/7.
                                </p>
                            </div>

                            <div className="about-actions" style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "20px" }}>
                                <Link to="/">
                                    <Button variant="primary">Повернутись до ігор</Button>
                                </Link>
                                <Link to="/tournaments">
                                    <Button variant="ghost">Переглянути турніри</Button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;
