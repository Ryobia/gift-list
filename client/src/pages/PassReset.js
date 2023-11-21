import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import { useParams } from "react-router-dom";
import Logout from "../components/Logout";

import { RESET_PASS } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const PassReset = (props) => {
  const [OTPState, setOTPState] = useState({otp: ""});
  const [passMatch, setPassMatch] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const [profileView, setProfileView] = useState("default");
  const { id: userId } = useParams();
  const [login, { error }] = useMutation(LOGIN);
  const [resetPass, { error: errorUpdate }] = useMutation(RESET_PASS);
  const [changePassword, setChangePassword] = useState({
    pass1: "",
    pass2: "",
  });
  // update state based on form input changes
  
 
  const handlePassChange = (event) => {
    const { name, value } = event.target;
    setChangePassword({
      ...changePassword,
      [name]: value,
    });
  };
  // submit form
  const handleOTPChange = (event) => {
    const { name, value } = event.target;

    setOTPState({
      ...OTPState,
      [name]: value,
    });
  };

  const handlePassSubmit = async (event) => {
    event.preventDefault();
    if (changePassword.pass1 === changePassword.pass2) {
      console.log(userId)
    try {
      const mutationResponse = await resetPass({
        variables: {
          _id: userId,
          password: changePassword.pass1,
        },
      });
      console.log(mutationResponse);
      setPassReset(true);
    } catch (e) {
      console.log(e);
    }
  } else {
    setPassMatch(true)
  }
  }

  if (Auth.loggedIn() === false) {
    return (
      <section className="loginSection">
                
        <div className="passResetForm standardShadow">
        <form className="" onSubmit={handlePassSubmit}>
          <h2>Password Reset Form</h2>
          <div className="form-resetPW">
            <label className="form-label" htmlFor="password">
              New Password:
            </label>
            <input
              className="form-input"
              name="pass1"
              type="password"
              id="pass1"
              value={changePassword.pass1}
              onChange={handlePassChange}
              disabled={passReset}
            />
          </div>
          <div className="form-resetPW">
            <label className="form-label" htmlFor="password">
              Confirm Password
            </label>
            <input
              className="form-input"
              name="pass2"
              type="password"
              id="pass2"
              value={changePassword.pass2}
              onChange={handlePassChange}
              disabled={passReset}
            />
          </div>
          {errorUpdate ? (
            <div className="error-div">
              <p className="errorText">
                Invalid Password
              </p>
            </div>
          ) : null}
          {passMatch ? (
            <div className="error-div">
              <p className="errorText">
                Passwords don't match
              </p>
            </div>
          ) : null}
          <div className="form-resetPW infoBtnDiv">
            <button className="insetBtnInverse" type="submit">
              Save New Password
            </button>
            <button
              className="insetBtnInverse"
              type="button"
              onClick={() => setProfileView('default')}
            >
              Cancel
            </button>
          </div>
          {passReset === true && (
              <div className="successText">
                Password Has Been Reset! <br/>
            <Link className="highlightText" to="/login">Click To Go Back To Login Screen</Link>

              </div>
            )}
        </form>
        </div>
      </section>
    );
  } else {
    return <Logout />;
  }
};

export default PassReset;
