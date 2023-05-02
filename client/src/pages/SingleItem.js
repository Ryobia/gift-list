import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QUERY_ITEM, QUERY_ME, QUERY_LIST } from "../utils/queries";
import { UPDATE_ITEM, REMOVE_ITEM } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Loader from "../components/Loader";

const SingleItem = (props) => {
  const [isOwnItem, setIsOwnItem] = useState(false);
  const [itemView, setItemView] = useState("");
  const [isAllowedToView, setIsAllowedToView] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id: itemId, listId: listId } = useParams();
  const [updateItem, { error: updateError }] = useMutation(UPDATE_ITEM);
  const [removeItem, { error: removeItemError }] = useMutation(REMOVE_ITEM);

  const [changeInfoState, setChangeInfoState] = useState({
    name: "",
    link: "",
    details: "",
    price: "",
  });
  const navigate = useNavigate();
  const { error, data } = useQuery(QUERY_ITEM, {
    variables: { _id: itemId },
  });
  const { error: listError, data: listData } = useQuery(QUERY_LIST, {
    variables: { _id: listId },
  });
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);

  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  const handleInfoChange = (event) => {
    const { name, value } = event.target;
    setChangeInfoState({
      ...changeInfoState,
      [name]: value,
    });
  };

  const handleRemoveItem = async (_id) => {
    try {
      const response = await removeItem({
        variables: {
          _id: _id,
          listId: listId,
        },
      });
      navigate(-1);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePriority = async (val) => {
    try {
      const response = await updateItem({
        variables: {
          _id: itemId,
          priority: val,
        },
      });
      navigate(0);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditItem = async (event) => {
    event.preventDefault();
    console.log(changeInfoState)
    try {
      const response = await updateItem({
        variables: {
          _id: itemId,
          itemName: changeInfoState.name,
          itemLink: changeInfoState.link,
          itemDetails: changeInfoState.details,
          itemPrice: parseInt(changeInfoState.price, 10),
        },
      });
      navigate(0);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePurchaseItem = async () => {
    if (data.item.purchased === false) {

    
    try {
      const response = await updateItem({
        variables: {
          _id: itemId,
          purchased: true,
        },
      });
      // navigate(0);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  } else {
    
    try {
      const response = await updateItem({
        variables: {
          _id: itemId,
          purchased: false,
        },
      });
      // navigate(0);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  };

  const getIsItemLoaded = () => {
    if (data && meData) {
      setIsLoading(false);
      if (
        listData.list.listUsers.filter((e) => e._id === meData.me._id).length >
        0
      ) {
        setIsAllowedToView(true);
      }
      if (meData.me._id === data.item.itemUser._id) {
        setIsOwnItem(true);
      }
      console.log(data);
      setChangeInfoState({
        name: data.item.itemName,
        link: data.item.itemLink,
        details: data.item.itemDetails,
        price: data.item.itemPrice,
      });
    }
  };

  useEffect(() => {
    getIsItemLoaded();
  }, [data, meData, listData]);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myListSection sectionMain">
          {deleteModal ? (
            <div id="open-modal" className="modal-delete-window">
              <div>
                <div className="deleteModalText">
                  <h3>Are you sure you want to delete this Item?</h3>
                  <p>
                    Deleting an Item removes it permanently. Keep in mind that
                    someone may have bought this item already.
                  </p>
                </div>
                <div className="deleteModalBtnDiv">
                  <div
                    className="insetBtnInverse"
                    onClick={() => setDeleteModal(false)}
                  >
                    Nevermind
                  </div>
                  <div
                    className="insetBtnInverse"
                    onClick={() => handleRemoveItem(data.item._id)}
                  >
                    Yes, I'm Sure
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="myItem">
            <div className="sectionTitleDiv singleItemTitleDiv standardShadow">
              <h1>
                <span>Name: </span>
                <span> {data.item.itemName}</span>
              </h1>
              <p>
                <span>Item Created:</span>
                <span></span>
                {new Date(parseInt(data.item.itemDate)).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}
              </p>
              <p>
                <span>Price: </span>
                <span>${data.item.itemPrice}</span>
              </p>
              <p>
                <span>Added by:</span>
                <span></span>
                <span>
                  {" "}
                  {data.item.itemUser.firstName} {data.item.itemUser.lastName}
                </span>
              </p>
              <p>
                Details: <span>{data.item.itemDetails}</span>
              </p>
              <p className="linkSpan">
                Link:{" "}
                <a
                  className="itemLink"
                  target="_blank"
                  href={data.item.itemLink}
                >
                  Click Here
                </a>
              </p>
            </div>
            {isAllowedToView && data.item.purchased === false ? (
              <div
                onClick={handlePurchaseItem}
                className="createListComponent editItem insetBtnInverse"
              >
                <h2>MARK ITEM AS PURCHASED</h2>
              </div>
            ) : isAllowedToView && data.item.purchased === true ? (
              <div className="createListComponent insetBtnInverse editItem"
              onClick={handlePurchaseItem}
              >
                <h2>PURCHASED</h2>
              </div>
            ) : null}
            {itemView === "changeInfo" ? (
              <form
                className="itemForm standardShadow"
                onSubmit={handleEditItem}
              >
                <div className="form-el ">
                  <label className="item-form-label" htmlFor="name">
                    Name:
                  </label>
                  <input
                    className="item-form-input"
                    name="name"
                    type="name"
                    id="name"
                    value={changeInfoState.name}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="form-el">
                  <label className="item-form-label" htmlFor="price">
                    Price:
                  </label>
                  <input
                    className="item-form-input"
                    name="price"
                    type="price"
                    id="price"
                    value={changeInfoState.price}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="form-el">
                  <label className="item-form-label" htmlFor="details">
                    Details:
                  </label>
                  <input
                    className="item-form-input"
                    name="details"
                    type="details"
                    id="details"
                    value={changeInfoState.details}
                    onChange={handleInfoChange}
                  />
                </div>
                <div className="form-el">
                  <label className="item-form-label" htmlFor="link">
                    Link:
                  </label>
                  <input
                    className="item-form-input"
                    name="link"
                    type="link"
                    id="link"
                    value={changeInfoState.link}
                    onChange={handleInfoChange}
                  />
                </div>
                {updateError ? (
                  <div className="error-div">
                    <p className="error-text">
                      Something went wrong- New Username or Email is invalid or
                      already in use, choose another one.
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
                    onClick={() => setItemView("")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}
            {isOwnItem ? (
              <div className="singleItemOptions">
                <span
                  onClick={() => setDeleteModal(true)}
                  className="reactTrash standardShadow"
                >
                  <BsTrashFill />
                </span>
                <div className="priorityDivSingleItem">
                  <p>Set Priority (1 = I want this the most):</p>
                  <span
                    className={data.item.priority === 1 ? "prioActive" : ""}
                    onClick={() => handleChangePriority(1)}
                    id="1"
                  >
                    1
                  </span>
                  <span
                    className={data.item.priority === 2 ? "prioActive" : ""}
                    onClick={() => handleChangePriority(2)}
                    id="2"
                  >
                    2
                  </span>
                  <span
                    className={data.item.priority === 3 ? "prioActive" : ""}
                    onClick={() => handleChangePriority(3)}
                    id="3"
                  >
                    3
                  </span>
                  <span
                    className={data.item.priority === 4 ? "prioActive" : ""}
                    onClick={() => handleChangePriority(4)}
                    id="4"
                  >
                    4
                  </span>
                  <span
                    className={data.item.priority === 5 ? "prioActive" : ""}
                    onClick={() => handleChangePriority(5)}
                    id="5"
                  >
                    5
                  </span>
                </div>
                <span
                  className="reactTrash standardShadow"
                  onClick={() => setItemView("changeInfo")}
                >
                  <FaEdit />
                </span>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleItem;
