import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import Logout from "../components/Logout";

import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
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
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleOTPChange = (event) => {
    const { name, value } = event.target;

    setOTPState({
      ...formState,
      [name]: value,
    });
  };
  const handlePassChange = (event) => {
    const { name, value } = event.target;
    setChangePassword({
      ...changePassword,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
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
          <h4>Login</h4>
          <div className="form-object">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                value={formState.email.toLowerCase()}
                onChange={handleChange}
              />
              <label htmlFor="password">Pasword</label>
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="insetBtnInverse form-submit" type="submit">
                Submit
              </button>
            </form>
            <a onClick={() => setProfileView('forgotPW')}>Forgot Password? Click Here</a>

            {error && <div>Login failed</div>}
          </div>
        </div>
        : profileView === 'forgotPW' ?
        <div className="form-div standardShadow">
            Enter your email to receive a one-time code to regain access to your account
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                value={formState.email.toLowerCase()}
                onChange={handleChange}
              />
              <button className="insetBtnInverse form-submit" type="submit" onClick={() => setProfileView('verifyOTP')}>
                Request Code
              </button>
            </form>
        </div>
        : profileView === 'verifyOTP' ?
        <div className="form-div standardShadow">
          Enter Code sent to: {formState.email.toLowerCase()}
            <form onSubmit={handleFormSubmit}>
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
        : profileView === 'resetPW' ? 
        <div className="form-div standardShadow">
        <form className="" onSubmit={handlePassSubmit}>
          <div className="form-el">
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
          <div className="form-el">
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
              <p className="error-text">
                Invalid Password
              </p>
            </div>
          ) : null}
          {passMatch ? (
            <div className="error-div">
              <p className="error-text">
                Passwords don't match
              </p>
            </div>
          ) : null}
          <div className="form-el infoBtnDiv">
            <button className="insetBtnInverse" type="submit">
              Save Changes
            </button>
            <button
              className="insetBtnInverse"
              type="button"
              onClick={() => setProfileView('')}
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

export default Login;
