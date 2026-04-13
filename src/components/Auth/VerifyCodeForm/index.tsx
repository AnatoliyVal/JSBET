import {useRef, useState, KeyboardEvent, ClipboardEvent} from "react";
import {S} from "./styles.ts";

type Props = { onComplete: (code: string) => void; disabled?: boolean; };

const VerifyCodeForm = ({onComplete, disabled}: Props) => {
    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const updateDigit = (index: number, value: string) => {
        const d = value.replace(/\D/g, "").slice(-1);
        const next = [...digits];
        next[index] = d;
        setDigits(next);
        if (d && index < 5) inputs.current[index + 1]?.focus();
        const full = next.join("");
        if (full.length === 6 && !next.includes("")) onComplete(full);
    };

    const handleKey = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = Array(6).fill("");
        pasted.split("").forEach((ch, i) => {
            next[i] = ch;
        });
        setDigits(next);
        inputs.current[Math.min(pasted.length, 5)]?.focus();
        if (pasted.length === 6) onComplete(pasted);
    };

    return (
        <div style={S.verifyInputs}>
            {digits.map((d, i) => (
                <input key={i} ref={(el) => {
                    inputs.current[i] = el;
                }} type="text" inputMode="numeric"
                       maxLength={1} value={d} style={S.verifyBox(!!d)} disabled={disabled}
                       onChange={(e) => updateDigit(i, e.target.value)} onKeyDown={(e) => handleKey(i, e)}
                       onPaste={handlePaste} aria-label={`Цифра ${i + 1} з 6`}/>
            ))}
        </div>
    );
};

export default VerifyCodeForm;
