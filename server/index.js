import express from "express";
import cors from "cors";
import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

import { db } from "./firebaseAdmin.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const distPath = existsSync(join(process.cwd(), "dist")) 
    ? join(process.cwd(), "dist") 
    : resolve(__dirname, "../dist");

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

app.use(express.static(distPath));

async function computeAverage(gameId) {
    const snap = await db
        .collection("ratings")
        .where("gameId", "==", gameId)
        .get();

    if (snap.empty) return { avg: 0, count: 0 };

    let total = 0;
    snap.forEach((doc) => {
        total += doc.data().rating;
    });

    return {
        avg: Math.round((total / snap.size) * 10) / 10,
        count: snap.size,
    };
}

app.get("/api/ratings/:gameId", async (req, res) => {
    try {
        if (!db) {
            console.warn("⚠️  Attempting to get ratings but Database is not initialized.");
            return res.status(503).json({ error: "Database not initialized" });
        }
        const { gameId } = req.params;
        const result = await computeAverage(gameId);
        res.json(result);
    } catch (err) {
        console.error("GET /api/ratings error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/ratings/:gameId", async (req, res) => {
    try {
        console.log('POST');
        if (!db) {
            console.warn("⚠️  Attempting to save rating but Database is not initialized.");
            return res.status(503).json({ error: "Database not initialized" });
        }
        const { gameId } = req.params;
        const { userId, rating } = req.body;

        if (!userId || typeof rating !== "number" || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Invalid payload. Need userId (string) and rating (1–5)." });
        }

        const docId = `${userId}_${gameId}`;
        await db.collection("ratings").doc(docId).set({
            userId,
            gameId,
            rating,
            timestamp: new Date().toISOString(),
        });

        const result = await computeAverage(gameId);
        res.json(result);
    } catch (err) {
        console.error("POST /api/ratings error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/ratings/:gameId/user/:userId", async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ error: "Database not initialized" });
        }
        const { gameId, userId } = req.params;
        const docId = `${userId}_${gameId}`;
        const snap = await db.collection("ratings").doc(docId).get();
        if (!snap.exists) {
            return res.json({ rating: null });
        }
        res.json({ rating: snap.data().rating ?? null });
    } catch (err) {
        console.error("GET /api/ratings/user error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.use((_req, res) => {
    res.sendFile(join(distPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅  JSBET server running on http://localhost:${PORT}`);
    console.log(`📂  Serving static files from: ${distPath}`);
    if (!existsSync(distPath)) {
        console.error(`❌  CRITICAL: Static folder not found at ${distPath}! Check build step.`);
    } else {
        console.log(`📋  Content of static folder: ${existsSync(join(distPath, "index.html")) ? "index.html found" : "index.html MISSING!"}`);
    }
});
