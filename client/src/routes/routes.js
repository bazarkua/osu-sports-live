import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import AboutPage from "../pages/AboutPage/AboutPage";
import LiveScoresPage from "../pages/LiveEventsPage/LiveEventsPage.jsx";
import UpcomingMatchesPage from "../pages/UpcomingMatchesPage/UpcomingMatchesPage";
import Navbar from "../components/Navbar/Navbar";
import ContactPage from "../pages/ContactPage/ContactPage";

const Main = () => {
  return (
    <Router>
      <div className="background-image">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AboutPage />} />
          <Route path="/live" element={<LiveScoresPage />} />
          <Route path="/upcoming" element={<UpcomingMatchesPage />} />
          {/* <Route path="/past" element={<PastMatchesPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          {/* Add other routes as you create new pages */}
        </Routes>
        </div>
      <Footer />
    </Router>
  );
};

export default Main;
