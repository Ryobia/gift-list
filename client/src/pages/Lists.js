import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateList from "../components/CreateList";
import AddUserToList from "../components/AddUserToList";
import NeedLogin from "../components/NeedLogin";
import Loader from "../components/Loader";
import { BsTrashFill } from "react-icons/bs";
import List from "../components/List";
import { QUERY_ME, QUERY_ALL_LISTS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import { REMOVE_LIST } from "../utils/mutations";
import Auth from "../utils/auth";
const Lists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { loading: allListsLoading, data: allListsData} = useQuery(QUERY_ALL_LISTS);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const [myLists, setMyLists] = useState([]);
  let me = [];
  const [removeList, { error }] = useMutation(REMOVE_LIST);

  const navigate = useNavigate();
  const handleRemoveList = async (_id) => {
    try {
      const response = await removeList({
        variables: {
          _id: _id,
        },
      });
      navigate(0);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getIslistLoaded = () => {
    if (meData && allListsData) {
      setMyLists(allListsData.allLists.filter((e => e.listUser === meData.me.username)))
      setIsLoading(false);
    }
    console.log(myLists);
  };

  if (meError) {
    console.log(meError);
  } else if (meData) {
    me = meData.me.lists;
  }

  useEffect(() => {
    getIslistLoaded();
  }, [meData]);

  useEffect(() => {
    console.log(myLists);
  }, [allListsData]);

  if (Auth.loggedIn() === true) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="myListSection sectionMain">
            <div className="myListLeft">
              <div className="sectionTitleDiv">
                <h2>MY LISTS</h2>
              </div>
              <CreateList />
            </div>
            {meData ? (
              <div className="listDiv">
                {myLists.map((list) => (
                  <div key={list._id}>
                    <Link
                      key={list._id}
                      className="insetBtn"
                      to={`/lists/${list._id}`}
                    >
                      <List list={list} />
                    </Link>
                    <span
                      onClick={() => handleRemoveList(list._id)}
                      className="reactTrash"
                    >
                      <BsTrashFill />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h3>No Lists to Display</h3>
              </div>
            )}
          </section>
        )}
      </section>
    );
  } else {
    return <NeedLogin />;
  }
};

export default Lists;
