import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

function initFirebase() {
    if (admin.apps.length) {
        db = admin.firestore();
        return;
    }

    // On Render.com: set FIREBASE_SERVICE_ACCOUNT env var to the JSON string
    // Locally: place serviceAccount.json in server/ directory
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } else {
        const serviceAccountPath = resolve(__dirname, "serviceAccount.json");
        const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    db = admin.firestore();
}

initFirebase();

export { db };
