import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <h3>Home</h3>
        </Link>
      </nav>
      <nav>
        <Link to="/">
          <h1>СПИСКИ</h1>
        </Link>
      </nav>

      <nav>
        <Link to="/login">
          <h3>Login</h3>
        </Link>
        <Link to="/signup">
          <h3>Signup</h3>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
