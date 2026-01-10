import React from "react";
import { Link } from "react-router-dom";
import BackBtn from "../BackBtn";
import indieIndexLogo from "../../images/indieindexfull.png";

import Auth from "../../utils/auth";

const Header = () => {
  return (
    <header className="" style={{ backgroundImage: `url(${indieIndexLogo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-start', gap: '1em' }}>
      <div className="headerNav">
      <BackBtn />
      <nav>
        <Link className="" to="/">
          <h3>Home</h3>
        </Link>
      </nav>
      {Auth.loggedIn() === false ? (
        <>
          <nav>
            <Link className="" to="/login">
              <h3>Login</h3>
            </Link>
          </nav>
          <nav>
            <Link className="" to="/signup">
              <h3>Signup</h3>
            </Link>
          </nav>
        </>
      ) : (
        <>
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
        </>
      )}
      </div>
    </header>
  );
};

export default Header;
