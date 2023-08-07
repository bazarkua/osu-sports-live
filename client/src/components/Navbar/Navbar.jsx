import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlayCircle,
  faCalendarAlt,
  faEnvelope,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../images/osu-logo.png";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const timerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        // For larger screens, use the original logic based on isHovered
        if (isHovered) {
          timerRef.current = setTimeout(() => {
            setShowText(true);
          }, 400);
        } else {
          clearTimeout(timerRef.current);
          setShowText(false);
        }
      } else {
        // For smaller screens, always hide the text
        setShowText(false);
      }
    };

    handleResize(); // Call it initially to set the correct state based on the screen size

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("resize", handleResize);
      clearTimeout(timerRef.current);
    };
  }, [isHovered]);

  return (
    <nav
      className="navbar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            onClick={() => setShowText(!showText)} // Toggle showText on click
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
            onClick={() => setShowText(!showText)} // Toggle showText on click
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
            onClick={() => setShowText(!showText)} // Toggle showText on click
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
            onClick={() => setShowText(!showText)} // Toggle showText on click
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
