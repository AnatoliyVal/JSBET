import { Link } from "react-router-dom";

interface FooterMenuProps {
    text: string;
    url?: string;
}

const FooterMenu = ({ text, url }: FooterMenuProps) => {
    return (
        <li>
            {url ? (
                <Link to={url.replace('/JSBET', '') || '/'} className="footer-link">{text}</Link>
            ) : (
                <a href="#" onClick={(e) => e.preventDefault()} className="footer-link">{text}</a>
            )}
        </li>
    );
}

export default FooterMenu;