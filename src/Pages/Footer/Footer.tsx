

const Footer = () => {
    return (
        <>
            <footer className="footer" aria-label="Підвал сайту">
                <div className="container">

                    <div className="footer-inner">
                        <div className="footer-brand">
                            <a href="#" className="logo" aria-label="JSBET — на головну">
                                <img src="index-files/icons/unnamed-removebg-preview.png" alt="" />
                            </a>
                            <p className="footer-description">
                                Ліцензовані онлайн-ігри. Відповідальна гра — наш пріоритет.
                                Грай відповідально, встановлюй ліміти.
                            </p>
                        </div>

                        <nav aria-label="Ігри">
                            <h3 className="footer-heading">Ігри</h3>
                            <ul className="footer-links">
                                <li><a href="#" className="footer-link">Всі слоти</a></li>
                                <li><a href="#" className="footer-link">Live games</a></li>
                                <li><a href="#" className="footer-link">Джекпоти</a></li>
                                <li><a href="#" className="footer-link">Нові ігри</a></li>
                                <li><a href="#" className="footer-link">Популярні</a></li>
                            </ul>
                        </nav>

                        <nav aria-label="Інформація">
                            <h3 className="footer-heading">Інформація</h3>
                            <ul className="footer-links">
                                <li><a href="#" className="footer-link">Про нас</a></li>
                                <li><a href="#" className="footer-link">Бонуси</a></li>
                                <li><a href="#" className="footer-link">Турніри</a></li>
                                <li><a href="#" className="footer-link">VIP-клуб</a></li>
                                <li><a href="#" className="footer-link">Новини</a></li>
                            </ul>
                        </nav>

                        <nav aria-label="Підтримка">
                            <h3 className="footer-heading">Підтримка</h3>
                            <ul className="footer-links">
                                <li><a href="#" className="footer-link">Служба підтримки</a></li>
                                <li><a href="#" className="footer-link">Умови використання</a></li>
                                <li><a href="#" className="footer-link">Конфіденційність</a></li>
                                <li><a href="#" className="footer-link">Відповідальна гра</a></li>
                                <li><a href="#" className="footer-link">AML Політика</a></li>
                            </ul>
                        </nav>

                    </div>

                    <div className="footer-payments" aria-label="Методи оплати">
                        <img className="payment-icon" src="index-files/payments/visaColor.svg" alt="Visa" height="24" />
                        <img className="payment-icon" src="index-files/payments/mastercard.svg" alt="Mastercard" height="24" />
                        <img className="payment-icon" src="index-files/payments/googlepay.svg" alt="Google Pay" height="24" />
                        <img className="payment-icon" src="index-files/payments/applepay.svg" alt="Apple Pay" height="24" />
                    </div>

                    <p className="footer-bottom">
                        © 2026 JSBET. Усі права захищено. Сайт призначений для осіб старше 21 року.
                        Грайте відповідально. Якщо гра стає проблемою — зверніться по допомогу.
                    </p>

                </div>
            </footer>
        </>
    );
};

export default Footer;