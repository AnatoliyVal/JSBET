import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

function initFirebase() {
    if (admin.apps.length) {
        db = admin.firestore();
        return;
    }

    try {
        // On Render.com: set FIREBASE_SERVICE_ACCOUNT env var to the JSON string
        // Locally: place serviceAccount.json in server/ directory
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            console.log("✅ Firebase Admin initialized via environment variable.");
        } else {
            const serviceAccountPath = resolve(__dirname, "serviceAccount.json");
            if (existsSync(serviceAccountPath)) {
                const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                });
                console.log("✅ Firebase Admin initialized via serviceAccount.json.");
            } else {
                console.warn("⚠️  serviceAccount.json not found and FIREBASE_SERVICE_ACCOUNT env var is missing.");
                console.warn("⚠️  Database operations will fail.");
            }
        }
    } catch (error) {
        console.error("❌ Error initializing Firebase Admin:", error.message);
    }

    if (admin.apps.length) {
        db = admin.firestore();
    }
}

initFirebase();

export { db };
