import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import Logout from '../components/Logout';
import { BsEye, BsEyeSlash } from "react-icons/bs";

import Auth from '../utils/auth';

const Signup = () => {
  const [signupState, setSignupState] = useState({ email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [togglePass2, setTogglePass2] = useState('password');
  const [passMatch, setPassMatch] = useState(false);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: signupState.username,
          email: signupState.email.toLowerCase(),
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

  const handleSignUpPassToggle = () => {
    if(togglePass2 === "password") {
      setTogglePass2('text')
    } else {
      setTogglePass2('password')
    }
  }


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
        <div className="form-div standardShadow">
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
                value={signupState.email.toLowerCase()}
                onChange={handleSignupChange}
              />
              <div className='pass-input'>
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type={togglePass2}
                id="password"
                onChange={handleSignupChange}
              />
              {togglePass2 === 'password' ? (<i onClick={handleSignUpPassToggle} id="passToggle2">< BsEyeSlash/></i>)
              : (<i onClick={handleSignUpPassToggle} id="passToggle2">< BsEye/></i>)}
              
              </div>
              
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
