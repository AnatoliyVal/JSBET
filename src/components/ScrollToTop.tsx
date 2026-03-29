import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Прокрутка вгору при зміні маршруту (SPA без перезавантаження). */
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export default ScrollToTop;
