import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import Logout from "../components/Logout";

import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const PassReset = (props) => {
  const [OTPState, setOTPState] = useState({otp: ""});
  const [passMatch, setPassMatch] = useState(false);
  const [profileView, setProfileView] = useState("default");
  const [login, { error }] = useMutation(LOGIN);
  const [updateUser, { error: errorUpdate }] = useMutation(UPDATE_USER);
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
    try {
      const mutationResponse = await updateUser({
        variables: {
          password: changePassword.pass1,
        },
      });
      console.log(mutationResponse);
      setProfileView('');

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
                {profileView === 'default' ?

        <div className="form-div standardShadow">
            <p className="passResetText">If there is an account associated with that email,<br/> you will receive a code shortly. Enter it here</p>
            <form >
              <input
                className="form-input"
                placeholder="One-Time Password"
                name="otp"
                type="text"
                id="otp"
                value={OTPState.otp}
                onChange={handleOTPChange}
              />
              <button className="insetBtnInverse form-submit" type="submit" onClick={() => setProfileView('resetPW')}>
                Submit
              </button>
            </form>

        </div>
        : profileView === 'forgotPW' ?

        <div className="form-div standardShadow">
        <form className="" onSubmit={handlePassSubmit}>
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
            />
          </div>
          <div className="form-resetPW">
            <label className="form-label" htmlFor="password">
              Do It Again:
            </label>
            <input
              className="form-input"
              name="pass2"
              type="password"
              id="pass2"
              value={changePassword.pass2}
              onChange={handlePassChange}
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
              Save Changes
            </button>
            <button
              className="insetBtnInverse"
              type="button"
              onClick={() => setProfileView('default')}
            >
              Cancel
            </button>
          </div>
        </form>
        </div>
        : null
    }
      </section>
    );
  } else {
    return <Logout />;
  }
};

export default PassReset;
