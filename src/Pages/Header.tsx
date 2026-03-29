import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthModal, { type AuthModalTab } from "../components/Auth/AuthModal";
import Button from "../components/AllButtons/Button/Button";
import { useAuthStore } from "../store/authStore";
import SearchModal from "../components/Search/SearchModal";

const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-tabs-item${isActive ? " active" : ""}`;

const Header = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const [authOpen, setAuthOpen] = useState(false);
    const [authTab, setAuthTab] = useState<AuthModalTab>("login");
    const [searchOpen, setSearchOpen] = useState(false);

    const openAuth = (tab: AuthModalTab) => {
        setAuthTab(tab);
        setAuthOpen(true);
    };

    const onNavProtected = () => {
        if (!user) {
            openAuth("login");
        }
    };

    return (
        <>
            <header className="displayflex header">
                <div className="container">
                    <div className="header-inner">
                        <div className="top-header">
                            <Link to="/" className="logo" aria-label="JSBET — на головну">
                                <img src="index-files/icons/unnamed-removebg-preview.png" alt="JSBET Logo" />
                            </Link>
                            <div className="search" onClick={() => setSearchOpen(true)} role="button" aria-label="Відкрити пошук" style={{ cursor: "pointer" }}>
                                <span className="search-icon" aria-hidden="true">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input
                                    className="search-input"
                                    type="search"
                                    placeholder="Пошук гри..."
                                    aria-label="Пошук гри"
                                    readOnly
                                    onFocus={() => setSearchOpen(true)}
                                />
                            </div>

                            <div className="header-right">
                                {user ? (
                                    <div className="header-auth-user">
                                        <span className="header-auth-email" title={user.email}>
                                            {user.displayName}
                                        </span>
                                        <Button type="button" variant="ghost" small onClick={() => logout()}>
                                            Вийти
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <Button type="button" variant="ghost" onClick={() => openAuth("login")}>
                                            Увійти
                                        </Button>
                                        <Button type="button" variant="primary" onClick={() => openAuth("register")}>
                                            Реєстрація
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="bottom-header">
                            <nav className="nav-tabs" aria-label="Головні розділи" id="main-nav">
                                <NavLink to="/" end className={navClass}>
                                    <span className="nav-tabs-icon">
                                        <i className="fa-solid fa-gamepad"></i>
                                    </span>{" "}
                                    Ігри
                                </NavLink>
                                <NavLink
                                    to="/tournaments"
                                    className={navClass}
                                    onClick={onNavProtected}
                                >
                                    <span className="nav-tabs-icon">
                                        <i className="fa-solid fa-trophy"></i>
                                    </span>{" "}
                                    Турніри
                                </NavLink>
                                <NavLink to="/profile" className={navClass} onClick={onNavProtected}>
                                    <span className="nav-tabs-icon">
                                        <i className="fa-solid fa-user"></i>
                                    </span>{" "}
                                    Мій профіль
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal open={authOpen} initialTab={authTab} onClose={() => setAuthOpen(false)} />
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Header;
