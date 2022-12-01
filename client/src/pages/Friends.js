import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { ADD_FRIEND } from "../utils/mutations";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import NeedLogin from "../components/NeedLogin";

const Friends = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [changeInfoState, setChangeInfoState] = useState({
    email: "",
  });
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { email: changeInfoState.email },
  });

  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_ME);
  const [friendArray, setFriendArray] = useState();
  const [addFriend, { error: addFriendError }] = useMutation(ADD_FRIEND);

  const handleAddFriend = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addFriend({
        variables: {
          friendId: data.user._id,
        },
      });
      console.log(mutationResponse);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChangeInfoState({
      ...changeInfoState,
      [name]: value,
    });
  };

  const getIsMeLoaded = () => {
    if (meData) {
      setIsLoading(false);
      setFriendArray(meData.me.friends)
      console.log(meData);
    }
  };

  useEffect(() => {
    getIsMeLoaded();
  }, [meData]);

  if (Auth.loggedIn() === true) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="friendSection sectionTitle ">
            <div className="profileDiv">
              <div className="sectionTitleDiv">
                <h2>FRIENDS</h2>
              </div>
              <div className="addFriendComponent">
                <h2>ADD FRIEND</h2>
                <form onSubmit={handleAddFriend}>
                  <input
                    className="form-input"
                    placeholder="Enter User's Email"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />

                  <button className="insetBtnInverse" type="submit">
                    Add User
                  </button>
                </form>
              </div>
              <div className="friendsListDiv">
              <h3>Friends List</h3>
              {friendArray.map((friend) => (
                <div className="friendEl" key={friend._id}><span>{friend.firstName} {friend.lastName}</span> <span>Email: {friend.email}</span></div>
              ))}
            </div>
            </div>
            
          </section>
        )}
      </section>
    );
  } else {
    return <NeedLogin />;
  }
};

export default Friends;
