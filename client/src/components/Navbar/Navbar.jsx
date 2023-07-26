import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
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
            <NavLink exact to="/" activeClassName="active">
              {/* Use activeClassName prop to apply 'active' class to the active link */}
              <FontAwesomeIcon icon={faHome} />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/live" activeClassName="active">
              {/* Use activeClassName prop to apply 'active' class to the active link */}
              <FontAwesomeIcon icon={faPlayCircle} />
              <span>PAC 12 Live Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming" activeClassName="active">
              {/* Use activeClassName prop to apply 'active' class to the active link */}
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Upcoming Matches</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              {/* Use activeClassName prop to apply 'active' class to the active link */}
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Contact Us</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
