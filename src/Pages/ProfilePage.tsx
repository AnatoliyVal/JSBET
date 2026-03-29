import { useNavigate } from "react-router-dom";
import Button from "../components/AllButtons/Button/Button";
import { useAuthStore } from "../store/authStore";

const ProfilePage = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const nameParts = user?.displayName.trim().split(/\s+/) ?? [];
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ");

    if (!user) {
        return (
            <main>
                <div className="page-section active" id="page-profil">
                    <section className="section" aria-labelledby="profil-heading">
                        <div className="container">
                            <p className="profile-login-hint" id="profil-heading">
                                Увійдіть або зареєструйтесь, щоб переглядати профіль.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="page-section active" id="page-profil">
                <section className="section" aria-labelledby="profil-heading">
                    <div className="container">
                        <div className="section-header">
                            <h2 id="profil-heading" className="section-title">
                                Мій профіль
                            </h2>
                        </div>

                        <div className="profile-layout">
                            <aside className="profile-sidebar">
                                <div className="profile-user-card">
                                    <div className="profile-avatar">
                                        <img
                                            src="index-files/icons/man-user-color-icon.svg"
                                            alt="User Avatar"
                                        />
                                    </div>
                                    <div className="profile-user-info">
                                        <h3 className="profile-username">{user.displayName}</h3>
                                        <p className="profile-id">ID: {user.email.length + 489000}</p>
                                    </div>
                                    <span className="badge badge--gold">
                                        <i className="fa-solid fa-crown"></i> VIP Статус
                                    </span>
                                </div>

                                <div className="profile-balance-card">
                                    <p className="profile-balance-label">Основний баланс</p>
                                    <p className="profile-balance-value">₴14 580.50</p>
                                    <div className="profile-balance-actions">
                                        <Button variant="primary" small>
                                            Поповнити
                                        </Button>
                                        <Button variant="ghost" small>
                                            Вивести
                                        </Button>
                                    </div>
                                </div>
                                <div className="profile-progress-card">
                                    <p className="profile-progress-label">Прогрес до наступної цілі</p>
                                    <div className="profile-progress-bar">
                                        <div
                                            className="profile-progress-fill"
                                            style={{ width: "0%" }}
                                            id="progress-fill"
                                        >
                                            <span className="profile-progress-text" id="progress-text">
                                                0%
                                            </span>
                                        </div>
                                    </div>
                                    <p className="profile-progress-desc">Залишилося 350 ігор до бонусу</p>
                                </div>

                                <nav className="profile-nav" aria-label="Меню профілю">
                                    <a href="#" className="profile-nav-link active">
                                        <i className="fa-solid fa-gear"></i> Налаштування
                                    </a>
                                    <a href="#" className="profile-nav-link">
                                        <i className="fa-solid fa-clock-rotate-left"></i> Історія ігор
                                    </a>
                                    <a href="#" className="profile-nav-link">
                                        <i className="fa-solid fa-money-bill-transfer"></i> Транзакції
                                    </a>
                                    <a href="#" className="profile-nav-link">
                                        <i className="fa-solid fa-gift"></i> Мої бонуси
                                    </a>
                                    <button
                                        type="button"
                                        className="profile-nav-link profile-nav-link--danger"
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                        }}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i> Вийти
                                    </button>
                                </nav>
                            </aside>

                            <div className="profile-content">
                                <div className="profile-settings-block">
                                    <h3 className="profile-settings-title">Особисті дані</h3>
                                    <p className="profile-settings-desc">
                                        Управляйте своєю особистою інформацією та налаштуваннями акаунта.
                                    </p>

                                    <form className="profile-form" id="personal-data-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="user-firstname" className="form-label">
                                                    Ім&apos;я
                                                </label>
                                                <input
                                                    type="text"
                                                    id="user-firstname"
                                                    className="form-input"
                                                    defaultValue={firstName}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="user-lastname" className="form-label">
                                                    Прізвище
                                                </label>
                                                <input
                                                    type="text"
                                                    id="user-lastname"
                                                    className="form-input"
                                                    defaultValue={lastName}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="user-email" className="form-label">
                                                    Email адреса
                                                </label>
                                                <input
                                                    type="email"
                                                    id="user-email"
                                                    className="form-input"
                                                    defaultValue={user.email}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="user-phone" className="form-label">
                                                    Номер телефону
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="user-phone"
                                                    className="form-input"
                                                    defaultValue="+380991234567"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="user-dob" className="form-label">
                                                    Дата народження
                                                </label>
                                                <input
                                                    type="date"
                                                    id="user-dob"
                                                    className="form-input"
                                                    defaultValue="1990-01-15"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="user-country" className="form-label">
                                                    Країна
                                                </label>
                                                <select id="user-country" className="form-select" defaultValue="ua">
                                                    <option value="ua">Україна</option>
                                                    <option value="pl">Польща</option>
                                                    <option value="uk">Велика Британія</option>
                                                    <option value="other">Інша</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <Button type="submit" variant="primary">
                                                Зберегти зміни
                                            </Button>
                                            <Button type="button" variant="ghost">
                                                Скасувати
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                                <div className="profile-settings-block">
                                    <h3 className="profile-settings-title">Додати метод оплати</h3>
                                    <p className="profile-settings-desc">
                                        Додайте нову банківську картку для поповнення рахунку та виведення коштів.
                                    </p>

                                    <form className="payment-form" action="#" method="POST" id="paymentForm">
                                        <div className="form-group">
                                            <label htmlFor="cardName" className="payment-label">
                                                Ім&apos;я на карті
                                            </label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                className="payment-input"
                                                placeholder="IVAN IVANOV"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cardNumber" className="payment-label">
                                                Номер карти
                                            </label>
                                            <div className="card-input-wrapper">
                                                <i className="fa-regular fa-credit-card card-icon"></i>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    className="payment-input card-input"
                                                    placeholder="0000 0000 0000 0000"
                                                    maxLength={19}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row payment-details-row">
                                            <div className="form-group">
                                                <label htmlFor="expDate" className="payment-label">
                                                    Термін дії
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expDate"
                                                    className="payment-input"
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cvv" className="payment-label">
                                                    CVV
                                                </label>
                                                <input
                                                    type="password"
                                                    id="cvv"
                                                    className="payment-input"
                                                    placeholder="***"
                                                    maxLength={3}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="payment-submit-btn">
                                            Додати карту
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProfilePage;
