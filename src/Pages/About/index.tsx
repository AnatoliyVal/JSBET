import {useEffect} from "react";
import Button from "../../components/AllButtons/Button";
import {Link} from "react-router-dom";
import {S} from "./styles.ts";

const AboutPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <div style={{display: "block"}} id="page-about">
                <section style={S.hero} aria-label="Про проект JSBET">
                    <div className="container">
                        <div style={S.heroInner}>
                            <p style={S.eyebrow}>
                                <i className="fa-solid fa-book-open"/> Наша історія
                            </p>
                            <h1 style={S.title}>
                                Від мрії до <span style={S.accent}>Імперії Азарту</span>
                            </h1>
                            <p style={S.subtitle}>
                                Дізнайтесь, як створювався JSBET — проєкт, що назавжди змінив уявлення про
                                онлайн-розваги та перетворився на цифровий аналог Лас-Вегаса.
                            </p>
                        </div>
                    </div>
                </section>

                <section style={S.section} aria-labelledby="history-heading">
                    <div className="container">
                        <div style={S.content}>

                            <div style={S.block}>
                                <h2 style={S.heading}><i className="fa-solid fa-lightbulb" style={S.icon}/> Народження
                                    ідеї (Початок ери)</h2>
                                <p style={S.text}>
                                    Історія JSBET нагадує становлення самого Лас-Вегаса. Усе почалося з амбітної ідеї
                                    групи ентузіастів-розробників, які хотіли створити платформу, де б поєднувалися
                                    передові веб-технології, естетика справжнього казино та абсолютна чесність для
                                    гравців.
                                </p>
                                <p style={{...S.text, marginBottom: 0}}>
                                    Подібно до того, як 1905 року посеред пустелі Мохаве з'явилося перше невелике
                                    поселення, що згодом стало світовою столицею азарту, розробка JSBET стартувала з
                                    простого "пет-проекту". Це було невеличке середовище для тестування
                                    JavaScript-алгоритмів генерації випадкових чисел та плавних анімацій.
                                </p>
                            </div>

                            <div style={S.block}>
                                <h2 style={S.heading}><i className="fa-solid fa-city" style={S.icon}/> Будівництво
                                    цифрового Стрипу</h2>
                                <p style={S.text}>
                                    Справжній прорив стався, коли проект перейшов на архітектуру React + Vite. Це був
                                    наш власний "бум будівництва мега-курортів" зразка 1980-х у Вегасі. Монолітний код
                                    був розбитий на модулі, додано динамічний роутинг, а інтерфейс став блискавично
                                    швидким.
                                </p>
                                <p style={{...S.text, marginBottom: 0}}>
                                    Ми інтегрували сотні ігор від провідних провайдерів (Pragmatic Play, Playson,
                                    Endorphina), створили унікальну систему випадкових рекомендацій на основі алгоритму
                                    Фішера-Єйтса та реалізували живий пошук. Кожен рядок коду писався з думкою про те,
                                    щоб гравець відчував себе ніби у VIP-залі казино "Белладжіо".
                                </p>
                            </div>

                            <div style={S.block}>
                                <h2 style={S.heading}><i className="fa-solid fa-trophy" style={S.icon}/> JSBET сьогодні
                                </h2>
                                <p style={S.text}>
                                    Сьогодні JSBET — це більше ніж просто онлайн-ігри. Це високотехнологічна екосистема
                                    з турнірами, живою статистикою, безпечною авторизацією та миттєвими виплатами.
                                    Подібно до сучасного Лас-Вегаса, який зберіг свій класичний шарм, але інтегрував
                                    найновіші технології (світлодіодні екрани, шоу-руми), JSBET поєднує класичну
                                    механіку слотів з ультрасучасним UI/UX дизайном.
                                </p>
                                <p style={{...S.text, marginBottom: 0}}>
                                    Наша місія залишається незмінною: дарувати найяскравіші емоції, чесну гру та
                                    бездоганний сервіс 24/7.
                                </p>
                            </div>

                            <div style={S.actions}>
                                <Link to="/"><Button variant="primary">Повернутись до ігор</Button></Link>
                                <Link to="/tournaments"><Button variant="ghost">Переглянути турніри</Button></Link>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;
