import React from "react";
import { Link } from "react-router-dom";
import BackBtn from "../BackBtn";

import Auth from "../../utils/auth";

const Header = () => {
  return (
    <header>
      <nav>
        <Link className="insetBtn" to="/">
          <h3>Home</h3>
        </Link>
        <BackBtn />
      </nav>
      <nav>
        <Link className="insetBtn" to="/">
          <h1>List-Maker</h1>
        </Link>
      </nav>
      {Auth.loggedIn() === false ? (
        <nav>
          <Link className="insetBtn" to="/login">
            <h3>Login</h3>
          </Link>
          <Link className="insetBtn" to="/signup">
            <h3>Signup</h3>
          </Link>
        </nav>
      ) : (
        <nav>
          <a className="insetBtn" onClick={() => Auth.logout()}>
            <h3>Logout</h3>
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
