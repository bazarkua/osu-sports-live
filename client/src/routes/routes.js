import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HomePage from '../pages/HomePage/HomePage';
import LiveScoresPage from '../pages/LiveScoresPage/LiveScoresPage.js';
import UpcomingMatchesPage from '../pages/UpcomingMatchesPage/UpcomingMatchesPage';
import Navbar from '../components/Navbar/Navbar';
import ContactPage from '../pages/ContactPage/ContactPage';

const Main = () => {
    return (
        <Router>
            <Header />
            <div className="background-image">
        
     
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
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
}

export default Main;
