import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import Logout from '../components/Logout';

import Auth from '../utils/auth';

const Signup = () => {
  const [signupState, setSignupState] = useState({ email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: signupState.username,
          email: signupState.email,
          password: signupState.password,
          firstName: signupState.firstName,
          lastName: signupState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };


  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupState({
      ...signupState,
      [name]: value,
    });
  };

  if (Auth.loggedIn() === false) {
  

  return (
      <section className="loginSection">
        <div className="form-div">
          <h4>Sign Up</h4>
          <div className="form-object">
            <form onSubmit={handleSignupSubmit}>
              <div className='form-firstLast'>
                <input
                className="form-input-50"
                placeholder="First Name"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleSignupChange}
                />
                <input
                className="form-input-50"
                placeholder="Last Name"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleSignupChange}
                />
              </div>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                onChange={handleSignupChange}
              />
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                onChange={handleSignupChange}
              />
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                onChange={handleSignupChange}
              />
              <button className="insetBtnInverse form-submit" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </section>
  );
} else {
  return (
    <Logout/>
  );
}
};

export default Signup;
