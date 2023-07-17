import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlayCircle, faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
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
        {/* <li>
          <Link to='/past'>
            <FontAwesomeIcon icon={faHistory} />
            <span>Past Matches</span>
          </Link>
        </li> */}
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
