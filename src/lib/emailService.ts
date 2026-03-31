import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_jsbet";
const TEMPLATE_ID = "template_aj3wnif";
const PUBLIC_KEY  = "y-bJJAhwgzPJJXaJE";

/** Generate a random 6-digit numeric code */
export function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Send a verification code to the given email address */
export async function sendVerificationCode(
    toEmail: string,
    name: string,
    code: string
): Promise<void> {
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    const timeStr = expiry.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

    try {
        emailjs.init(PUBLIC_KEY);
        await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                to_email: toEmail,
                email:    toEmail,
                name:     name,
                passcode: code,
                time:     timeStr,
            },
            PUBLIC_KEY
        );
    } catch (error) {
        console.error("EmailJS Failed:", error);
        throw error;
    }
}
