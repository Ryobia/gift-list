import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { QUERY_ITEM } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { BsTrashFill } from "react-icons/bs";
import Loader from "../components/Loader";

const SingleItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id: itemId } = useParams();
  const { error, data } = useQuery(QUERY_ITEM, {
    variables: { _id: itemId },
  });

  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  const getIsItemLoaded = () => {
    if (data) {
      setIsLoading(false);
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
              <h1><span>Name:</span><span>{data.item.itemName}</span></h1>
              <p><span>Item Created:</span><span></span>
                {new Date(parseInt(data.item.itemDate)).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}</p>
              <p><span>Price:</span><span></span>${data.item.itemPrice}</p>
              <p><span>Added by:</span><span></span>{data.item.itemUser}</p>
              <p>Details: <span>{data.item.itemDetails}</span></p>
              <p className="linkSpan">Link: <span>{data.item.itemLink}</span></p>
            </div>
            <div className="createListComponent editItem insetBtn">
                <h2>EDIT THIS ITEM</h2>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};

export default SingleItem;
