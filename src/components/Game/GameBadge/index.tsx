import {S} from "./styles.ts";

const GameBadge = ({badge}: { badge?: string }) => {
    if (badge === 'Хіт') return <span style={{...S.badge, ...S.hot}}><i className="fa-solid fa-fire"/> Хіт</span>;
    if (badge === 'Новинка') return <span style={{...S.badge, ...S.new}}><i
        className="fa-solid fa-star"/> Новинка</span>;
    if (badge === 'Джекпот') return <span style={{...S.badge, ...S.gold}}><i
        className="fa-solid fa-coins"/> Джекпот</span>;
    return null;
};

export default GameBadge;