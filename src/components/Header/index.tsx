import {useState, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
import Button from "../AllButtons/Button";
import {useAuthStore} from "../../store/authStore.ts";
import SearchModal from "../Search";
import UserDisplay from "../User/UserDisplay";
import {S} from "./style.ts";

const Header = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const openAuthModal = useAuthStore((s) => s.openAuthModal);
    const authOpen = useAuthStore((s) => s.authModalOpen);
    const authTab = useAuthStore((s) => s.authModalTab);
    const closeAuthModal = useAuthStore((s) => s.closeAuthModal);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onNavProtected = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            openAuthModal("login");
        }
    };



    return (
        <>
            <header style={S.header(isMobile)}>
                <div style={S.container}>
                    <div style={S.headerInner}>
                        <div style={S.topHeader(isMobile)}>
                            <Link to="/" style={S.logo} aria-label="JSBET — на головну">
                                <img src="index-files/icons/unnamed-removebg-preview.png" alt="JSBET Logo"
                                     style={S.logoImg}/>
                            </Link>

                                {!isMobile && (
                                    <div style={S.searchWrap} onClick={() => setSearchOpen(true)} role="button"
                                         aria-label="Відкрити пошук">
                                        <span style={S.searchIcon} aria-hidden="true">
                                            <i className="fa-solid fa-magnifying-glass"/>
                                        </span>
                                        <input
                                            style={S.searchInput}
                                            type="search"
                                            placeholder="Пошук гри..."
                                            aria-label="Пошук гри"
                                            readOnly
                                        />
                                    </div>
                                )}

                            <div style={S.headerRight(isMobile)}>
                                {user ? (
                                    <div style={S.headerAuthUser}>
                                        <UserDisplay email={user.email} showAvatar={false}/>
                                        <Button type="button" variant="ghost" small
                                                onClick={() => logout()}>Вийти</Button>
                                    </div>
                                ) : (
                                    <>
                                        <Button type="button" variant="ghost"
                                                onClick={() => openAuthModal("login")}>Увійти</Button>
                                        <Button type="button" variant="primary"
                                                onClick={() => openAuthModal("register")}>Реєстрація</Button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={S.bottomHeader}>
                            <nav style={S.nav} aria-label="Головні розділи" id="main-nav">
                                <NavLink to="/" end style={({isActive}) => S.navItem(isActive)}>
                                    <i className="fa-solid fa-gamepad" style={S.navIcon}/> Ігри
                                </NavLink>
                                <NavLink to="/tournaments" style={({isActive}) => S.navItem(isActive)}
                                         onClick={onNavProtected}>
                                    <i className="fa-solid fa-trophy" style={S.navIcon}/> Турніри
                                </NavLink>
                                <NavLink to="/profile" style={({isActive}) => S.navItem(isActive)}
                                         onClick={onNavProtected}>
                                    <i className="fa-solid fa-user" style={S.navIcon}/> Мій профіль
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal open={authOpen} initialTab={authTab} onClose={closeAuthModal}/>
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)}/>
            
            {isMobile && (
                <button style={S.floatingSearchBtn} onClick={() => setSearchOpen(true)} aria-label="Відкрити пошук">
                    <i className="fa-solid fa-magnifying-glass"/>
                </button>
            )}
        </>
    );
};

export default Header;
