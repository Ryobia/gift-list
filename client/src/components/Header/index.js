import React from "react";
import { Link } from "react-router-dom";
import BackBtn from "../BackBtn";

import Auth from "../../utils/auth";

const Header = () => {
  return (
    <header className="">
      <nav>
        <Link className="" to="/">
          <h3>Home</h3>
        </Link>
        <BackBtn />
      </nav>
      <nav>
        <Link className="" to="/">
          <h1>The Curatory</h1>
        </Link>
      </nav>
      {Auth.loggedIn() === false ? (
        <nav>
          <Link className="" to="/login">
            <h3>Login</h3>
          </Link>
          <Link className="" to="/signup">
            <h3>Signup</h3>
          </Link>
        </nav>
      ) : (
        <nav>
          <a className="" onClick={() => Auth.logout()}>
            <h3>Logout</h3>
          </a>
          <Link className="" to="/profile">
            <h3>Profile</h3>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
