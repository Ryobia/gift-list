import React from "react";
import { Link } from "react-router-dom";


const NeedLogin = () => {


  return (
    <section className="needLoginSection" >
        <h2>Must be logged in</h2>
        <Link to="/login">
            <h3 className="insetBtn">Click here to Login</h3>
        </Link>

        <Link to="/signup">
            <h3 className="insetBtn">Or here to Signup</h3>
        </Link>
    </section>
  );
};

export default NeedLogin;
