import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthModal from "../components/Auth/AuthModal";
import Button from "../components/AllButtons/Button/Button";
import { useAuthStore } from "../store/authStore";
import SearchModal from "../components/Search/SearchModal";
import UserDisplay from "../components/User/UserDisplay";
import { S } from "./HeaderStyle";

const Header = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const openAuthModal = useAuthStore((s) => s.openAuthModal);
    const authOpen = useAuthStore((s) => s.authModalOpen);
    const authTab = useAuthStore((s) => s.authModalTab);
    const closeAuthModal = useAuthStore((s) => s.closeAuthModal);
    const [searchOpen, setSearchOpen] = useState(false);

    const onNavProtected = () => { if (!user) openAuthModal("login"); };

    return (
        <>
            <header style={S.header}>
                <div style={S.container}>
                    <div style={S.headerInner}>
                        <div style={S.topHeader}>
                            <Link to="/" style={S.logo} aria-label="JSBET — на головну">
                                <img src="index-files/icons/unnamed-removebg-preview.png" alt="JSBET Logo" style={S.logoImg} />
                            </Link>

                            <div style={S.searchWrap} onClick={() => setSearchOpen(true)} role="button" aria-label="Відкрити пошук">
                                <span style={S.searchIcon} aria-hidden="true">
                                    <i className="fa-solid fa-magnifying-glass" />
                                </span>
                                <input
                                    style={S.searchInput}
                                    type="search"
                                    placeholder="Пошук гри..."
                                    aria-label="Пошук гри"
                                    readOnly
                                    onFocus={() => setSearchOpen(true)}
                                />
                            </div>

                            <div style={S.headerRight}>
                                {user ? (
                                    <div style={S.headerAuthUser}>
                                        <UserDisplay email={user.email} showAvatar={false} />
                                        <Button type="button" variant="ghost" small onClick={() => logout()}>Вийти</Button>
                                    </div>
                                ) : (
                                    <>
                                        <Button type="button" variant="ghost" onClick={() => openAuthModal("login")}>Увійти</Button>
                                        <Button type="button" variant="primary" onClick={() => openAuthModal("register")}>Реєстрація</Button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={S.bottomHeader}>
                            <nav style={S.nav} aria-label="Головні розділи" id="main-nav">
                                <NavLink to="/" end style={({ isActive }) => S.navItem(isActive)}>
                                    <i className="fa-solid fa-gamepad" style={S.navIcon} /> Ігри
                                </NavLink>
                                <NavLink to="/tournaments" style={({ isActive }) => S.navItem(isActive)} onClick={onNavProtected}>
                                    <i className="fa-solid fa-trophy" style={S.navIcon} /> Турніри
                                </NavLink>
                                <NavLink to="/profile" style={({ isActive }) => S.navItem(isActive)} onClick={onNavProtected}>
                                    <i className="fa-solid fa-user" style={S.navIcon} /> Мій профіль
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal open={authOpen} initialTab={authTab} onClose={closeAuthModal} />
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Header;
