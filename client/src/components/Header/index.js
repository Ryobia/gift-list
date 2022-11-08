import React from "react";
import { Link } from "react-router-dom";
import BackBtn from "../BackBtn";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav>
        <Link className="insetBtn" to="/">
          <h3>Home</h3>
        </Link>
        <BackBtn/>
      </nav>
      <nav>
        <Link className="insetBtn"to="/">
          <h1>List-Maker</h1>
        </Link>
      </nav>

      <nav>
        <Link  className="insetBtn" to="/login">
          <h3>Login</h3>
        </Link>
        <Link  className="insetBtn" to="/signup">
          <h3>Signup</h3>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
