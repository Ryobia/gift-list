import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import NeedLogin from "../components/NeedLogin";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import Loader from "../components/Loader";

const Profile = () => {
  const { error, data } = useQuery(QUERY_ME);
  const [profileView, setProfileView] = useState("");
  const [passMatch, setPassMatch] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  let dateOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };
  const [updateUser, { error: errorUpdate }] = useMutation(UPDATE_USER);
  const [changeInfoState, setChangeInfoState] = useState({
    username: "",
    email: "",
  });

  const [changePassword, setChangePassword] = useState({
    pass1: "",
    pass2: "",
  });

  const handleInfoChange = (event) => {
    const { name, value } = event.target;
    setChangeInfoState({
      ...changeInfoState,
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

  
  const handleInfoSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await updateUser({
        variables: {
          username: changeInfoState.username,
          email: changeInfoState.email,
        },
      });
      console.log(mutationResponse);
      setProfileView('');
    } catch (e) {
      console.log(e);
    }
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

  const getIsItemLoaded = () => {
    if (data) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIsItemLoaded();
    if (data) {
    setChangeInfoState({ username: data.me.username, email: data.me.email });
    }
  }, [data]);

  if (Auth.loggedIn() === true) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="profileSection sectionTitle">
            <div className="profileDiv">
                <div className="sectionTitleDiv standardShadow">
                  <h2>PROFILE</h2>
                </div>
                
              <div className="profileInfoDiv">
                <div className="accountDiv standardShadow">
                  <h3>Account Info</h3>

                  <span>
                    Username: <p>{data.me.username}</p>
                  </span>

                  <span>
                    Name:{" "}
                    <p>
                      {data.me.firstName} {data.me.lastName}
                    </p>
                  </span>

                  <span>
                    Email: <p>{data.me.email}</p>
                  </span>

                  <span>
                    Date Joined:
                    <p>
                      {new Date(
                        parseInt(data.me.dateJoined)
                      ).toLocaleDateString("en-US", dateOptions)}
                    </p>{" "}
                  </span>
                </div>
                <div className="changeInfoDiv">
                  <button className="insetBtnInverse standardShadow" onClick={() => setProfileView('changeInfo')}>Change User Info</button>
                  <button className="insetBtnInverse standardShadow" onClick={() => setProfileView('changePass')}>Change Password</button>
                </div>
              </div>
              {profileView === 'changeInfo' ?
            <form className="accountForm standardShadow" onSubmit={handleInfoSubmit}>
            <div className="form-el">
              <label className="form-label" htmlFor="username">
                Username:
              </label>
              <input
                className="form-input"
                name="username"
                type="username"
                id="username"
                value={changeInfoState.username ? changeInfoState.username : ""}
                onChange={handleInfoChange}
              />
            </div>
            <div className="form-el">
              <label className="form-label" htmlFor="email">
                Your Email:
              </label>
              <input
                className="form-input"
                name="email"
                type="email"
                id="email"
                value={changeInfoState.email}
                onChange={handleInfoChange}
              />
            </div>
            {errorUpdate ? (
              <div className="error-div">
                <p className="error-text">
                  Something went wrong- New Username or Email is invalid or already in
                  use, choose another one.
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
            : profileView === 'changePass' ?
            <form className="accountForm standardShadow" onSubmit={handlePassSubmit}>
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
            :null}
            </div>
            <section className="homeSection">
            <Link className="standardShadow" to="/lists">
          <div className="homeInsetBtn ">
            <h1>MY LISTS</h1>
          </div>
        </Link>
        <Link className="standardShadow" to="/friends">
          <div className="homeInsetBtn">
            <h1>FRIENDS</h1>
          </div>
        </Link>
        </section>
          </section>
          
        )}
      </section>
    );
  } else {
    return <NeedLogin />;
  }
};

export default Profile;
