import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QUERY_ITEM, QUERY_ME, QUERY_LIST } from "../utils/queries";
import { UPDATE_ITEM, REMOVE_ITEM } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { BsTrashFill } from "react-icons/bs";
import Loader from "../components/Loader";

const SingleItem = (props) => {
  const [isOwnItem, setIsOwnItem] = useState(false);
  const [isAllowedToView, setIsAllowedToView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id: itemId, listId: listId } = useParams();
  const [updateItem, { error: updateError }] = useMutation(UPDATE_ITEM);
  const [removeItem, { error: removeItemError }] = useMutation(REMOVE_ITEM);
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

  const handlePurchaseItem = async () => {
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
  };

  const getIsItemLoaded = () => {
    if (data && meData) {
      setIsLoading(false);
      if (
        listData.list.listUsers.filter((e) => e.username === meData.me.username)
          .length > 0
      ) {
        setIsAllowedToView(true);
      }
      if (meData.me.username === data.item.itemUser) {
        setIsOwnItem(true);
      }
    }
  };

  useEffect(() => {
    getIsItemLoaded();
  }, [data]);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myListSection sectionMain">
          <div className="myItem">
            <div className="sectionTitleDiv singleItemTitleDiv">
              <h1>
                <span>Name:</span>
                <span>{data.item.itemName}</span>
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
                <span>Price:</span>
                <span>${data.item.itemPrice}</span>
              </p>
              <p>
                <span>Added by:</span>
                <span></span>
                {data.item.itemUser}
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
            {isAllowedToView && data.item.purchased == false ? (
              <div
                onClick={handlePurchaseItem}
                className="createListComponent editItem insetBtn"
              >
                <h2>MARK ITEM AS PURCHASED</h2>
              </div>
            ) : isAllowedToView && data.item.purchased == true ? (
              <div className="createListComponent">
                <h2>PURCHASED</h2>
              </div>
            ) : null}
            {isOwnItem ? (
              <span
                onClick={() => handleRemoveItem(data.item._id)}
                className="reactTrash"
              >
                <BsTrashFill />
              </span>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleItem;
