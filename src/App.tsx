import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header";
import GamesPage from "./Pages/Main";
import TournamentsPage from "./Pages/TournamentsPage";
import ProfilePage from "./Pages/ProfilePage";
import AboutPage from "./Pages/AboutPage";
import Data from "./components/TimeData/TimeNow";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { seedDatabase } from "./lib/seedService";
import { useAuthStore } from "./store/authStore";
import { subscribeToProfile, updateHeartbeat } from "./lib/profilesService";

function App() {
    const user = useAuthStore(s => s.user);
    const syncFromCloud = useAuthStore(s => s.syncFromCloud);

    useEffect(() => {
        seedDatabase().catch(console.error);
    }, []);

    // Real-time sync & heartbeat for logged-in user
    useEffect(() => {
        if (!user?.email) return;
        
        // Subscribe to cloud profile
        const unsub = subscribeToProfile(user.email, (cloudData) => {
            syncFromCloud(cloudData);
        });

        // Heartbeat logic
        updateHeartbeat(user.email).catch(console.error);
        const interval = setInterval(() => {
            updateHeartbeat(user.email).catch(console.error);
        }, 60000); // 1 minute

        return () => {
            unsub();
            clearInterval(interval);
        };
    }, [user?.email, syncFromCloud]);

    return (
        <HashRouter>
            <ScrollToTop />
            <Data />
            <Header />
            <Routes>
                <Route path="/" element={<GamesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/tournaments" element={<TournamentsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
}

export default App;
