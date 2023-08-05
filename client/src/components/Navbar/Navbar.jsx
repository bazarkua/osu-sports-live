import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlayCircle,
  faCalendarAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../images/osu-logo.png";

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const timerRef = useRef();

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
          <NavLink
            exact
            to="/"
            activeClassName="nav-link"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon className="nav-icon" icon={faHome} />
            {showText && <span className="link-text">About</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/live"
            activeClassName="nav-link"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon className="nav-icon" icon={faPlayCircle} />
            {showText && <span className="link-text">PAC 12 Live Events</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/upcoming"
            activeClassName="nav-link"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon className="nav-icon" icon={faCalendarAlt} />
            {showText && <span className="link-text">Upcoming Matches</span>}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            activeClassName="nav-link"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon className="nav-icon" icon={faEnvelope} />
            {showText && <span className="link-text">Contact Us</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
