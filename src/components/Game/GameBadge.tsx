
const GameBadge = ({badge}: {badge?: string}) => {
    return (
        <>
            {badge === 'Хіт' && <span className="badge badge--hot"><i className="fa-solid fa-fire"></i> Хіт</span>}
            {badge === 'Новинка' && <span className="badge badge--new"><i className="fa-solid fa-star"></i> Новинка</span>}
            {badge === 'Джекпот' && <span className="badge badge--gold"><i className="fa-solid fa-coins"></i> Джекпот</span>}
        </>
    );
};

export default GameBadge;