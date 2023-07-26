// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlayCircle,
  faCalendarAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logo from "../../images/osu-logo.png"; // adjust the path as necessary

function Navbar() {
  return (
    <nav>
      <div className="header">
        <img src={logo} alt="OSU logo" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/live">
              <FontAwesomeIcon icon={faPlayCircle} />
              <span>PAC 12 Live Events</span>
            </Link>
          </li>
          <li>
            <Link to="/upcoming">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Upcoming Matches</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Contact Us</span>
            </Link>
          </li>
        </ul>
        <h1>OSU Sports Live</h1>
      </div>
    </nav>
  );
}

export default Navbar;
