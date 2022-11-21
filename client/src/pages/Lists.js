import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateList from "../components/CreateList";
import AddUserToList from "../components/AddUserToList";
import NeedLogin from "../components/NeedLogin";
import Loader from "../components/Loader";
import { BsTrashFill, BsFillArrowUpRightSquareFill, BsFillPencilFill } from "react-icons/bs";
import List from "../components/List";
import { QUERY_ME, QUERY_ALL_LISTS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import { REMOVE_LIST } from "../utils/mutations";
import Auth from "../utils/auth";
const Lists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { loading: allListsLoading, data: allListsData } =
    useQuery(QUERY_ALL_LISTS);
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
      let arr1 = meData.me.lists;
      let arr2 = allListsData.allLists.filter((x) =>
        x.listUsers.some((y) => y.username === meData.me.username)
      );
      let arr3 = [...arr1, ...arr2];

      setMyLists(arr3);
      setIsLoading(false);
    }
  };

  const toggleList = (e) => {
    document.getElementById(e).classList.toggle("listDivElToggle");
    document.getElementById(e).classList.toggle("listDivEl");
    document.getElementById(`${e}1`).classList.toggle("hidden");
    document.getElementById(`${e}2`).classList.toggle("hidden");
  };

  if (meError) {
    console.log(meError);
  } else if (meData) {
    me = meData.me.lists;
  }

  useEffect(() => {
    getIslistLoaded();
  }, [meData, allListsData]);

  if (Auth.loggedIn() === true) {
    return (
      <section>
        {isLoading ? (
          <Loader />
        ) : (
          <section className="myListSection sectionMain listsPage">
            <div className="myListLeft">
              <div className="sectionTitleDiv">
                <h2>MY LISTS</h2>
              </div>
              <CreateList />
            </div>
            {meData ? (
              <div className="listDiv">
                {myLists.map((list) => (
                  <div onClick={() => toggleList(list._id)} className="listDivEl" id={list._id} key={list._id}>
                    <Link
                      id={`${list._id}1`}
                      key={list._id}
                      className="insetBtn hidden"
                      to={`/lists/${list._id}`}
                    >
                      <BsFillArrowUpRightSquareFill />
                      </Link>
                      <List list={list} />
                    
                    {list.listUser === meData.me.username ? (
                      <span
                        onClick={() => handleRemoveList(list._id)}
                        className="reactTrashList hidden"
                        id={`${list._id}2`}
                      >
                        <BsTrashFill />
                      </span>
                    ) : null}
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
