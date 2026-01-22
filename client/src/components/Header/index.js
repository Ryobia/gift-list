import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../ContactForm";
import logo from "../../images/indieindexfull.png";

import Auth from "../../utils/auth";

const Header = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="header">
      <div className="headerNav">
        {Auth.loggedIn() === false ? (
          <>
            <Link to="/">
              <nav>
                <img src={logo} alt="Shop Indie Index Logo" />
              </nav>
            </Link>
            <div className="headerNavRight">
              <button
                className="header-contact-btn"
                onClick={() => setShowContact(true)}
              >
                List Your Store
              </button>
              <ContactForm
                isOpen={showContact}
                onClose={() => setShowContact(false)}
              />
              <nav>
                <Link className="" to="/login">
                  <h3>Login</h3>
                </Link>
              </nav>
              <nav>
                <Link style={{ color: "var(--heart)" }} to="/signup">
                  <h3>Signup</h3>
                </Link>
              </nav>
            </div>
          </>
        ) : (
          <>
          <Link to="/">
              <nav>
                <img src={logo} alt="Shop Indie Index Logo" />
              </nav>
            </Link>
            <div className="headerNavRight">
              <button
                className="header-contact-btn"
                onClick={() => setShowContact(true)}
              >
                List Your Store
              </button>
              <ContactForm
                isOpen={showContact}
                onClose={() => setShowContact(false)}
              />
            <nav>
              <a className="" onClick={() => Auth.logout()}>
                <h3>Logout</h3>
              </a>
            </nav>
            <nav>
              <Link className="" to="/profile">
                <h3>Profile</h3>
              </Link>
            </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
