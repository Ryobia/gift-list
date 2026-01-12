import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { Async } from "react-async";
import { QUERY_LIST, QUERY_ME } from "../utils/queries";
import { REMOVE_USER_TO_LIST, UPDATE_LIST } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import {
  BsPlusCircleFill,
  BsPersonPlusFill,
  BsFillXSquareFill,
} from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Loader from "../components/Loader";
import Modal from "../components/RemoveFromListModal";
import AddUserToList from "../components/AddUserToList";
import CreateItem from "../components/CreateItem";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";

function SingleList() {
  const [isAllowedToView, setIsAllowedToView] = useState(false);
  const [modalView, setModalView] = useState("createItem");
  const [modalOpen, setModalOpen] = useState(false);
  const [isOwnList, setIsOwnList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listName, setListName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [modalX, setModalX] = useState(0);
  const [modalY, setModalY] = useState(0);
  const [itemsArray, setItemsArray] = useState([]);
  const [formState, setFormState] = useState({ email: "" });
  const [activeSortOption, setActiveSortOption] = useState("dateNewestFirst");
  const navigate = useNavigate();
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const { id: listId } = useParams();
  const {
    error,
    data,
    loading: listLoading,
  } = useQuery(QUERY_LIST, {
    variables: { _id: listId },
  });
  const [removeUserToList, { error: removeUserError }] =
    useMutation(REMOVE_USER_TO_LIST);

  const [updateList, { error: updateListError }] = useMutation(UPDATE_LIST);

  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  function handleClick(event, user) {
    showModal(user, event.clientX, event.clientY);
  }

  function showModal(user, x, y) {
    setModalUser(user);
    setModalX(x);
    setModalY(y);
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  const handleRemoveUserToList = async () => {
    if (formState.name !== "") {
      try {
        const mutationResponse = await removeUserToList({
          variables: {
            _id: listId,
            userId: modalUser._id,
          },
        });
        hideModal();
        navigate(0);
        console.log(mutationResponse);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleListNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleUpdateList = async () => {
    console.log(listName)
    try {
      const mutationResponse = await updateList({
        variables: {
          _id: listId,
          listName: listName,
        },
      });
        console.log(mutationResponse);
        navigate(0);
    } catch (e) {
      console.log(e);
    }
  };

  const getIslistLoaded = () => {
    if (data?.list?.listUser && meData?.me) {
      setItemsArray(data.list.items);
      setIsLoading(false);
      setListName(data.list.listName)
      if (
        meData.me._id === data.list.listUser._id ||
        data.list.listUsers.filter((e) => e._id === meData.me._id).length > 0
      ) {
        setIsAllowedToView(true);
      }
      if (meData.me._id === data.list.listUser._id) {
        setIsOwnList(true);
      }
      console.log(itemsArray);
    }
  };

  const orderDateOldestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr.reverse());
  };
  const orderDateNewestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(arr);
    setActiveSortOption("dateNewestFirst");
  };
  const orderPriceLowestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(
      arr.sort(function (a, b) {
        return a.itemPrice - b.itemPrice;
      })
    );
    setActiveSortOption("priceLowestFirst");
  };

  const orderPriceHighestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(
      arr.sort(function (a, b) {
        return b.itemPrice - a.itemPrice;
      })
    );
    setActiveSortOption("priceHighestFirst");
  };
  const orderPriorityHighestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(
      arr.sort(function (a, b) {
        return a.priority - b.priority;
      })
    );
    setActiveSortOption("priorityHighestFirst");
  };
  const orderPriorityLowestFirst = () => {
    let arr = [...data.list.items];
    setItemsArray(
      arr.sort(function (a, b) {
        return b.priority - a.priority;
      })
    );
    setActiveSortOption("priorityLowestFirst");
  };
  useEffect(() => {
    if (data?.list?.listUser) {
      getIslistLoaded();
    }
  }, [listLoading, loading]);

  if (isAllowedToView) {
    return (
      <section>
        {listLoading ? (
          <Loader />
        ) : (
          <div className="myListSection sectionMain singleListPage">
            {modalOpen ? (
              <div id="open-modal" className="modal-window">
                <div>
                  <span className="cancelModal">
                    <BsFillXSquareFill
                      onClick={() => setModalOpen(false)}
                      className="insetBtn "
                    />
                  </span>
                  {modalView === "addUser" ? (
                    <AddUserToList data={meData.me} />
                  ) : modalView === "createItem" ? (
                    <CreateItem listId={listId} />
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="myListLeft">
              <div className="sectionTitleDiv standardShadow">
                {isOwnList ? (
                  <div className="listTitle">
                    {isEditing ? (
                      <div>
                      <input
                      style={{
                        lineHeight: '2em'
                      }}
                        type="text"
                        value={listName}
                        onChange={handleListNameChange}
                      />
                      <div className="editListBtnDiv">
                      <button className="insetBtn" onClick={handleUpdateList}>Save</button>
                      <button className="insetBtn" onClick={() => setIsEditing(false)}>Cancel</button>
                      </div>
                      </div>
                    ) : (
                      <h2>
                        {data.list.listName}
                        <span className="fullscreenEditList">
                          <FaEdit
                            onClick={() => {
                              setIsEditing(true);
                            }}
                          />
                        </span>
                      </h2>
                    )}
                  </div>
                ) : (
                  <h2>{data.list.listName}</h2>
                )}
                <p>
                  {new Date(parseInt(data.list.listDate)).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </p>
                {data.list.listUser.firstName ? (
                  <p>
                    List Owner:{" "}
                    {data.list.listUser &&
                    data.list.listUser.firstName &&
                    data.list.listUser.lastName
                      ? `${data.list.listUser.firstName} ${data.list.listUser.lastName}`
                      : "Loading..."}
                  </p>
                ) : null}
                <div>
                  Members of this list:
                  {isOwnList ? (
                  <ul className="listMemberList">
                    {data.list.listUsers.map((user) => (
                      <li
                        className="listMember"
                        key={user._id}
                        onClick={(event) => handleClick(event, user)}
                      >
                        {user.firstName + " " + user.lastName}
                      </li>
                    ))}
                  </ul>
                  ) :
                  <ul className="listMemberList">
                    {data.list.listUsers.map((user) => (
                      <li
                        className="listMember"
                        key={user._id}
                      >
                        {user.firstName + " " + user.lastName}
                      </li>
                    ))}
                  </ul>
  }
                </div>
                {modalVisible && (
                  <Modal
                    user={modalUser}
                    x={modalX}
                    y={modalY}
                    handleRemoveUserToList={handleRemoveUserToList}
                    hideModal={hideModal}
                  />
                )}
                {isOwnList ? (
                  <div id="listIcon" className="listIcon">
                    <span className="listIconSpan">
                      <BsPlusCircleFill
                        onClick={() => {
                          setModalOpen(true);
                          setModalView("createItem");
                        }}
                      />
                    </span>
                    <span className="listIconSpan">
                      <BsPersonPlusFill
                        onClick={() => {
                          setModalOpen(true);
                          setModalView("addUser");
                        }}
                      />
                    </span>
                    <span className="listIconSpan">
                      <FaEdit
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      />
                    </span>
                  </div>
                ) : null}
                {isOwnList ? (
                  <div className="listHidden">
                    <AddUserToList data={meData.me} />
                    <CreateItem listId={listId} />
                  </div>
                ) : null}
              </div>
            </div>

            {itemsArray.length > 0 ? (
              <div className="itemMapDiv">
                <div className="itemSortDiv standardShadow">
                  <h3>Sorting Options</h3>

                  <button
                    className={`sortBtn ${activeSortOption === "dateNewestFirst" ? "active" : ""}`}
                    onClick={orderDateNewestFirst}
                  >
                    Newest First
                  </button>
                  <button
                    className={`sortBtn ${activeSortOption === "dateOldestFirst" ? "active" : ""}`}
                    onClick={orderDateOldestFirst}
                  >
                    Oldest First
                  </button>
                  <button
                    className={`sortBtn ${activeSortOption === "priceLowestFirst" ? "active" : ""}`}
                    onClick={orderPriceLowestFirst}
                  >
                    Price low to high
                  </button>
                  <button
                    className={`sortBtn ${activeSortOption === "priceHighestFirst" ? "active" : ""}`}
                    onClick={orderPriceHighestFirst}
                  >
                    Price high to low
                  </button>
                  <button
                    className={`sortBtn ${activeSortOption === "priorityLowestFirst" ? "active" : ""}`}
                    onClick={orderPriorityLowestFirst}
                  >
                    Priority low to high
                  </button>
                  <button
                    className={`sortBtn ${activeSortOption === "priorityHighestFirst" ? "active" : ""}`}
                    onClick={orderPriorityHighestFirst}
                  >
                    Priority high to low
                  </button>
                </div>
                {itemsArray.map((item) => (
                  <div key={item._id}>
                    <Link
                      to={`/lists/${listId}/${item._id}`}
                      className="insetBtn"
                    >
                      <Item item={item} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="nothingToShow">
                No Items have been added to this list
              </div>
            )}
          </div>
        )}
      </section>
    );
  } else {
    return (
      <div>
        <h2>You do not have permission to view this list</h2>
      </div>
    );
  }
}

function AsyncMyComponent() {
  return (
    <Async promiseFn={() => QUERY_LIST}>
      <SingleList />
    </Async>
  );
}

export default AsyncMyComponent;
