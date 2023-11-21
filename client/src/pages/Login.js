import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import Logout from "../components/Logout";

import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [resetError, setResetError] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [profileView, setProfileView] = useState("default");
  const [login, { error }] = useMutation(LOGIN);
  const [changeInfoState, setChangeInfoState] = useState({
    email: "",
  });

  const { loading, data, error: queryError, refetch } = useQuery(QUERY_USER, {
    variables: { email: changeInfoState.email },
  });
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleForgotChange = (event) => {
    const { name, value } = event.target;
    setChangeInfoState({
      ...changeInfoState,
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

  const handleForgotRequest = (event) => {
    event.preventDefault();

    if (data.user?._id) {
      console.log(event.target);

      emailjs
        .sendForm(
          "service_xem9fhz",
          "template_9jvri1h",
          event.target,
          "ffjDONZH-RUJMA6Wj"
        )
        .then(
          (result) => {
            console.log(result.text);
            setResetSent(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
      setResetError(false);

    } else {
      setResetError(true);
    }
  };

  if (Auth.loggedIn() === false) {
    return (
      <section className="loginSection">
        {profileView === "default" ? (
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
                <label htmlFor="password">Password</label>
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
              <a
                className="highlightText"
                onClick={() => setProfileView("forgotPW")}
              >
                Forgot Password? Click Here
              </a>

              {error && (
                <div className="errorText">
                  Login failed, double-check Email and Password
                </div>
              )}
            </div>
          </div>
        ) : profileView === "forgotPW" ? (
          <div className="form-div standardShadow">
            Enter your account email to receive a link <br /> to reset your
            password.
            <form onSubmit={handleForgotRequest}>
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                value={changeInfoState.email.toLowerCase()}
                onChange={handleForgotChange}
              />
              <input
                name="id"
                type="hidden"
                hidden={true}
                value={data?.user?._id}
              />
              <input
                name="first"
                type="hidden"
                hidden={true}
                value={data?.user?.firstName}
              />
              <input
                name="last"
                type="hidden"
                hidden={true}
                value={data?.user?.lastName}
              />
              <button className="insetBtnInverse form-submit" type="submit">
                Request Code
              </button>
            </form>
            {resetError === true && (
              <div className="errorText">
                No Account With That Email Was Found
              </div>
            )}
            {resetSent === true && (
              <div className="successText">
                Reset Email Has Been Sent
            <p>Check your spam folder if you can't find it</p>

              </div>
            )}
          </div>
        ) : null}
      </section>
    );
  } else {
    return <Logout />;
  }
};

export default Login;
