import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Logout = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <section className="loginSection" >
    <div className="form-div insetBtn" onClick={() => Auth.logout()}>
    <h2>You are already logged in</h2>
    <h4>Click here to logout</h4>
  </div>
  </section>
  );
};

export default Logout;
