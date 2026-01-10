import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateList from "../components/CreateList";
import AddUserToList from "../components/AddUserToList";
import NeedLogin from "../components/NeedLogin";
import Loader from "../components/Loader";
import { BsTrashFill, BsFillXSquareFill } from "react-icons/bs";
import List from "../components/List";
import { QUERY_ME, QUERY_ALL_LISTS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import { REMOVE_LIST } from "../utils/mutations";
import Auth from "../utils/auth";
const Lists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedList, setSelectedList] = useState();
  const { loading: allListsLoading, data: allListsData } =
    useQuery(QUERY_ALL_LISTS);
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME, {
    pollInterval: 5000,
  });
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
    if (meData?.me.lists && allListsData?.allLists) {
      let arr1 = allListsData.allLists.filter(
        (m) => m.listUser._id === meData.me._id
      );
      let arr2 = allListsData.allLists.filter((x) =>
        x.listUsers.some((y) => y._id === meData.me._id)
      );
      let arr3 = [...arr1, ...arr2];

      setMyLists(arr3);
      setIsLoading(false);
      console.log(arr3);
    }
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
            {deleteModal ? (
              <div id="open-modal" className="modal-delete-window">
                <div className="deleteListModal">
                  <div className="deleteModalText">
                    <h3>Are you sure you want to delete this List?</h3>
                    <p>
                      Deleting a list removes it, and all items within
                      permanently.
                    </p>
                  </div>
                  <div className="deleteModalBtnDiv">
                    <div
                      className="insetBtn"
                      onClick={() => {
                        setDeleteModal(false);
                        setSelectedList();
                      }}
                    >
                      No, Do Not Delete
                    </div>
                    <div
                      className="insetBtn"
                      onClick={() => handleRemoveList(selectedList)}
                    >
                      Yes, I'm Sure
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="myListLeft">
              <div className="sectionTitleDiv standardShadow">
                <h2>MY LISTS</h2>
              </div>
              <CreateList />
            </div>
            {meData?.me ? (
              <div className="listDiv">
                {myLists.map((list) => (
                  <div className="listDivEl" key={list._id}>
                    <Link
                      key={list._id}
                      className="insetBtn"
                      to={`/lists/${list._id}`}
                    >
                      <List list={list} />
                    </Link>

                    {list.listUser._id === meData.me._id ? (
                      <span
                        onClick={() => {
                          setDeleteModal(true);
                          setSelectedList(list._id);
                        }}
                        className="reactTrashList standardShadow"
                      >
                        <BsTrashFill />
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="nothingToShow">No Lists to Display</div>
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
