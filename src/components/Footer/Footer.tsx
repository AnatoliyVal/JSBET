import {S} from "./FooterStyle.ts";

const linkStyle = S.link;

const FooterMenu = ({text, url}: { text: string; url?: string }) => (
    <li>
        {url ? (
            <a href={url.replace('/JSBET', '') || '/'} style={linkStyle} className="footer-link">{text}</a>
        ) : (
            <a href="#" onClick={(e) => e.preventDefault()} style={linkStyle} className="footer-link">{text}</a>
        )}
    </li>
);

const Footer = () => (
    <footer style={S.footer} aria-label="Підвал сайту">
        <div style={S.container}>
            <div style={S.inner}>
                <div>
                    <a href="#" style={S.logo} aria-label="JSBET — на головну">
                        <img src="index-files/icons/unnamed-removebg-preview.png" alt="" style={S.logoImg}/>
                    </a>
                    <p style={S.description}>
                        Ліцензовані онлайн-ігри. Відповідальна гра — наш пріоритет. Грай відповідально, встановлюй
                        ліміти.
                    </p>
                </div>

                <nav aria-label="Ігри">
                    <h3 style={S.heading}>Ігри</h3>
                    <ul style={S.links}>
                        <FooterMenu url="/" text="Всі слоти"/>
                        <FooterMenu url="/" text="Live games"/>
                        <FooterMenu url="/" text="Джекпоти"/>
                        <FooterMenu url="/" text="Нові ігри"/>
                        <FooterMenu url="/" text="Популярні"/>
                    </ul>
                </nav>

                <nav aria-label="Інформація">
                    <h3 style={S.heading}>Інформація</h3>
                    <ul style={S.links}>
                        <FooterMenu url="/about" text="Про нас"/>
                        <FooterMenu text="Бонуси"/>
                        <FooterMenu url="/tournaments" text="Турніри"/>
                        <FooterMenu url="/profile" text="VIP-клуб"/>
                        <FooterMenu text="Нові ігри"/>
                    </ul>
                </nav>

                <nav aria-label="Підтримка">
                    <h3 style={S.heading}>Підтримка</h3>
                    <ul style={S.links}>
                        <FooterMenu text="Служба підтримки"/>
                        <FooterMenu text="Умови використання"/>
                        <FooterMenu text="Конфіденційність"/>
                        <FooterMenu text="Відповідальна гра"/>
                        <FooterMenu text="AML Політика"/>
                    </ul>
                </nav>
            </div>

            <div style={S.payments} aria-label="Методи оплати">
                <img style={S.paymentIcon} src="index-files/payments/visaColor.svg" alt="Visa"/>
                <img style={S.paymentIcon} src="index-files/payments/mastercard.svg" alt="Mastercard"/>
                <img style={S.paymentIcon} src="index-files/payments/googlepay.svg" alt="Google Pay"/>
                <img style={S.paymentIcon} src="index-files/payments/applepay.svg" alt="Apple Pay"/>
            </div>

            <p style={S.bottom}>
                © 2026 JSBET. Усі права захищено. Сайт призначений для осіб старше 21 року.
                Грайте відповідально. Якщо гра стає проблемою — зверніться по допомогу.
            </p>
        </div>
    </footer>
);

export default Footer;