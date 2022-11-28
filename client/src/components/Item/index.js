import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";

const Item = (props) => {
  const { loading, error: meError, data: meData } = useQuery(QUERY_ME);
  const [isLoaded, setIsLoaded] = useState(false);

  const { item } = props;
  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  const getIsLoaded = () => {
    if (meData) setIsLoaded(true);
    console.log(item);
  };

  useEffect(() => {
    getIsLoaded();
  }, [meData]);

  if (isLoaded) {
    return (
      <section className="itemComponent">
        {meData.me.username !== item.itemUser ? (
          <label className="purchased" htmlFor="isPurchased">
            <input
              type="checkbox"
              name="isPurchased"
              checked={item.purchased}
              readOnly
            />
            <span className="checkmark"></span>
          </label>
        ) : null}
        <span className="itemDiv">
          <h2>{item.itemName.substring(0, 20)}</h2>
          <h3>Price: ${item.itemPrice}</h3>
          <p>
            Added:
            {" " +
              new Date(parseInt(item.itemDate)).toLocaleDateString(
                "en-US",
                dateOptions
              )}
          </p>

          <h4>{item.itemDetails.substring(0, 30) + "..."}</h4>
        </span>
        <div className="priorityDiv">
          {item.priority ? (
          <span>Priority: {item.priority}</span>
          ): (
            <span>Priority: Unset</span>
          )}
        </div>
      </section>
    );
  } else {
    <Loader />;
  }
};

export default Item;
