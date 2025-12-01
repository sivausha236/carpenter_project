import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo + Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{
              height: "40px",
              width: "40px",
              objectFit: "contain",
              marginRight: "10px",
            }}
          />
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            Carpenter Sermakani
          </span>
        </Link>

        {/* Mobile Toggle (React Controlled) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navMenu">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery" onClick={() => setMenuOpen(false)}>
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/book" onClick={() => setMenuOpen(false)}>
                Book Now
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
