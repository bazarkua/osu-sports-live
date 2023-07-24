import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlayCircle, faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../../images/osu-logo.png'; // adjust the path as necessary

function Navbar() {
  return (
    <nav>
      <div className="header">
        <img src={logo} alt="OSU logo" className="logo" />
        <h1>OSU Sports Live</h1>
      </div>
      <ul>
        <li>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to='/live'>
            <FontAwesomeIcon icon={faPlayCircle} />
            <span>Live Scores</span>
          </Link>
        </li>
        <li>
          <Link to='/upcoming'>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Upcoming Matches</span>
          </Link>
        </li>
        <li>
          <Link to='/contact'>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Contact Us</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;