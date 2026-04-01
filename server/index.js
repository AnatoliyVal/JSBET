import express from "express";
import cors from "cors";
import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables from .env
dotenv.config();

import { db } from "./firebaseAdmin.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// On Render/Linux, process.cwd() is the project root where 'dist' lives.
// Locally on Windows, it depends on where you run the command (usually the root).
const distPath = existsSync(join(process.cwd(), "dist")) 
    ? join(process.cwd(), "dist") 
    : resolve(__dirname, "../dist");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── 1. Serve static files (built React app) ───────────────────────────────
app.use(express.static(distPath));

// ── Helpers ────────────────────────────────────────────────────────────────
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

// ── 3. GET /api/ratings/:gameId  — середній рейтинг гри ───────────────────
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

// ── 4. POST /api/ratings/:gameId  — оновлення рейтингу ────────────────────
app.post("/api/ratings/:gameId", async (req, res) => {
    try {
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

        // Return updated average so the client can refresh immediately
        const result = await computeAverage(gameId);
        res.json(result);
    } catch (err) {
        console.error("POST /api/ratings error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ── Fallback: SPA routing (serve index.html for unknown routes) ───────────
app.use((_req, res) => {
    res.sendFile(join(distPath, "index.html"));
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅  JSBET server running on http://localhost:${PORT}`);
    console.log(`📂  Serving static files from: ${distPath}`);
    if (!existsSync(distPath)) {
        console.error(`❌  CRITICAL: Static folder not found at ${distPath}! Check build step.`);
    } else {
        console.log(`📋  Content of static folder: ${existsSync(join(distPath, "index.html")) ? "index.html found" : "index.html MISSING!"}`);
    }
});
