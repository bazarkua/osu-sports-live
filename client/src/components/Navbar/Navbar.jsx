import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faCalendarAlt,
  faEnvelope,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../images/osu-logo.png";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const timerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
      if (window.innerWidth <= 1200) {
        clearTimeout(timerRef.current);
        setShowText(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered && windowSize > 1200) {
      timerRef.current = setTimeout(() => setShowText(true), 400);
    } else {
      clearTimeout(timerRef.current);
      setShowText(false);
    }
  }, [isHovered, windowSize]);

  return (
    <nav
      className="navbar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--show-link-text': showText ? 'inline' : 'none' }}
    >
      <ul className="navbar-nav">
        <li className="logo">
          <NavLink to="/" activeClassName="nav-link">
            <img src={logo} alt="OSU Sports Live" className="nav-icon" />
            <span className="link-text logo-text">OSU Sports Live</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            href="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <FontAwesomeIcon
              className={`nav-icon ${location.pathname === "/" ? "active" : ""}`}
              icon={faCircleInfo}
            />
            {showText && <span className="link-text">About</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            href="/live"
            className={`nav-link ${
              location.pathname === "/live" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon
              className={`nav-icon ${location.pathname === "/live" ? "active" : ""}`}
              icon={faPlayCircle}
            />
            {showText && <span className="link-text">PAC 12 Live Events</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            href="/upcoming"
            className={`nav-link ${
              location.pathname === "/upcoming" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon
              className={`nav-icon ${location.pathname === "/upcoming" ? "active" : ""}`}
              icon={faCalendarAlt}
            />
            {showText && <span className="link-text">Upcoming Matches</span>}
          </a>
        </li>
        <li className="nav-item">
          <a
            href="/contact"
            className={`nav-link ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon
              className={`nav-icon ${location.pathname === "/contact" ? "active" : ""}`}
              icon={faEnvelope}
            />
            {showText && <span className="link-text">Contact Us</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;