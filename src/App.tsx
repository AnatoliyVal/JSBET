import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header";
import GamesPage from "./Pages/Main";
import TournamentsPage from "./Pages/TournamentsPage";
import ProfilePage from "./Pages/ProfilePage";
import AboutPage from "./Pages/AboutPage";
import Data from "./components/TimeData/TimeNow";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <BrowserRouter basename="/JSBET/">
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
        </BrowserRouter>
    );
}

export default App;
