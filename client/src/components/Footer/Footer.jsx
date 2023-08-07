import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {year} OSU Sports Live. Made by Adilbek Bazarkulov</p>
      </div>
    </footer>
  );
};

export default Footer;
