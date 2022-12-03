import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { ADD_FRIEND } from "../utils/mutations";
import { BsFillXSquareFill } from "react-icons/bs";
import { QUERY_USER, QUERY_MY_FRIENDS } from "../utils/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import NeedLogin from "../components/NeedLogin";

const Friends = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [friendArray, setFriendArray] = useState();
  const [selectedFriendLists, setSelectedFriendLists] = useState();
  const [addFriend, { error: addFriendError }] = useMutation(ADD_FRIEND);
  const [changeInfoState, setChangeInfoState] = useState({
    email: "",
  });
  const { loading, data, refetch } = useQuery(QUERY_USER, {
    variables: { email: changeInfoState.email },
  });
  const [getUser, { loading: userLoading, error: userError, data: userData }] =
    useLazyQuery(QUERY_USER);

  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(QUERY_MY_FRIENDS, {
    pollInterval: 1000,
  });

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
    if (meData && data) {
      setIsLoading(false);
      setFriendArray(meData.myFriends.friends);
      console.log(meData);
    }
  };

  useEffect(() => {
    getIsMeLoaded();
  }, [meData]);

  useEffect(() => {
    if (userData?.user) {
      console.log(userData.user.lists);
      setSelectedFriend(userData.user);
      setSelectedFriendLists(
        userData.user.lists.filter((x) =>
          x.listUsers.some((y) => y._id === meData.myFriends._id)
        )
      );
      console.log(selectedFriendLists);
    }
  }, [userData]);

  if (Auth.loggedIn() === true) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="friendSection sectionTitle ">
            {modalOpen ? (
              <div id="open-modal" className="modal-window">
                <div>
                  <span
                    className="cancelModal"
                    onClick={() => setModalOpen(false)}
                  >
                    <BsFillXSquareFill className="insetBtnInverse " />
                  </span>
                  {selectedFriend?.lists ? (
                    <div className="expandedFriendDiv">
                      <h3>
                        {selectedFriend.firstName} {selectedFriend.lastName}'s
                        Lists
                      </h3>
                      {selectedFriendLists.map((list) => (
                        <Link
                          key={list._id}
                          className="standardShadow"
                          to={`/lists/${list._id}`}
                        >
                          <h4>{list.listName}</h4>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="friendDiv">
              <div className="sectionTitleDiv standardShadow">
                <h2>FRIENDS</h2>
              </div>
              <div className="addFriendComponent standardShadow">
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
              <div className="friendsListDiv standardShadow listHidden">
                <h3>Friends List</h3>
                {friendArray.map((friend) => (
                  <div
                    className="friendEl standardShadow"
                    key={friend._id}
                    onClick={() =>
                      getUser({ variables: { email: friend.email } })
                    }
                  >
                    <span>
                      {friend.firstName} {friend.lastName}
                    </span>{" "}
                    <span>Email: {friend.email}</span>
                  </div>
                ))}
              </div>
              <div className="friendsListDiv standardShadow listShown">
                <h3>Friends List</h3>
                {friendArray.map((friend) => (
                  <div
                    className="friendEl standardShadow"
                    key={friend._id}
                    onClick={() =>{
                      getUser({ variables: { email: friend.email } });
                      setModalOpen(true);
                    }
                    }
                  >
                    <span>
                      {friend.firstName} {friend.lastName}
                    </span>{" "}
                    <span>Email: {friend.email}</span>
                  </div>
                ))}
              </div>
            </div>
            {selectedFriend?.lists ? (
              <div className="expandedFriendDiv standardShadow listHidden">
                <h3>
                  {selectedFriend.firstName} {selectedFriend.lastName}'s Lists
                </h3>
                {selectedFriendLists.map((list) => (
                  <Link
                    key={list._id}
                    className="standardShadow"
                    to={`/lists/${list._id}`}
                  >
                    <h4>{list.listName}</h4>
                  </Link>
                ))}
              </div>
            ) : (
              <h3 className="noFriendSelected listHidden">
                Select a Friend to view their lists
              </h3>
            )}
          </section>
        )}
      </section>
    );
  } else {
    return <NeedLogin />;
  }
};

export default Friends;
