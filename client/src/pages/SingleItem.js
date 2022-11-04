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
      console.log(data)
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
        <div className="itemDiv">
          <p>{data.item.itemName}</p>
          <p> {data.item.itemLink}</p>
          <p> {data.item.itemDetails}</p>
          <p> {data.item.itemPrice}</p>
          <p> {data.item.itemUser}</p>
          <p> {data.item.itemDate}</p>
          
        </div>
      )}
    </section>
  );
};

export default SingleItem;
