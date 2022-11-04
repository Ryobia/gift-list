import React from "react";
import { Link } from "react-router-dom";


const Item = (props) => {
  const { item } = props;
  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  return (
    <section className="listComponent">
      <div>
        
      <h2>{item.itemName}</h2>
      <h2>{item.itemPrice}</h2>
      <h2>{item.itemDetails}</h2>
        <p>
          {new Date(parseInt(item.itemDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </p>
        <p>Created by: {item.itemUser}</p>
      </div>
      
    </section>
  );
};

export default Item;
