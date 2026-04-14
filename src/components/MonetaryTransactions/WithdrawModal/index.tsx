import {useEffect, useState} from "react";
import {WithdrawStyle as S} from "./styles.ts";
import {useAuthStore} from "../../../store/authStore.ts";

const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000, 10000];
const METHODS = ["Visa/MC", "Crypto"];

type Props = { onClose: () => void };

const WithdrawModal = ({onClose}: Props) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
    const [customAmount, setCustomAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("Visa/MC");
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const withdrawBalance = useAuthStore((s) => s.withdrawBalance);
    const userBalance = useAuthStore((s) => s.user?.balance ?? 0);

    useEffect(() => {
        const prevBody = document.body.style.overflow;
        const prevHtml = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevBody;
            document.documentElement.style.overflow = prevHtml;
        };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

    const handleSubmit = () => {
        setErrorMsg("");
        if (!finalAmount || finalAmount < 100) return;
        
        const result = withdrawBalance(finalAmount);
        if (!result.ok) {
            setErrorMsg(result.message || "Сталася помилка");
            return;
        }

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 1800);
    };

    return (
        <div style={S.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Виведення коштів">
            <div style={S.modal} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div style={S.header}>
                    <h2 style={S.title}>💸 Виведення коштів</h2>
                    <button style={S.closeBtn} onClick={onClose} aria-label="Закрити">
                        <i className="fa-solid fa-xmark"/>
                    </button>
                </div>

                {submitted ? (
                    <div style={{padding: "48px 24px", textAlign: "center"}}>
                        <div style={{fontSize: 48, marginBottom: 16}}>✅</div>
                        <p style={{fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8}}>
                            Виведення успішне!
                        </p>
                        <p style={{fontSize: 14, color: "var(--color-text-muted)"}}>
                            Кошти надійдуть на ваш рахунок найближчим часом.
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={S.body}>
                            {/* User Balance Info */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={S.label}>Доступно для виведення:</span>
                                <span style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>{userBalance.toFixed(2)} ₴</span>
                            </div>

                            {/* Quick amounts */}
                            <div>
                                <p style={S.label}>Швидкий вибір суми</p>
                                <div style={S.amountsGrid}>
                                    {QUICK_AMOUNTS.map((amt) => (
                                        <button
                                            key={amt}
                                            style={S.amountBtn(selectedAmount === amt && !customAmount)}
                                            onClick={() => {
                                                setSelectedAmount(amt);
                                                setCustomAmount("");
                                                setErrorMsg("");
                                            }}
                                        >
                                            {amt} ₴
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom amount */}
                            <div>
                                <p style={S.label}>Або введіть суму вручну</p>
                                <div style={S.inputWrap}>
                                    <span style={S.currencyTag}>₴</span>
                                    <input
                                        type="number"
                                        min={100}
                                        style={S.input}
                                        placeholder="Наприклад, 1500"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setSelectedAmount(null);
                                            setErrorMsg("");
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Payment method */}
                            <div>
                                <p style={S.label}>Куди виводити?</p>
                                <div style={S.methodsRow}>
                                    {METHODS.map((m) => (
                                        <button
                                            key={m}
                                            style={S.methodBtn(selectedMethod === m)}
                                            onClick={() => setSelectedMethod(m)}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Notice */}
                            <p style={S.notice}>
                                💡 Мінімальна сума виведення — 100 ₴. Кошти надходять від кількох хвилин до 2 годин залежно від методу виведення.
                            </p>

                            {errorMsg && (
                                <p style={S.errorNotice}>
                                    {errorMsg}
                                </p>
                            )}
                        </div>

                        <div style={S.footer}>
                            <button
                                style={{
                                    ...S.submitBtn,
                                    opacity: !finalAmount || finalAmount < 100 || finalAmount > userBalance ? 0.5 : 1,
                                    cursor: !finalAmount || finalAmount < 100 || finalAmount > userBalance ? "not-allowed" : "pointer",
                                }}
                                onClick={handleSubmit}
                                disabled={!finalAmount || finalAmount < 100 || finalAmount > userBalance}
                            >
                                Вивести {finalAmount && finalAmount >= 100 ? `${finalAmount} ₴` : ""}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WithdrawModal;
