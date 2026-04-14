import {useEffect, useState} from "react";
import {AccauntTopUpStyle as S} from "./styles.ts";
import {useAuthStore} from "../../../store/authStore.ts";

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];
const METHODS = ["Visa/MC", "Apple Pay", "Google Pay", "Monobank", "PrivatBank", "Crypto"];

type Props = { onClose: () => void };

const AccountTopUpModal = ({onClose}: Props) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
    const [customAmount, setCustomAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("Visa/MC");
    const [submitted, setSubmitted] = useState(false);

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

    const topUpBalance = useAuthStore((s) => s.topUpBalance);

    const handleSubmit = () => {
        if (!finalAmount || finalAmount < 10) return;
        topUpBalance(finalAmount);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 1800);
    };

    return (
        <div style={S.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Поповнення рахунку">
            <div style={S.modal} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div style={S.header}>
                    <h2 style={S.title}>💳 Поповнення рахунку</h2>
                    <button style={S.closeBtn} onClick={onClose} aria-label="Закрити">
                        <i className="fa-solid fa-xmark"/>
                    </button>
                </div>

                {submitted ? (
                    <div style={{padding: "48px 24px", textAlign: "center"}}>
                        <div style={{fontSize: 48, marginBottom: 16}}>✅</div>
                        <p style={{fontSize: 18, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 8}}>
                            Поповнення успішне!
                        </p>
                        <p style={{fontSize: 14, color: "var(--color-text-muted)"}}>
                            На рахунок зараховано {finalAmount} ₴
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={S.body}>
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
                                        min={10}
                                        style={S.input}
                                        placeholder="Наприклад, 750"
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value);
                                            setSelectedAmount(null);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Payment method */}
                            <div>
                                <p style={S.label}>Спосіб оплати</p>
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
                                💡 Мінімальна сума поповнення — 10 ₴. Кошти зараховуються миттєво. Комісія не стягується.
                            </p>
                        </div>

                        <div style={S.footer}>
                            <button
                                style={{
                                    ...S.submitBtn,
                                    opacity: !finalAmount || finalAmount < 10 ? 0.5 : 1,
                                    cursor: !finalAmount || finalAmount < 10 ? "not-allowed" : "pointer",
                                }}
                                onClick={handleSubmit}
                                disabled={!finalAmount || finalAmount < 10}
                            >
                                Поповнити {finalAmount && finalAmount >= 10 ? `${finalAmount} ₴` : ""}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountTopUpModal;